import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import { StarIcon } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

/**
 * Product card component
 * @description A component that renders the product card.
 * @param {object} props - The props object
 * @param props.id - The product ID
 * @param props.name - The product name
 * @param props.imageUrl - The product image URL
 * @param props.authorUsername - The product author username
 * @param props.authorImageUrl - The product author image URL
 * @param props.reviewRating - The product review rating
 * @param props.reviewCount - The product review count
 * @param props.price - The product price
 * @returns {JSX.Element} A JSX element that renders the product card component
 */
export const ProductCard = ({
  id,
  name,
  imageUrl,
  authorUsername,
  authorImageUrl,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps): JSX.Element => {
  return (
    <Link href={`/products/${id}`}>
      <div className="flex overflow-hidden flex-col h-full bg-white rounded-md border hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 gap-3 p-4 border-y">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          {/* // TODO: Redirect to user shop */}
          <div className="flex gap-2 items-center" onClick={() => {}}>
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={authorUsername}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm font-medium underline">{authorUsername}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex gap-1 items-center">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-2 py-1 bg-pink-400 border w-fit">
            <p className="text-sm font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(Number(price))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

/**
 * Product card skeleton component
 *
 * @returns JSX.Element A JSX element that renders the product card skeleton component
 */
export const ProductCardSkeleton = () => {
  return (
    <div className="w-full rounded-lg animate-pulse aspect-3/4 bg-neutral-200" />
  );
};
