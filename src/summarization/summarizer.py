"""
Review summarization module.

Given aggregated review data for a product category, builds a structured
recommendation article:
    - Top 3 products + key stats
    - Top complaints for each (condensed from real negative reviews)
    - Worst product in the category and why

Design note: we do NOT ask the summarization model to generate the whole
article's structure in one shot — that led to low-quality output (typos
leaking from raw reviews, missing sections, run-on sentences). Instead:
  1. Structure (headers, stats, ordering) is built with plain Python/templates
  2. The summarization model's only job is condensing a product's negative
     review snippets into one clean complaint sentence — a narrow task it's
     actually good at
  3. Snippets are cleaned before being fed to the model
  4. max_length is computed dynamically from input length, so the model
     isn't asked to produce output longer than a sensible summary of short input

Backend: two options for step 2, chosen automatically via OPENAI_API_KEY -
  - LOCAL (default): pretrained BART, run on-device. No API key needed.
  - OPENAI: used automatically when OPENAI_API_KEY is set (e.g. on Render) -
    avoids loading torch/transformers into memory at all, since BART is the
    heaviest of the three models this project uses.
Only this one function's backend changes - the ranking/templating logic
above it stays identical either way.
"""

import os
import re
from functools import lru_cache
from typing import List, Dict
import pandas as pd

SUMMARY_MODEL = "facebook/bart-large-cnn"
OPENAI_MODEL = "gpt-4o-mini"
MIN_SNIPPET_WORDS = 4  # skip near-empty/low-signal reviews as complaint source text


@lru_cache(maxsize=1)
def _get_summarizer():
    from transformers import pipeline

    return pipeline("summarization", model=SUMMARY_MODEL)


@lru_cache(maxsize=1)
def _get_openai_client():
    from openai import OpenAI

    return OpenAI()  # reads OPENAI_API_KEY from the environment automatically


def _summarize_complaints_local(snippets: List[str]) -> str:
    """Condense complaints using the local pretrained BART model."""
    joined = " ".join(snippets)[:2000]
    input_word_count = len(joined.split())

    if input_word_count < 15:
        return joined

    summarizer = _get_summarizer()
    max_len = max(20, min(60, input_word_count // 2))
    min_len = max(10, max_len // 3)

    result = summarizer(joined, max_length=max_len, min_length=min_len, do_sample=False)
    return _trim_to_last_sentence(result[0]["summary_text"].strip())


def _summarize_complaints_openai(snippets: List[str]) -> str:
    """Condense complaints via an LLM instead of a local model."""
    joined = " ".join(snippets)[:2000]

    client = _get_openai_client()
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You condense product complaints into ONE clean, plain sentence "
                    "describing the common issue(s). No preamble, no quotes, no "
                    "restating the product name - just the complaint itself, "
                    "under 30 words."
                ),
            },
            {"role": "user", "content": joined},
        ],
        max_completion_tokens=100,
    )
    return _trim_to_last_sentence(response.choices[0].message.content.strip())


def _clean_snippet(text: str) -> str:
    """Basic cleanup so raw review noise doesn't leak into generated text."""
    text = str(text).strip()
    text = re.sub(r"\s+", " ", text)          # collapse whitespace/newlines
    text = re.sub(r"([!?.]){2,}", r"\1", text)  # collapse "!!!" / "??" runs
    return text


def _weighted_score(df: pd.DataFrame, product_col: str, rating_col: str, m: int = 50) -> pd.DataFrame:
    """
    Bayesian-adjusted rating per product (same idea IMDb uses for movie
    rankings): pulls a product's score toward the category-wide average,
    proportional to how few reviews it has.

        weighted_score = (n / (n + m)) * product_mean + (m / (n + m)) * category_mean

    `m` controls how many reviews' worth of "trust" a product needs before
    its own average dominates the score. m=50 means a product needs a real
    track record - a handful of perfect reviews (e.g. 7 reviews at 5.0)
    should NOT outrank a product with hundreds of reviews averaging 4.7;
    it takes a much larger, sustained sample to earn top billing.
    """
    category_mean = df[rating_col].mean()
    agg = df.groupby(product_col)[rating_col].agg(["mean", "count"]).reset_index()
    agg["weighted_score"] = (
        (agg["count"] / (agg["count"] + m)) * agg["mean"]
        + (m / (agg["count"] + m)) * category_mean
    )
    return agg


