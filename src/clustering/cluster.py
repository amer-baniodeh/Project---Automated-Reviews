"""
Product category clustering module.

Embeds product titles with a sentence-transformer and clusters them with
KMeans into 5 meta-categories. Also exposes helpers to assign a NEW
product title to an existing (already-fit) cluster set, and to attach
human-readable labels to cluster ids.
"""

import json
import os
from functools import lru_cache
from typing import List


import joblib
import numpy as np


MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "models", "B_clustering")
KMEANS_PATH = os.path.join(MODELS_DIR, "kmeans_model.pkl")
LABELS_PATH = os.path.join(MODELS_DIR, "cluster_labels.json")

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
N_CLUSTERS = 5


@lru_cache(maxsize=1)
def _get_embedder():
    from sentence_transformers import SentenceTransformer

    return SentenceTransformer(EMBEDDING_MODEL)


def fit_clusters(product_titles: List[str], n_clusters: int = N_CLUSTERS):
    """Fit KMeans on a list of product titles and persist the model."""
    from sklearn.cluster import KMeans

    embedder = _get_embedder()
    embeddings = embedder.encode(product_titles, show_progress_bar=True)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    cluster_ids = kmeans.fit_predict(embeddings)

    os.makedirs(MODELS_DIR, exist_ok=True)
    joblib.dump(kmeans, KMEANS_PATH)

    return cluster_ids, kmeans


def load_cluster_labels() -> dict:
    """Load human-assigned labels, e.g. {'0': 'Ebook readers', '1': 'Batteries', ...}."""
    if not os.path.exists(LABELS_PATH):
        return {}
    with open(LABELS_PATH) as f:
        return json.load(f)


def assign_cluster(product_title: str) -> dict:
    """Assign a single new product title to the closest existing cluster."""
    if not os.path.exists(KMEANS_PATH):
        raise FileNotFoundError(
            "No fitted clustering model found. Run fit_clusters() first "
            "(see notebooks/B_clustering/01_baseline_KMeans.ipynb)."
        )

    kmeans = joblib.load(KMEANS_PATH)
    embedder = _get_embedder()
    embedding = embedder.encode([product_title])
    cluster_id = int(kmeans.predict(embedding)[0])

    labels = load_cluster_labels()
    label = labels.get(str(cluster_id), f"Cluster {cluster_id}")

    return {"cluster_id": cluster_id, "cluster_label": label}


def list_clusters() -> List[dict]:
    """Return all known clusters with their labels, for populating a dropdown."""
    labels = load_cluster_labels()
    if labels:
        unique_names = sorted(set(labels.values()))
        return [{"cluster_id": name, "cluster_label": name} for name in unique_names]
    return []