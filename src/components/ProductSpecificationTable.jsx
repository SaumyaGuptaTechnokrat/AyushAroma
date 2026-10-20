import { specificationFields } from "../data/productContent";
export default function ProductSpecificationTable({ product }) {
  const approved = specificationFields.filter(
    ([key]) => product.content.specifications[key],
  );
  const fields = [
    ["Product", product.title],
    ["Catalogue reference", product.num],
    ["Collection", product.category],
    ...approved.map(([key, label]) => [
      label,
      product.content.specifications[key],
    ]),
  ];
  return (
    <>
      <div className="specification-table-wrap">
        <table className="specification-table">
          <caption>
            {product.title}: product identification
            {approved.length ? " and published specifications" : ""}
          </caption>
          <thead>
            <tr>
              <th scope="col">Parameter</th>
              <th scope="col">Information</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {approved.length === 0 && (
        <p className="technical-note">
          Batch-specific technical values are not published for this item.
          Request the current specification before approving it for your
          application.
        </p>
      )}
      <details className="specification-checklist">
        <summary>Details you can include in your specification request</summary>
        <ul>
          {specificationFields
            .filter(([key]) => !product.content.specifications[key])
            .map(([key, label]) => (
              <li key={key}>{label}</li>
            ))}
        </ul>
      </details>
    </>
  );
}
