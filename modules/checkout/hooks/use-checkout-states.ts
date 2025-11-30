import { parseAsBoolean, useQueryStates } from "nuqs";

/**
 * @description Use checkout states
 * @returns {Object} The checkout states.
 */
export const useCheckoutStates = () => {
  return useQueryStates({
    success: parseAsBoolean
      .withDefault(false)
      .withOptions({ clearOnDefault: true }),
    cancel: parseAsBoolean
      .withDefault(false)
      .withOptions({ clearOnDefault: true }),
  });
};
