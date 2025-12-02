import { headers as getHeaders } from "next/headers";

import { TRPCError } from "@trpc/server";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { stripe } from "@/lib/stripe";

import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

/**
 * @description Router for authentication procedures.
 * @type {TRPCRouter}
 * @property {function} session - Procedure to get the current session.
 * @property {function} register - Procedure to register a new user.
 * @property {function} login - Procedure to login an existing user.
 */
export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });

    return session;
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password, username } = input;

      const existingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: { username: { equals: username } },
      });

      const existingUser = existingData.docs[0];

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exists",
        });
      }

      const account = await stripe.accounts.create({});

      if (!account) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create Stripe account",
        });
      }

      const tenant = await ctx.db.create({
        collection: "tenants",
        data: {
          name: input.username,
          slug: input.username,
          stripeAccountId: account.id,
        },
      });

      await ctx.db.create({
        collection: "users",
        data: { email, password, username, tenants: [{ tenant: tenant.id }] },
      });

      const data = await ctx.db.login({
        collection: "users",
        data: { email, password },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      await generateAuthCookie({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });
    }),
  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;

    const data = await ctx.db.login({
      collection: "users",
      data: { email, password },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }

    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    });

    return data;
  }),
});
