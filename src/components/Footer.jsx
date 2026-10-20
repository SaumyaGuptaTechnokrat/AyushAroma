import {
  business,
  emailHref,
  phoneHref,
  whatsappHref,
} from "../config/business";
import { categories, categoryPath } from "../data/catalogue";
import { Brand, SocialLinks } from "./Header";
import Icon from "./Icon";
export function FloatingContact() {
  return (
    <aside className="floating-contact" aria-label="Quick contact">
      <a
        className="whatsapp"
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
      >
        <Icon name="whatsapp" />
        <span>WhatsApp</span>
      </a>
      <a href={emailHref} aria-label="Email Ayush Aromatics">
        <Icon name="mail" />
        <span>Email us</span>
      </a>
      <a href={phoneHref} aria-label="Call Ayush Aromatics">
        <Icon name="phone" />
        <span>Call now</span>
      </a>
    </aside>
  );
}
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              Essential oils, mint products and aromatic ingredients for your
              business. Start a conversation about your next bulk requirement.
            </p>
            <div className="social-links">
              <SocialLinks />
            </div>
          </div>
          <div>
            <h3>Our products</h3>
            {categories.map((c) => (
              <a key={c.category} href={categoryPath(c.category)}>
                {c.category}
              </a>
            ))}
          </div>
          <div>
            <h3>Discover</h3>
            <a href="#about">About us</a>
            <a href="#products">Product catalogue</a>
            <a href="#quality">Quality & documentation</a>
            <a href="#industries">Industries</a>
            <a href="#contact">Request a quote</a>
          </div>
          <div className="footer-contact">
            <h3>Let’s connect</h3>
            <a href={emailHref}>{business.email}</a>
            <a href={phoneHref}>{business.phone}</a>
            <p>
              {business.locality}
              <br />
              {business.region}, India
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </span>
          <div>
            {business.privacyUrl && (
              <a href={business.privacyUrl}>Privacy policy</a>
            )}
            {business.termsUrl && (
              <a href={business.termsUrl}>Terms & conditions</a>
            )}
            <span>Natural ingredients. Considered partnerships.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
