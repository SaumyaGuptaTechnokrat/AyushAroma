import { useEffect, useRef, useState } from "react";

/**
 * Reveal
 * -----------------------------------------------------------------------
 * Wraps its children in a container that fades/slides into view (via the
 * `in` class) once it crosses the given IntersectionObserver threshold.
 * Pass `as` to render a different tag (e.g. "section", "form", "h2").
 */
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
  
    // Respect users who've asked for reduced motion — skip the animation
    // and just show content immediately.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }
  
    const io = new IntersectionObserver(/* ...unchanged... */);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  
  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}