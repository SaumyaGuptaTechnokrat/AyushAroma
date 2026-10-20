import Reveal from "../Reveal";

const PROCESS_STEPS = [
  { step: "01", title: "Sourcing", desc: "Raw botanicals are procured directly from growers and trusted regional traders across India, selected for peak maturity and yield." },
  { step: "02", title: "Extraction & Distillation", desc: "Steam distillation and cold-press extraction carried out in our GMP-qualified plant, using indigenously engineered machinery." },
  { step: "03", title: "Quality Testing", desc: "Each batch is checked against pharma, food and cosmetic-grade specifications before a Certificate of Analysis is issued." },
  { step: "04", title: "Documentation", desc: "COA, MSDS and other supporting quality documents are prepared and attached to every shipment for customs and regulatory review." },
  { step: "05", title: "Export", desc: "Orders are packed, cleared and shipped to more than 110 countries, including the US, UAE and South Korea." },
];

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">From Sourcing to Shipment</span>
          <h2>Our process, batch by batch.</h2>
          <p className="section-lead">
            A real, ordered process — the same five steps every batch goes through before it reaches you.
          </p>
        </Reveal>
        <Reveal className="process-list">
          {PROCESS_STEPS.map((s) => (
            <div className="process-item" key={s.step}>
              <div className="pstep">{s.step}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}