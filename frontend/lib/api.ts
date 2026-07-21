const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type SentimentResult = { label: string; score: number };
export type ClusterInfo = { cluster_id: number; cluster_label: string };
export type ArticleResult = {
  category: string;
  article: string;
  top_products: { product_title: string; mean: number; count: number }[];
  worst_product: { product: string; avg_rating: number; count: number };
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return res.json();
}

export async function predictSentiment(text: string): Promise<SentimentResult> {
  const res = await fetch(`${API_URL}/api/sentiment/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return handle<SentimentResult>(res);
}

export async function getClusters(): Promise<ClusterInfo[]> {
  const res = await fetch(`${API_URL}/api/clusters`);
  return handle<ClusterInfo[]>(res);
}

export async function assignCluster(productTitle: string): Promise<ClusterInfo & { cluster_id: number }> {
  const res = await fetch(`${API_URL}/api/clusters/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_title: productTitle }),
  });
  return handle(res);
}

export async function generateArticle(clusterId: number): Promise<ArticleResult> {
  const res = await fetch(`${API_URL}/api/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cluster_id: clusterId }),
  });
  return handle<ArticleResult>(res);
}
