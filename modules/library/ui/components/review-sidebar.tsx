import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { ReviewForm } from "./review-form";

interface ReviewSidebarProps {
  productId: string;
}

/**
 * ReviewSidebar component
 * @param productId - The id of the product
 */
export const ReviewSidebar = ({ productId }: ReviewSidebarProps) => {
  const trpc = useTRPC();
  const { data: review } = useSuspenseQuery(
    trpc.reviews.getOne.queryOptions({ productId })
  );

  return <ReviewForm productId={productId} initialData={review} />;
};
