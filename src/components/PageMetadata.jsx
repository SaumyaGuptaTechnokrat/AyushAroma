import { useEffect } from "react";
import { business } from "../config/business";
export default function PageMetadata({ title, description, breadcrumbs = [] }) {
  useEffect(() => {
    const previousTitle = document.title;
    const targets = [
      ['meta[name="description"]', "content", description],
      ['meta[property="og:title"]', "content", `${title} | ${business.name}`],
      ['meta[property="og:description"]', "content", description],
    ];
    const previous = targets.map(([selector, attribute, value]) => {
      const element = document.querySelector(selector);
      const old = element?.getAttribute(attribute);
      element?.setAttribute(attribute, value);
      return { element, attribute, old };
    });
    document.title = `${title} | ${business.name}`;
    return () => {
      document.title = previousTitle;
      previous.forEach(({ element, attribute, old }) => {
        if (old !== null && old !== undefined)
          element?.setAttribute(attribute, old);
      });
    };
  }, [title, description]);
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#products" },
      ...breadcrumbs,
    ].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${business.siteUrl.replace(/\/$/, "/")}${item.href || ""}`,
    })),
  };
  return breadcrumbs.length ? (
    <script type="application/ld+json">
      {JSON.stringify(data).replace(/</g, "\\u003c")}
    </script>
  ) : null;
}
