import Reveal from "../Reveal";
import PRODUCTS from "../json/products.json";
export default function Products() {
  return (
    <section id="products">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">What We Offer</span>
          <h2>A complete range for pharma, cosmetic &amp; food manufacturers.</h2>
          <p className="section-lead">
            From menthol crystals to cold-pressed carrier oils — every product ships with full documentation,
            in bulk, retail or private-label packaging.
          </p>
        </Reveal>
        <Reveal className="products-grid">
          {PRODUCTS.map((p) => (
            <div className="product-card" key={p.num}>
              {p.badge && <span className="featured-badge">{p.badge}</span>}
              <span className="pnum">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="tagline">{p.tag}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}