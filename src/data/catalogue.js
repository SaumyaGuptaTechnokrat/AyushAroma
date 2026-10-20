import PRODUCTS from "../json/products.json";
import lavender from "../assets/hero-main-640.webp";
import mint from "../assets/hero-thumb-mint-360.webp";
import carrier from "../assets/hero-thumb-carrier-360.webp";
import { categoryContent, createProductContent } from "./productContent";
const images = [mint, lavender, lavender, carrier, carrier, mint];
export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export const categories = PRODUCTS.map((c, index) => ({
  ...c,
  index,
  slug: slugify(c.category),
  image: images[index],
  subcategories: c.subcategories || [],
  content: categoryContent[index],
}));
export function categoryPath(category) {
  const entry =
    typeof category === "object"
      ? category
      : categories.find((c) => c.category === category || c.slug === category);
  return entry ? `#/products/${entry.slug}` : "#products";
}
export const allProducts = categories.flatMap((c) =>
  c.items.map((p, index) => ({
    ...p,
    id: `c${c.index}-${index}`,
    category: c.category,
    categoryIndex: c.index,
    categorySlug: c.slug,
    slug: slugify(p.title),
    image: c.image,
    content: createProductContent(p),
    legacyPath: `#/product/c${c.index}-${index}`,
    path: `#/products/${c.slug}/${slugify(p.title)}`,
  })),
);
export const popularProducts = [
  "Menthol Crystals",
  "Mentha Arvensis Oil",
  "Lavender Oil",
  "Eucalyptus Essential Oil (Globulus)",
  "Spearmint Essential Oil",
  "Almond Oil",
]
  .map((title) => allProducts.find((p) => p.title === title))
  .filter(Boolean);
export function resolveProduct(id) {
  const exact = allProducts.find((p) => p.id === id || p.path === `#${id}`);
  if (exact) return exact;
  const match = /^c(\d+)-(.+)$/.exec(id || "");
  if (!match) return null;
  let code;
  try {
    code = decodeURIComponent(match[2]);
  } catch {
    return null;
  }
  return (
    allProducts.find(
      (p) => p.categoryIndex === Number(match[1]) && p.num === code,
    ) || null
  );
}
export function resolveBrowseRoute(key, query = "") {
  if (key === "products") {
    const name = new URLSearchParams(query).get("category");
    return {
      type: "listing",
      category: categories.find((c) => c.category === name) || null,
    };
  }
  if (key.startsWith("/product/"))
    return { type: "product", product: resolveProduct(key.slice(9)) };
  if (key === "/products") return { type: "listing", category: null };
  if (key.startsWith("/products/")) {
    const parts = key.split("/").filter(Boolean);
    const category = categories.find((c) => c.slug === parts[1]);
    if (parts.length === 2)
      return category ? { type: "listing", category } : { type: "missing" };
    if (parts.length === 3)
      return {
        type: "product",
        product:
          allProducts.find(
            (p) => p.categorySlug === parts[1] && p.slug === parts[2],
          ) || null,
      };
    return { type: "missing" };
  }
  return null;
}
