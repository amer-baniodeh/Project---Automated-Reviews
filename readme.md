# 🛍️ Automated Customer Reviews

## About

This project was developed as part of the Ironhack AI Engineering Bootcamp. The goal
was to build an NLP system that turns Amazon product reviews into useful insights:
classifying review sentiment, grouping products into categories, and generating
short recommendation articles automatically.

---

## Dataset

Three Amazon product review exports from [Datafiniti (via Kaggle)](https://www.kaggle.com/datasets/datafiniti/consumer-reviews-of-amazon-products/data),
merged into one dataset:

- **59,743** unique reviews
- **89** product IDs, **7** brands
- Columns used: product name, brand, review text, star rating

While merging, we found the `id` column wasn't reliable — the same id sometimes
pointed to completely different products. We cleaned the product name field and used
that as the main identifier instead.

---

## Preprocessing

- Merged and deduplicated the three raw files
- Fixed corrupted/concatenated product names
- Mapped star ratings to sentiment: 1-2 → negative, 3 → neutral, 4-5 → positive
- Removed empty/duplicate reviews

---

## Models Evaluated (Sentiment)

| Model | Accuracy | Macro F1 |
|---|---|---|
| Random Forest (TF-IDF) | 94.4% | 40.7% |
| Local RoBERTa (pretrained) | 90.0% | 52.8% |
| OpenAI gpt-5.4-mini | 90.6% | 55.5% |
| **OpenAI gpt-4o-mini** | **91.6%** | **56.4%** |

Random Forest looks best on accuracy alone, but it almost never gets the "neutral"
class right — Macro F1 is the fairer comparison since the dataset is skewed toward
positive reviews. gpt-4o-mini performed best overall and is what the deployed app uses.

Neutral (3-star) reviews were the hardest for every model — they're often genuinely
mixed ("loved the screen, hated the battery") rather than moderate in tone.

---

## Clustering

Product titles were embedded with `sentence-transformers/all-MiniLM-L6-v2` and grouped
with KMeans into 5 categories:

- Fire Tablets
- E-Readers & Accessories
- Echo & Smart Speakers
- Fire TV & Accessories
- Speakers & Power Accessories

---

## Summarization

For each category, a short article is generated with the top 3 products, their common
complaints, and the worst-rated product to avoid. Rankings use a weighted score so a
product with just 1-2 perfect reviews can't outrank one with hundreds of good reviews.

Complaint text is condensed by an LLM (OpenAI in production, a local BART model
available for local/offline use) — everything else (rankings, structure) is handled
with plain code, not the model, to keep the output reliable.

---

## 🚀 Live Demo

Try the deployed app here:

**\https://project-automated-reviews-4h6x-fawn.vercel.app/**

---

## 🛠 Tech Stack

- Python, FastAPI
- Next.js, React
- Hugging Face Transformers, Sentence-Transformers
- scikit-learn (TF-IDF, Random Forest, KMeans)
- OpenAI API
- Deployed on Vercel (frontend) + Render (backend)

---

## Installation

```bash
git clone https://github.com/amer-baniodeh/Project---Automated-Reviews.git
cd Project---Automated-Reviews

pip install -r requirements.txt
```

Run the notebooks in order (`00_data_merging_and_cleaning.ipynb` first, then the
notebooks under `A_sentiment_analysis/` and `B_clustering/`) in Jupyter or Google Colab.

To run the app locally:

```bash
# backend
uvicorn api.index:app --reload --port 8000

# frontend (separate terminal)
cd frontend
npm install
npm run dev
```

---

## 👥 Authors

**Amer Baniodeh**
GitHub: <https://github.com/amer-baniodeh>