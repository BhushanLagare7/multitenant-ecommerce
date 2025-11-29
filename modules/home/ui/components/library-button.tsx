import { JSX } from "react";
import Link from "next/link";

import { BookmarkCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Library button component
 * @description Renders a library button with a link to the library page
 * @returns {JSX.Element} A JSX element that renders the library button component
 */
export const LibraryButton = (): JSX.Element => {
  return (
    <Button variant="elevated" asChild>
      <Link href="/library">
        <BookmarkCheckIcon /> Library
      </Link>
    </Button>
  );
};
