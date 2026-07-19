import Reveal from "../Reveal";

export default function About({ companyName }) {
  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-figure">
          <span className="cap">Production facility — Ghaziabad, Uttar Pradesh</span>
        </Reveal>
        <Reveal as="div" className="about-text">
          <span className="tag">Our Story</span>
          <h2>Built on science, driven by purity.</h2>
          <p style={{ marginTop: 24 }}>
            <strong>{companyName}</strong> runs a GMP and HACCP-qualified production facility, equipped with
            indigenously engineered distillation machinery and SS304L-grade equipment, so every batch meets
            exacting national and international benchmarks.
          </p>
          <p>
            Our approach rests on three commitments — superior quality, on-time delivery and commercially
            competitive pricing — the same principles that have guided us since 2009, working only with
            natural raw materials and never any synthetic shortcuts.
          </p>
          <div className="about-pillars">
            <div className="pillar"><b>GMP &amp; HACCP</b><span>Qualified Facility</span></div>
            <div className="pillar"><b>ISO 9001</b><span>Quality Managed</span></div>
            <div className="pillar"><b>20+ Years</b><span>Industry Experience</span></div>
            <div className="pillar"><b>110+ Countries</b><span>Global Reach</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}