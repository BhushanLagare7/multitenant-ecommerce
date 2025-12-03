"use client";

import { JSX } from "react";

import { TriangleAlertIcon } from "lucide-react";

/**
 * Product error page
 * @description This page is displayed when an error occurs while loading the product page
 * @returns {JSX.Element} Error page
 */
export default function ErrorPage(): JSX.Element {
  return (
    <div className="px-4 py-10 lg:px-12">
      <div className="flex flex-col gap-y-4 justify-center items-center p-8 w-full bg-white rounded-lg border border-black border-dashed">
        <TriangleAlertIcon />
        <p className="text-base font-medium">Something went wrong</p>
      </div>
    </div>
  );
}
