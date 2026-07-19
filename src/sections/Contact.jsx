import { useState } from "react";
import Reveal from "../Reveal";

export default function Contact({ companyName }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
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
              <div className="ival">+91 82851 11617<span>Mon–Sat, 10am–7pm IST</span></div>
            </div>
            <div className="info-row">
              <div className="ilabel">Email</div>
              <div className="ival">info@aosproduct.com<span>For quotes, samples &amp; bulk enquiries</span></div>
            </div>
            <div className="info-row">
              <div className="ilabel">Address</div>
              <div className="ival">{companyName}<span>GT Road Industrial Area, Ghaziabad, Uttar Pradesh, India</span></div>
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
          <button type="submit" className="btn-primary">
            {sent ? "Message Sent ✓" : "Send Enquiry"}
          </button>
        </Reveal>
      </div>
    </section>
  );
}