# models/A_sentiment_analysis/

We use a pretrained transformer (`cardiffnlp/twitter-roberta-base-sentiment`)
via the Hugging Face `transformers` pipeline — no fine-tuned weights are
stored here, since the model is pulled from the Hub at runtime and cached
by `src/sentiment/classifier.py`.

If you later fine-tune a model (see `notebooks/A_sentiment_analysis/02_random_forest.ipynb`
for a classic-ML alternative, or fine-tune the transformer directly), save
artifacts here, e.g.:
- `config.json`, `pytorch_model.bin` / `model.safetensors`, `tokenizer.json` (HF format)
- or `random_forest.pkl` + `tfidf_vectorizer.pkl` (classic ML alternative)

Update `MODEL_NAME` in `src/sentiment/classifier.py` (or add a loader branch)
to point at whichever model you end up using in production.
