import { useCallback, useEffect, useRef, useState } from "react";

// Photography for each slide. Swap these paths for wherever the assets
// live in your project (e.g. "./assets/hero-essential.jpg").
import essentialImg from "../assets/hero-essential.png";
import carrierImg from "../assets/hero-carrier.png";
import mintImg from "../assets/hero-mint.png";

/**
 * HeroSlider
 * -----------------------------------------------------------------------
 * Full-width sliding banner for the top of the page: photography per
 * slide, a dark gradient overlay for text contrast, heading/copy/CTAs on
 * top, autoplay, and arrow + dot controls.
 *
 * Autoplay pauses on hover/focus/touch, same pattern used elsewhere in
 * this codebase (see the Testimonials carousel), so it never fights a
 * user who's actively reading or interacting.
 */

// U+2011 (non-breaking hyphen) is used in place of "-" inside compound
// words below (e.g. "pharma‑grade"). A literal "-" is a valid line-break
// point to the browser's line-breaking algorithm, which is what caused
// "pharma-grade" to wrap as "pharma-" / "grade standards." in testing.
// The non-breaking hyphen renders identically but is never treated as a
// break opportunity, so the compound word always stays on one line.
const SLIDES = [
  {
    id: "essential-oils",
    theme: "essential",
    image: essentialImg,
    eyebrow: "Manufacturer & Exporter — Est. 2009",
    heading: "Pure natural oils, engineered for global industry.",
    sub: "Two decades distilling essential oils, menthol & mint products, carrier oils and specialty extracts for pharmaceutical, food manufacturers ",
  },
  {
    id: "carrier-oils",
    theme: "carrier",
    image: carrierImg,
    eyebrow: "Cold\u2011Pressed & Natural",
    heading: "Carrier oils, consistent from the first batch to the last.",
    sub: "Cold\u2011pressed and naturally extracted, standardised with the help of well\u2011equipped in\u2011house testing, and prepared to spec for food, pharma and cosmetic use.",
  },
  {
    id: "menthol-mint",
    theme: "mint",
    image: mintImg,
    eyebrow: "GMP\u2011Compliant Production",
    heading: "Menthol & mint, manufactured to pharma",
    sub: "Crystals, flakes and derivatives manufactured under GMP conditions for pharma, food and flavour applications, with full documentation on every shipment.",
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((n) => {
    setIndex(((n % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  // Pause on keyboard navigation too, and let arrow keys drive the
  // slider when it (or something inside it) has focus.
  function onKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 40;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
    setPaused(false);
  }

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Featured product ranges"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div
        className="hero-slide-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {SLIDES.map((slide, i) => (
          <div
            className={`hero-slide hero-slide--${slide.theme}`}
            key={slide.id}
            aria-hidden={index !== i}
          >
            {/* Rendered as a CSS background-image rather than an <img>
                element: background-size:cover on a fully inset:0 div
                always covers the box completely by definition, with no
                dependency on how an <img>'s own width/height resolve —
                which is what was leaving a gap at the bottom before. */}
            <div
              className="hero-slide-art"
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label=""
            />
            <div className="hero-slide-overlay" />
            <div className="wrap hero-slide-content">
              <span className="eyebrow">{slide.eyebrow}</span>
              <h1 className="headline">{slide.heading}</h1>
              <p className="hero-sub">{slide.sub}</p>
              <div className="hero-actions">
                <a href="#contact" className="btn-primary">Request a Quote</a>
                <a href="#products" className="btn-ghost">View Our Range ↓</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="hero-arrow prev" onClick={prev} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button type="button" className="hero-arrow next" onClick={next} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="hero-dots" role="tablist" aria-label="Slides">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === i}
            aria-label={`Go to slide ${i + 1}`}
            className={`hero-dot ${index === i ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}