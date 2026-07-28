import { useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "../Reveal";

export default function Contact({ companyName }) {
  const phone = import.meta.env.VITE_CONTACT_NUMBER;
  const email = import.meta.env.VITE_CONTACT_EMAIL;
  const addressLocality = import.meta.env.VITE_COMPANY_LOCALITY || "Koharapeer, Bareilly";
const addressRegion = import.meta.env.VITE_COMPANY_REGION || "Uttar Pradesh";

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          company: form.company,
          email: form.email,
          message: form.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("sent");
        setForm({ name: "", company: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <span className="tag">Get In Touch</span>
          <h2>Request a quote or documentation.</h2>
          <p className="section-lead">
            Tell us what you need — product, quantity and destination — and we'll respond within one business day.
          </p>
          <div style={{ marginTop: 36 }}>
            <div className="info-row">
              <div className="ilabel">Phone</div>
              <div className="ival">{phone}<span>Mon–Sat, 10am–7pm IST</span></div>
            </div>
            <div className="info-row">
              <div className="ilabel">Email</div>
              <div className="ival">{email}<span>For quotes, samples &amp; bulk enquiries</span></div>
            </div>
            <div className="info-row">
              <div className="ilabel">Address</div>
              <div className="ival">{companyName}<span>{addressLocality} {addressRegion} Uttar Pradesh, India</span></div>
            </div>
          </div>
        </Reveal>
        <Reveal as="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              placeholder="Business / organisation"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="message">Requirement</label>
            <textarea
              id="message"
              placeholder="Product, quantity, destination country..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sent" ? "Message Sent ✓" : status === "sending" ? "Sending..." : "Send Enquiry"}
          </button>

          {status === "sent" && (
            <p className="form-feedback form-feedback-success">
              Thanks — we'll be in touch within one business day.
            </p>
          )}
          {status === "error" && (
            <p className="form-feedback form-feedback-error">
              Something went wrong. Please email us directly at info@aosproduct.com.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}