import {
  createLoader,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

/**
 * Sort values
 */
export const sortValues = ["curated", "trending", "hot_and_new"] as const;

/**
 * Product filters loader params
 */
const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: true })
    .withDefault([]),
};

/**
 * Product filters loader
 * @description A loader that loads the product filters.
 * @returns The product filters loader
 */
export const loadProductFilters = createLoader(params);
