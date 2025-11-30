import { JSX } from "react";

import { CheckoutView } from "@/modules/checkout/ui/views/checkout-view";

/**
 * CheckoutPage
 * @description Checkout page component that renders the checkout page, and renders a `CheckoutView`.
 * @param {PageProps<"/tenants/[slug]/checkout">} params - The params object containing the tenant slug
 * @returns {Promise<JSX.Element>} A React element representing the checkout page
 */
export default async function CheckoutPage({
  params,
}: PageProps<"/tenants/[slug]/checkout">): Promise<JSX.Element> {
  const { slug } = await params;

  return <CheckoutView tenantSlug={slug} />;
}
