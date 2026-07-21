from fastapi import APIRouter

from api.schemas import ClusterAssignRequest, ClusterAssignResponse, ClusterInfo
from src.clustering.cluster import assign_cluster, list_clusters

router = APIRouter(prefix="/api/clusters", tags=["clustering"])


@router.get("", response_model=list[ClusterInfo])
def get_clusters():
    """List all known product category clusters (for populating a dropdown)."""
    return list_clusters()


@router.post("/assign", response_model=ClusterAssignResponse)
def assign(req: ClusterAssignRequest):
    """Assign a new/unseen product title to the closest existing cluster."""
    return assign_cluster(req.product_title)
