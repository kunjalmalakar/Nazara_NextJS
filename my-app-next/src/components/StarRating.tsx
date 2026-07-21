import { Star, StarHalf } from "lucide-react";

export function StarRating({
  rating,
  showLabel = true,
  size = 14,
}: {
  rating: number;
  showLabel?: boolean;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-gold">
        {[1, 2, 3, 4, 5].map((i) =>
          rating >= i ? (
            <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
          ) : rating >= i - 0.5 ? (
            <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />
          ) : (
            <Star key={i} size={size} className="text-border" fill="currentColor" strokeWidth={0} />
          ),
        )}
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">
          {rating.toFixed(2)} out of 5
        </span>
      )}
    </div>
  );
}
