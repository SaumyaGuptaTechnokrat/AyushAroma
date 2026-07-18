import { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file
import Reveal from "./Reveal";
import BADGES from "./json/badges.json";
import PRODUCTS from "./json/products.json";
import TESTIMONIALS from "./json/testimonial.json";

// Company name is sourced from an environment variable so it only needs to
// be set in one place (see .env -> VITE_COMPANY_NAME). Vite only exposes
// client-side env vars that are prefixed with VITE_.
export const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || "Ayush Aromatic";

/**
 * Ayush Aromatic — React conversion
 * -----------------------------------------------------------------------
 * Notes on the conversion from static HTML/CSS/JS:
 * - All <meta>, <title>, <link rel="canonical">, and JSON-LD <script> tags
 *   from the original <head> are SEO/document-level concerns and don't
 *   belong inside a React component tree. If you're using Next.js, put
 *   them in `app/head.js` / `metadata` export; for plain React, use
 *   `react-helmet-async` or set them directly on `document` in an effect.
 *   I've left the exact JSON-LD payloads at the bottom of this file
 *   (see `structuredData`) so you can drop them back in wherever your
 *   framework expects head content.
 * - All CSS is preserved as-is inside a single <style> tag scoped to this
 *   component (styled-jsx/CSS Modules would be cleaner in a real app, but
 *   this keeps the conversion 1:1 with your original stylesheet).
 * - `IntersectionObserver` reveal-on-scroll, the sticky-nav scroll class,
 *   and the mobile menu toggle are reimplemented with hooks (`useRef`,
 *   `useState`, `useEffect`) instead of direct DOM queries. The reveal
 *   logic now lives in its own `Reveal` component (see ./Reveal.jsx).
 * - The contact form's fake "submit" (which mutated button text directly)
 *   is now driven by React state.
 */

const PROCESS_STEPS = [
  { step: "01", title: "Sourcing", desc: "Raw botanicals are procured directly from growers and trusted regional traders across India, selected for peak maturity and yield." },
  { step: "02", title: "Extraction & Distillation", desc: "Steam distillation and cold-press extraction carried out in our GMP-qualified plant, using indigenously engineered machinery." },
  { step: "03", title: "Quality Testing", desc: "Each batch is checked against pharma, food and cosmetic-grade specifications before a Certificate of Analysis is issued." },
  { step: "04", title: "Documentation", desc: "COA, MSDS and other supporting quality documents are prepared and attached to every shipment for customs and regulatory review." },
  { step: "05", title: "Export", desc: "Orders are packed, cleared and shipped to more than 110 countries, including the US, UAE and South Korea." },
];



const FAQS = [
  { q: "What is the minimum order quantity for bulk essential oils?", a: "Our minimum order quantity varies by product — most oils start from 1kg for trial orders, with no upper limit for bulk export orders. Contact us with your requirement for an exact quote." },
  { q: "Do you provide a COA and MSDS with each shipment?", a: "Yes. Every shipment includes a Certificate of Analysis and Material Safety Data Sheet, along with any other compliance documents your import process requires." },
  { q: `Can ${COMPANY_NAME} manufacture to a custom specification?`, a: "Yes, we formulate menthol, essential oil and carrier oil products to a client's brief for pharma, food and cosmetic applications, including private-label packaging." },
  { q: `Which countries does ${COMPANY_NAME} export to?`, a: "We currently export to 110+ countries including the United States, UAE and South Korea, and handle all documentation and customs clearance in-house for a smooth delivery." },
];

// Drop this into your document <head> (e.g. via react-helmet-async, or
// Next.js metadata/head APIs). Kept here verbatim so nothing is lost.
export const structuredData = {
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "Manufacturer",
    name: COMPANY_NAME,
    url: "https://www.aosproduct.com/",
    logo: "https://www.aosproduct.com/assets/logo.png",
    image: "https://www.aosproduct.com/assets/og-cover.jpg",
    description: "Manufacturer and exporter of essential oils, menthol and mint oils, carrier oils and specialty extracts, based in Ghaziabad, Uttar Pradesh, India.",
    address: { "@type": "PostalAddress", addressLocality: "Ghaziabad", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
    telephone: "+91-8285111617",
    email: "info@aosproduct.com",
    priceRange: "$$",
    openingHours: "Mo-Sa 10:00-19:00",
    areaServed: "Worldwide",
    sameAs: [
      "https://www.facebook.com/AosproductPvtLtd",
      "https://twitter.com/aosproductindia",
      "https://www.linkedin.com/company/aos-products-private-limited",
      "https://www.instagram.com/aosproducts/",
    ],
  },
  productCatalog: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "Product",
      position: i + 1,
      name: p.title,
      description: p.desc,
      brand: COMPANY_NAME,
    })),
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.aosproduct.com/" }],
  },
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header>
        <div className="accent-bar" />
        <div className="topbar">
          <div className="wrap">
            <div className="topbar-left">
              <a href="tel:+918285111617">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="tlabel">+91 82851 11617</span>
              </a>
              <a href="mailto:info@aosproduct.com">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" opacity="0" />
                  <path d="M22 6l-10 7L2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <span className="tlabel">info@aosproduct.com</span>
              </a>
            </div>
            <div className="topbar-right">Ghaziabad, Uttar Pradesh, India</div>
          </div>
        </div>

        <div className={`main-nav ${scrolled ? "scrolled" : ""}`}>
          <nav className="wrap" aria-label="Primary">
            <a href="#" className="logo">
              <svg className="logo-mark" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" fill="none" stroke="#B27B23" strokeWidth="1" />
                <path d="M20 9c0 0-9 10-9 15.5C11 29.19 15.03 33 20 33s9-3.81 9-8.5C29 19 20 9 20 9z" fill="#B27B23" />
              </svg>
              <div className="logo-text">{COMPANY_NAME}<span className="sub">Est. 2009</span></div>
            </a>
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#process">Process</a>
              <a href="#quality">Quality</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="nav-right">
              <a href="#contact" className="nav-cta">Request Quote</a>
              <button
                className={`menu-btn ${menuOpen ? "open" : ""}`}
                aria-label="Toggle menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span></span><span></span><span></span>
              </button>
            </div>
          </nav>
          <div className={`mobile-panel ${menuOpen ? "open" : ""}`}>
            <div className="wrap">
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#products" onClick={closeMenu}>Products</a>
              <a href="#process" onClick={closeMenu}>Process</a>
              <a href="#quality" onClick={closeMenu}>Quality</a>
              <a href="#contact" className="cta" onClick={closeMenu}>Request Quote →</a>
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">Manufacturer &amp; Exporter — Est. 2009, Ghaziabad, India</div>
              <h1 className="headline">Pure natural oils, <em>engineered</em><br />for global<br />industry.</h1>
              <p className="hero-sub">{COMPANY_NAME} has spent over two decades distilling essential oils, menthol &amp; mint products, carrier oils and specialty extracts for pharmaceutical, cosmetic and food manufacturers in 110+ countries.</p>
              <div className="hero-actions">
                <a href="#contact" className="btn-primary">Request a Quote</a>
                <a href="#products" className="btn-ghost">View Our Range ↓</a>
              </div>
              <div className="hero-stats">
                <div className="hstat"><b>20+</b><span>Years in Operation</span></div>
                <div className="hstat"><b>110+</b><span>Export Markets</span></div>
                <div className="hstat"><b>100%</b><span>Natural &amp; Pure</span></div>
              </div>
            </div>
            <div className="drop-stage">
              <div className="ripple r1"></div>
              <div className="ripple r2"></div>
              <div className="ripple r3"></div>
              <svg className="drop-svg" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D9A64A" />
                    <stop offset="55%" stopColor="#B27B23" />
                    <stop offset="100%" stopColor="#7A5116" />
                  </linearGradient>
                  <linearGradient id="dropShine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M100 10 C100 10 30 110 30 170 C30 214.18 61.34 250 100 250 C138.66 250 170 214.18 170 170 C170 110 100 10 100 10 Z" fill="url(#dropGrad)" />
                <ellipse cx="70" cy="150" rx="16" ry="34" fill="url(#dropShine)" />
              </svg>
            </div>
          </div>
          <div className="scroll-cue"><div className="line"></div>Scroll</div>
        </section>

        <section className="about" id="about">
          <div className="wrap about-grid">
            <Reveal className="about-figure">
              <span className="cap">Production facility — Ghaziabad, Uttar Pradesh</span>
            </Reveal>
            <Reveal as="div" className="about-text">
              <span className="tag">Our Story</span>
              <h2>Built on science, driven by purity.</h2>
              <p style={{ marginTop: 24 }}><strong>{COMPANY_NAME}</strong> runs a GMP and HACCP-qualified production facility, equipped with indigenously engineered distillation machinery and SS304L-grade equipment, so every batch meets exacting national and international benchmarks.</p>
              <p>Our approach rests on three commitments — superior quality, on-time delivery and commercially competitive pricing — the same principles that have guided us since 2009, working only with natural raw materials and never any synthetic shortcuts.</p>
              <div className="about-pillars">
                <div className="pillar"><b>GMP &amp; HACCP</b><span>Qualified Facility</span></div>
                <div className="pillar"><b>ISO 9001</b><span>Quality Managed</span></div>
                <div className="pillar"><b>20+ Years</b><span>Industry Experience</span></div>
                <div className="pillar"><b>110+ Countries</b><span>Global Reach</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="products">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="tag">What We Offer</span>
              <h2>A complete range for pharma, cosmetic &amp; food manufacturers.</h2>
              <p className="section-lead">From menthol crystals to cold-pressed carrier oils — every product ships with full documentation, in bulk, retail or private-label packaging.</p>
            </Reveal>
          </div>
          <div className="wrap" style={{ padding: 0 }}>
            <Reveal className="products-grid">
              {PRODUCTS.map((p) => (
                <div className="product-card" key={p.num}>
                  {p.badge && <span className="featured-badge">{p.badge}</span>}
                  <span className="pnum">{p.num}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="tagline">{p.tag}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="pyramid-section" id="why-us">
          <div className="wrap pyramid-wrap">
            <div>
              <Reveal as="span" className="tag">How We Operate</Reveal>
              <Reveal as="h2">Three commitments behind every batch.</Reveal>
              <Reveal className="notes" style={{ marginTop: 36 }}>
                <div className="note-row top">
                  <div className="note-label">Manufacturing</div>
                  <div>
                    <h4>Precision-Built Facility</h4>
                    <p>A GMP and HACCP-qualified plant, indigenous machinery and SS304L-grade equipment for consistent, contamination-free production.</p>
                  </div>
                </div>
                <div className="note-row heart">
                  <div className="note-label">Quality Policy</div>
                  <div>
                    <h4>Superior Quality, On Time</h4>
                    <p>Our promise rests on three pillars — superior quality, timely delivery and competitive pricing — upheld on every single order.</p>
                  </div>
                </div>
                <div className="note-row base">
                  <div className="note-label">Market Strategy</div>
                  <div>
                    <h4>Only Natural, Never Synthetic</h4>
                    <p>We manufacture exclusively from quality raw material for pharma, cosmetic and food brands, with zero synthetic shortcuts.</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal className="pyramid-visual">
              <svg className="pyr-svg" viewBox="0 0 360 380" xmlns="http://www.w3.org/2000/svg">
                <polygon points="180,20 320,150 320,150 40,150" fill="none" stroke="#B27B23" strokeWidth="1.2" opacity="0.9" />
                <polygon points="40,150 320,150 300,240 60,240" fill="none" stroke="#B5527A" strokeWidth="1.2" opacity="0.9" />
                <polygon points="60,240 300,240 270,360 90,360" fill="none" stroke="#8A7C63" strokeWidth="1.2" opacity="0.9" />
                <circle cx="180" cy="90" r="3" fill="#B27B23" />
                <circle cx="180" cy="195" r="3" fill="#B5527A" />
                <circle cx="180" cy="300" r="3" fill="#55493A" />
                <text x="180" y="95" textAnchor="middle" fill="#8C5F17" fontFamily="JetBrains Mono, monospace" fontSize="10" dy="-14">MFG</text>
                <text x="180" y="200" textAnchor="middle" fill="#96406A" fontFamily="JetBrains Mono, monospace" fontSize="10" dy="-14">POLICY</text>
                <text x="180" y="305" textAnchor="middle" fill="#55493A" fontFamily="JetBrains Mono, monospace" fontSize="10" dy="-14">MARKET</text>
              </svg>
            </Reveal>
          </div>
        </section>

        <section id="process">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="tag">From Sourcing to Shipment</span>
              <h2>Our process, batch by batch.</h2>
              <p className="section-lead">A real, ordered process — the same five steps every batch goes through before it reaches you.</p>
            </Reveal>
            <Reveal className="process-list">
              {PROCESS_STEPS.map((s) => (
                <div className="process-item" key={s.step}>
                  <div className="pstep">{s.step}</div>
                  <div><h3>{s.title}</h3><p>{s.desc}</p></div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="quality" id="quality">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="tag">Quality You Can Verify</span>
              <h2>Every claim, backed by paper.</h2>
            </Reveal>
            <Reveal className="badges">
              {BADGES.map((b) => (
                <div className="badge" key={b.title}>
                  <div className="bicon">{b.icon}</div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="testimonials">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="tag">Trusted By</span>
              <h2>What our clients say.</h2>
            </Reveal>
            <Reveal className="testi-grid">
              {TESTIMONIALS.map((t) => (
                <div className="testi" key={t.who}>
                  <div className="quote-mark">&ldquo;</div>
                  <p className="qtext">{t.text}</p>
                  <div className="who">{t.who}</div>
                  <div className="role">{t.role}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="faq">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="tag">Common Questions</span>
              <h2>Frequently asked questions.</h2>
            </Reveal>
            <Reveal className="faq-list">
              {FAQS.map((f) => (
                <div className="faq-item" key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap contact-grid">
            <Reveal>
              <span className="tag">Get In Touch</span>
              <h2>Request a quote or documentation.</h2>
              <p className="section-lead">Tell us what you need — product, quantity and destination — and we'll respond within one business day.</p>
              <div style={{ marginTop: 36 }}>
                <div className="info-row">
                  <div className="ilabel">Phone</div>
                  <div className="ival">+91 82851 11617<span>Mon–Sat, 10am–7pm IST</span></div>
                </div>
                <div className="info-row">
                  <div className="ilabel">Email</div>
                  <div className="ival">info@aosproduct.com<span>For quotes, samples &amp; bulk enquiries</span></div>
                </div>
                <div className="info-row">
                  <div className="ilabel">Address</div>
                  <div className="ival">{COMPANY_NAME}<span>GT Road Industrial Area, Ghaziabad, Uttar Pradesh, India</span></div>
                </div>
              </div>
            </Reveal>
            <Reveal as="form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  placeholder="Business / organisation"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="message">Requirement</label>
                <textarea
                  id="message"
                  placeholder="Product, quantity, destination country..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary">
                {sent ? "Message Sent ✓" : "Send Enquiry"}
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <div className="foot-logo">{COMPANY_NAME}</div>
              <p>Manufacturer &amp; exporter of essential oils, menthol &amp; mint oils, carrier oils and specialty extracts, serving 110+ countries since 2009.</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <span className="foot-col-title">Explore</span>
                <a href="#about">About</a>
                <a href="#products">Products</a>
                <a href="#process">Process</a>
                <a href="#quality">Quality</a>
              </div>
              <div className="foot-col">
                <span className="foot-col-title">Get in Touch</span>
                <a href="tel:+918285111617">+91 82851 11617</a>
                <a href="mailto:info@aosproduct.com">info@aosproduct.com</a>
                <a href="#contact">Ghaziabad, Uttar Pradesh, India</a>
              </div>
            </div>
          </div>
          <div className="foot-grid">
            <div className="foot-note">© 2009–2026 {COMPANY_NAME}. All rights reserved.</div>
            <div className="foot-links">
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
