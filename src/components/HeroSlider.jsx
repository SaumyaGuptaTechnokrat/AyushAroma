import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import mint from "../assets/mint-wide.webp";
import mintSmall from "../assets/mint-small.webp";
import essential from "../assets/essential-wide.webp";
import essentialSmall from "../assets/essential-small.webp";
import carrier from "../assets/carrier-wide.webp";
import carrierSmall from "../assets/carrier-small.webp";
import { categoryPath } from "../data/catalogue";

const slides = [
  {
    eyebrow: "BOTANICAL INGREDIENTS. BUSINESS POSSIBILITIES.",
    title: "Premium essential oils & natural ingredients.",
    text: "Essential oils, mint oils and menthol products for bulk buyers, manufacturers and distributors.",
    image: mint,
    small: mintSmall,
    alt: "Mint leaves, aromatic oil and crystals from the existing product imagery",
    action: "Explore products",
    href: "#products",
    label: "Essential oils & ingredients",
  },
  {
    eyebrow: "OUR MINT COLLECTION",
    title: "Mint oils & menthol. Made for your next formulation.",
    text: "Explore menthol crystals, Mentha arvensis oil and mint derivatives. Tell us the specification and quantity you need.",
    image: mint,
    small: mintSmall,
    alt: "Mint and menthol range illustration",
    action: "View mint products",
    href: categoryPath("Mint Products"),
    label: "Mint oils & menthol",
  },
  {
    eyebrow: "EXPLORE THE ESSENTIALS",
    title: "A world of aroma. A range of possibilities.",
    text: "Discover essential oils for fragrance, personal care and aromatherapy. Find an ingredient for your application.",
    image: essential,
    small: essentialSmall,
    alt: "Lavender and an Ayush Aromatics essential oil bottle",
    action: "Explore essential oils",
    href: categoryPath("Essential Oils"),
    label: "Essential oil collection",
  },
  {
    eyebrow: "LET’S TALK ABOUT YOUR REQUIREMENTS",
    title: "Reliable ingredients. Long-term partnerships.",
    text: "Connect with our team in Bareilly, India to discuss bulk quantities, product requirements and your delivery destination.",
    image: carrier,
    small: carrierSmall,
    alt: "Botanical carrier oil range illustration",
    action: "Contact our team",
    href: "#contact",
    label: "Business enquiries",
  },
];
function SlideImage({ slide, initial = false, panel = false }) {
  return (
    <img
      className={panel ? "hero-image hero-panel-image" : "hero-image"}
      src={slide.image}
      srcSet={`${slide.small} 640w, ${slide.image} 1600w`}
      sizes="100vw"
      alt={panel ? "" : slide.alt}
      width="1672"
      height="941"
      loading={initial ? "eager" : "lazy"}
      fetchPriority={initial && !panel ? "high" : "low"}
    />
  );
}
export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hidden, setHidden] = useState(document.hidden);
  const touch = useRef(null);
  const autoplay = !reduced && !hidden;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      12000,
    );
    return () => window.clearInterval(timer);
  }, [autoplay]);
  function go(index) {
    setActive((index + slides.length) % slides.length);
  }
  function keydown(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(active + (e.key === "ArrowRight" ? 1 : -1));
    }
  }
  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Our products and bulk supply"
      onKeyDown={keydown}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = touch.current.x - e.changedTouches[0].clientX;
        const dy = touch.current.y - e.changedTouches[0].clientY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
          go(active + (dx > 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div className="hero-slides" aria-live={autoplay ? "off" : "polite"}>
        {slides.map((s, i) => (
          <div
            key={s.label}
            className={`hero-slide ${active === i ? "is-active" : ""}`}
            aria-hidden={active !== i}
            inert={active !== i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
          >
            <SlideImage slide={s} initial={i === 0} />
            {active === i && !reduced && (
              <div className="hero-shutters" aria-hidden="true">
                {Array.from({ length: 7 }, (_, index) => (
                  <span
                    className="hero-panel"
                    key={index}
                    style={{ "--panel-index": index }}
                  >
                    <SlideImage slide={s} initial={i === 0} panel />
                  </span>
                ))}
              </div>
            )}
            <div className="container hero-content">
              <span className="eyebrow light">
                <span />
                {s.eyebrow}
              </span>
              {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
              <p>{s.text}</p>
              <div className="button-row">
                <a className="button button-gold" href={s.href}>
                  {s.action}
                  <Icon name="arrow" />
                </a>
                <a className="button button-outline-light" href="#contact">
                  Request a quote
                </a>
              </div>
              <div className="hero-proof">
                <span>
                  <Icon name="box" /> Bulk & B2B supply
                </span>
                <span>
                  <Icon name="pin" /> Based in Bareilly, India
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container hero-controls">
        <div className="slide-indicators">
          {slides.map((s, i) => (
            <button
              key={s.label}
              className={active === i ? "selected" : ""}
              aria-label={`Show slide ${i + 1}: ${s.label}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => go(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="hero-arrows">
          <button
            className="icon-button"
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
          >
            <Icon name="left" />
          </button>
          <button
            className="icon-button"
            onClick={() => go(active + 1)}
            aria-label="Next slide"
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
