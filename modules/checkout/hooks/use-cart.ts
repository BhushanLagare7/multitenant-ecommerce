import { useCartStore } from "../store/use-cart-store";

/**
 * @description This is the useCart hook for the checkout module
 * @param {string} tenantSlug - The slug of the tenant
 * @returns {object} The cart object
 */
export const useCart = (tenantSlug: string) => {
  const {
    addProduct,
    removeProduct,
    clearCart,
    clearAllCart,
    getCartbyTenant,
  } = useCartStore();

  const productIds = getCartbyTenant(tenantSlug);

  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(tenantSlug, productId);
    } else {
      addProduct(tenantSlug, productId);
    }
  };

  const isProductInCart = (productId: string) => productIds.includes(productId);

  const clearTenantCart = () => clearCart(tenantSlug);

  return {
    productIds,
    addProduct: (productId: string) => addProduct(tenantSlug, productId),
    removeProduct: (productId: string) => removeProduct(tenantSlug, productId),
    clearCart: clearTenantCart,
    clearAllCart,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
