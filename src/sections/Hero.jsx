import Reveal from "../Reveal";

// Reuses the same brand photography already in the project — swap
// for a dedicated hero shot whenever you have one, same aspect ratio
// (roughly 16:7, wide/short) works best inside the media frame.
import heroImg from "../assets/hero-essential.png";

/**
 * Hero
 * -----------------------------------------------------------------------
 * Light, full-width introduction panel: eyebrow + headline + copy + two
 * CTAs on the left, a product photo on the right, and a stats/
 * certifications row underneath. The outer <section>/.hero-card is
 * intentionally NOT wrapped in `.wrap`, so its background spans the full
 * device width edge-to-edge; `.hero-card-inner` applies `.wrap` just to
 * the content so text/image/stats still align with the rest of the
 * site's max-width columns.
 *
 * All copy lives in the constants below so it's a one-place edit if you
 * want to change the headline, stats, or certifications later.
 */
const EYEBROW = "Natural Ingredients";
const HEADLINE = "For Global Industry";
const SUBCOPY =
  "Essential oils, menthol, carrier oils and botanical ingredients for pharmaceutical, cosmetic, food and fragrance applications.";

const STATS = [
  { value: "15+", label: "Years of Experience" },
  { value: "110+", label: "Countries Worldwide" },
  { value: "100+", label: "Products & Ingredients" },
];

const CERTS = ["GMP", "HACCP", "ISO 9001"];

export default function Hero() {
  return (
    <section className="hero-intro" id="hero">
      <Reveal className="hero-card">
        <div className="wrap hero-card-inner">
          <div className="hero-card-grid">
            <div className="hero-card-text">
              <span className="eyebrow">{EYEBROW}</span>
              <h1>{HEADLINE}</h1>
              <p className="hero-sub">{SUBCOPY}</p>
              <div className="hero-actions">
                <a href="#products" className="btn-primary">
                  Explore Products →
                </a>
                <a href="#contact" className="btn-outline">
                  Request a Quote
                </a>
              </div>
            </div>

            <div className="hero-card-media">
              <img src={heroImg} alt="Essential oils and natural botanical ingredients" loading="eager" />
            </div>
          </div>

          <div className="hero-stats-row">
            {STATS.map((s) => (
              <div className="hstat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}

            <div className="hstat-certs">
              <div className="certs-line">
                {CERTS.map((c, i) => (
                  <span key={c}>
                    {c}
                    {i < CERTS.length - 1 && <span className="dot"> ● </span>}
                  </span>
                ))}
              </div>
              <small>Certified Quality Systems</small>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}