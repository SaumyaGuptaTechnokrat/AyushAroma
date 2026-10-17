import Reveal from "../Reveal";
// import heroImg from "../assets/hero-essential.png";

/**
 * Hero
 * H1 carries the primary keyword; eyebrow + subcopy carry the location
 * and secondary keywords (pure, genuine rates, varieties).
 */
// import Reveal from "../Reveal";
import heroLg from "../assets/hero-main-1000.webp";
import heroSm from "../assets/hero-main-640.webp";
import thumbMint from "../assets/hero-thumb-mint-360.webp";
import thumbCarrier from "../assets/hero-thumb-carrier-360.webp";

/**
 * Hero
 * H1 carries the primary keyword (kept word-for-word for SEO); the eyebrow,
 * subcopy and trust points carry the location, secondary keywords and the
 * reasons a buyer should enquire. All claims below already appear elsewhere
 * on the site (Products, Quality, FAQ, Footer).
 */
const EYEBROW = "Bareilly, Uttar Pradesh · Since 2009";

const SUBCOPY =
  "Pure essential oils, menthol, mint oils and carrier oils, made at our own Bareilly plant and supplied at genuine manufacturer rates to pharma, cosmetic, food and fragrance brands worldwide.";

const POINTS = [
  "COA with every shipment",
  "Bulk, retail & private-label packaging",
  "Export documentation handled in-house",
];

const THUMBS = [
  {
    src: thumbMint,
    label: "Mint Oils",
    alt: "Mint leaves and ice beside a bottle of mint oil",
  },
  {
    src: thumbCarrier,
    label: "Carrier Oils",
    alt: "Almonds and a bottle of cold-pressed carrier oil",
  },
];

const STATS = [
  { value: "15+", label: "Years of Experience" },
  { value: "110+", label: "Countries Worldwide" },
  { value: "100+", label: "Products & Ingredients" },
];

const CERTS = ["GMP", "HACCP", "ISO 9001"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" focusable="false">
      <path
        d="M5 10.5l3.2 3.2L15 6.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d="M5 19c0-8 4.5-13 14-14 0 9-4.5 14-13 14M5 19l8-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero-intro" id="hero" aria-labelledby="hero-title">
      <Reveal className="hero-card">
        <div className="wrap hero-card-inner">
          <div className="hero-card-grid">
            {/* ---------- Copy ---------- */}
            <div className="hero-card-text">
              <span className="eyebrow">{EYEBROW}</span>

              <h1 id="hero-title">
                Top <span className="hero-accent">Oil Manufacturer</span> in India
              </h1>

              <p className="hero-sub">{SUBCOPY}</p>

              <ul className="hero-points">
                {POINTS.map((p) => (
                  <li key={p}>
                    <span className="tick">
                      <CheckIcon />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="hero-actions">
                <a href="#products" className="btn-primary">
                  Explore Products →
                </a>
                <a href="#contact" className="btn-outline">
                  Request a Quote
                </a>
              </div>
            </div>

            {/* ---------- Visual ---------- */}
            <div className="hero-visual">
              <div className="hero-media">
                <img
                  src={heroLg}
                  srcSet={`${heroSm} 640w, ${heroLg} 1000w`}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  width="1000"
                  height="800"
                  alt="Ayush Aromatics lavender essential oil bottle with fresh lavender, from an oil manufacturer in Bareilly, India"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              </div>

              <ul className="hero-thumbs" aria-label="Featured oil categories">
                {THUMBS.map((t) => (
                  <li key={t.label}>
                    <a href="#products" className="hero-thumb">
                      <img
                        src={t.src}
                        alt={t.alt}
                        width="72"
                        height="72"
                        loading="lazy"
                        decoding="async"
                      />
                      <span>{t.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="hero-chip">
                <span className="hero-chip-icon">
                  <LeafIcon />
                </span>
                <span className="hero-chip-text">
                  <b>Direct from our plant</b>
                  <small>Bareilly, Uttar Pradesh</small>
                </span>
              </div>
            </div>
          </div>

          {/* ---------- Stats ---------- */}
          <div className="hero-stats">
            {STATS.map((s) => (
              <div className="hstat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}

            <div className="hstat hstat-certs">
              <div className="certs-line">
                {CERTS.map((c, i) => (
                  <span key={c}>
                    {c}
                    {i < CERTS.length - 1 && (
                      <span className="dot" aria-hidden="true">
                        {" "}
                        ●{" "}
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <span>Certified Quality Systems</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}