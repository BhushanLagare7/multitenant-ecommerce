import { cache } from "react";
import { headers as getHeaders } from "next/headers";

import { getPayload } from "payload";
import superjson from "superjson";
import configPromise from "@payload-config";
import { initTRPC, TRPCError } from "@trpc/server";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ next, ctx }) => {
  const payload = await getPayload({
    config: configPromise,
  });

  return next({ ctx: { ...ctx, db: payload } });
});
// Protected procedure
export const protectedProcedure = baseProcedure.use(async ({ next, ctx }) => {
  const headers = await getHeaders();
  const session = await ctx.db.auth({ headers });

  if (!session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  return next({ ctx: { ...ctx, session: { ...session, user: session.user } } });
});
