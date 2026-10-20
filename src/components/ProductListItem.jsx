import Icon from "./Icon";
import useQuote from "../hooks/useQuote";
export default function ProductListItem({ product, heading = "h2" }) {
  const Heading = heading;
  const { openQuote } = useQuote();
  const reference = product.content.reference;
  return (
    <article className="product-list-item">
      <a
        className="list-item-image"
        href={product.path}
        aria-label={`View ${product.title}`}
      >
        <img
          src={product.image}
          width="240"
          height="220"
          alt={`${product.category} range illustration; not a product-specific photograph`}
          loading="lazy"
        />
        <span>Range illustration</span>
      </a>
      <div className="list-item-copy">
        <span className="list-item-code">{product.num}</span>
        <Heading>
          <a href={product.path}>{product.title}</a>
        </Heading>
        {reference?.botanicalName && (
          <p className="list-botanical">
            Botanical reference: <i>{reference.botanicalName}</i>
          </p>
        )}
        <p>
          {product.content.shortDescription ||
            reference?.overview ||
            `${product.title} from our ${product.category.toLowerCase()} collection. Request the current specification for your sourcing brief.`}
        </p>
        <div className="list-applications">
          {product.content.applications.length > 0 ? (
            <span>
              <strong>Applications:</strong>{" "}
              {product.content.applications.join(" · ")}
            </span>
          ) : (
            <span>
              <strong>Application suitability:</strong> confirm your intended
              use and required grade.
            </span>
          )}
        </div>
      </div>
      <div className="list-item-actions">
        <button className="button" onClick={() => openQuote(product)}>
          Request quote <Icon name="arrow" />
        </button>
        <a className="text-link" href={product.path}>
          View details <Icon name="arrow" />
        </a>
      </div>
    </article>
  );
}
