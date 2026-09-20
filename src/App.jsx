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
import Hero from "./sections/Hero";
import Testimonials from "./sections/Testimonials";
import BottomNav from "./sections/Bottomnav";
import Manufacturing from "./sections/Manufacturing";

export const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || "Ayush Aromatics";
const phone = import.meta.env.VITE_CONTACT_NUMBER;
const email = import.meta.env.VITE_CONTACT_EMAIL;
const addressLocality = import.meta.env.VITE_COMPANY_LOCALITY || "Koharapeer, Bareilly";
const addressRegion = import.meta.env.VITE_COMPANY_REGION || "Uttar Pradesh";

const [logoMain, ...logoRest] = COMPANY_NAME.trim().split(/\s+/);
const logoSub = logoRest.join(" ") || "Aromatics";

const BRAND_PRIMARY = "#173C32";
const BRAND_SECONDARY = "#48544D";
const BRAND_ACCENT = "#B79A63";

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
    sameAs: [],
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
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
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

  // Close the mobile slide-out panel whenever it's closed, also reset
  // its Products accordion so it doesn't reopen already-expanded next time.
  useEffect(() => {
    if (!menuOpen) setMobileProductsOpen(false);
  }, [menuOpen]);

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

  // Desktop dropdown: category clicked -> select it in <Products/> and
  // scroll straight there (no panel-collapse delay needed on desktop).
  function handleProductCategoryClick(e, category) {
    e.preventDefault();
    setProductsMenuOpen(false);
    window.dispatchEvent(new CustomEvent("select-product-category", { detail: category }));
    window.setTimeout(() => {
      const target = document.getElementById("products");
      if (!target) return;
      const headerOffset = getHeaderOffset();
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }, 50);
  }

  // Mobile accordion: same thing, but waits for the slide-out panel to
  // finish collapsing first, same pattern as handleMobilePanelNav.
  function handleMobileProductCategoryClick(e, category) {
    e.preventDefault();
    setMobileProductsOpen(false);
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent("select-product-category", { detail: category }));
    window.setTimeout(() => {
      const target = document.getElementById("products");
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
        <div className={`main-nav ${scrolled ? "scrolled" : ""}`}>
          <nav className="wrap" aria-label="Primary">
            <a href="#" className="logo">
              <svg className="logo-mark" viewBox="0 0 40 44" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 3C27 9 32 17 32 24C32 32.7 26.8 39 20 41C13.2 39 8 32.7 8 24C8 17 13 9 20 3Z"
                  fill={BRAND_PRIMARY}
                />
                <path d="M20 9V36" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" />
              </svg>
              <div className="logo-text">
                {logoMain}
                <span className="sub">{logoSub}</span>
              </div>
            </a>

            <div className="nav-links">
              <a href="#about">About</a>

              {/* Desktop Products dropdown. `.menu-open` is only used to
                  rotate the caret and as a click-to-toggle fallback —
                  the actual show/hide is pure CSS :hover so there's no
                  JS timing gap that could make it flicker shut. */}
              <div
                className={`nav-item-dropdown ${productsMenuOpen ? "menu-open" : ""}`}
                onMouseEnter={() => setProductsMenuOpen(true)}
                onMouseLeave={() => setProductsMenuOpen(false)}
              >
                
                <a  href="#products"
                  className="nav-dropdown-trigger"
                  onClick={(e) => {
                    if (window.innerWidth <= 720) return;
                    e.preventDefault();
                    setProductsMenuOpen((v) => !v);
                  }}
                >
                  Products
                  <svg className="nav-caret" viewBox="0 0 12 8" width="10" height="7" aria-hidden="true">
                    <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* Invisible hit-area bridges the visual gap between the
                    trigger and the panel, so the pointer never "leaves"
                    a hoverable box while moving down to click an item. */}
                <div className={`nav-dropdown-hitarea ${productsMenuOpen ? "open" : ""}`}>
                  <div className="nav-dropdown-menu">
                    <span className="nav-dropdown-accent" aria-hidden="true"></span>
                    {PRODUCTS.map((c) => (
                      <a key={c.category} href="#products" onClick={(e) => handleProductCategoryClick(e, c.category)}>
                        {c.category}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <a href="#process">Process</a>
              <a href="#quality">Quality</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="nav-right">
              <a href="#contact" className="nav-cta">Request a Quote</a>
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

              {/* Mobile Products accordion */}
              <div className="mobile-accordion">
                <button
                  type="button"
                  className="mobile-accordion-trigger"
                  aria-expanded={mobileProductsOpen}
                  onClick={() => setMobileProductsOpen((v) => !v)}
                >
                  Products
                  <svg
                    className={`mobile-accordion-caret ${mobileProductsOpen ? "open" : ""}`}
                    viewBox="0 0 12 8" width="11" height="8" aria-hidden="true"
                  >
                    <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={`mobile-accordion-panel ${mobileProductsOpen ? "open" : ""}`}>
                  {PRODUCTS.map((c) => (
                    <a key={c.category} href="#products" onClick={(e) => handleMobileProductCategoryClick(e, c.category)}>
                      {c.category}
                    </a>
                  ))}
                  <a href="#products" className="mobile-accordion-viewall" onClick={(e) => handleMobilePanelNav(e, "products")}>
                    View all products →
                  </a>
                </div>
              </div>

              <a href="#process" onClick={(e) => handleMobilePanelNav(e, "process")}>Process</a>
              <a href="#quality" onClick={(e) => handleMobilePanelNav(e, "quality")}>Quality</a>
              <a href="#contact" className="cta" onClick={(e) => handleMobilePanelNav(e, "contact")}>Request Quote →</a>
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        <Hero />
        <Manufacturing />
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
      <BottomNav />
    </>
  );
}