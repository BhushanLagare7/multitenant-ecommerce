/**
 * Render a page showing the category and subcategory extracted from the route parameters.
 *
 * @param params - An object with `category` and `subcategory` URL segments from the current route.
 * @returns A React element displaying "Category: {category}, Subcategory: {subcategory}".
 */
export default async function Subcategory({
  params,
}: PageProps<"/[category]/[subcategory]">) {
  const { category, subcategory } = await params;

  return (
    <div>
      Category: {category}, Subcategory: {subcategory}
    </div>
  );
}