import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavigationProps {
  activeCategorySlug?: string | null;
  activeCategoryName?: string | null;
  activeSubcategoryName?: string | null;
}

/**
 * Breadcrumb navigation component
 *
 * @param props.activeCategorySlug - The slug of the active category
 * @param props.activeCategoryName - The name of the active category
 * @param props.activeSubcategoryName - The name of the active subcategory
 * @returns {JSX.Element} A JSX element that renders the breadcrumb navigation component
 */
export const BreadcrumbNavigation = ({
  activeCategorySlug,
  activeCategoryName,
  activeSubcategoryName,
}: BreadcrumbNavigationProps) => {
  if (!activeCategoryName || activeCategorySlug === "all") return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubcategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-xl font-medium underline text-primary"
              >
                <Link href={`/${activeCategorySlug}`}>
                  {activeCategoryName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-lg font-medium text-primary">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {activeSubcategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium">
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
