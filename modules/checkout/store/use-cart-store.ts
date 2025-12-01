import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TenantCart {
  productId: string[];
}

interface CartState {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCart: () => void;
}
/**
 * @description Cart store for managing tenant-specific shopping carts with localStorage persistence.
 * Supports multi-tenant cart management where each tenant maintains their own product list.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      tenantCarts: {},
      /**
       * @description This is the add product to cart function
       * @param {string} tenantSlug - The slug of the tenant
       * @param {string} productId - The id of the product
       * @returns {void}
       */
      addProduct: (tenantSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productId: [
                ...(state.tenantCarts[tenantSlug]?.productId || []),
                productId,
              ],
            },
          },
        })),
      /**
       * @description This is the remove product from cart function
       * @param {string} tenantSlug - The slug of the tenant
       * @param {string} productId - The id of the product
       * @returns {void}
       */
      removeProduct: (tenantSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productId:
                state.tenantCarts[tenantSlug]?.productId?.filter(
                  (id) => id !== productId
                ) || [],
            },
          },
        })),
      /**
       * @description This is the clear cart function
       * @param {string} tenantSlug - The slug of the tenant
       * @returns {void}
       */
      clearCart: (tenantSlug) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productId: [],
            },
          },
        })),
      /**
       * @description This is the clear all cart function
       * @returns {void}
       */
      clearAllCart: () =>
        set({
          tenantCarts: {},
        }),
    }),
    {
      name: "funroad-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
