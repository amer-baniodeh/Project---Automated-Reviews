from fastapi import APIRouter, HTTPException

from api.schemas import SentimentRequest, SentimentBatchRequest, SentimentResponse
from src.sentiment.classifier import predict_sentiment, predict_sentiment_batch

router = APIRouter(prefix="/api/sentiment", tags=["sentiment"])


@router.post("/predict", response_model=SentimentResponse)
def predict(req: SentimentRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="text must not be empty")
    return predict_sentiment(req.text)


@router.post("/predict-batch", response_model=list[SentimentResponse])
def predict_batch(req: SentimentBatchRequest):
    if not req.texts:
        raise HTTPException(status_code=400, detail="texts must not be empty")
    return predict_sentiment_batch(req.texts)
