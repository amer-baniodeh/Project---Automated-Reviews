"use client";

import { useState } from "react";
import { predictSentiment, SentimentResult } from "../lib/api";

export default function SentimentDemo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await predictSentiment(text);
      setResult(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <h3>Classify a review</h3>
      <textarea
        rows={4}
        placeholder="Paste a customer review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="primary" onClick={handleSubmit} disabled={loading || !text.trim()}>
        {loading ? "Classifying..." : "Classify sentiment"}
      </button>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <span className={`badge ${result.label}`}>{result.label}</span>
          <span style={{ marginLeft: 10, color: "var(--muted)" }}>
            confidence: {(result.score * 100).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}
