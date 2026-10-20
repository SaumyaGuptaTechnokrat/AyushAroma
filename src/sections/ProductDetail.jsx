import { useState } from "react";
import { categories, categoryPath, allProducts } from "../data/catalogue";
import CategorySidebar from "../components/CategorySidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductDetailSections from "../components/ProductDetailSections";
import RelatedProducts from "../components/RelatedProducts";
import PageMetadata from "../components/PageMetadata";
import Icon from "../components/Icon";
import { whatsappHref, business } from "../config/business";
import useQuote from "../hooks/useQuote";
export default function ProductDetail({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const { openQuote } = useQuote();
  const category = product ? categories[product.categoryIndex] : null;
  if (!product)
    return (
      <section className="browse-page">
        <PageMetadata
          title="Product not found"
          description="Browse the Ayush Aromatics catalogue to find the ingredient you need."
        />
        <div className="container browse-layout">
          <CategorySidebar />
          <div className="browse-main">
            <Breadcrumbs items={[{ label: "Product not found" }]} />
            <div className="empty-state">
              <h1>Product not found.</h1>
              <p>
                The requested product could not be found. Explore the catalogue
                or contact our team.
              </p>
              <a className="button" href="#products">
                Browse all products
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  const images = product.content.gallery.length
    ? product.content.gallery
    : [
        {
          src: product.image,
          alt: `${product.category} range illustration`,
          illustration: true,
        },
      ];
  const reference = product.content.reference;
  const breadcrumbs = [
    { label: product.category, href: categoryPath(category) },
    { label: product.title, href: product.path },
  ];
  const peers = allProducts.filter(
    (p) => p.categoryIndex === product.categoryIndex,
  );
  const index = peers.findIndex((p) => p.id === product.id);
  return (
    <section className="browse-page product-page">
      <PageMetadata
        title={`${product.title} - Bulk Enquiries`}
        description={`${product.title} (${product.num}) from Ayush Aromatics. Request technical specifications, documentation, packaging details and a bulk quotation.`}
        breadcrumbs={breadcrumbs}
      />
      <div className="container browse-layout">
        <CategorySidebar category={category} product={product} />
        <div className="browse-main">
          <Breadcrumbs items={breadcrumbs} />
          <div className="product-top">
            <div className="product-gallery">
              <img
                className="product-main-image"
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                width="960"
                height="580"
                fetchPriority="high"
              />
              {images[activeImage].illustration && (
                <p className="gallery-caption">
                  Range illustration. Ask our team for product-specific
                  photography.
                </p>
              )}
              {images.length > 1 && (
                <div className="product-gallery-thumbnails">
                  {images.map((image, i) => (
                    <button
                      key={image.src}
                      aria-label={`View image ${i + 1} of ${product.title}`}
                      aria-pressed={activeImage === i}
                      onClick={() => setActiveImage(i)}
                    >
                      <img
                        src={image.src}
                        alt=""
                        width="80"
                        height="64"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="product-heading-row">
              <div>
                <span className="eyebrow">{product.category}</span>
                <h1>{product.title}</h1>
                {reference?.botanicalName && (
                  <p className="product-botanical">
                    <i>{reference.botanicalName}</i>
                    <span>General botanical reference</span>
                  </p>
                )}
              </div>
              <span className="product-reference">REF. {product.num}</span>
            </div>
            <p className="product-introduction">
              {product.content.shortDescription ||
                `${product.title} for specification-led business enquiries. Discuss your required material, quantity and delivery destination with our team.`}
            </p>
            <dl className="product-key-facts">
              <div>
                <dt>Collection</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Supply enquiries</dt>
                <dd>Bulk / B2B</dd>
              </div>
              <div>
                <dt>Specification & grade</dt>
                <dd>Confirm with our team</dd>
              </div>
            </dl>
            <div className="product-primary-actions">
              <button className="button" onClick={() => openQuote(product)}>
                Request bulk quote <Icon name="arrow" />
              </button>
              <button
                className="button button-secondary"
                onClick={() =>
                  openQuote(product, {
                    message: `I would like more information about ${product.title}.`,
                  })
                }
              >
                Send enquiry <Icon name="mail" />
              </button>
            </div>
            <a
              className="product-whatsapp-link"
              href={whatsappHref(
                `Hello ${business.name}, please share information about ${product.title} (${product.num}).`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              Prefer a conversation? Enquire on WhatsApp
            </a>
          </div>
          <ProductDetailSections product={product} />
          <nav
            className="product-neighbours"
            aria-label="More products in this category"
          >
            {index > 0 ? (
              <a href={peers[index - 1].path}>
                <Icon name="left" />
                {peers[index - 1].title}
              </a>
            ) : (
              <span />
            )}
            {index < peers.length - 1 && (
              <a href={peers[index + 1].path}>
                {peers[index + 1].title}
                <Icon name="arrow" />
              </a>
            )}
          </nav>
          <RelatedProducts product={product} />
        </div>
      </div>
    </section>
  );
}
