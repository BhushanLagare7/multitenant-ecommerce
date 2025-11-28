"use client";

import { JSX } from "react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { generateTenantUrl } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

interface NavbarProps {
  slug: string;
}

/**
 * Navbar component
 * @description Renders a navbar with a tenant logo and name
 * @param {object} props - The props object
 * @param props.slug - The slug of the tenant
 * @returns {JSX.Element} A JSX element that renders the navbar component
 */
export const Navbar = ({ slug }: NavbarProps): JSX.Element => {
  const trpc = useTRPC();

  const { data: tenant } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({ slug })
  );

  return (
    <nav className="h-20 font-medium bg-white border-b">
      <div className="flex justify-between items-center px-4 mx-auto max-w-7xl h-full lg:px-12">
        <Link
          href={generateTenantUrl(slug) as Route<string>}
          className="flex gap-2 items-center"
        >
          {tenant.image?.url && (
            <Image
              src={tenant.image.url}
              alt={tenant.name}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-8"
            />
          )}
          <p className="text-xl">{tenant.name}</p>
        </Link>
      </div>
    </nav>
  );
};

/**
 * Navbar skeleton component
 * @description Renders a skeleton for the navbar
 * @returns {JSX.Element} A JSX element that renders the navbar skeleton component
 */
export const NavbarSkeleton = (): JSX.Element => {
  return (
    <nav className="h-20 font-medium bg-white border-b">
      <div className="flex justify-between items-center px-4 mx-auto max-w-7xl h-full lg:px-12">
        <div className="flex gap-2 items-center">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-20 h-5" />
        </div>
        {/* // TODO: Skeleton for checkout button */}
      </div>
    </nav>
  );
};
