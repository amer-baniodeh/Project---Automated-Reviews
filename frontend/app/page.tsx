"use client";

import { useState } from "react";
import SentimentDemo from "../components/SentimentDemo";
import ClusterExplorer from "../components/ClusterExplorer";

type Tab = "sentiment" | "clusters";

export default function Home() {
  const [tab, setTab] = useState<Tab>("sentiment");

  return (
    <div className="container">
      <h1>Automated Customer Reviews</h1>
      <p className="subtitle">Sentiment classification, clustering & AI-generated recommendations</p>

      <div className="tabs">
        <button className={`tab ${tab === "sentiment" ? "active" : ""}`} onClick={() => setTab("sentiment")}>
          Sentiment Classifier
        </button>
        <button className={`tab ${tab === "clusters" ? "active" : ""}`} onClick={() => setTab("clusters")}>
          Category Insights
        </button>
      </div>

      {tab === "sentiment" && <SentimentDemo />}
      {tab === "clusters" && <ClusterExplorer />}
    </div>
  );
}
