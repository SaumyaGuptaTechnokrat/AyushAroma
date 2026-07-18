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
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}