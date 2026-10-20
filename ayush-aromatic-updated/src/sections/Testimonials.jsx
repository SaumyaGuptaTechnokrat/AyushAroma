import { useEffect, useRef, useState, useCallback } from "react";
import Reveal from "../Reveal";
import TESTIMONIALS from "../json/testimonial.json";
// import "./Testimonials.css";

const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const maxIndex = TESTIMONIALS.length - 1;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((n) => {
    setIndex(Math.max(0, Math.min(n, maxIndex)));
  }, [maxIndex]);

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

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
    if (delta > 40) prev();
    else if (delta < -40) next();
    touchStartX.current = null;
  }

  return (
    <section id="testimonials" className="bg-beige">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">Trusted By</span>
          <h2>What our clients say.</h2>
        </Reveal>

        {/* Plain div, not Reveal — guarantees inline styles/handlers reach the DOM */}
        <div
          className="testi-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="testi-viewport">
            <div
              className="testi-track"
              style={{
                width: `${TESTIMONIALS.length * 100}%`,
                transform: `translateX(-${index * (100 / TESTIMONIALS.length)}%)`,
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  className="testi-slide"
                  key={t.who || `testimonial-${i}`}
                  style={{ width: `${100 / TESTIMONIALS.length}%` }}
                >
                  <div className="testi">
                    <div className="quote-mark">&ldquo;</div>
                    <p className="qtext">{t.text}</p>
                    {/* Was rendering an empty line whenever a testimonial
                        entry had no "who" value (see testimonial.json) —
                        a blank bold line above the role reads as broken.
                        Falls back to a neutral label instead. */}
                    <div className="who">{t.who || "Verified Client"}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <>
              <button type="button" className="carousel-arrow prev" onClick={prev} aria-label="Previous">‹</button>
              <button type="button" className="carousel-arrow next" onClick={next} aria-label="Next">›</button>

              <div className="carousel-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`carousel-dot ${index === i ? "active" : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}