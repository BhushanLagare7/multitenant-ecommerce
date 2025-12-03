import { JSX } from "react";
import { Route } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

/**
 * Footer component
 * @description Renders a footer with a powered by funroad text
 * @returns {JSX.Element} A JSX element that renders the footer component
 */
export const Footer = (): JSX.Element => {
  return (
    <footer className="font-medium bg-white border-t">
      <div className="flex gap-2 items-center px-4 py-6 mx-auto max-w-7xl h-full lg:px-12">
        <p>Powered by</p>
        <Link
          href={process.env.NEXT_PUBLIC_APP_URL as Route<string>}
          className={cn("text-2xl font-semibold", poppins.className)}
        >
          <span>funroad</span>
        </Link>
      </div>
    </footer>
  );
};
