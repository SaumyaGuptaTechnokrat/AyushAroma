import useQuote from "../hooks/useQuote";
import Icon from "./Icon";
export default function ProductCard({
  product,
  compact = false,
  heading = "h3",
}) {
  const Heading = heading;
  const { openQuote } = useQuote();
  return (
    <article
      className={`product-card${compact ? " compact-product-card" : ""}`}
    >
      <a href={product.path} className="product-photo">
        <img
          src={product.image}
          alt={`${product.category} range illustration`}
          width="360"
          height="280"
          loading="lazy"
        />
        <span>
          {compact
            ? "Range illustration"
            : `${product.category} · Range illustration`}
        </span>
      </a>
      <div className="product-info">
        <small>{product.num}</small>
        <Heading>
          <a href={product.path}>{product.title}</a>
        </Heading>
        <p>
          {compact
            ? "Specifications on request."
            : "Discuss specifications, quantity and bulk supply."}
        </p>
        <div className="card-actions">
          <a href={product.path}>
            View details <Icon name="arrow" />
          </a>
          <button
            className={compact ? "compact-quote" : undefined}
            onClick={() => openQuote(product)}
          >
            Request quote
          </button>
        </div>
      </div>
    </article>
  );
}
