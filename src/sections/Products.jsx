import { useEffect, useMemo, useState } from "react";
import Reveal from "../Reveal";
import PRODUCTS from "../json/products.json";

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

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(PRODUCTS[0].category);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const pageSize = usePageSize();

  // Reset to page 1 whenever the page size changes (e.g. device rotation
  // or resizing across the mobile breakpoint) so we never land on a page
  // index that no longer exists for the new page size.
  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  // Filter every category against the same search query, independent of
  // which tab is active. This is what lets each tab's count badge reflect
  // real matches instead of the raw, unfiltered item count.
  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.map((c) => ({
      ...c,
      filteredItems: q
        ? c.items.filter((p) => p.title.toLowerCase().includes(q))
        : c.items,
    }));
  }, [query]);

  const category = filteredCategories.find((c) => c.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(category.filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = category.filteredItems.slice(start, start + pageSize);

  function selectCategory(cat) {
    setActiveCategory(cat);
    setPage(1);

    // requestAnimationFrame ensures this runs after React has committed the
    // DOM update, which is what makes this reliable on mobile — calling
    // scrollIntoView synchronously in the same tick can silently no-op on
    // some mobile browsers (notably iOS Safari and some Android WebViews).
    requestAnimationFrame(() => {
      const target = document.getElementById("product-list");
      if (!target) return;

      // Manual offset calculation instead of scrollIntoView: this accounts
      // for the fixed header height explicitly, rather than relying on
      // scroll-margin-top, which some mobile browsers apply inconsistently
      // when the element is already partially visible.
      const headerOffset = window.innerWidth <= 720 ? 90 : 110;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    });
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setQuery(value);
    setPage(1);

    // If the active category has zero matches for the new query but another
    // category does, auto-jump to the first category that has results, so
    // the user isn't stuck staring at an empty grid.
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

        {/* Category overview cards */}
        <Reveal className="products-grid category-overview">
          {PRODUCTS.map((c, i) => (
            <button
              key={c.category}
              className={`product-card category-card ${activeCategory === c.category ? "active" : ""}`}
              onClick={() => selectCategory(c.category)}
              type="button"
            >
              {c.badge && <span className="featured-badge">{c.badge}</span>}
              <span className="pnum">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.category}</h3>
              <p>{c.desc}</p>
              <span className="tagline">{c.tag}</span>
            </button>
          ))}
        </Reveal>

        {/* Search + tabs + paginated list */}
        <div id="product-list" className="product-list-block">
          <div className="product-toolbar">
            <div className="product-tabs" role="tablist" aria-label="Product categories">
              {filteredCategories.map((c) => (
                <button
                  key={c.category}
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
                  className="search-clear"
                  onClick={() => { setQuery(""); setPage(1); }}
                  aria-label="Clear search"
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {pageItems.length > 0 ? (
            <Reveal className="products-grid" key={activeCategory + safePage + query}>
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
          ) : (
            <p className="no-results">
              {query
                ? `No products match "${query}" in any category.`
                : `No products in ${category.category}.`}
            </p>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn nav"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`page-btn ${safePage === n ? "active" : ""}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}

              <button
                className="page-btn nav"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}