/**
 * Render a page displaying the current category route segment.
 *
 * @param params - Object of route parameters; `params.category` is the URL segment for the category
 * @returns A JSX element containing "Category: " followed by the `category` value
 */
export default async function Category({ params }: PageProps<"/[category]">) {
  const { category } = await params;

  return <div>Category: {category}</div>;
}