type PixelStarsProps = {
  rating: number; // 0-5
  showLabel?: boolean;
};

export default function PixelStars({ rating, showLabel = true }: PixelStarsProps) {
  const filled = Math.round(rating);
  const stars = "★".repeat(filled) + "☆".repeat(5 - filled);

  return (
    <span>
      <span className="pixel-stars" aria-hidden="true">{stars}</span>
      {showLabel && (
        <span style={{ color: "var(--pixel-muted)", marginLeft: 6, fontSize: "0.95rem" }}>
          {rating.toFixed(1)}/5
        </span>
      )}
    </span>
  );
}