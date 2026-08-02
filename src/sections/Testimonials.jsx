import { useEffect, useRef, useState, useCallback } from "react";
import Reveal from "../Reveal";
import TESTIMONIALS from "../json/testimonial.json";

const BREAKPOINTS = [
  { max: 720, itemsPerView: 1 },
  { max: 1024, itemsPerView: 2 },
];
const DEFAULT_ITEMS_PER_VIEW = 3;
const AUTOPLAY_MS = 5000;

function useItemsPerView() {
  const getItemsPerView = () => {
    if (typeof window === "undefined") return DEFAULT_ITEMS_PER_VIEW;
    const hit = BREAKPOINTS.find((bp) => window.innerWidth <= bp.max);
    return hit ? hit.itemsPerView : DEFAULT_ITEMS_PER_VIEW;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);

  useEffect(() => {
    function handleResize() {
      setItemsPerView(getItemsPerView());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerView;
}

export default function Testimonials() {
  const itemsPerView = useItemsPerView();
  const maxIndex = Math.max(0, TESTIMONIALS.length - itemsPerView);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const trackRef = useRef(null);

  // Clamp index whenever itemsPerView changes (e.g. resize crosses a
  // breakpoint) so we never end up pointing past the last valid slide.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (n) => {
      const clamped = Math.max(0, Math.min(n, maxIndex));
      setIndex(clamped);
    },
    [maxIndex]
  );

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  // Autoplay — pauses on hover/focus and whenever there's nothing to
  // advance through (e.g. desktop width showing all testimonials at once).
  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, maxIndex, next]);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 40;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
  }

  const slideWidthPct = 100 / itemsPerView;
  const trackOffsetPct = index * slideWidthPct;
  const dotCount = maxIndex + 1;

  return (
    <section id="testimonials">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">Trusted By</span>
          <h2>What our clients say.</h2>
        </Reveal>

        <Reveal
          className="testi-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="testi-viewport">
            <div
              className="testi-track"
              ref={trackRef}
              style={{
                transform: `translateX(-${trackOffsetPct}%)`,
                transition: "transform 0.5s ease",
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {TESTIMONIALS.map((t) => (
                <div
                  className="testi-slide"
                  key={t.who}
                  style={{ flex: `0 0 ${slideWidthPct}%` }}
                >
                  <div className="testi">
                    <div className="quote-mark">&ldquo;</div>
                    <p className="qtext">{t.text}</p>
                    <div className="who">{t.who}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <>
              <button
                type="button"
                className="carousel-arrow prev"
                onClick={prev}
                aria-label="Previous testimonials"
              >
                ‹
              </button>
              <button
                type="button"
                className="carousel-arrow next"
                onClick={next}
                aria-label="Next testimonials"
              >
                ›
              </button>

              <div className="carousel-dots" role="tablist" aria-label="Testimonial slides">
                {Array.from({ length: dotCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={index === i}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`carousel-dot ${index === i ? "active" : ""}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}