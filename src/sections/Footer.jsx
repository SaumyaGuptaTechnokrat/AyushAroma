export default function Footer({ companyName }) {
  const phone = import.meta.env.VITE_CONTACT_NUMBER;
  const email = import.meta.env.VITE_CONTACT_EMAIL;
  const addressLocality = import.meta.env.VITE_COMPANY_LOCALITY || "Koharapeer, Bareilly";
const addressRegion = import.meta.env.VITE_COMPANY_REGION || "Uttar Pradesh";
    return (
      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <div className="foot-logo">{companyName}</div>
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
                <a href={`tel:${phone}`}>{phone}</a>
                <a href={`mailto:${email}`}>{email}</a>
                <a href="#contact">{addressLocality}, Uttar Pradesh, India</a>
              </div>
            </div>
          </div>
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
    );
  }