**Project Goal**

This project aims to develop a product review system powered by NLP models that aggregate customer feedback from different sources. The key tasks include classifying reviews, clustering product categories, and using generative AI to summarize reviews into recommendation articles.



## Deployment notes (FastAPI + Vercel)

**Current setup: frontend on Vercel, backend on Render/Railway/Fly.io, using OpenAI
instead of local models in production.**

Local Hugging Face models (`cardiffnlp/twitter-roberta-base-sentiment`, `facebook/bart-large-cnn`)
are too heavy for small hosting tiers - loading them into memory alongside `torch`
routinely exceeds a free-tier instance's RAM. Rather than paying for a bigger
instance, `src/sentiment/classifier.py` and `src/summarization/summarizer.py`
each support two backends, chosen automatically:

- **No `OPENAI_API_KEY` set** → local pretrained models (what the Day 1 notebooks
  use and validate - accuracy/F1/confusion matrix results are unaffected by this)
- **`OPENAI_API_KEY` set** → OpenAI API calls instead (`gpt-4o-mini` by default) -
  no `torch`/`transformers` ever loaded into memory, fits comfortably on a free tier

### Backend deploy (Render, or similar)
1. Build command: `pip install -r requirements-api.txt` (deliberately excludes
   `torch`/`transformers`/`sentence-transformers` - not needed when using OpenAI)
2. Start command: `uvicorn api.index:app --host 0.0.0.0 --port $PORT`
3. Environment variables:
   - `OPENAI_API_KEY` = your key (set as a secret, never commit it)
4. Make sure `datasets/clusters_with_reviews.csv` and
   `models/B_clustering/cluster_labels.json` are committed to git (see
   `.gitignore` - most of `datasets/` is excluded by default, but these
   specific generated files are needed at runtime and should NOT be ignored)

### Frontend deploy (Vercel)
1. Root Directory: `frontend` (not the repo root)
2. Environment variable: `NEXT_PUBLIC_API_URL` = your deployed backend URL
3. Framework preset should auto-detect as Next.js once Root Directory is set correctly

### Local development
Don't set `OPENAI_API_KEY` locally (or notebooks/tests will start costing money
and can drift from the validated Day 1 results) - local dev and notebooks use
the free local models by default. If you specifically want to test the OpenAI
path locally before deploying, set the env var only in that terminal session:
```bash
export OPENAI_API_KEY=sk-...
uvicorn api.index:app --reload --port 8000
```