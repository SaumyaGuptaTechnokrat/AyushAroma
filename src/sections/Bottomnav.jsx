import { useEffect, useState } from "react";

// Sections this nav links to. These ids should already exist on the
// corresponding sections (they match the ids used by the header's
// #about / #products / #process / #quality / #contact links in App.jsx).
// "Overview" scrolls to the very top of the page instead of an id.
const NAV_ITEMS = [
  { id: "top", label: "Overview" },
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
  { id: "process", label: "Process" },
  { id: "quality", label: "Quality" },
  { id: "contact", label: "Contact" },
];

// Gap kept between the nav and the top of the footer once they meet.
const FOOTER_GAP = 20;

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
  // Extra distance (px) the nav is pushed up off the viewport bottom
  // so it never sits on top of the footer. 0 = resting position.
  const [lift, setLift] = useState(0);

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

      // Footer-avoidance: as the footer's top edge scrolls up within
      // FOOTER_GAP of the viewport bottom, lift the nav by exactly
      // that overlap amount, so it rides up together with the footer
      // instead of ever covering it — same effect as Google's version,
      // without needing to restructure where BottomNav lives in the DOM.
      if (footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top;
        const overlap = window.innerHeight - footerTop;
        setLift(overlap > 0 ? overlap + FOOTER_GAP : 0);
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
      className={`bottom-nav ${visible ? "visible" : ""}`}
      aria-label="Section navigation"
      style={{ "--bottom-nav-lift": `${lift}px` }}
    >
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "true" : undefined}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}