import { getPayload } from "payload";
import configPromise from "@payload-config";

/**
 * Renders a padded page section containing a vertical stack of demo UI controls.
 *
 * The section displays an elevated Button, an Input, a Progress bar set to 50, a Textarea, and a Checkbox arranged with vertical spacing.
 *
 * @returns The root JSX element containing the demo controls
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
