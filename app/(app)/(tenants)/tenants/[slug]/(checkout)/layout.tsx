import { JSX } from "react";

import { Navbar } from "@/modules/checkout/ui/components/navbar";
import { Footer } from "@/modules/tenants/ui/components/footer";
/**
 * CheckoutLayout
 * @description Checkout layout component that renders the checkout layout with a `Navbar`, children, and `Footer`.
 * @param {ReactNode} children - Content to render inside the document body
 * @param {LayoutProps<"/tenants/[slug]">} params - Layout params containing the tenant slug
 * @returns {Promise<JSX.Element>} A React element representing the tenant layout
 */
export default async function CheckoutLayout({
  children,
  params,
}: LayoutProps<"/tenants/[slug]">): Promise<JSX.Element> {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar slug={slug} />
      <div className="flex-1">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
