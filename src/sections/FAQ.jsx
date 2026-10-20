const questions = [
  [
    "How do I request a bulk quotation?",
    "Share the product name, approximate quantity, company details and delivery country through our enquiry form, email or WhatsApp. Include any specifications or packaging requirements.",
  ],
  [
    "What is the minimum order quantity?",
    "Minimum order quantities depend on the product and supply requirement. Contact our team to confirm the quantity available for your selected ingredient.",
  ],
  [
    "Can I request specifications and safety documentation?",
    "Ask our team for current product specifications, a Certificate of Analysis, safety data and any documents your business needs. Confirm their availability before placing an order.",
  ],
  [
    "Can you supply to my destination?",
    "Include your destination and required quantity with your enquiry. Our team can discuss supply availability, shipping terms and documentation for your location.",
  ],
];
export default function FAQ() {
  return (
    <section className="section purchasing-faq" id="faq">
      <div className="container">
        <span className="eyebrow">BEFORE YOU ORDER</span>
        <h2>A few useful answers.</h2>
        <div className="faq-items">
          {questions.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
