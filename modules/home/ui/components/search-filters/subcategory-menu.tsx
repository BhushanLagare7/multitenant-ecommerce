import { JSX } from "react";
import Link from "next/link";

import { Category } from "@/payload-types";

import { CategoriesGetManyOutputSingle } from "@/modules/categories/types";

interface SubCategoryMenuProps {
  category: CategoriesGetManyOutputSingle;
  isOpen: boolean;
}

/**
 * Subcategory menu component
 * @description A component that renders the subcategory menu.
 * @param props.category - The category of the menu
 * @param props.isOpen - The open state of the menu
 * @returns {JSX.Element | null} A JSX element that renders the subcategory menu, or null if menu should not render
 */
export const SubCategoryMenu = ({
  category,
  isOpen,
}: SubCategoryMenuProps): JSX.Element | null => {
  /**
   * Check if the menu should be rendered
   *
   * @returns null if the menu should not be rendered
   */
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div className="absolute z-100" style={{ top: "100%", left: 0 }}>
      {/* Invisible bridge to maintain hover */}
      <div className="w-60 h-3" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5"
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="flex justify-between items-center p-4 w-full font-medium text-left underline hover:bg-black hover:text-white"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
