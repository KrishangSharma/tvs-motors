"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  max?: number;
  className?: string;
}

export function StarRating({
  rating,
  setRating,
  max = 5,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

  return (
    <div className={cn("flex", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-6 w-6 cursor-pointer transition-all",
            (hoverRating > 0 ? hoverRating >= i + 1 : rating >= i + 1)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          )}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>
  );
}
