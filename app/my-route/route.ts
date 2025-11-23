import { getPayload } from "payload";
import configPromise from "@payload-config";

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
  });

  return Response.json(data);
};
