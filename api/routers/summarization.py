import os
from fastapi import APIRouter, HTTPException
import pandas as pd

from api.schemas import ArticleRequest, ArticleResponse
from src.clustering.cluster import load_cluster_labels
from src.summarization.summarizer import build_category_article

router = APIRouter(prefix="/api/articles", tags=["summarization"])

CLUSTERS_CSV = os.path.join(os.path.dirname(__file__), "..", "..", "datasets", "clusters_with_reviews.csv")


@router.post("", response_model=ArticleResponse)
def generate_article(req: ArticleRequest):
    """
    Generate a recommendation article for a given cluster_id.

    Expects datasets/clusters_with_reviews.csv to exist, containing review-level
    rows joined with their cluster_id (produced during Day 1/Day 2 pipeline).
    """
    if not os.path.exists(CLUSTERS_CSV):
        raise HTTPException(
            status_code=404,
            detail="clusters_with_reviews.csv not found. Run the Day 1/2 pipeline first.",
        )

    df = pd.read_csv(CLUSTERS_CSV)
    subset = df[df["cluster_id"] == req.cluster_id]
    if subset.empty:
        raise HTTPException(status_code=404, detail=f"No reviews found for cluster_id={req.cluster_id}")

    labels = load_cluster_labels()
    category_label = labels.get(str(req.cluster_id), f"Cluster {req.cluster_id}")

    return build_category_article(subset, category_label)
