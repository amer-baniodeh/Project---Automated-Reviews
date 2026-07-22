"use client";

import { useState } from "react";
import SentimentDemo from "../components/SentimentDemo";
import ClusterExplorer from "../components/ClusterExplorer";

type Tab = "sentiment" | "clusters";

export default function Home() {
  const [tab, setTab] = useState<Tab>("sentiment");

  return (
    <div className="container">
      <h1 className="pixel-title pixel-display">
        REVIEW SCANNER<span className="blink-cursor">_</span>
      </h1>
      <p className="pixel-subtitle">
        Sentiment classification, clustering &amp; AI-generated recommendations
      </p>

      <div className="tabs">
        <button className={`tab ${tab === "sentiment" ? "active" : ""}`} onClick={() => setTab("sentiment")}>
          SENTIMENT
        </button>
        <button className={`tab ${tab === "clusters" ? "active" : ""}`} onClick={() => setTab("clusters")}>
          CATEGORIES
        </button>
      </div>

      {tab === "sentiment" && <SentimentDemo />}
      {tab === "clusters" && <ClusterExplorer />}
    </div>
  );
}