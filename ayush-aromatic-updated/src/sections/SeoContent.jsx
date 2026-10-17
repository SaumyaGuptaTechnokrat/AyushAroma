import Reveal from "../Reveal";

const VARIETIES = [
  "Pure Essential Oils",
  "Menthol Crystals & Flakes",
  "Mint Oils (Japanese Mint, Peppermint, Spearmint)",
  "Cold-Pressed Carrier Oils",
  "Aromatherapy Oils",
  "Spice Oleoresins",
  "Pine Oil Derivatives",
  "Custom & Private-Label Oils",
];

const AREAS = [
  "Bareilly", "Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut",
  "Noida", "Ghaziabad", "Moradabad", "Rampur", "Pan-India", "110+ Countries",
];

export default function SeoContent({ companyName }) {
  return (
    <section className="seo-content" id="oil-manufacturer-india">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">Why {companyName}</span>
          <h2>Trusted oil manufacturer in Bareilly, Uttar Pradesh and across India.</h2>
          <p className="section-lead">
            Looking for the best oil manufacturer in India? We make pure, natural oils in our own
            GMP and HACCP-qualified plant in Bareilly and sell them directly, so you get genuine
            rates without middlemen.
          </p>
        </Reveal>

        <Reveal className="seo-grid">
          <article className="seo-card">
            <h3>Pure oils, nothing synthetic</h3>
            <p>
              Every oil is distilled or cold-pressed from natural raw materials and tested batch by
              batch in our in-house lab. Each shipment ships with a Certificate of Analysis, so the
              purity of what you buy is documented, not just promised.
            </p>
          </article>
          <article className="seo-card">
            <h3>Genuine rates, direct from the manufacturer</h3>
            <p>
              As the manufacturer, we quote factory-direct prices for bulk, retail and private-label
              orders. Buyers in Bareilly, across Uttar Pradesh and throughout India get transparent
              pricing and a reply within one business day.
            </p>
          </article>
          <article className="seo-card">
            <h3>A wide variety of oils in one place</h3>
            <p>
              From essential oils and menthol to mint, carrier and aromatherapy oils, you can source
              your full range from a single oil manufacturer in Uttar Pradesh, with custom
              specifications available for pharma, food and cosmetic brands.
            </p>
          </article>
        </Reveal>

        <Reveal className="seo-lists">
          <div>
            <h3>Oil varieties we manufacture</h3>
            <ul className="seo-chips">
              {VARIETIES.map((v) => <li key={v}>{v}</li>)}
            </ul>
          </div>
          <div>
            <h3>Supplying buyers in</h3>
            <ul className="seo-chips">
              {AREAS.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}