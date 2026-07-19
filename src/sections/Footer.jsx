export default function Footer({ companyName }) {
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
                <a href="tel:+918285111617">+91 82851 11617</a>
                <a href="mailto:info@aosproduct.com">info@aosproduct.com</a>
                <a href="#contact">Ghaziabad, Uttar Pradesh, India</a>
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