import { allProducts, categoryPath } from "../data/catalogue";
import ProductListItem from "./ProductListItem";
import Icon from "./Icon";
export default function RelatedProducts({ product }) {
  const related = allProducts
    .filter(
      (p) => p.categoryIndex === product.categoryIndex && p.id !== product.id,
    )
    .slice(0, 3);
  return (
    <section className="product-related">
      <div className="listing-heading">
        <div>
          <span className="eyebrow">CONTINUE EXPLORING</span>
          <h2>More from {product.category}</h2>
        </div>
        <a className="text-link" href={categoryPath(product.category)}>
          View collection <Icon name="arrow" />
        </a>
      </div>
      <div className="product-list related-product-list">
        {related.map((p) => (
          <ProductListItem key={p.id} product={p} heading="h3" />
        ))}
      </div>
    </section>
  );
}
