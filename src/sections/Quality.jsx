import { useRef } from "react";
import Reveal from "../Reveal";
import BADGES from "../json/badges.json";

export default function Quality() {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 10; // max 10deg
    const rotateX = -((y - centerY) / centerY) * 10;

    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;

    // move icon/text slightly for parallax
    const inner = card.querySelector(".badge-inner");
    if (inner) {
      inner.style.transform = `translateX(${(x - centerX) / 18}px) translateY(${(y - centerY) / 18}px)`;
    }
  };

  const handleMouseLeave = (i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.transform = `perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    const inner = card.querySelector(".badge-inner");
    if (inner) inner.style.transform = `translateX(0) translateY(0)`;
  };

  return (
    <section className="quality" id="quality">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="tag">Quality You Can Verify</span>
          <h2>Every claim, backed by paper.</h2>
        </Reveal>
        <Reveal className="badges">
          {BADGES.map((b, i) => (
            <div
              className="badge"
              key={b.title}
              ref={(el) => (cardRefs.current[i] = el)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className="badge-inner">
                <div className="bicon">{b.icon}</div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}