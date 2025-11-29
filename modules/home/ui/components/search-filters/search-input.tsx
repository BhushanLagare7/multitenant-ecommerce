"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CategoriesSidebar } from "./categories-sidebar";

/**
 * Library button component
 * @description Renders a library button with a dynamic import
 * @returns {JSX.Element} A JSX element that renders the library button component
 */
const LibraryButton = dynamic(
  () => import("../library-button").then((mod) => mod.LibraryButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled variant="elevated" className="flex-1">
        <BookmarkCheckIcon /> Library
      </Button>
    ),
  }
);

interface SearchInputProps {
  disabled?: boolean;
}

/**
 * Search input component
 * @description A component that renders the search input.
 * @param props.disabled - The disabled state of the input
 * @returns {JSX.Element} A JSX element that renders the search input component
 */
export const SearchInput = ({ disabled }: SearchInputProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex gap-2 items-center w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>
      <Button
        variant="elevated"
        className="flex size-12 shrink-0 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {session.data?.user && <LibraryButton />}
    </div>
  );
};
