"""
Sentiment classification module.

Supports two backends, chosen automatically:
  - LOCAL (default): pretrained transformer, no fine-tuning, run on-device.
    Used for Day 1 notebook evaluation (accuracy/F1/confusion matrix) - keep
    this path untouched so those already-validated results don't silently
    change if this module is edited later.
  - OPENAI: used automatically when an OPENAI_API_KEY env var is present -
    this is what the deployed API uses in production, since it avoids
    loading torch/transformers into memory at all (too heavy for small
    hosting tiers). Set OPENAI_API_KEY only where you want this path
    (e.g. Render's environment settings), leave it unset locally/in
    notebooks to keep using the local model.
"""

import os
import json
from functools import lru_cache
from typing import List, Dict

MODEL_NAME = "cardiffnlp/twitter-roberta-base-sentiment"
OPENAI_MODEL = "gpt-5.4-mini"  

# cardiffnlp model outputs LABEL_0/1/2 -> negative/neutral/positive
LABEL_MAP = {"LABEL_0": "negative", "LABEL_1": "neutral", "LABEL_2": "positive"}

VALID_LABELS = {"negative", "neutral", "positive"}


# ---------------------------------------------------------------------------
# LOCAL backend (pretrained transformer, run on-device)
# ---------------------------------------------------------------------------
@lru_cache(maxsize=1)
def _get_pipeline():
    """Load and cache the HF pipeline. Cached so repeated calls are cheap."""
    from transformers import pipeline

    return pipeline(
        "sentiment-analysis",
        model=MODEL_NAME,
        truncation=True,
        max_length=512,
    )


def _predict_sentiment_local(text: str) -> Dict[str, float]:
    clf = _get_pipeline()
    result = clf(text)[0]
    return {
        "label": LABEL_MAP.get(result["label"], result["label"].lower()),
        "score": float(result["score"]),
    }


def _predict_sentiment_batch_local(texts: List[str]) -> List[Dict[str, float]]:
    clf = _get_pipeline()
    results = clf(texts, batch_size=32)
    return [
        {"label": LABEL_MAP.get(r["label"], r["label"].lower()), "score": float(r["score"])}
        for r in results
    ]


# ---------------------------------------------------------------------------
# OPENAI backend (used automatically when OPENAI_API_KEY is set)
# ---------------------------------------------------------------------------
@lru_cache(maxsize=1)
def _get_openai_client():
    from openai import OpenAI

    return OpenAI()  # reads OPENAI_API_KEY from the environment automatically


def _predict_sentiment_openai(text: str) -> Dict[str, float]:
    """
    Classify sentiment via an LLM instead of a local model.

    Note: `score` here is the model's own self-reported confidence, not a
    calibrated probability like a real classifier's softmax output - treat
    it as an approximate signal for the UI, not a statistical guarantee.
    """
    client = _get_openai_client()
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": (
                    "Classify the sentiment of a product review. Respond ONLY with "
                    'JSON: {"label": "negative"|"neutral"|"positive", "confidence": 0.0-1.0}. '
                    "confidence reflects how clear-cut the sentiment is."
                ),
            },
            {"role": "user", "content": text[:2000]},  # defensive truncation
        ],
        max_completion_tokens=100,
    )
    try:
        parsed = json.loads(response.choices[0].message.content)
        label = parsed.get("label", "neutral").lower()
        if label not in VALID_LABELS:
            label = "neutral"
        return {"label": label, "score": float(parsed.get("confidence", 0.5))}
    except (json.JSONDecodeError, KeyError, ValueError, TypeError):
        # Fail safe rather than crashing the request on a malformed LLM response
        return {"label": "neutral", "score": 0.5}


def _predict_sentiment_batch_openai(texts: List[str]) -> List[Dict[str, float]]:
    # Simple sequential loop, not a true batch call - keeps parsing reliable.
    # Fine for interactive use (one review at a time from the UI); if you
    # need to classify hundreds/thousands at once, prefer the local backend
    # (see notebooks/A_sentiment_analysis/01_baseline.ipynb) for cost/speed.
    return [_predict_sentiment_openai(t) for t in texts]


# ---------------------------------------------------------------------------
# Public interface - picks backend automatically based on OPENAI_API_KEY
# ---------------------------------------------------------------------------
def predict_sentiment(text: str) -> Dict[str, float]:
    """Classify a single review. Returns {label, score}."""
    if os.getenv("OPENAI_API_KEY"):
        return _predict_sentiment_openai(text)
    return _predict_sentiment_local(text)


def predict_sentiment_batch(texts: List[str]) -> List[Dict[str, float]]:
    """Classify a batch of reviews."""
    if os.getenv("OPENAI_API_KEY"):
        return _predict_sentiment_batch_openai(texts)
    return _predict_sentiment_batch_local(texts)


def rating_to_sentiment(rating: int) -> str:
    """Ground-truth mapping used during evaluation: 1-2 neg, 3 neutral, 4-5 pos."""
    if rating <= 2:
        return "negative"
    if rating == 3:
        return "neutral"
    return "positive"