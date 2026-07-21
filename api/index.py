"""
FastAPI entrypoint.

Run locally:
    uvicorn api.index:app --reload --port 8000

On Vercel, this file is deployed as a Python serverless function (see vercel.json).
Note: heavy ML deps (torch/transformers) may exceed Vercel's function size/time
limits — see README.md "Deployment notes" for recommended alternatives.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers import sentiment, clustering, summarization

app = FastAPI(
    title="Automated Customer Reviews API",
    description="Sentiment classification, product clustering, and review summarization.",
    version="0.1.0",
)

# Allow the Next.js frontend (local dev + deployed) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your deployed frontend URL before going to production
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sentiment.router)
app.include_router(clustering.router)
app.include_router(summarization.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
