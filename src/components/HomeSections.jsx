import { useRef, useState } from "react";
import { business } from "../config/business";
import { categories, categoryPath, popularProducts } from "../data/catalogue";
import ProductCard from "./ProductCard";
import Icon from "./Icon";
import aboutImage from "../assets/carrier-wide.webp";
export function AboutSection({ expanded = false }) {
  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="about-image">
          <img
            src={aboutImage}
            alt="Carrier oils and botanical ingredients from the existing Ayush Aromatics collection"
            width="800"
            height="640"
            loading="lazy"
          />
          <div className="image-caption">
            <Icon name="leaf" />
            <span>
              Rooted in nature.
              <br />
              <strong>Focused on your business.</strong>
            </span>
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">MEET AYUSH AROMATICS</span>
          {expanded ? (
            <h1>
              Natural ingredients.
              <br />A business-first approach.
            </h1>
          ) : (
            <h2>
              Natural ingredients.
              <br />A business-first approach.
            </h2>
          )}
          <p>
            {business.name} supplies essential oils, mint products, carrier oils
            and aromatic ingredients from Bareilly, Uttar Pradesh, India.
          </p>
          <p>
            We work with bulk buyers, manufacturers and distributors looking for
            ingredients for personal care, fragrance, food and other
            applications. Explore our catalogue, then speak to our team about
            specifications, quantities and your destination.
          </p>
          <div className="about-strengths">
            <span>
              <Icon name="check" /> Six product categories
            </span>
            <span>
              <Icon name="check" /> Direct business enquiries
            </span>
          </div>
          {!expanded && (
            <a className="text-link" href="#/company">
              Know more about us <Icon name="arrow" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
export function PopularProducts() {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  function update() {
    const el = track.current;
    setEdges({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  }
  function move(direction) {
    const el = track.current;
    const card = el.firstElementChild;
    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 24),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section className="section popular-section" id="popular">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE PRODUCT COLLECTION</span>
            <h2>Our popular products</h2>
            <p>
              Explore our range of essential oils, mint derivatives, and natural
              aromatic ingredients.
            </p>
          </div>
          <div className="carousel-arrows">
            <button
              className="icon-button"
              aria-label="Previous products"
              disabled={edges.start}
              onClick={() => move(-1)}
            >
              <Icon name="left" />
            </button>
            <button
              className="icon-button"
              aria-label="Next products"
              disabled={edges.end}
              onClick={() => move(1)}
            >
              <Icon name="arrow" />
            </button>
          </div>
        </div>
        <div
          className="product-carousel"
          ref={track}
          onScroll={update}
          tabIndex="0"
          aria-label="Popular products. Swipe or use arrow keys to browse."
          onKeyDown={(e) => {
            if (
              e.target === e.currentTarget &&
              ["ArrowLeft", "ArrowRight"].includes(e.key)
            ) {
              e.preventDefault();
              move(e.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {popularProducts.map((p) => (
            <ProductCard key={p.path} product={p} />
          ))}
        </div>
        <div className="section-end">
          <span>Find the right ingredient for your next formulation.</span>
          <a className="text-link" href="#products">
            View all products <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
export function CategoriesSection() {
  return (
    <section className="section categories-section" id="categories">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A RANGE BUILT AROUND YOUR NEEDS</span>
            <h2>Explore by category</h2>
          </div>
          <p>
            From the freshness of mint to the depth of botanicals.
            <br />
            Discover the ingredients behind your products.
          </p>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => (
            <a
              className="category-card"
              key={c.category}
              href={categoryPath(c.category)}
            >
              <img
                src={c.image}
                width="640"
                height="400"
                loading="lazy"
                alt={`${c.category} range illustration`}
              />
              <span className="category-number">0{i + 1}</span>
              <div>
                <span>
                  <small>EXPLORE THE RANGE</small>
                  <h3>{c.category}</h3>
                </span>
                <span className="category-arrow">
                  <Icon name="arrow" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
const advantages = [
  [
    "file",
    "Specification-led enquiries",
    "Discuss your required grade, documentation and application before ordering.",
  ],
  [
    "box",
    "Built for B2B buyers",
    "Share your volume and destination for a quotation tailored to your requirement.",
  ],
  [
    "leaf",
    "A connected product range",
    "Explore mint products, essential oils, carrier oils and speciality ingredients together.",
  ],
  [
    "chat",
    "A direct conversation",
    "Reach our team by phone, email or WhatsApp to discuss your next order.",
  ],
];
export function WhySection() {
  return (
    <section className="section why-section" id="why-us">
      <div className="container">
        <div className="why-heading">
          <div>
            <span className="eyebrow light">THE AYUSH APPROACH</span>
            <h2>
              Good ingredients begin
              <br />
              with a clear conversation.
            </h2>
          </div>
          <p>
            A practical approach to sourcing.
            <br />
            Your product. Your specification. Your business.
          </p>
        </div>
        <div className="advantages">
          {advantages.map(([icon, title, text]) => (
            <article key={title}>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
const industries = [
  [
    "heart",
    "Cosmetics & personal care",
    "Carrier and essential oils for formulation enquiries.",
  ],
  [
    "leaf",
    "Fragrance & perfumery",
    "Aromatic oils and ingredients for your fragrance brief.",
  ],
  [
    "flask",
    "Pharmaceutical applications",
    "Discuss mint and menthol specifications with our team.",
  ],
  [
    "sun",
    "Food & flavour",
    "Explore spice oils and mint ingredients for suitable applications.",
  ],
  [
    "globe",
    "Aromatherapy",
    "Explore the dedicated aromatherapy oil collection.",
  ],
  [
    "box",
    "Industrial applications",
    "Pine oils and derivatives for specification-led sourcing.",
  ],
];
export function IndustriesSection() {
  return (
    <section className="section industries-section" id="industries">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">INGREDIENTS WITH PURPOSE</span>
            <h2>For the industries you build.</h2>
          </div>
          <p>
            Explore potential applications from our catalogue.
            <br />
            Confirm suitability and grade for your intended use.
          </p>
        </div>
        <div className="industries-grid">
          {industries.map(([icon, title, text]) => (
            <article key={title}>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CompanyDetails() {
  return (
    <>
      <AboutSection expanded />
      <section className="section company-details">
        <div className="container">
          <span className="eyebrow">QUALITY & PRODUCT REQUIREMENTS</span>
          <h2>Make every requirement clear.</h2>
          <p className="lead">
            Start with the application, specification and documentation your
            business needs. Our team can discuss product-specific availability
            and supply details.
          </p>
          <div className="industries-grid">
            <article id="process">
              <Icon name="flask" />
              <h3>Product & processing</h3>
              <p>
                Ask about the origin, extraction or processing method for your
                selected ingredient. Manufacturing details vary by product.
              </p>
            </article>
            <article id="quality">
              <Icon name="file" />
              <h3>Quality & documentation</h3>
              <p>
                Request current specifications, a Certificate of Analysis,
                safety data and any certification needed for your application.
                Confirm availability before ordering.
              </p>
            </article>
            <article>
              <Icon name="box" />
              <h3>Packaging & delivery</h3>
              <p>
                Include quantity, packaging requirements and destination with
                your enquiry so supply terms can be discussed.
              </p>
            </article>
          </div>
          <a className="button" href="#contact">
            Discuss your requirements <Icon name="arrow" />
          </a>
        </div>
      </section>
    </>
  );
}
