import PRODUCTS from "./json/products.json";
import essentialImg from "./assets/hero-essential.png";
import carrierImg from "./assets/hero-carrier.png";
import mintImg from "./assets/hero-mint.png";

const CATEGORY_IMAGES = [essentialImg, carrierImg, mintImg];

export function getCategoryImage(categoryIndex) {
  return CATEGORY_IMAGES[categoryIndex % CATEGORY_IMAGES.length];
}

// "#/product/c2-5" -> category 2, product at position 5 in that category.
export function productPath(categoryIndex, product) {
  const items = PRODUCTS[categoryIndex]?.items || [];
  const itemIndex = Math.max(0, items.indexOf(product));
  return `#/product/c${categoryIndex}-${itemIndex}`;
}

export function findProduct(id) {
  const m = /^c(\d+)-(.+)$/.exec(id || "");
  if (!m) return null;
  const categoryIndex = Number(m[1]);
  const category = PRODUCTS[categoryIndex];
  if (!category) return null;

  const raw = decodeURIComponent(m[2]);
  const product =
    category.items[Number(raw)] ||
    category.items.find((p) => String(p.num) === raw);

  return product ? { category, categoryIndex, product } : null;
}