import { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file
import Reveal from "./Reveal";
import PRODUCTS from "./json/products.json";
import TESTIMONIALS from "./json/testimonial.json";
import About from "./sections/About";
import Products from "./sections/Products";
import Process from "./sections/Process";
import Quality from "./sections/Quality";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

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
 *   The exact JSON-LD payloads are kept at the bottom of this file
 *   (see `structuredData`) so you can drop them back in wherever your
 *   framework expects head content.
 * - About, Products, Process, Quality, FAQ, Contact and Footer are now
 *   separate components under ./sections/. FAQ owns its own
 *   expand/collapse state and Contact owns its own form state, so App
 *   no longer needs to track either.
 * - `IntersectionObserver` reveal-on-scroll, the sticky-nav scroll class,
 *   and the mobile menu toggle are reimplemented with hooks (`useRef`,
 *   `useState`, `useEffect`) instead of direct DOM queries. The reveal
 *   logic lives in its own `Reveal` component (see ./Reveal.jsx).
 */

// Kept here for structured data (JSON-LD) generation only — the actual
// FAQ UI/content now lives inside ./sections/FAQ.jsx.
const FAQS_FOR_SEO = [
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
    mainEntity: FAQS_FOR_SEO.map((f) => ({
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

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

        <About companyName={COMPANY_NAME} />

        <Products />

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

        <Process />

        <Quality />

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

        <FAQ companyName={COMPANY_NAME} />

        <Contact companyName={COMPANY_NAME} />
      </main>

      <Footer companyName={COMPANY_NAME} />
    </>
  );
}