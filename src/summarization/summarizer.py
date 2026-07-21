"""
Review summarization module.

Given aggregated review data for a product category, builds a structured
prompt and uses a pretrained summarization model to generate a short
recommendation article:
    - Top 3 products + key differences
    - Top complaints for each
    - Worst product in the category and why

No fine-tuning: we do the "reasoning" (top products, complaint extraction)
with simple aggregation/heuristics in Python, then hand the summarizer
model a compact, structured passage to condense into readable prose.
"""

from functools import lru_cache
from typing import List, Dict
import pandas as pd

SUMMARY_MODEL = "facebook/bart-large-cnn"


@lru_cache(maxsize=1)
def _get_summarizer():
    from transformers import pipeline

    return pipeline("summarization", model=SUMMARY_MODEL)


def _top_products(df: pd.DataFrame, product_col: str, rating_col: str, n: int = 3) -> pd.DataFrame:
    """Rank products by (avg rating, review count) and return the top n."""
    agg = (
        df.groupby(product_col)[rating_col]
        .agg(["mean", "count"])
        .reset_index()
        .sort_values(["mean", "count"], ascending=[False, False])
    )
    return agg.head(n)


def _worst_product(df: pd.DataFrame, product_col: str, rating_col: str, min_reviews: int = 5) -> Dict:
    """Find the lowest-rated product with a meaningful number of reviews."""
    agg = (
        df.groupby(product_col)[rating_col]
        .agg(["mean", "count"])
        .reset_index()
    )
    agg = agg[agg["count"] >= min_reviews]
    if agg.empty:
        agg = df.groupby(product_col)[rating_col].agg(["mean", "count"]).reset_index()
    worst = agg.sort_values("mean").iloc[0]
    return {"product": worst[product_col], "avg_rating": float(worst["mean"]), "count": int(worst["count"])}


def _sample_negative_snippets(df: pd.DataFrame, product: str, product_col: str,
                               text_col: str, rating_col: str, n: int = 3) -> List[str]:
    """Grab a few low-rating review snippets for a product, used as complaint source text."""
    subset = df[(df[product_col] == product) & (df[rating_col] <= 2)]
    return subset[text_col].head(n).tolist()


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
    Returns a dict with the raw structured facts plus a generated prose summary.
    """
    top3 = _top_products(df, product_col, rating_col)
    worst = _worst_product(df, product_col, rating_col)

    complaint_notes = []
    for _, row in top3.iterrows():
        snippets = _sample_negative_snippets(df, row[product_col], product_col, text_col, rating_col)
        complaint_notes.append(
            f"{row[product_col]} (avg {row['mean']:.1f}/5, {row['count']} reviews): "
            f"{' | '.join(snippets) if snippets else 'no major complaints found'}"
        )

    worst_snippets = _sample_negative_snippets(df, worst["product"], product_col, text_col, rating_col)

    structured_passage = (
        f"Category: {category_label}. "
        f"Top products: {', '.join(t[product_col] for _, t in top3.iterrows())}. "
        f"Details: {' '.join(complaint_notes)} "
        f"Worst product: {worst['product']} (avg {worst['avg_rating']:.1f}/5, "
        f"{worst['count']} reviews). Common issues: {' | '.join(worst_snippets)}"
    )

    summarizer = _get_summarizer()
    # BART has an input token limit; truncate defensively.
    generated = summarizer(
        structured_passage[:3000], max_length=180, min_length=60, do_sample=False
    )[0]["summary_text"]

    return {
        "category": category_label,
        "top_products": top3.to_dict(orient="records"),
        "worst_product": worst,
        "article": generated,
    }
