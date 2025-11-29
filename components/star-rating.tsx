import { JSX } from "react";

import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const MAX_RATING = 5;
const MIN_RATING = 0;

interface StarRatingProps {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
}

/**
 * Star rating component
 * @description A component that renders the star rating.
 * @param {object} props - The props object
 * @param props.rating - The rating to be displayed
 * @param props.className - The class name for the rating
 * @param props.iconClassName - The class name for the icon
 * @param props.text - The text to be displayed
 * @returns {JSX.Element} A JSX element that renders the star rating component
 */
export const StarRating = ({
  rating,
  className,
  iconClassName,
  text,
}: StarRatingProps): JSX.Element => {
  const safeRating = Math.max(MIN_RATING, Math.min(MAX_RATING, rating));

  return (
    <div className={cn("flex gap-x-1 items-center", className)}>
      {Array.from({ length: MAX_RATING }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "size-4",
            index < safeRating ? "fill-black" : "",
            iconClassName
          )}
        />
      ))}
      {text && <p>{text}</p>}
    </div>
  );
};
