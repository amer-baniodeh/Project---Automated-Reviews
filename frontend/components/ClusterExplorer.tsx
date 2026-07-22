"use client";

import { useEffect, useState } from "react";
import { getClusters, generateArticle, ClusterInfo, ArticleResult } from "../lib/api";

export default function ClusterExplorer() {
  const [clusters, setClusters] = useState<ClusterInfo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getClusters()
      .then((c) => {
        setClusters(c);
        if (c.length) setSelected(c[0].cluster_id);
      })
      .catch((e) => setError(e.message));
  }, []);

  async function handleGenerate() {
    if (selected === null) return;
    setLoading(true);
    setError(null);
    setArticle(null);
    try {
      const res = await generateArticle(selected);
      setArticle(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <h3>Explore a product category</h3>
      <select
        value={selected ?? ""}
        onChange={(e) => setSelected(e.target.value)}
      >
        {clusters.map((c) => (
          <option key={c.cluster_id} value={c.cluster_id}>
            {c.cluster_label}
          </option>
        ))}
      </select>
      <button className="primary" onClick={handleGenerate} disabled={loading || selected === null}>
        {loading ? "Generating article..." : "Generate recommendation article"}
      </button>

      {error && <div className="error">{error}</div>}

      {article && (
        <div className="result">
          <strong>{article.category}</strong>
          <p style={{ marginTop: 8, lineHeight: 1.5 }}>{article.article}</p>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
            Worst rated: {article.worst_product.product} ({article.worst_product.avg_rating.toFixed(1)}/5)
          </p>
        </div>
      )}
    </div>
  );
}
