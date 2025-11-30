import { NextResponse } from "next/server";

import { getPayload } from "payload";
import type Stripe from "stripe";
import config from "@payload-config";

import { stripe } from "@/lib/stripe";

import { ExpandedLineItem } from "@/modules/checkout/types";

/**
 * @description Webhook handler for Stripe webhooks.
 * @param {Request} req - The request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function POST(req: Request): Promise<NextResponse> {
  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (error! instanceof Error) {
      console.error(error);
    }

    console.error(`❌ Webhook Error: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log(`✅ Success: ${event.id}`);

  // Permitted events
  const permittedEvents: string[] = ["checkout.session.completed"];

  const payload = await getPayload({ config });

  if (permittedEvents.includes(event.type)) {
    let data;
    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;

          if (!data.metadata?.userId) {
            throw new Error("User ID is required");
          }

          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          if (!user) {
            throw new Error("User not found");
          }

          // Get expanded session
          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            { expand: ["line_items.data.price.product"] }
          );

          if (
            !expandedSession?.line_items?.data ||
            !expandedSession.line_items.data.length
          ) {
            throw new Error("No line items found");
          }

          const lineItems = expandedSession.line_items
            .data as ExpandedLineItem[];

          // Create order for each line item
          for (const lineItem of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                user: user.id,
                product: lineItem.price.product.metadata.id,
                name: lineItem.price.product.name,
              },
            });
          }

          break;
        default:
          throw new Error(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: `Webhook handler failed: ${error}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
