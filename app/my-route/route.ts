import { getPayload } from "payload";
import configPromise from "@payload-config";

/**
 * @description Handles GET requests for the categories route.
 * @param request - The incoming HTTP request
 * @returns A JSON response containing the categories data
 */
export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
  });

  return Response.json(data);
};
