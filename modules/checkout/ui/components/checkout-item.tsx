import { JSX } from "react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn, formatCurrency } from "@/lib/utils";

/**
 * CheckoutItemProps
 * @description Props for the checkout item component
 * @param {boolean} isLast - Whether the item is the last item
 * @param {string | null} imageUrl - The URL of the image
 * @param {string} name - The name of the item
 * @param {string} productUrl - The URL of the product
 * @param {string} tenantUrl - The URL of the tenant
 * @param {string} tenantName - The name of the tenant
 * @param {number} price - The price of the item
 * @param {function} onRemove - The function to call when the item is removed
 */
interface CheckoutItemProps {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}

/**
 * CheckoutItem
 * @description Checkout item component that renders the checkout item, and renders a `CheckoutItem`.
 * @param {CheckoutItemProps} props - The props for the checkout item
 * @returns {JSX.Element} A React element representing the checkout item
 */
export const CheckoutItem = ({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantUrl,
  tenantName,
  price,
  onRemove,
}: CheckoutItemProps): JSX.Element => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative h-full aspect-square">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between py-4">
        <div>
          <Link href={productUrl as Route<string>}>
            <h4 className="font-bold underline">{name}</h4>
          </Link>
          <Link href={tenantUrl as Route<string>}>
            <p className="font-medium underline">{tenantName}</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-between py-4">
        <p className="font-medium">{formatCurrency(price)}</p>
        <button
          type="button"
          onClick={onRemove}
          className="font-medium underline"
          aria-label={`Remove ${name}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
