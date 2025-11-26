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
