import { useState } from "react";
import Reveal from "../Reveal";
import PRODUCTS from "../json/products.json";

const PAGE_SIZE = 10;

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(PRODUCTS[0].category);
  const [page, setPage] = useState(1);

  const category = PRODUCTS.find((c) => c.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(category.items.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = category.items.slice(start, start + PAGE_SIZE);

  function selectCategory(cat) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <section id="products">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">What We Offer</span>
          <h2>A complete range for pharma, cosmetic &amp; food manufacturers.</h2>
          <p className="section-lead">
            From menthol crystals to cold-pressed carrier oils — every product ships with full documentation,
            in bulk, retail or private-label packaging.
          </p>
        </Reveal>

        <Reveal className="product-tabs" role="tablist" aria-label="Product categories">
          {PRODUCTS.map((c) => (
            <button
              key={c.category}
              role="tab"
              aria-selected={activeCategory === c.category}
              className={`product-tab ${activeCategory === c.category ? "active" : ""}`}
              onClick={() => selectCategory(c.category)}
            >
              {c.category}
              <span className="product-tab-count">{c.items.length}</span>
            </button>
          ))}
        </Reveal>

        <Reveal className="products-grid" key={activeCategory + page}>
          {pageItems.map((p) => (
            <div className="product-card" key={p.num}>
              {p.badge && <span className="featured-badge">{p.badge}</span>}
              <span className="pnum">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{category.desc}</p>
              <span className="tagline">{category.tag}</span>
            </div>
          ))}
        </Reveal>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn nav"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`page-btn ${page === n ? "active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}

            <button
              className="page-btn nav"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}