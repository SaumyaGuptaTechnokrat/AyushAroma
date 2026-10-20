import Icon from "./Icon";
export default function Breadcrumbs({ items }) {
  return (
    <nav className="browse-breadcrumb" aria-label="Breadcrumb">
      <ol>
        {[
          { label: "Home", href: "#" },
          { label: "Products", href: "#products" },
          ...items,
        ].map((item, i, all) => (
          <li key={`${item.label}-${i}`}>
            {i > 0 && <Icon name="down" />}
            {item.href && i !== all.length - 1 ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
