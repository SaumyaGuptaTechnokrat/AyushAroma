import { getCategoryImage, findProduct, productPath } from "../productUtils";

export default function ProductDetail({ id, companyName }) {
  const found = findProduct(id);

  if (!found) {
    return (
      <section className="pd-section">
        <div className="wrap pd-missing">
          <h1>Product not found</h1>
          <p>This product may have been moved or renamed.</p>
          <a className="pd-btn pd-btn-primary" href="#products">← Back to Products</a>
        </div>
      </section>
    );
  }

  const { category, categoryIndex, product } = found;
  const img = getCategoryImage(categoryIndex);
  const related = category.items.filter((p) => p !== product).slice(0, 3);

  const enquireOnWhatsApp = () =>
    window.dispatchEvent(
      new CustomEvent("open-whatsapp-enquiry", { detail: { product: product.title } })
    );

  const specs = [
    ["Category", category.category],
    ["Product", product.title],
    ["Packaging", "Bulk, retail or private-label"],
    ["Documentation", "COA & MSDS with every shipment"],
    ["Minimum order", "From 1 kg for trial orders"],
    ["Manufacturing", "GMP & HACCP-qualified plant, India"],
  ];

  return (
    <section className="pd-section">
      <div className="wrap">
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <a href="#">Home</a><span>/</span>
          <a href="#products">Products</a><span>/</span>
          <span>{category.category}</span>
        </nav>

        <div className="pd-grid">
          <div className="pd-media">
            <img src={img} alt={`${product.title} — ${category.category}`} />
          </div>

          <div className="pd-info">
            <span className="tag">{category.category}</span>
            {product.badge && <span className="pd-badge">{product.badge}</span>}
            <h1>{product.title}</h1>
            <p className="pd-lead">{product.desc || category.desc}</p>

            <dl className="pd-specs">
              {specs.map(([k, v]) => (
                <div className="pd-spec-row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="pd-actions">
              <a className="pd-btn pd-btn-primary" href="#contact">Request a Quote</a>
              <button type="button" className="pd-btn pd-btn-wa" onClick={enquireOnWhatsApp}>
                Enquire on WhatsApp
              </button>
            </div>
            <a className="pd-back" href="#products">← Back to all products</a>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pd-related">
            <h2>More from {category.category}</h2>
            <div className="pd-related-grid">
              {related.map((p) => (
                <a className="pd-related-card" key={`${p.num}-${p.title}`} href={productPath(categoryIndex, p)}>
                  <img src={img} alt="" loading="lazy" />
                  <h3>{p.title}</h3>
                  <span>View details →</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}