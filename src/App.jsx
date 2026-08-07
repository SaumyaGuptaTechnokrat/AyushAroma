import { useEffect, useRef, useState } from "react";
// import "./App.css"; // Import the CSS file
import Reveal from "./Reveal";
import PRODUCTS from "./json/products.json";
import About from "./sections/About";
import Products from "./sections/Products";
import Process from "./sections/Process";
import Quality from "./sections/Quality";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import BackToTop from "./sections/BackToTop";
import ThemeToggle from "./sections/ThemeToggle";
import HeroSlider from "./sections/Heroslider";
import Testimonials from "./sections/Testimonials";

// Company name is sourced from an environment variable so it only needs to
// be set in one place (see .env -> VITE_COMPANY_NAME). Vite only exposes
// client-side env vars that are prefixed with VITE_.
export const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || "Ayush Aromatic";
const phone = import.meta.env.VITE_CONTACT_NUMBER;
const email = import.meta.env.VITE_CONTACT_EMAIL;
const addressLocality = import.meta.env.VITE_COMPANY_LOCALITY || "Koharapeer, Bareilly";
const addressRegion = import.meta.env.VITE_COMPANY_REGION || "Uttar Pradesh";

// Inline SVGs (logo mark, pyramid diagram) can't read CSS custom
// properties for their `fill`/`stroke` attributes the way the rest of
// the site reads var(--gold) etc, so their hex values are mirrored here
// from base.css's palette. If the palette in base.css changes again,
// these three constants are the only other place that needs updating.
const BRAND_PRIMARY = "#2F4A3C";   // deep botanical green
const BRAND_SECONDARY = "#6B4A30"; // warm earthy brown
const BRAND_ACCENT = "#A6863F";    // muted gold

const FAQS_FOR_SEO = [
  { q: "What is the minimum order quantity for bulk essential oils?", a: "Our minimum order quantity varies by product — most oils start from 1kg for trial orders, with no upper limit for bulk export orders. Contact us with your requirement for an exact quote." },
  { q: "Do you provide a COA and MSDS with each shipment?", a: "Yes. Every shipment includes a Certificate of Analysis and Material Safety Data Sheet, along with any other compliance documents your import process requires." },
  { q: `Can ${COMPANY_NAME} manufacture to a custom specification?`, a: "Yes, we formulate menthol, essential oil and carrier oil products to a client's brief for pharma, food and cosmetic applications, including private-label packaging." },
  { q: `Which countries does ${COMPANY_NAME} export to?`, a: "We currently export to 110+ countries including the United States, UAE and South Korea, and handle all documentation and customs clearance in-house for a smooth delivery." },
];

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

const MOBILE_PANEL_COLLAPSE_MS = 380;

function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const measured = parseFloat(raw);
  if (!Number.isNaN(measured) && measured > 0) return measured + 12;
  return window.innerWidth <= 720 ? 90 : 110;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    const index = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (i) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  function handleMobilePanelNav(e, id) {
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const headerOffset = getHeaderOffset();
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }, MOBILE_PANEL_COLLAPSE_MS);
  }

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
              {/* stroke/fill were hardcoded to the old gold (#B27B23) —
                  now uses BRAND_ACCENT so the logo mark tracks the same
                  muted gold defined in base.css. */}
              <svg className="logo-mark" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" fill="none" stroke={BRAND_ACCENT} strokeWidth="1" />
                <path d="M20 9c0 0-9 10-9 15.5C11 29.19 15.03 33 20 33s9-3.81 9-8.5C29 19 20 9 20 9z" fill={BRAND_ACCENT} />
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
              <ThemeToggle />
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
              <a href="#about" onClick={(e) => handleMobilePanelNav(e, "about")}>About</a>
              <a href="#products" onClick={(e) => handleMobilePanelNav(e, "products")}>Products</a>
              <a href="#process" onClick={(e) => handleMobilePanelNav(e, "process")}>Process</a>
              <a href="#quality" onClick={(e) => handleMobilePanelNav(e, "quality")}>Quality</a>
              <a href="#contact" className="cta" onClick={(e) => handleMobilePanelNav(e, "contact")}>Request Quote →</a>
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        <HeroSlider />

        <section className="hero-stats-bar">
          <div className="wrap hero-stats">
            {/* <div className="hstat"><b>20+</b><span>Years in Operation</span></div>
            <div className="hstat"><b>110+</b><span>Export Markets</span></div>
            <div className="hstat"><b>100%</b><span>Natural &amp; Pure</span></div> */}
          </div>
        </section>

        <About className="bg-offwhite" companyName={COMPANY_NAME} addressLocality={addressLocality} addressRegion={addressRegion} />

        <Products className="bg-beige" />

        <section className="pyramid-section bg-offwhite" id="why-us">
          <div className="wrap pyramid-wrap">
            <div>
              <Reveal as="span" className="tag">How We Operate</Reveal>
              <Reveal as="h2">Three commitments behind every batch.</Reveal>

              <Reveal className="notes" style={{ marginTop: 36 }}>
                <div className="notes-carousel" ref={carouselRef} onScroll={handleScroll}>
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
                </div>

                <div className="carousel-dots">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`dot ${activeIndex === i ? "active" : ""}`}
                      onClick={() => scrollToIndex(i)}
                    />
                  ))}
                </div>
              </Reveal>
            </div>

            {/*
              Was three shades of the old gold/ink hardcoded hex
              (#B27B23 / #8C5F17 / #6B5D45), which didn't correspond to
              anything meaningful. Now each tier of the pyramid maps to
              one of the three brand colors, tying the diagram directly
              to "Manufacturing / Quality Policy / Market Strategy"
              (primary green / accent gold / secondary brown).
            */}
            <Reveal className="pyramid-visual">
              <svg className="pyr-svg" viewBox="0 0 360 380" xmlns="http://www.w3.org/2000/svg">
                <polygon points="180,20 320,150 320,150 40,150" fill="none" stroke={BRAND_PRIMARY} strokeWidth="1.2" opacity="0.9" />
                <polygon points="40,150 320,150 300,240 60,240" fill="none" stroke={BRAND_ACCENT} strokeWidth="1.2" opacity="0.9" />
                <polygon points="60,240 300,240 270,360 90,360" fill="none" stroke={BRAND_SECONDARY} strokeWidth="1.2" opacity="0.9" />
                <circle cx="180" cy="90" r="3" fill={BRAND_PRIMARY} />
                <circle cx="180" cy="195" r="3" fill={BRAND_ACCENT} />
                <circle cx="180" cy="300" r="3" fill={BRAND_SECONDARY} />
                <text x="180" y="95" textAnchor="middle" fill={BRAND_PRIMARY} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" dy="-14">MFG</text>
                <text x="180" y="200" textAnchor="middle" fill={BRAND_ACCENT} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" dy="-14">POLICY</text>
                <text x="180" y="305" textAnchor="middle" fill={BRAND_SECONDARY} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" dy="-14">MARKET</text>
              </svg>
            </Reveal>
          </div>
        </section>

        <Process className="bg-beige" />

        <Quality className="bg-offwhite" />

        <Testimonials />

        <FAQ className="bg-offwhite" companyName={COMPANY_NAME} />

        <Contact className="bg-beige" companyName={COMPANY_NAME} />
      </main>

      <Footer companyName={COMPANY_NAME} />

      <BackToTop />
    </>
  );
}