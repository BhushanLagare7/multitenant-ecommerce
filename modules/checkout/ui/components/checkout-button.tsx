import { JSX } from "react";
import { Route } from "next";
import Link from "next/link";

import { ShoppingCartIcon } from "lucide-react";

import { cn, generateTenantUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { useCart } from "../../hooks/use-cart";

interface CheckoutButtonProps {
  tenantSlug: string;
  className?: string;
  hideIfEmpty?: boolean;
}

/**
 * Checkout button component
 * @description Renders a checkout button
 * @param {object} props - The props object
 * @param props.tenantSlug - The slug of the tenant
 * @param props.className - The className of the button
 * @param props.hideIfEmpty - Whether to hide the button if the cart is empty
 * @returns {JSX.Element | null} A JSX element that renders the checkout button component or null if the cart is empty
 */
export const CheckoutButton = ({
  tenantSlug,
  className,
  hideIfEmpty,
}: CheckoutButtonProps): JSX.Element | null => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button variant="elevated" className={cn("bg-white", className)} asChild>
      <Link href={`${generateTenantUrl(tenantSlug)}/checkout` as Route<string>}>
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};
