import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";

// Placeholder rotation using photography already in the project —
// swap these four for real facility/production-line photos whenever
// you have them; the carousel logic doesn't change.
import factory from "../assets/factory.png";
import essentialImg from "../assets/hero-essential.png";
import carrierImg from "../assets/hero-carrier.png";
import mintImg from "../assets/hero-mint-1.png";

const FACILITY_IMAGES = [factory, essentialImg, carrierImg, mintImg];
const AUTOPLAY_MS = 4000;

const TRUST_POINTS = [
  {
    label: "Natural Ingredients",
    icon: (
      <path d="M12 21c-4.5 0-8-3.5-8-8 0-6 8-11 8-11s8 5 8 11c0 4.5-3.5 8-8 8zm0-3v-9" />
    ),
  },
  {
    label: "Global Supply",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9z" />
      </>
    ),
  },
  {
    label: "Quality Assured",
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    label: "Custom Specifications",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 13.5a1.7 1.7 0 000-3l1-1.7-1.7-1.7-1.7 1a1.7 1.7 0 00-3 0l-1-1.7-1.7 1.7 1 1.7a1.7 1.7 0 00-3 0l-1.7-1-1.7 1.7 1 1.7a1.7 1.7 0 000 3l-1 1.7 1.7 1.7 1.7-1a1.7 1.7 0 003 0l1 1.7 1.7-1.7-1-1.7a1.7 1.7 0 003 0l1.7 1 1.7-1.7z" />
      </>
    ),
  },
  {
    label: "Long-Term Partnerships",
    icon: (
      <>
        <path d="M8 12l3 3 6-6" />
        <path d="M3 12l4-4 3 3-4 4-3-3zM21 12l-4-4-3 3 4 4 3-3z" />
      </>
    ),
  },
];

/**
 * Manufacturing
 * -----------------------------------------------------------------------
 * Dark-green "Our Manufacturing" banner with an auto-rotating (fading)
 * photo carousel on the right, sitting below the Hero. Underneath it, a
 * light row of five trust points with simple icon badges.
 *
 * The carousel is intentionally chrome-free (no arrows/dots) — it just
 * cross-fades on a timer, pausing on hover/focus/touch the same way the
 * other carousels in this codebase do, so it never fights someone who's
 * actively reading.
 */
export default function Manufacturing() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % FACILITY_IMAGES.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(id);
  }, [paused]);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      setIndex((i) =>
        delta < 0 ? (i + 1) % FACILITY_IMAGES.length : (i - 1 + FACILITY_IMAGES.length) % FACILITY_IMAGES.length
      );
    }
    touchStartX.current = null;
    setPaused(false);
  }

  return (
    <section className="manufacturing" id="manufacturing">
      <div className="wrap">
        <Reveal className="mfg-banner">
          <div className="mfg-text">
            <div className="mfg-text-inner">
              <span className="tag">Our Manufacturing</span>
              <h2>Where Nature Meets Precision</h2>
              <p className="section-lead">Modern equipment. Controlled processes. Consistent quality.</p>
              <a href="#quality" className="btn-outline mfg-cta">
                Discover Our Facility →
              </a>
            </div>
          </div>

          <div
            className="mfg-media"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {FACILITY_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? "Ayush Aromatics production facility" : ""}
                aria-hidden={i !== 0}
                className={`mfg-slide ${i === index ? "active" : ""}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
        </Reveal>

        <Reveal className="mfg-trust-row">
          {TRUST_POINTS.map((t) => (
            <div className="mfg-trust-item" key={t.label}>
              <span className="mfg-trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {t.icon}
                </svg>
              </span>
              <span className="mfg-trust-label">{t.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}