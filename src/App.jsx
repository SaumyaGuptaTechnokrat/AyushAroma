import { useEffect, useRef, useState } from "react";
// import "./App.css"; // Import the CSS file
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
import BackToTop from "./sections/BackToTop";
import ThemeToggle from "./sections/ThemeToggle";
import Carousel from "./sections/Carousel";
import HeroSlider from "./sections/Heroslider";

// Company name is sourced from an environment variable so it only needs to
// be set in one place (see .env -> VITE_COMPANY_NAME). Vite only exposes
// client-side env vars that are prefixed with VITE_.
export const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || "Ayush Aromatic";
const phone = import.meta.env.VITE_CONTACT_NUMBER;
const email = import.meta.env.VITE_CONTACT_EMAIL;
const addressLocality = import.meta.env.VITE_COMPANY_LOCALITY || "Koharapeer, Bareilly";
const addressRegion = import.meta.env.VITE_COMPANY_REGION || "Uttar Pradesh";
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
 * - The fixed header's real height is measured live (see the
 *   `--header-h` effect below) and written to a CSS custom property that
 *   every other file reads for spacing (hero padding-top, scroll
 *   offsets, the sticky mobile product-tab column). Previously each of
 *   those was a separate hard-coded pixel guess per breakpoint, and any
 *   drift between a guess and the header's real rendered height is what
 *   caused the hero's oil drop to crowd/overlap the nav on some phones.
 *   A single live measurement can't drift out of sync.
 * - Testimonials now render through the generic <Carousel> component
 *   (./sections/Carousel.jsx), with the testimonial cards passed in as
 *   children. Carousel only renders what it's given as children, so it
 *   must be called with the mapped TESTIMONIALS cards inline here —
 *   calling it as a bare <Carousel/> with no children renders an empty
 *   shell, which is why testimonials previously appeared to vanish.
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
    "@type": "Organization",
    name: COMPANY_NAME,
    url: import.meta.env.VITE_SITE_URL,
    logo: `${import.meta.env.VITE_SITE_URL}/logo.png`,
    image: `${import.meta.env.VITE_SITE_URL}/og-cover.jpg`,
    description: `Manufacturer and exporter of essential oils, menthol and mint oils, carrier oils and specialty extracts, based in ${addressLocality}, ${addressRegion}, India.`,
    address: { "@type": "PostalAddress", addressLocality, addressRegion, addressCountry: "IN" },
    priceRange: "$$",
    openingHours: "Mo-Sa 10:00-19:00",
    areaServed: "Worldwide",
    sameAs: [
      // replace with Ayush Aromatics' real profiles
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
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.ayusharomatics.com/" }],
  },
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measures the header's real rendered height and publishes it as
  // --header-h on <html>. Every other stylesheet (hero, base, products)
  // reads that variable instead of a hard-coded guess, so hero spacing,
  // scroll-padding, and the sticky mobile tab column always match the
  // header exactly — this is what fixes the drop/nav collision on
  // mobile, on every device, permanently.
  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const setHeaderHeight = () => {
      document.documentElement.style.setProperty("--header-h", `${headerEl.offsetHeight}px`);
    };

    setHeaderHeight();

    const ro = new ResizeObserver(setHeaderHeight);
    ro.observe(headerEl);
    window.addEventListener("orientationchange", setHeaderHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", setHeaderHeight);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <header ref={headerRef}>
        <div className="accent-bar" />
        <div className="topbar">
          <div className="wrap">
            <div className="topbar-left">
            <a href={`tel:${phone}`}>
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="tlabel">{phone}</span>
              </a>
              <a href={`mailto:${email}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" opacity="0" />
                  <path d="M22 6l-10 7L2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <span className="tlabel">{email}</span>
              </a>
            </div>
            <div className="topbar-right">{addressLocality}, {addressRegion}, India</div>
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
              <ThemeToggle/>
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
        <HeroSlider />

        <section className="hero-stats-bar">
          <div className="wrap hero-stats">
            <div className="hstat"><b>&nbsp;20+</b><span>&nbsp;Years in Operation</span></div>
            <div className="hstat"><b>110+</b><span>Export Markets</span></div>
            <div className="hstat"><b>100%</b><span>Natural &amp; Pure</span></div>
          </div>
        </section>

        <About companyName={COMPANY_NAME} addressLocality={addressLocality} addressRegion={addressRegion} />

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
              {/*
                Pyramid strokes/fills recolored off the old palette
                (#B5527A rose) onto shades of ink/gold so the whole page
                reads as one considered brand instead of two clashing ones.
              */}
              <svg className="pyr-svg" viewBox="0 0 360 380" xmlns="http://www.w3.org/2000/svg">
                <polygon points="180,20 320,150 320,150 40,150" fill="none" stroke="#B27B23" strokeWidth="1.2" opacity="0.9" />
                <polygon points="40,150 320,150 300,240 60,240" fill="none" stroke="#8C5F17" strokeWidth="1.2" opacity="0.9" />
                <polygon points="60,240 300,240 270,360 90,360" fill="none" stroke="#6B5D45" strokeWidth="1.2" opacity="0.9" />
                <circle cx="180" cy="90" r="3" fill="#B27B23" />
                <circle cx="180" cy="195" r="3" fill="#8C5F17" />
                <circle cx="180" cy="300" r="3" fill="#3A3021" />
                <text x="180" y="95" textAnchor="middle" fill="#8C5F17" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" dy="-14">MFG</text>
                <text x="180" y="200" textAnchor="middle" fill="#6B5D45" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" dy="-14">POLICY</text>
                <text x="180" y="305" textAnchor="middle" fill="#3A3021" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" dy="-14">MARKET</text>
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
            <Reveal>
              <Carousel className="testimonial-carousel" ariaLabel="Client testimonials">
                {TESTIMONIALS.map((t) => (
                  <div className="testi" key={t.who}>
                    <div className="quote-mark">&ldquo;</div>
                    <p className="qtext">{t.text}</p>
                    <div className="who">{t.who}</div>
                    <div className="role">{t.role}</div>
                  </div>
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        <FAQ companyName={COMPANY_NAME} />

        <Contact companyName={COMPANY_NAME} />
      </main>

      <Footer companyName={COMPANY_NAME} />

      <BackToTop />

    </>
  );
}