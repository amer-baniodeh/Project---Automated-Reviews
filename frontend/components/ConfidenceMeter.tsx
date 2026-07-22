type ConfidenceMeterProps = {
  score: number; // 0-1
  sentiment: "positive" | "negative" | "neutral";
};

const TOTAL_BLOCKS = 10;

export default function ConfidenceMeter({ score, sentiment }: ConfidenceMeterProps) {
  const filledCount = Math.round(score * TOTAL_BLOCKS);

  return (
    <div>
      <div className="confidence-meter">
        {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
          <div
            key={i}
            className={`confidence-block ${i < filledCount ? `filled ${sentiment}` : ""}`}
          />
        ))}
      </div>
      <div className="confidence-label">CONFIDENCE {(score * 100).toFixed(0)}%</div>
    </div>
  );
}