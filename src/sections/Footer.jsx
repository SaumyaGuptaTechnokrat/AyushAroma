import PRODUCTS from "../json/products.json";

// Trust-badge icons — plain inline SVGs (stroke uses currentColor so
// they inherit the brass accent color set in footer.css), matching
// the "Fast Shipping / Purity Guarantee / Competitive Price /
// Gigantic Range" row from the reference design.
const BADGES = [
  {
    title: "Fast Shipping",
    desc: "We serve customers all over the world across 110+ countries.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="7" width="14" height="10" rx="1.5" />
        <path d="M15 10h4l3 3v4h-7z" />
        <circle cx="6" cy="19" r="1.8" />
        <circle cx="17.5" cy="19" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Products Purity Guarantee",
    desc: "We provide impeccable quality, pure and natural oils, every batch.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3.6v5.4c0 5-3.4 8.9-8 10-4.6-1.1-8-5-8-10V5.6L12 2z" />
        <path d="M8.5 12l2.4 2.4L15.5 9.6" />
      </svg>
    ),
  },
  {
    title: "Competitive Price",
    desc: "Impeccable quality natural products at lucrative, bulk-ready rates.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M8 6.5h5.5a2.5 2.5 0 0 1 0 5H8m8 1h-.5a2.5 2.5 0 0 1 0 5H8" />
      </svg>
    ),
  },
  {
    title: "Gigantic Range",
    desc: "The widest array of essential oils, carrier oils and specialty extracts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

export default function Footer({ companyName }) {
  const phone = import.meta.env.VITE_CONTACT_NUMBER;
  const email = import.meta.env.VITE_CONTACT_EMAIL;
  const addressLocality = import.meta.env.VITE_COMPANY_LOCALITY || "Koharapeer, Bareilly";
  const addressRegion = import.meta.env.VITE_COMPANY_REGION || "Uttar Pradesh";

  return (
    <>
      {/* -------------------------------------------------------------
          TRUST-BADGES ROW — same 4-column icon+title+description
          pattern as the reference design, sitting on a light band
          just above the dark footer.
      ------------------------------------------------------------- */}
      <section className="foot-badges-band">
        <div className="wrap foot-badges-grid">
          {BADGES.map((b) => (
            <div className="foot-badge" key={b.title}>
              <span className="foot-badge-icon">{b.icon}</span>
              <div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div className="wrap">
          {/* -----------------------------------------------------------
              MAIN 4-COLUMN GRID — Brand+about, Explore, Products List,
              Get in Touch (address/phone/email with icons), matching
              the reference footer's layout.
          ----------------------------------------------------------- */}
          <div className="foot-top">
            <div className="foot-brand">
              <div className="foot-logo">{companyName}</div>
              <p>
                Manufacturer &amp; exporter of essential oils, menthol &amp; mint oils, carrier oils and specialty
                extracts, serving 110+ countries since 2009.
              </p>
            </div>

            <div className="foot-col">
              <span className="foot-col-title">Explore</span>
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#process">Process</a>
              <a href="#quality">Quality</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="foot-col">
              <span className="foot-col-title">Products List</span>
              {PRODUCTS.slice(0, 5).map((c) => (
                
                <a  key={c.category}
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("select-product-category", { detail: c.category }));
                    const target = document.getElementById("products");
                    if (!target) return;
                    const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
                    const measured = parseFloat(raw);
                    const offset = !Number.isNaN(measured) && measured > 0 ? measured + 12 : 110;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                >
                  {c.category}
                </a>
              ))}
            </div>

            <div className="foot-col">
              <span className="foot-col-title">Get in Touch</span>
              <a className="foot-contact-item" href={`tel:${phone}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <span>{phone}</span>
              </a>
              <a className="foot-contact-item" href={`mailto:${email}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 6 10-6" />
                </svg>
                <span>{email}</span>
              </a>
              <span className="foot-contact-item foot-contact-address">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10.5c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10.5" r="2.6" />
                </svg>
                <span>{addressLocality}, {addressRegion}, India</span>
              </span>
            </div>
          </div>

          {/* -----------------------------------------------------------
              BOTTOM BAR — copyright + secondary link row.
          ----------------------------------------------------------- */}
          <div className="foot-grid">
            <div className="foot-note">© 2009–2026 {companyName}. All rights reserved.</div>
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