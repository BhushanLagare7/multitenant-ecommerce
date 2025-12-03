import type Stripe from "stripe";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { PLATFORM_FEE_PERCENTAGE } from "@/constants";
import { Media, Tenant } from "@/payload-types";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

import { stripe } from "@/lib/stripe";

import { CheckoutMetadata, ProductMetadata } from "../types";

/**
 * @description A router that handles the checkout.
 * @function checkoutRouter
 * @returns {object} An object containing procedures for checkout
 */
export const checkoutRouter = createTRPCRouter({
  /**
   * @description A procedure that verifies the stripe account.
   * @param {object} ctx - The context object
   * @returns {object} An object containing the URL of the verification link
   */
  verify: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.findByID({
      collection: "users",
      id: ctx.session.user.id,
      depth: 0, // user.tenants[0].tenant is going to be a string (tenant ID)
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    // This is an id beacause of depth: 0
    const tenantId = user.tenants?.[0]?.tenant as string;
    const tenant = await ctx.db.findByID({
      collection: "tenants",
      id: tenantId,
    });

    if (!tenant) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tenant not found",
      });
    }

    const accoutnLink = await stripe.accountLinks.create({
      account: tenant.stripeAccountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin`,
      type: "account_onboarding",
    });

    if (!accoutnLink.url) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to create verification link",
      });
    }

    return {
      url: accoutnLink.url,
    };
  }),
  /**
   * @description A procedure that purchases a product.
   * @param {object} ctx - The context object
   * @param {object} input - The input object
   * @param {string[]} input.productIds - The list of product IDs
   * @param {string} input.tenantSlug - The slug of the tenant
   * @returns {object} An object containing the URL of the checkout session
   */
  purchase: protectedProcedure
    .input(
      z.object({
        productIds: z.array(z.string()).min(1),
        tenantSlug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: {
          and: [
            { id: { in: input.productIds } },
            { "tenant.slug": { equals: input.tenantSlug } },
            { isArchived: { not_equals: true } },
          ],
        },
      });

      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const tenantsData = await ctx.db.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: { slug: { equals: input.tenantSlug } },
      });

      const tenant = tenantsData.docs[0];

      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }

      if (!tenant.stripeDetailsSubmitted) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Stripe details not submitted. Tenant not allowed to sell products.",
        });
      }

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => ({
          quantity: 1,
          price_data: {
            unit_amount: product.price * 100, // Stripe handles price in cents
            currency: "usd",
            product_data: {
              name: product.name,
              metadata: {
                stripeAccountId: tenant.stripeAccountId,
                id: product.id,
                name: product.name,
                price: product.price,
              } as ProductMetadata,
            },
          },
        }));

      const totalAmount = products.docs.reduce(
        (total, item) => total + item.price * 100,
        0
      );
      const platformFeeAmount = Math.round(
        totalAmount * (PLATFORM_FEE_PERCENTAGE / 100)
      );

      const checkout = await stripe.checkout.sessions.create(
        {
          customer_email: ctx.session.user.email,
          line_items: lineItems,
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?cancel=true`,
          invoice_creation: { enabled: true },
          metadata: {
            userId: ctx.session.user.id,
          } as CheckoutMetadata,
          payment_intent_data: {
            application_fee_amount: platformFeeAmount,
          },
        },
        { stripeAccount: tenant.stripeAccountId }
      );

      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }

      return { url: checkout.url };
    }),
  /**
   * @description A procedure that returns the list of products.
   * @param {object} ctx - The context object
   * @param {object} input - The input object
   * @param {string[]} input.ids - The list of product IDs
   * @returns {object} An object containing the list of products
   */
  getProducts: baseProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: {
          and: [
            { id: { in: input.ids } },
            { isArchived: { not_equals: true } },
          ],
        },
      });

      if (products.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const totalPrice = products.docs.reduce((total, product) => {
        const price = Number(product.price);
        return total + (isNaN(price) ? 0 : price);
      }, 0);

      return {
        ...products,
        totalPrice,
        docs: products.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
