import { JSX } from "react";

import { CircleXIcon } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import { Button } from "@/components/ui/button";

/**
 * CheckoutSidebarProps
 * @description Props for the checkout sidebar component
 * @param {number} total - The total price of the checkout
 * @param {function} onPurchase - The function to call when the purchase button is clicked
 * @param {boolean} isCancelled - Whether the checkout was cancelled
 * @param {boolean} disabled - Whether the checkout is disabled
 */
interface CheckoutSidebarProps {
  total: number;
  onPurchase: () => void;
  isCancelled?: boolean;
  disabled?: boolean;
}

/**
 * @description Displays a checkout summary sidebar with the total amount and a checkout button. Shows an error message when the checkout is cancelled.
 * @param {CheckoutSidebarProps} props - The props for the checkout sidebar
 * @returns {JSX.Element} A React element representing the checkout sidebar
 */
export const CheckoutSidebar = ({
  total,
  onPurchase,
  isCancelled,
  disabled,
}: CheckoutSidebarProps): JSX.Element => {
  return (
    <div className="flex overflow-hidden flex-col bg-white rounded-md border">
      <div className="flex justify-between items-center p-4 border-b">
        <h4 className="text-lg font-medium">Total</h4>
        <p className="text-lg font-medium">{formatCurrency(total)}</p>
      </div>
      <div className="flex justify-center items-center p-4">
        <Button
          variant="elevated"
          onClick={onPurchase}
          disabled={disabled}
          size="lg"
          className="w-full text-base text-white bg-primary hover:bg-pink-400 hover:text-primary"
        >
          Checkout
        </Button>
      </div>
      {isCancelled && (
        <div className="flex justify-center items-center p-4 border-t">
          <div className="flex items-center px-4 py-3 w-full font-medium bg-red-100 rounded border border-red-400">
            <div className="flex items-center">
              <CircleXIcon className="mr-2 text-red-100 size-6 fill-red-500" />
              <span>Checkout failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
