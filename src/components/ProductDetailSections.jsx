import ProductSpecificationTable from "./ProductSpecificationTable";
import Icon from "./Icon";
import useQuote from "../hooks/useQuote";
export default function ProductDetailSections({ product }) {
  const { openQuote } = useQuote();
  const { content } = product;
  const reference = content.reference;
  const sections = [
    [
      "source",
      "Botanical source",
      content.botanicalSource ||
        (reference?.botanicalName
          ? `${reference.botanicalName}${reference.family ? ` · ${reference.family}` : ""}${reference.plantPart ? `. Plant part in the reference: ${reference.plantPart.toLowerCase()}.` : "."}`
          : null),
    ],
    [
      "extraction",
      "Manufacturing & extraction",
      content.manufacturing || reference?.extraction,
    ],
    [
      "origin",
      "Origin & cultivation",
      [
        content.origin || reference?.origin,
        content.cultivation,
        content.seasonality,
      ]
        .filter(Boolean)
        .join(" "),
    ],
  ].filter(([, , text]) => text);
  const approvedApplications = content.applications;
  const faqs = content.faqs.length
    ? content.faqs
    : [
        {
          question: `What should I include in a ${product.title} enquiry?`,
          answer: `Use catalogue reference ${product.num} and include your intended application, required specification, approximate quantity and destination. Our team can discuss availability and supply terms for this item.`,
        },
        {
          question: `Can I request technical documents for ${product.title}?`,
          answer:
            "Yes, ask our team about a current specification, Certificate of Analysis and SDS for the offered material. Document availability and suitability need confirmation before ordering.",
        },
        {
          question: `What are the minimum quantity and packaging options?`,
          answer:
            "Please request current minimum quantities, packaging and lead times for this product. These supply details are not published in the current catalogue.",
        },
      ];
  return (
    <div className="product-information">
      <nav className="product-section-nav" aria-label="On this product page">
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("product-overview")
              .scrollIntoView({ block: "start" });
          }}
        >
          Overview
        </a>
        <a
          href="#specifications"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("product-specifications")
              .scrollIntoView({ block: "start" });
          }}
        >
          Specifications
        </a>
        <a
          href="#documentation"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("product-documentation")
              .scrollIntoView({ block: "start" });
          }}
        >
          Documents & supply
        </a>
      </nav>
      <section className="product-content-section" id="product-overview">
        <span className="eyebrow">PRODUCT INFORMATION</span>
        <h2>Product overview</h2>
        <p>
          {content.overview ||
            reference?.overview ||
            `${product.title} is listed in our ${product.category.toLowerCase()} collection under reference ${product.num}. Contact our team to confirm the identity, current specification and supply terms for the material your business requires.`}
        </p>
        {reference && !content.overview && (
          <p className="reference-note">
            The botanical information below is general reference material. It
            does not confirm the species, manufacturing process, origin or grade
            of a supplied batch.
          </p>
        )}
        {sections.length > 0 && (
          <div className="botanical-details">
            {sections.map(([id, title, text]) => (
              <article key={id}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        )}
        {!sections.length && (
          <div className="product-information-request">
            <Icon name="leaf" />
            <div>
              <h3>Confirm the source and process.</h3>
              <p>
                Ask for the botanical identity where applicable, extraction or
                processing method, origin and any traceability requirements for
                this material.
              </p>
            </div>
          </div>
        )}
        {approvedApplications.length > 0 && (
          <div className="product-applications">
            <h3>Industrial applications</h3>
            <ul>
              {approvedApplications.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        )}
        {!approvedApplications.length && (
          <div className="application-note">
            <h3>Application suitability</h3>
            <p>
              Share your intended formulation and required grade.
              Product-specific industrial applications have not been confirmed
              in this catalogue.
            </p>
          </div>
        )}
        {reference?.sources && (
          <details className="reference-sources">
            <summary>Botanical reference sources</summary>
            <ul>
              {reference.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.label}
                    <Icon name="arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}
      </section>
      <section className="product-content-section" id="product-specifications">
        <span className="eyebrow">FOR YOUR TECHNICAL REVIEW</span>
        <h2>Technical specifications</h2>
        <ProductSpecificationTable product={product} />
        <button
          className="text-link"
          onClick={() =>
            openQuote(product, {
              message: `Please send the current technical specification for ${product.title} (${product.num}).`,
            })
          }
        >
          Request current specifications <Icon name="arrow" />
        </button>
      </section>
      <section className="product-content-section" id="product-documentation">
        <div className="supply-document-grid">
          <article>
            <Icon name="box" />
            <h2>Packaging & bulk supply</h2>
            {content.packaging.options.length > 0 ? (
              <ul>
                {content.packaging.options.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : (
              <p>
                Tell us your quantity, preferred packaging and destination.
                Minimum order quantity, packaging availability and lead times
                will be confirmed with your quotation.
              </p>
            )}
            {content.packaging.minimumOrder && (
              <p>Minimum order: {content.packaging.minimumOrder}</p>
            )}
            {content.packaging.supplyDetails && (
              <p>{content.packaging.supplyDetails}</p>
            )}
            <button className="text-link" onClick={() => openQuote(product)}>
              Request supply details <Icon name="arrow" />
            </button>
          </article>
          <article>
            <Icon name="file" />
            <h2>Technical documents</h2>
            {content.documents.length > 0 ? (
              <ul>
                {content.documents.map((d) => (
                  <li key={d.url}>
                    <a href={d.url} download>
                      {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Contact our team to request a current COA, SDS or technical data
                sheet for the offered material. Confirm availability before
                ordering.
              </p>
            )}
            <button
              className="text-link"
              onClick={() =>
                openQuote(product, {
                  message: `Please confirm availability of a current COA, SDS and technical data sheet for ${product.title} (${product.num}).`,
                })
              }
            >
              Request documentation <Icon name="arrow" />
            </button>
          </article>
        </div>
      </section>
      <section className="product-content-section product-faq">
        <span className="eyebrow">BEFORE YOU ORDER</span>
        <h2>{product.title}: buyer questions</h2>
        <div className="faq-items">
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
