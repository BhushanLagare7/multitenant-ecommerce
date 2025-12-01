import { JSX } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart";

interface CartButtonProps {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

/**
 * Cart button component
 * @description Renders a cart button
 * @param {object} props - The props object
 * @param props.tenantSlug - The slug of the tenant
 * @param props.productId - The id of the product
 * @returns {JSX.Element} A JSX element that renders the cart button component
 */
export const CartButton = ({
  tenantSlug,
  productId,
  isPurchased,
}: CartButtonProps): JSX.Element => {
  const cart = useCart(tenantSlug);

  // If the product is purchased, render a button that links to the library
  if (isPurchased) {
    return (
      <Button
        variant="elevated"
        className="flex-1 font-medium bg-white"
        asChild
      >
        <Link href={`/library/${productId}`} prefetch>
          View in Library
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="elevated"
      className={cn(
        "flex-1 bg-pink-400",
        cart.isProductInCart(productId) && "bg-white"
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};
