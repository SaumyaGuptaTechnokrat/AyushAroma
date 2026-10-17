import { useState } from "react";
import Reveal from "../Reveal";

export default function FAQ({ companyName }) {
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (key) => {
    setOpenFaqs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const FAQS = [
    { q: "What is the minimum order quantity for bulk essential oils?", a: "Our minimum order quantity varies by product — most oils start from 1kg for trial orders, with no upper limit for bulk export orders. Contact us with your requirement for an exact quote." },
    { q: "Do you provide a COA and MSDS with each shipment?", a: "Yes. Every shipment includes a Certificate of Analysis and Material Safety Data Sheet, along with any other compliance documents your import process requires." },
    { q: `Can ${companyName} manufacture to a custom specification?`, a: "Yes, we formulate menthol, essential oil and carrier oil products to a client's brief for pharma, food and cosmetic applications, including private-label packaging." },
    { q: `Which countries does ${companyName} export to?`, a: "We currently export to 110+ countries including the United States, UAE and South Korea, and handle all documentation and customs clearance in-house for a smooth delivery." },
  ];

  return (
    <section id="faq">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">Common Questions</span>
          <h2>Frequently asked questions.</h2>
        </Reveal>
        <Reveal className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = !!openFaqs[f.q];
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={f.q}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => toggleFaq(f.q)}
                >
                  <h3>{f.q}</h3>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div id={`faq-answer-${i}`} className="faq-answer" role="region">
                  <div className="faq-answer-inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}