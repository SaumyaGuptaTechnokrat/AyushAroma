import { useEffect, useState } from "react";
import { getCategoryImage, findProduct, productPath } from "../productUtils";
import essentialImg from "../assets/hero-essential.png";
import carrierImg from "../assets/hero-carrier.png";
import mintImg from "../assets/hero-mint.png";

const HIGHLIGHTS = [
  {
    label: "GMP & HACCP Certified",
    icon: <path d="M12 2l8 3.6v5.4c0 5-3.4 8.9-8 10-4.6-1.1-8-5-8-10V5.6L12 2zM8.5 12l2.4 2.4L15.5 9.6" />,
  },
  {
    label: "COA & MSDS Included",
    icon: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6" />,
  },
  {
    label: "Bulk & Private Label",
    icon: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" />,
  },
  {
    label: "Shipped to 110+ Countries",
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 3 4.5 6.5 4.5 10S15 19 12 22c-3-3-4.5-6.5-4.5-10S9 5 12 2z" />,
  },
];

const APPLICATIONS = ["Pharmaceutical", "Cosmetic & Personal Care", "Food & Flavor", "Fragrance", "Aromatherapy"];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "specs", label: "Specifications" },
  { id: "shipping", label: "Shipping & Documents" },
];

export default function ProductDetail({ id, companyName = "Ayush Aromatics" }) {
  const found = findProduct(id);

  const [tab, setTab] = useState("overview");
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("kg");
  const [country, setCountry] = useState("");
  const [copied, setCopied] = useState(false);

  // Reset the page state whenever a different product is opened.
  useEffect(() => {
    setTab("overview");
    setActiveImg(0);
    setQty("");
    setCountry("");
  }, [id]);

  // Per-product browser tab title.
  useEffect(() => {
    if (!found) return;
    const prev = document.title;
    document.title = `${found.product.title} | ${companyName}`;
    return () => { document.title = prev; };
  }, [found, companyName]);

  if (!found) {
    return (
      <section className="pd-section">
        <div className="wrap pd-missing">
          <h1>Product not found</h1>
          <p>This product may have been moved or renamed.</p>
          <a className="pd-btn pd-btn-primary" href="#products">← Back to Products</a>
        </div>
      </section>
    );
  }

  const { category, categoryIndex, product } = found;
  const items = category.items;
  const idx = items.indexOf(product);
  const prev = idx > 0 ? items[idx - 1] : null;
  const next = idx < items.length - 1 ? items[idx + 1] : null;
  const related = items.filter((p) => p !== product).slice(0, 3);

  const mainImg = getCategoryImage(categoryIndex);
  const gallery = [mainImg, ...[essentialImg, carrierImg, mintImg].filter((i) => i !== mainImg)];
  const description = product.desc || category.desc;

  const phoneDigits = (import.meta.env.VITE_CONTACT_NUMBER || "").replace(/[^\d]/g, "");
  const email = import.meta.env.VITE_CONTACT_EMAIL;

  const message = [
    `Hello ${companyName}, I'd like a quote.`,
    "",
    `Product: ${product.title} (${category.category})`,
    qty && `Quantity: ${qty} ${unit}`,
    country && `Destination: ${country}`,
  ].filter(Boolean).join("\n");

  function handleQuote(e) {
    e.preventDefault();
    if (!phoneDigits) {
      window.location.hash = "contact";
      return;
    }
    window.open(`https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* user cancelled share */ }
  }

  function scrollToQuote() {
    document.getElementById("pd-quote")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function onZoomMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      on: true,
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  const specs = [
    ["Category", category.category],
    ["Product", product.title],
    ["Grade", "Pharma / Cosmetic / Food (as per requirement)"],
    ["Packaging", "Bulk drums, retail bottles or private label"],
    ["Minimum order", "From 1 kg for trial orders"],
    ["Documentation", "COA, MSDS and export documents"],
    ["Manufacturing", "GMP & HACCP-qualified plant, India"],
  ];

  return (
    <section className="pd-section">
      <div className="wrap">
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <a href="#">Home</a><span>/</span>
          <a href="#products">Products</a><span>/</span>
          <span>{category.category}</span><span>/</span>
          <span className="pd-crumb-current">{product.title}</span>
        </nav>

        <div className="pd-grid">
          {/* ---------- Gallery ---------- */}
          <div className="pd-gallery">
            <div
              className="pd-media"
              onMouseMove={onZoomMove}
              onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
            >
              <img
                src={gallery[activeImg]}
                alt={`${product.title} — ${category.category}`}
                style={{
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                  transform: zoom.on ? "scale(1.6)" : "scale(1)",
                }}
              />
              {product.badge && <span className="pd-media-badge">{product.badge}</span>}
            </div>

            <div className="pd-thumbs">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pd-thumb ${activeImg === i ? "active" : ""}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* ---------- Info ---------- */}
          <div className="pd-info">
            <div className="pd-topline">
              <span className="pd-cat-chip">{category.category}</span>
              <button type="button" className="pd-share" onClick={handleShare}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                </svg>
                {copied ? "Link copied!" : "Share"}
              </button>
            </div>

            <h1>{product.title}</h1>
            <p className="pd-lead">{description}</p>

            <ul className="pd-highlights">
              {HIGHLIGHTS.map((h) => (
                <li key={h.label}>
                  <span className="pd-hl-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {h.icon}
                    </svg>
                  </span>
                  {h.label}
                </li>
              ))}
            </ul>

            {/* Quick quote card */}
            <form className="pd-quote" id="pd-quote" onSubmit={handleQuote}>
              <h3>Get a quick quote</h3>
              <p>Tell us how much you need. We reply within one business day.</p>

              <div className="pd-quote-row">
                <label className="pd-field pd-field-qty">
                  <span>Quantity</span>
                  <div className="pd-qty">
                    <input
                      type="number"
                      min="1"
                      required
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="e.g. 100"
                    />
                    <select value={unit} onChange={(e) => setUnit(e.target.value)} aria-label="Unit">
                      <option value="kg">kg</option>
                      <option value="litres">litres</option>
                      <option value="MT">MT</option>
                    </select>
                  </div>
                </label>

                <label className="pd-field">
                  <span>Destination country</span>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. United States"
                  />
                </label>
              </div>

              <button type="submit" className="pd-btn pd-btn-primary pd-btn-block">
                Get Quote on WhatsApp
              </button>

              {email && (
                <a
                  className="pd-link"
                  href={`mailto:${email}?subject=${encodeURIComponent(`Quote request: ${product.title}`)}&body=${encodeURIComponent(message)}`}
                >
                  or send the request by email →
                </a>
              )}
            </form>
          </div>
        </div>

        {/* ---------- Tabs ---------- */}
        <div className="pd-tabs-block">
          <div className="pd-tabs" role="tablist" aria-label="Product information">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`pd-tab ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="pd-tab-panel" role="tabpanel" key={tab}>
            {tab === "overview" && (
              <div className="pd-overview">
                <p>
                  {description} Every batch of {product.title} is produced under GMP and HACCP-controlled
                  conditions, tested before dispatch and shipped with full documentation, so it is ready for
                  regulated pharma, cosmetic and food applications.
                </p>
                <h4>Typical applications</h4>
                <div className="pd-chips">
                  {APPLICATIONS.map((a) => <span key={a}>{a}</span>)}
                </div>
              </div>
            )}

            {tab === "specs" && (
              <dl className="pd-specs">
                {specs.map(([k, v]) => (
                  <div className="pd-spec-row" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tab === "shipping" && (
              <ul className="pd-checklist">
                <li>Certificate of Analysis (COA) with every shipment</li>
                <li>Material Safety Data Sheet (MSDS) on request</li>
                <li>Export documentation and customs clearance handled in-house</li>
                <li>Sample available on request, trial orders from 1 kg</li>
                <li>Bulk drums, retail bottles and private-label packaging</li>
                <li>Delivery to 110+ countries worldwide</li>
              </ul>
            )}
          </div>
        </div>

        {/* ---------- Prev / Next ---------- */}
        {(prev || next) && (
          <div className="pd-prevnext">
            {prev ? (
              <a href={productPath(categoryIndex, prev)} className="pd-pn pd-pn-prev">
                <small>← Previous</small>
                <strong>{prev.title}</strong>
              </a>
            ) : <span />}
            {next ? (
              <a href={productPath(categoryIndex, next)} className="pd-pn pd-pn-next">
                <small>Next →</small>
                <strong>{next.title}</strong>
              </a>
            ) : <span />}
          </div>
        )}

        {/* ---------- Related ---------- */}
        {related.length > 0 && (
          <div className="pd-related">
            <div className="pd-related-head">
              <h2>More from {category.category}</h2>
              <a className="pd-link" href="#products">View all products →</a>
            </div>
            <div className="pd-related-grid">
              {related.map((p) => (
                <a className="pd-related-card" key={`${p.num}-${p.title}`} href={productPath(categoryIndex, p)}>
                  <div className="pd-related-img">
                    <img src={mainImg} alt="" loading="lazy" />
                  </div>
                  <h3>{p.title}</h3>
                  <span>View details →</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="pd-sticky-cta">
        <div className="pd-sticky-text">
          <strong>{product.title}</strong>
          <small>{category.category}</small>
        </div>
        <button type="button" className="pd-btn pd-btn-primary" onClick={scrollToQuote}>
          Get Quote
        </button>
      </div>
    </section>
  );
}