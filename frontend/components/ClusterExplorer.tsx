"use client";

import { useEffect, useState } from "react";
import { getClusters, generateArticle, ClusterInfo, ArticleResult, TopProduct } from "../lib/api";
import PixelStars from "./PixelStars";
import { renderArticle } from "../lib/renderArticle";

const RANK_LABELS = ["#1", "#2", "#3"];

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
    <div className="pixel-frame">
      <h3>&gt; EXPLORE A CATEGORY</h3>
      <select value={selected ?? ""} onChange={(e) => setSelected(e.target.value)}>
        {clusters.map((c) => (
          <option key={c.cluster_id} value={c.cluster_id}>
            {c.cluster_label}
          </option>
        ))}
      </select>
      <button className="pixel-btn" onClick={handleGenerate} disabled={loading || selected === null}>
        {loading ? "GENERATING..." : "GENERATE REPORT >"}
      </button>

      {error && <div className="error">ERROR: {error}</div>}

      {article && (
        <div style={{ marginTop: 24 }}>
          <div className="session-log-title" style={{ marginBottom: 14 }}>
            &gt; LEADERBOARD_
          </div>
          {article.top_products.map((p: TopProduct, i: number) => (
            <div className={`leaderboard-item rank-${i + 1}`} key={p.product_title}>
              <span className="rank-badge">{RANK_LABELS[i] ?? `#${i + 1}`}</span>
              <div className="leaderboard-body">
                <div className="leaderboard-name">{p.product_title}</div>
                <div className="leaderboard-meta">
                  <PixelStars rating={p.mean} /> · {p.count} reviews
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24 }}>{renderArticle(article.article)}</div>
        </div>
      )}
    </div>
  );
}