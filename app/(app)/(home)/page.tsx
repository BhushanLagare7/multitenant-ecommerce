import { getPayload } from "payload";
import configPromise from "@payload-config";

/**
 * Fetches the "categories" collection from Payload and renders it as formatted JSON inside a div.
 *
 * @returns A JSX element containing the formatted JSON representation of the fetched categories
 */
export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const categories = await payload.find({
    collection: "categories",
  });

  return <div>{JSON.stringify(categories, null, 2)}</div>;
}