import Reveal from "../Reveal";
import TESTIMONIALS from "../json/testimonial.json";

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">Trusted B</span>
          <h2>What our clients say.</h2>
        </Reveal>
        <Reveal className="testi-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testi" key={t.who}>
              <div className="quote-mark">&ldquo;</div>
              <p className="qtext">{t.text}</p>
              <div className="who">{t.who}</div>
              <div className="role">{t.role}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}