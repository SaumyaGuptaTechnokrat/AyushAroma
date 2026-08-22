import { useEffect, useState } from "react";

/* -----------------------------------------------------------------
   Icons — plain inline SVGs (stroke=currentColor) so each button
   picks up the same color transitions (hover / .active) the CSS
   already defines for text, no separate icon color rules needed.
   Same line style (1.8–2px stroke, round caps) as the phone/mail
   icons already used in the header in App.jsx, so this reads as
   the same icon set rather than a mismatched one.
----------------------------------------------------------------- */
function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 11.5 12 4l8.5 7.5" />
      <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9.5v-6h5v6H17.5a1 1 0 0 0 1-1V10" />
    </svg>
  );
}
function IconInfo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <line x1="12" y1="11" x2="12" y2="16.2" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconDroplet() {
  // Echoes the brand logo mark (same droplet shape used in the header).
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5s-6.5 7.3-6.5 11.3a6.5 6.5 0 0 0 13 0c0-4-6.5-11.3-6.5-11.3z" />
    </svg>
  );
}
function IconProcess() {
  // A simple flow/pulse line — reads as "process" without borrowing
  // a generic gear icon that's already overused across the site.
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 13 8 13 10 7 14 19 16 13 21 13" />
    </svg>
  );
}
function IconShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 19 6.5V11c0 5-3 8.3-7 9.5-4-1.2-7-4.5-7-9.5V6.5L12 3.5z" />
      <path d="M9 12.2 11.2 14.4 15.3 10" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

// Sections this nav links to. These ids should already exist on the
// corresponding sections (they match the ids used by the header's
// #about / #products / #process / #quality / #contact links in App.jsx).
// "Overview" scrolls to the very top of the page instead of an id.
// `label` is kept for accessibility (aria-label / tooltip / screen
// readers) even though it's no longer rendered as visible text.
const NAV_ITEMS = [
  { id: "top", label: "Overview", Icon: IconHome },
  { id: "about", label: "About", Icon: IconInfo },
  { id: "products", label: "Products", Icon: IconDroplet },
  { id: "process", label: "Process", Icon: IconProcess },
  { id: "quality", label: "Quality", Icon: IconShieldCheck },
  { id: "contact", label: "Contact", Icon: IconMail },
];

// How close the footer's top edge is allowed to get to the viewport
// bottom before the nav hides. Roughly "nav height + a little air",
// so the pill is fully gone before the footer would ever reach it.
const FOOTER_CLEARANCE = 140;

// Same header-offset logic already used in App.jsx / Products.jsx, so
// scrolling here lands consistently with the rest of the site.
function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const measured = parseFloat(raw);
  if (!Number.isNaN(measured) && measured > 0) return measured + 12;
  return window.innerWidth <= 720 ? 90 : 110;
}

export default function BottomNav() {
  const [active, setActive] = useState("top");
  const [visible, setVisible] = useState(false);
  // True once the footer is close enough to the bottom of the viewport
  // that the pill nav should get out of the way. The nav stays a plain
  // `position: fixed` element the whole time — this only ever toggles
  // its opacity/visibility, it never repositions to "follow" scroll.
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const sectionEls = NAV_ITEMS
      .filter((item) => item.id !== "top")
      .map((item) => ({ id: item.id, el: document.getElementById(item.id) }))
      .filter((s) => s.el);

    // NOTE: assumes Footer.jsx renders a <footer> element. If your
    // footer uses a different tag/id/class, update this selector to
    // match (e.g. document.getElementById("site-footer")).
    const footerEl = document.querySelector("footer");

    function handleScroll() {
      setVisible(window.scrollY > 260);

      // Scrollspy: whichever section's top has scrolled past the
      // header offset (with a little buffer) is the active one.
      const spyOffset = getHeaderOffset() + 60;
      let current = "top";
      for (const { id, el } of sectionEls) {
        if (el.getBoundingClientRect().top - spyOffset <= 0) current = id;
      }
      setActive(current);

      // Footer-avoidance: once the footer's top edge scrolls within
      // FOOTER_CLEARANCE of the viewport bottom, hide the nav (fade
      // out) instead of nudging its position to chase the footer.
      if (footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top;
        setNearFooter(footerTop <= window.innerHeight - FOOTER_CLEARANCE);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function goTo(id) {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    const offset = getHeaderOffset();
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }

  return (
    <nav
      className={`bottom-nav ${visible && !nearFooter ? "visible" : ""}`}
      aria-label="Section navigation"
    >
      <ul>
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <li key={id}>
            <button
              type="button"
              className={active === id ? "active" : ""}
              aria-current={active === id ? "true" : undefined}
              aria-label={label}
              title={label}
              onClick={() => goTo(id)}
            >
              <Icon />
              <span className="sr-only">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}