def _top_products(df: pd.DataFrame, product_col: str, rating_col: str, n: int = 3) -> pd.DataFrame:
    """Rank products by Bayesian-weighted score and return the top n."""
    agg = _weighted_score(df, product_col, rating_col)
    return agg.sort_values(["weighted_score", "count"], ascending=[False, False]).head(n)


def _worst_product(df: pd.DataFrame, product_col: str, rating_col: str) -> Dict:
    """Find the lowest Bayesian-weighted-score product."""
    agg = _weighted_score(df, product_col, rating_col)
    worst = agg.sort_values("weighted_score").iloc[0]
    return {"product": worst[product_col], "avg_rating": float(worst["mean"]), "count": int(worst["count"])}


def _sample_negative_snippets(df: pd.DataFrame, product: str, product_col: str,
                               text_col: str, rating_col: str, n: int = 5) -> List[str]:
    """Grab a few cleaned, low-rating review snippets for a product."""
    subset = df[(df[product_col] == product) & (df[rating_col] <= 2)]
    cleaned = [_clean_snippet(t) for t in subset[text_col].tolist()]
    cleaned = [t for t in cleaned if len(t.split()) >= MIN_SNIPPET_WORDS]
    return cleaned[:n]


def _summarize_complaints(snippets: List[str]) -> str:
    """
    Condense a product's negative review snippets into one clean complaint
    sentence. This is the ONLY thing we ask a model to do here - a narrow,
    well-scoped task instead of generating the whole article. Backend is
    chosen automatically: OpenAI if OPENAI_API_KEY is set, else local BART.
    """
    if not snippets:
        return "no major complaints found"

    if os.getenv("OPENAI_API_KEY"):
        return _summarize_complaints_openai(snippets)

    # Local BART path: skip the model call entirely for very short input -
    # not enough text for a meaningful summary, and avoids a
    # max_length > input_length warning.
    joined_word_count = len(" ".join(snippets).split())
    if joined_word_count < 15:
        return " ".join(snippets)[:2000]
    return _summarize_complaints_local(snippets)


def _trim_to_last_sentence(text: str) -> str:
    """
    BART's max_length cap can cut a sentence mid-thought (e.g. "...but you
    cannot tell"). Trim back to the last complete sentence so the article
    doesn't end on a dangling clause. Falls back to the full text if no
    sentence boundary is found (e.g. very short output).
    """
    matches = list(re.finditer(r"[.!?]", text))
    if not matches:
        return text
    last_end = matches[-1].end()
    trimmed = text[:last_end].strip()
    return trimmed if trimmed else text


def build_category_article(
    df: pd.DataFrame,
    category_label: str,
    product_col: str = "product_title",
    text_col: str = "review_text",
    rating_col: str = "star_rating",
) -> Dict:
    """
    Generate a recommendation article for one product category.

    `df` should already be filtered to a single cluster/category.
    Returns a dict with the raw structured facts plus a templated article,
    where only the per-product complaint sentences are model-generated.
    """
    worst = _worst_product(df, product_col, rating_col)

    # Exclude the worst product from the top-3 pool - a product shouldn't be
    # both a "top pick" and "avoid this one" in the same article. Small
    # categories may not have enough remaining products; _top_products'
    # own min_reviews fallback handles that gracefully.
    df_for_top = df[df[product_col] != worst["product"]]
    top3 = _top_products(df_for_top, product_col, rating_col)

    product_sections = []
    for _, row in top3.iterrows():
        snippets = _sample_negative_snippets(df, row[product_col], product_col, text_col, rating_col)
        complaint_summary = _summarize_complaints(snippets)
        product_sections.append(
            f"**{row[product_col]}** (avg {row['mean']:.1f}/5, {row['count']} reviews)\n"
            f"Common complaints: {complaint_summary}"
        )

    worst_snippets = _sample_negative_snippets(df, worst["product"], product_col, text_col, rating_col)
    worst_complaint_summary = _summarize_complaints(worst_snippets)

    # Structure is templated in plain Python - reliable, no hallucination risk.
    article = (
        f"## Best in {category_label}\n\n"
        + "\n\n".join(product_sections)
        + f"\n\n## Avoid: {worst['product']}\n"
        f"Rated {worst['avg_rating']:.1f}/5 across {worst['count']} reviews - "
        f"the lowest in this category. {worst_complaint_summary}"
    )

    return {
        "category": category_label,
        "top_products": top3.to_dict(orient="records"),
        "worst_product": worst,
        "article": article,
    }