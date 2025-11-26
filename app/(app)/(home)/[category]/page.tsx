export default async function Category({ params }: PageProps<"/[category]">) {
  const { category } = await params;

  return <div>Category: {category}</div>;
}
