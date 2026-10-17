import { useEffect, useMemo, useState } from "react";
import Reveal from "../Reveal";
import PRODUCTS from "../json/products.json";
import { getCategoryImage, productPath } from "../productUtils";

const PAGE_SIZE_DESKTOP = 10;
const PAGE_SIZE_MOBILE = 5;
const MOBILE_BREAKPOINT = 720;

function usePageSize() {
  const [pageSize, setPageSize] = useState(
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT
      ? PAGE_SIZE_MOBILE
      : PAGE_SIZE_DESKTOP
  );

  useEffect(() => {
    function handleResize() {
      setPageSize(window.innerWidth <= MOBILE_BREAKPOINT ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
}

function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const measured = parseFloat(raw);
  if (!Number.isNaN(measured) && measured > 0) return measured + 12;
  return window.innerWidth <= 720 ? 90 : 110;
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(PRODUCTS[0].category);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const pageSize = usePageSize();

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  // Header dropdown / footer links dispatch this event to pick a category.
  useEffect(() => {
    function handleExternalSelect(e) {
      selectCategory(e.detail);
    }
    window.addEventListener("select-product-category", handleExternalSelect);
    return () => window.removeEventListener("select-product-category", handleExternalSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.map((c) => ({
      ...c,
      filteredItems: q
        ? c.items.filter((p) => p.title.toLowerCase().includes(q))
        : c.items,
    }));
  }, [query]);

  const activeCategoryIndex = PRODUCTS.findIndex((c) => c.category === activeCategory);
  const category = filteredCategories.find((c) => c.category === activeCategory);
  const categoryImage = getCategoryImage(activeCategoryIndex);
  const totalPages = Math.max(1, Math.ceil(category.filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = category.filteredItems.slice(start, start + pageSize);

  function selectCategory(cat) {
    setActiveCategory(cat);
    setPage(1);

    requestAnimationFrame(() => {
      const target = document.getElementById("product-list");
      if (!target) return;
      const headerOffset = getHeaderOffset();
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    });
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setQuery(value);
    setPage(1);

    const q = value.trim().toLowerCase();
    if (q) {
      const activeHasMatch = PRODUCTS
        .find((c) => c.category === activeCategory)
        .items.some((p) => p.title.toLowerCase().includes(q));
      if (!activeHasMatch) {
        const firstMatch = PRODUCTS.find((c) =>
          c.items.some((p) => p.title.toLowerCase().includes(q))
        );
        if (firstMatch) setActiveCategory(firstMatch.category);
      }
    }
  }

  function goToPage(n) {
    setPage(n);
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

        <div id="product-list" className="product-list-block">
          <div className="product-toolbar">
            <div className="product-tabs" role="tablist" aria-label="Product categories">
              {filteredCategories.map((c) => (
                <button
                  key={c.category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === c.category}
                  className={`product-tab ${activeCategory === c.category ? "active" : ""} ${
                    query && c.filteredItems.length === 0 ? "empty" : ""
                  }`}
                  onClick={() => selectCategory(c.category)}
                  disabled={query.length > 0 && c.filteredItems.length === 0}
                >
                  {c.category}
                  <span className="product-tab-count">{c.filteredItems.length}</span>
                </button>
              ))}
            </div>

            <div className="search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Search all products..."
                value={query}
                onChange={handleSearchChange}
                aria-label="Search products across all categories"
              />
              {query && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => { setQuery(""); setPage(1); }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {pageItems.length > 0 ? (
            <Reveal className="products-grid" key={activeCategory + safePage + query}>
             {pageItems.map((p) => {
  const path = productPath(activeCategoryIndex, p);
  return (
    <div
      className="product-card product-card-clickable"
      key={`${activeCategoryIndex}-${p.num}-${p.title}`}
      onClick={() => { window.location.hash = path; }}
    >
      {p.badge && <span className="featured-badge">{p.badge}</span>}

      <a className="product-thumb-link" href={path}>
        <div className="product-thumb-wrap">
          <img
            className="product-thumb"
            src={categoryImage}
            alt={`${p.title} — ${category.category}`}
            loading="lazy"
          />
        </div>
      </a>

      <h3>{p.title}</h3>
      <p>{p.desc || category.desc}</p>
      <a className="product-link" href={path}>View details →</a>
    </div>
  );
})}
            </Reveal>
          ) : (
            <p className="no-results">
              {query
                ? `No products match "${query}" in any category.`
                : `No products in ${category.category}.`}
            </p>
          )}

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Product pages">
              <button
                type="button"
                className="page-btn nav"
                onClick={() => goToPage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`page-btn ${safePage === n ? "active" : ""}`}
                  aria-current={safePage === n ? "page" : undefined}
                  onClick={() => goToPage(n)}
                >
                  <span>{String(n)}</span>
                </button>
              ))}

              <button
                type="button"
                className="page-btn nav"
                onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}