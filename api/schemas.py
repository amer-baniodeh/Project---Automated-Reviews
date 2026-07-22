"""Pydantic request/response models for the API."""

from pydantic import BaseModel
from typing import List, Optional


class SentimentRequest(BaseModel):
    text: str


class SentimentBatchRequest(BaseModel):
    texts: List[str]


class SentimentResponse(BaseModel):
    label: str
    score: float


class ClusterAssignRequest(BaseModel):
    product_title: str


class ClusterAssignResponse(BaseModel):
    cluster_id: int
    cluster_label: str


class ClusterInfo(BaseModel):
    cluster_id: str
    cluster_label: str

class ArticleRequest(BaseModel):
    cluster_id: str


class TopProduct(BaseModel):
    product_title: str
    mean: float
    count: int


class ArticleResponse(BaseModel):
    category: str
    article: str
    top_products: List[dict]
    worst_product: dict
