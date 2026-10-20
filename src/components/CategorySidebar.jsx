import { useEffect, useState } from "react";
import { categories, allProducts, categoryPath } from "../data/catalogue";
import { phoneHref, business } from "../config/business";
import Icon from "./Icon";
function CategoryGroup({ category, currentCategory, currentProduct }) {
  const [expanded, setExpanded] = useState(
    currentCategory?.slug === category.slug,
  );
  const selected = currentCategory?.slug === category.slug;
  const products = allProducts.filter(
    (p) => p.categoryIndex === category.index,
  );
  return (
    <li className={selected ? "sidebar-group selected" : "sidebar-group"}>
      <div className="sidebar-category-row">
        <a
          href={categoryPath(category)}
          aria-current={
            selected && !currentProduct
              ? "page"
              : selected
                ? "location"
                : undefined
          }
        >
          {category.category}
          <span>{products.length}</span>
        </a>
        <button
          type="button"
          aria-label={`${expanded ? "Collapse" : "Expand"} ${category.category}`}
          aria-expanded={expanded}
          aria-controls={`sidebar-${category.slug}`}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon name="down" />
        </button>
      </div>
      {expanded && (
        <div
          className="sidebar-category-content"
          id={`sidebar-${category.slug}`}
        >
          <p>IN THIS COLLECTION</p>
          {category.subcategories.length > 0 &&
            category.subcategories.map((sub) => (
              <a key={sub.slug} href={sub.path}>
                {sub.title}
              </a>
            ))}
          <ul>
            {products.slice(0, 5).map((p) => (
              <li key={p.id}>
                <a
                  href={p.path}
                  aria-current={
                    currentProduct?.id === p.id ? "page" : undefined
                  }
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
          {currentProduct &&
            !products.slice(0, 5).some((p) => p.id === currentProduct.id) &&
            selected && (
              <a
                className="current-sidebar-product"
                href={currentProduct.path}
                aria-current="page"
              >
                {currentProduct.title}
              </a>
            )}
          <a className="sidebar-view-all" href={categoryPath(category)}>
            Browse all {products.length} products <Icon name="arrow" />
          </a>
        </div>
      )}
    </li>
  );
}
export default function CategorySidebar({ category = null, product = null }) {
  const [expanded, setExpanded] = useState(
    () => window.matchMedia("(min-width: 1000px)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1000px)");
    const update = () => setExpanded(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <aside className="category-sidebar" aria-label="Product categories">
      <div className="sidebar-inner">
        <div className="sidebar-title">
          <h2>Product categories</h2>
          <button
            className="icon-button sidebar-mobile-toggle"
            aria-expanded={expanded}
            aria-controls="category-sidebar-content"
            aria-label={`${expanded ? "Hide" : "Show"} product categories`}
            onClick={() => setExpanded(!expanded)}
          >
            <Icon name={expanded ? "close" : "down"} />
          </button>
        </div>
        <div id="category-sidebar-content" hidden={!expanded}>
          <a
            className="sidebar-all"
            href="#products"
            aria-current={!category ? "page" : undefined}
          >
            <Icon name="box" />
            All products<span>{allProducts.length}</span>
          </a>
          <ul className="sidebar-categories">
            {categories.map((c) => (
              <CategoryGroup
                key={c.slug}
                category={c}
                currentCategory={category}
                currentProduct={product}
              />
            ))}
          </ul>
          <div className="sidebar-help">
            <Icon name="chat" />
            <h3>Need help sourcing?</h3>
            <p>Talk to our team about your product specification.</p>
            <a href={phoneHref}>
              <Icon name="phone" />
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
