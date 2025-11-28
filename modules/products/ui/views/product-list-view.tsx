import { JSX, Suspense } from "react";

import { ProductFilters } from "../components/product-filters";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { ProductSort } from "../components/product-sort";

interface ProductListViewProps {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

/**
 * Product list view component
 * @description A component that renders the product list view.
 * @param {object} props - The props object
 * @param props.category - The category of the products
 * @param props.tenantSlug - The slug of the tenant
 * @param props.narrowView - Whether to show the product list in a narrow view
 * @returns {JSX.Element} A JSX element that renders the product list view component
 */
export const ProductListView = ({
  category,
  tenantSlug,
  narrowView,
}: ProductListViewProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
      <div className="flex flex-col gap-y-2 justify-between lg:flex-row lg:items-center lg:gap-y-0">
        <p className="text-2xl font-medium">Curated for you</p>
        <ProductSort />
      </div>
      <div className="grid grid-cols-1 gap-y-6 gap-x-12 lg:grid-cols-6 xl:grid-cols-8">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
            <ProductList
              category={category}
              tenantSlug={tenantSlug}
              narrowView={narrowView}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
