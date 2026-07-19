import { useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "../Reveal";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact({ companyName }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [honeypot, setHoneypot] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Bot check — hidden field real users never fill in
    if (honeypot) return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          company: form.company,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ name: "", company: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <Reveal className="section-head" style={{ marginBottom: 40 }}>
            <span className="tag">Get In Touch</span>
            <h2>Request a quote or documentation.</h2>
            <p className="section-lead">
              Tell us what you need — product, quantity and destination — and we'll respond within one business day.
            </p>
          </Reveal>

          <Reveal>
            <div className="info-row">
              <div className="ilabel">Phone</div>
              <div className="ival">
                +91 82851 11617
                <span>Mon–Sat, 10am–7pm IST</span>
              </div>
            </div>
            <div className="info-row">
              <div className="ilabel">Email</div>
              <div className="ival">
                info@aosproduct.com
                <span>For quotes, samples &amp; bulk enquiries</span>
              </div>
            </div>
            <div className="info-row">
              <div className="ilabel">Address</div>
              <div className="ival">
                {companyName}
                <span>GT Road Industrial Area, Ghaziabad, Uttar Pradesh, India</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <form onSubmit={handleSubmit}>
            {/* Honeypot — hidden from real users, bots tend to fill every field */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: "absolute", left: "-9999px" }}
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Business / organisation"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="message">Requirement</label>
              <textarea
                id="message"
                name="message"
                placeholder="Product, quantity, destination country..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {status === "success" && (
              <p className="form-feedback form-feedback-success">
                Thanks — your enquiry has been sent. We'll respond within one business day.
              </p>
            )}
            {status === "error" && (
              <p className="form-feedback form-feedback-error">
                Something went wrong. Please fill all required fields or try again, or email us directly.
              </p>
            )}

            <button type="submit" className="btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Enquiry"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}