"use client";

// TODO: Add Real ratings

import { Fragment, JSX } from "react";
import { Route } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { LinkIcon, StarIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { formatCurrency, generateTenantUrl } from "@/lib/utils";

import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/**
 * Cart button component
 * @description Renders a cart button with a dynamic import
 * @returns {JSX.Element} A JSX element that renders the cart button component
 */
const CartButton = dynamic(
  () => import("../components/cart-button").then((mod) => mod.CartButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="flex-1 bg-pink-400">
        Add to cart
      </Button>
    ),
  }
);

interface ProductViewProps {
  productId: string;
  tenantSlug: string;
}

/**
 * Product view component
 * @description A component that renders the product view.
 * @param {object} props - The props object
 * @param props.productId - The product ID
 * @param props.tenantSlug - The product tenant slug
 * @returns {JSX.Element} A JSX element that renders the product view component
 */
export const ProductView = ({
  productId,
  tenantSlug,
}: ProductViewProps): JSX.Element => {
  const trpc = useTRPC();

  const { data: product } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  return (
    <div className="px-4 py-10 lg:px-12">
      <div className="overflow-hidden bg-white rounded-sm border">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={product.image?.url || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium">{product.name}</h1>
            </div>
            <div className="flex border-y">
              <div className="flex justify-center items-center px-6 py-4 border-r">
                <div className="px-2 py-1 bg-pink-400 border w-fit">
                  <p className="text-base font-medium">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center px-6 py-4 lg:border-r">
                <Link
                  href={generateTenantUrl(tenantSlug) as Route<string>}
                  className="flex gap-2 items-center"
                >
                  {product.tenant?.image?.url && (
                    <Image
                      src={product.tenant.image?.url}
                      alt={product.tenant.name}
                      width={20}
                      height={20}
                      className="rounded-full border shrink-0 size-[20px]"
                    />
                  )}
                  <p className="text-base font-medium underline">
                    {product.tenant.name}
                  </p>
                </Link>
              </div>

              <div className="hidden justify-center items-center px-6 py-4 lg:flex">
                <div className="flex gap-1 items-center">
                  <StarRating rating={4} iconClassName="size-4" />
                </div>
              </div>
            </div>

            <div className="block justify-center items-center px-6 py-4 border-b lg:hidden">
              <div className="flex gap-1 items-center">
                <StarRating rating={4} iconClassName="size-4" />
                <p className="text-base font-medium">{5} ratings</p>
              </div>
            </div>
            <div className="p-6">
              {product.description ? (
                <p>{product.description}</p>
              ) : (
                <p className="italic font-medium text-muted-foreground">
                  No description provided
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="h-full border-t lg:border-t-0 lg:border-l">
              <div className="flex flex-col gap-4 p-6 border-b">
                <div className="flex flex-row gap-2 items-center">
                  <CartButton tenantSlug={tenantSlug} productId={productId} />
                  <Button
                    variant="elevated"
                    className="size-12"
                    onClick={() => {}}
                    disabled={false}
                  >
                    <LinkIcon />
                  </Button>
                </div>

                <p className="font-medium text-center">
                  {product.refundPolicy === "no-refunds"
                    ? "No Refunds"
                    : `${product.refundPolicy} money back guarantee`}
                </p>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">Ratings</h3>
                  <div className="flex gap-x-1 items-center font-medium">
                    <StarIcon className="szie-4 fill-black" />
                    <p>({5})</p>
                    <p className="text-base font-medium">{5} ratings</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Fragment key={stars}>
                      <div className="font-medium">
                        {stars} {stars === 1 ? "star" : "stars"}
                      </div>
                      <Progress value={(stars / 5) * 100} className="h-lh" />
                      <div className="font-medium">{(stars / 5) * 100}%</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
