import Reveal from "../Reveal";
import BADGES from "../json/badges.json";

export default function Quality() {
  return (
    <section className="quality" id="quality">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">Quality You Can Verify</span>
          <h2>Every claim, backed by paper.</h2>
        </Reveal>
        <Reveal className="badges">
          {BADGES.map((b) => (
            <div className="badge" key={b.title}>
              <div className="bicon">{b.icon}</div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}