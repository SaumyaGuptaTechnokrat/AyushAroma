import { useState } from "react";
import { allProducts, categories, categoryPath } from "../data/catalogue";
import CategorySidebar from "../components/CategorySidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import PageMetadata from "../components/PageMetadata";
import Icon from "../components/Icon";
import useQuote from "../hooks/useQuote";
export default function Products({ category = null }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { openQuote } = useQuote();
  const filtered = allProducts.filter(
    (p) =>
      (!category || p.categoryIndex === category.index) &&
      `${p.title} ${p.num} ${p.content.reference?.botanicalName || ""}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / 10));
  const safePage = Math.min(page, totalPages);
  const breadcrumbs = category
    ? [{ label: category.category, href: categoryPath(category) }]
    : [];
  function paginate(next) {
    setPage(next);
    requestAnimationFrame(() =>
      document
        .getElementById("product-results")
        ?.scrollIntoView({ block: "start", behavior: "instant" }),
    );
  }
  return (
    <section className="browse-page" id="products">
      <PageMetadata
        title={
          category
            ? `${category.category} - Bulk Supply`
            : "Product Catalogue - Oils & Aromatic Ingredients"
        }
        description={
          category
            ? category.content.summary
            : "Browse 115 essential oils, mint products, carrier oils and aromatic ingredients. Request product specifications and bulk quotations from Ayush Aromatics."
        }
        breadcrumbs={breadcrumbs}
      />
      <div className="container browse-layout">
        <CategorySidebar key={category?.slug || "all"} category={category} />
        <div className="browse-main">
          <Breadcrumbs items={breadcrumbs} />
          <div
            className={`category-intro ${category ? "" : "all-products-intro"}`}
          >
            <div>
              <span className="eyebrow">INGREDIENTS FOR YOUR BUSINESS</span>
              <h1>{category?.category || "Our product catalogue"}</h1>
              <p className="category-summary">
                {category?.content.summary ||
                  "Explore essential oils, mint products and aromatic ingredients. Find the product you need, then tell us your specification and quantity."}
              </p>
              <button
                className="button"
                onClick={() => openQuote(category?.category || "")}
              >
                Request bulk quote <Icon name="arrow" />
              </button>
            </div>
            {category && (
              <figure>
                <img
                  src={category.image}
                  width="480"
                  height="360"
                  alt={`${category.category} range illustration`}
                  fetchPriority="high"
                />
                <figcaption>Collection illustration</figcaption>
              </figure>
            )}
          </div>
          {category && (
            <div className="category-editorial">
              <p>{category.content.overview}</p>
              <p>{category.content.sourcing}</p>
              <details className="category-sourcing">
                <summary>Raw materials, processing & applications</summary>
                <dl>
                  <div>
                    <dt>Materials in this collection</dt>
                    <dd>{category.content.materials}</dd>
                  </div>
                  <div>
                    <dt>Processing</dt>
                    <dd>{category.content.methods}</dd>
                  </div>
                  <div>
                    <dt>Sourcing applications</dt>
                    <dd>{category.content.applications.join(" · ")}</dd>
                  </div>
                </dl>
              </details>
            </div>
          )}
          <div className="listing-heading" id="product-results">
            <div>
              <span className="eyebrow">EXPLORE THE COLLECTION</span>
              <h2>
                {category ? "Products in this category" : "All ingredients"}
              </h2>
            </div>
            <span className="collection-count">
              {category ? category.items.length : allProducts.length} products
            </span>
          </div>
          <div className="browse-toolbar">
            <label>
              Product category
              <select
                value={category?.slug || "all"}
                onChange={(e) => {
                  window.location.hash =
                    e.target.value === "all"
                      ? "products"
                      : categoryPath(e.target.value);
                }}
              >
                <option value="all">All product categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Search {category ? "this collection" : "all products"}
              <span className="browse-search">
                <Icon name="search" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Name, botanical reference or product code"
                />
              </span>
            </label>
          </div>
          <p className="browse-result-count" aria-live="polite">
            {filtered.length
              ? `Showing ${(safePage - 1) * 10 + 1}-${Math.min(safePage * 10, filtered.length)} of ${filtered.length} products`
              : "No matching products"}
            {query && ` for "${query}"`}
          </p>
          {filtered.length > 0 ? (
            <div className="compact-product-grid">
              {filtered.slice((safePage - 1) * 10, safePage * 10).map((p) => (
                <ProductCard key={p.id} product={p} compact heading="h2" />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="search" />
              <h2>No products found.</h2>
              <p>Try another name, botanical reference or product code.</p>
              <button
                className="button"
                onClick={() => {
                  setQuery("");
                  setPage(1);
                }}
              >
                Clear search
              </button>
            </div>
          )}
          {totalPages > 1 && (
            <nav
              className="pagination browse-pagination"
              aria-label="Product listing pages"
            >
              <button
                className="icon-button"
                aria-label="Previous page"
                disabled={safePage === 1}
                onClick={() => paginate(safePage - 1)}
              >
                <Icon name="left" />
              </button>
              <span aria-live="polite">
                Page {safePage} of {totalPages}
              </span>
              <button
                className="icon-button"
                aria-label="Next page"
                disabled={safePage === totalPages}
                onClick={() => paginate(safePage + 1)}
              >
                <Icon name="arrow" />
              </button>
            </nav>
          )}
          <div className="listing-help">
            <Icon name="chat" />
            <div>
              <h2>Looking for a particular specification?</h2>
              <p>
                Share the product, required grade and quantity with our team.
              </p>
            </div>
            <button
              className="button"
              onClick={() => openQuote(category?.category || "")}
            >
              Discuss your requirements
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
