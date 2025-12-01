"use client";

import { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";

import { InboxIcon, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { generateTenantUrl } from "@/lib/utils";

import { useCart } from "../../hooks/use-cart";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { CheckoutItem } from "../components/checkout-item";
import { CheckoutSidebar } from "../components/checkout-sidebar";

interface CheckoutViewProps {
  tenantSlug: string;
}

/**
 * CheckoutView component
 * @description Renders a checkout view with a list of products and a checkout sidebar
 * @param {CheckoutViewProps} props - The props object
 * @param props.tenantSlug - The slug of the tenant
 * @returns {JSX.Element} A JSX element that renders the checkout view component
 */
export const CheckoutView = ({
  tenantSlug,
}: CheckoutViewProps): JSX.Element => {
  const router = useRouter();
  const [states, setStates] = useCheckoutStates();
  const { productIds, removeProduct, clearCart } = useCart(tenantSlug);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {
    data: products,
    error,
    isLoading,
  } = useQuery(trpc.checkout.getProducts.queryOptions({ ids: productIds }));

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({ cancel: false, success: false });
      },
      onSuccess: (data) => {
        window.location.assign(data.url);
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          // TODO: Modify when subdomains enabled
          router.push("/sign-in");
        }
        toast.error(error.message);
      },
    })
  );

  // Handle success
  useEffect(() => {
    if (states.success) {
      setStates({ cancel: false, success: false });
      clearCart();
      queryClient.invalidateQueries({
        queryKey: trpc.library.getMany.infiniteQueryKey(),
      });
      router.push("/library");
    }
  }, [
    states.success,
    clearCart,
    router,
    setStates,
    queryClient,
    trpc.library.getMany,
  ]);

  // Handle not found
  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [clearCart, error]);

  if (isLoading) {
    return (
      <div className="px-4 pt-4 lg:pt-16 lg:px-12">
        <div className="flex flex-col gap-y-4 justify-center items-center p-8 w-full bg-white rounded-lg border border-black border-dashed">
          <LoaderIcon className="animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (products?.totalDocs === 0) {
    return (
      <div className="px-4 pt-4 lg:pt-16 lg:px-12">
        <div className="flex flex-col gap-y-4 justify-center items-center p-8 w-full bg-white rounded-lg border border-black border-dashed">
          <InboxIcon />
          <p className="text-base font-medium">No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 lg:pt-16 lg:px-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="overflow-hidden bg-white rounded-md border">
            {products?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === products.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/product/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={products?.totalPrice || 0}
            onPurchase={() =>
              purchase.mutate({
                productIds: productIds,
                tenantSlug: tenantSlug,
              })
            }
            isCancelled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};
