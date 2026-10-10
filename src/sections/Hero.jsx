import Reveal from "../Reveal";
import heroImg from "../assets/hero-essential.png";

/**
 * Hero
 * H1 carries the primary keyword; eyebrow + subcopy carry the location
 * and secondary keywords (pure, genuine rates, varieties).
 */
const EYEBROW = "Bareilly, Uttar Pradesh · Since 2009";
const HEADLINE = "Top Oil Manufacturer in India";
const SUBCOPY =
  "Pure essential oils, menthol, mint oils and carrier oils, direct from our Bareilly, Uttar Pradesh plant at genuine manufacturer rates. A wide variety of oils for pharma, cosmetic, food and fragrance brands.";

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
              <img
                src={heroImg}
                alt="Pure essential oils and natural botanical ingredients from an oil manufacturer in Bareilly, India"
                loading="eager"
              />
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