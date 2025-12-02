import { JSX } from "react";

import { Button, Link } from "@payloadcms/ui";

/**
 * Stripe Verify Component
 * @description This component is used to verify the stripe checkout session
 * @returns {JSX.Element} Stripe Verify Component
 */
const StripeVerify = (): JSX.Element => {
  return (
    <Link href="/stripe-verify">
      <Button>Verify account</Button>
    </Link>
  );
};

export default StripeVerify;
