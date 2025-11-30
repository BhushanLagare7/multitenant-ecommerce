import { JSX } from "react";
import { Route } from "next";
import Link from "next/link";

import { generateTenantUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface NavbarProps {
  slug: string;
}

/**
 * Navbar component
 * @description Renders a checkout navbar with a "Checkout" label and "Continue Shopping" button
 * @param {NavbarProps} props - The props object
 * @param props.slug - The slug of the tenant
 * @returns {JSX.Element} A JSX element that renders the navbar component
 */
export const Navbar = ({ slug }: NavbarProps): JSX.Element => {
  return (
    <nav className="h-20 font-medium bg-white border-b">
      <div className="flex justify-between items-center px-4 mx-auto max-w-7xl h-full lg:px-12">
        <p className="text-xl">Checkout</p>
        <Button variant="elevated" asChild>
          <Link href={generateTenantUrl(slug) as Route<string>}>
            Continue Shopping
          </Link>
        </Button>
      </div>
    </nav>
  );
};
