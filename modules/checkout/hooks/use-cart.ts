import { useCallback } from "react";

import { useShallow } from "zustand/react/shallow";

import { useCartStore } from "../store/use-cart-store";

/**
 * @description This is the useCart hook for the checkout module
 * @param {string} tenantSlug - The slug of the tenant
 * @returns {object} The cart object
 */
export const useCart = (tenantSlug: string) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAllCart = useCartStore((state) => state.clearAllCart);

  const productIds = useCartStore(
    useShallow((state) => state.tenantCarts[tenantSlug]?.productId || [])
  );

  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantSlug, productId);
      } else {
        addProduct(tenantSlug, productId);
      }
    },
    [productIds, addProduct, removeProduct, tenantSlug]
  );

  const isProductInCart = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds]
  );

  const clearTenantCart = useCallback(
    () => clearCart(tenantSlug),
    [clearCart, tenantSlug]
  );

  const handleAddProduct = useCallback(
    (productId: string) => addProduct(tenantSlug, productId),
    [addProduct, tenantSlug]
  );

  const handleRemoveProduct = useCallback(
    (productId: string) => removeProduct(tenantSlug, productId),
    [removeProduct, tenantSlug]
  );

  return {
    productIds,
    addProduct: handleAddProduct,
    removeProduct: handleRemoveProduct,
    clearCart: clearTenantCart,
    clearAllCart,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
