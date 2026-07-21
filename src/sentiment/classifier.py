"""
Sentiment classification module.

Wraps a pretrained transformer model (no fine-tuning) behind a small,
lazily-initialized interface so it's only loaded into memory once,
on first use — important for both notebook use and API cold starts.
"""

import torch
from functools import lru_cache
from typing import List, Dict


MODEL_NAME = "cardiffnlp/twitter-roberta-base-sentiment"

# cardiffnlp model outputs LABEL_0/1/2 -> negative/neutral/positive
LABEL_MAP = {"LABEL_0": "negative", "LABEL_1": "neutral", "LABEL_2": "positive"}


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


def predict_sentiment(text: str) -> Dict[str, float]:
    """Classify a single review. Returns {label, score}."""
    clf = _get_pipeline()
    result = clf(text)[0]
    return {
        "label": LABEL_MAP.get(result["label"], result["label"].lower()),
        "score": float(result["score"]),
    }


def predict_sentiment_batch(texts: List[str]) -> List[Dict[str, float]]:
    """Classify a batch of reviews."""
    clf = _get_pipeline()
    results = clf(texts, batch_size=32)
    return [
        {"label": LABEL_MAP.get(r["label"], r["label"].lower()), "score": float(r["score"])}
        for r in results
    ]


def rating_to_sentiment(rating: int) -> str:
    """Ground-truth mapping used during evaluation: 1-2 neg, 3 neutral, 4-5 pos."""
    if rating <= 2:
        return "negative"
    if rating == 3:
        return "neutral"
    return "positive"
