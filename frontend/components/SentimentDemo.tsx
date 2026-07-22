"use client";

import { useState } from "react";
import { predictSentiment, SentimentResult } from "../lib/api";
import ConfidenceMeter from "./ConfidenceMeter";

type LogEntry = SentimentResult & { text: string; id: number };

export default function SentimentDemo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);

  async function handleSubmit() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await predictSentiment(text);
      setResult(res);
      setLog((prev) => [{ ...res, text, id: Date.now() }, ...prev].slice(0, 8));
      setText("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pixel-frame">
      <h3>&gt; CLASSIFY A REVIEW</h3>
      <textarea
        rows={4}
        placeholder="Paste a customer review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="pixel-btn" onClick={handleSubmit} disabled={loading || !text.trim()}>
        {loading ? "ANALYZING..." : "CLASSIFY >"}
      </button>

      {error && <div className="error">ERROR: {error}</div>}

      {result && (
        <div className="result" style={{ marginTop: 20 }}>
          <span className={`pixel-badge ${result.label}`}>{result.label}</span>
          <ConfidenceMeter score={result.score} sentiment={result.label as any} />
        </div>
      )}

      {log.length > 0 && (
        <div className="session-log">
          <div className="session-log-title">&gt; SESSION LOG_</div>
          {log.map((entry) => (
            <div className="log-entry" key={entry.id}>
              <span className={`log-tag ${entry.label}`}>{entry.label.slice(0, 3).toUpperCase()}</span>
              <span className="log-text">{entry.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}