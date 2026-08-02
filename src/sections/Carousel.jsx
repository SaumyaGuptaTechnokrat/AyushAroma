import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Carousel
 * -----------------------------------------------------------------------
 * A lightweight, dependency-free carousel. Slides scroll natively via
 * CSS scroll-snap (so touch/trackpad swipe just works, no drag-handling
 * JS needed), with arrow buttons and dot indicators layered on top for
 * mouse/keyboard users. Active dot is derived by watching scroll
 * position, not by tracking state independently, so it never drifts out
 * of sync with what's actually on screen — including when the person
 * swipes instead of clicking a control.
 *
 * Usage:
 *   <Carousel className="quality-carousel" ariaLabel="Quality certifications">
 *     {items.map((item) => <div key={item.id}>...</div>)}
 *   </Carousel>
 *
 * `className` controls slide width per-instance (see carousel.css —
 * `.quality-carousel .carousel-slide` / `.testimonial-carousel .carousel-slide`).
 */
export default function Carousel({ children, className = "", ariaLabel }) {
    const slides = Array.isArray(children) ? children.filter(Boolean) : [children];
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);


  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    const slide = track.children[clamped];
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, [slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const kids = Array.from(track.children);
        let closest = 0;
        let closestDist = Infinity;
        kids.forEach((kid, i) => {
          const dist = Math.abs(kid.offsetLeft - track.offsetLeft - track.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`carousel ${className}`} role="region" aria-label={ariaLabel}>
      <div className="carousel-track" ref={trackRef}>
        {slides.map((slide, i) => (
          <div className="carousel-slide" key={i}>{slide}</div>
        ))}
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-arrow"
          aria-label="Previous"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot ${activeIndex === i ? "active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={activeIndex === i}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow"
          aria-label="Next"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === slides.length - 1}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}