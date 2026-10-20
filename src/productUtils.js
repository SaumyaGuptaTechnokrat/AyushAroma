import PRODUCTS from "./json/products.json";
import { categories } from "./data/catalogue";
export function getCategoryImage(categoryIndex) {
  return categories[categoryIndex]?.image || categories[0].image;
}
export function productPath(categoryIndex, product) {
  return `#/product/c${categoryIndex}-${Math.max(0, (PRODUCTS[categoryIndex]?.items || []).indexOf(product))}`;
}
export function findProduct(id) {
  const match = /^c(\d+)-(.+)$/.exec(id || "");
  if (!match) return null;
  const categoryIndex = Number(match[1]);
  const category = PRODUCTS[categoryIndex];
  if (!category) return null;
  let raw;
  try {
    raw = decodeURIComponent(match[2]);
  } catch {
    return null;
  }
  const product =
    category.items[Number(raw)] ||
    category.items.find((p) => String(p.num) === raw);
  return product ? { category, categoryIndex, product } : null;
}
