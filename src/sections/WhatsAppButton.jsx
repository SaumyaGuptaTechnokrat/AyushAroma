import { useEffect, useState } from "react";
import PRODUCTS from "../json/products.json";

const COMPANY = import.meta.env.VITE_COMPANY_NAME || "Ayush Aromatics";

export default function WhatsAppButton() {
  const digitsOnly = (import.meta.env.VITE_CONTACT_NUMBER || "").replace(/[^\d]/g, "");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", product: "", message: "" });

  // Lets any other component (e.g. the product detail page) open this
  // form with a product pre-selected.
  useEffect(() => {
    function onOpen(e) {
      setForm((f) => ({ ...f, product: e.detail?.product || f.product }));
      setOpen(true);
    }
    window.addEventListener("open-whatsapp-enquiry", onOpen);
    return () => window.removeEventListener("open-whatsapp-enquiry", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!digitsOnly) return null;

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const lines = [
      `Hello ${COMPANY}, I'd like to make an enquiry.`,
      "",
      `Name: ${form.name.trim()}`,
      form.phone.trim() && `Phone: ${form.phone.trim()}`,
      form.product && `Product: ${form.product}`,
      `Requirement: ${form.message.trim()}`,
    ].filter(Boolean);
    const url = `https://wa.me/${digitsOnly}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setForm({ name: "", phone: "", product: "", message: "" });
  }

  const waIcon = (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.29.64 4.43 1.75 6.26L4 29l7.94-1.7A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.8a9.7 9.7 0 0 1-4.95-1.36l-.355-.21-4.71 1.01 1.03-4.59-.23-.37A9.7 9.7 0 1 1 25.7 15a9.72 9.72 0 0 1-9.696 9.8z" />
      <path d="M21.4 17.9c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );

  return (
    <div className="wa-widget">
      {open && (
        <div className="wa-panel" role="dialog" aria-label="WhatsApp enquiry form">
          <div className="wa-panel-head">
            <span className="wa-head-icon">{waIcon}</span>
            <div>
              <strong>Chat with {COMPANY}</strong>
              <small>We reply within one business day</small>
            </div>
            <button type="button" className="wa-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>

          <form className="wa-form" onSubmit={handleSubmit}>
            <label>
              <span>Your name *</span>
              <input type="text" required value={form.name} onChange={update("name")} placeholder="Full name" />
            </label>
            <label>
              <span>Phone (optional)</span>
              <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+91 ..." />
            </label>
            <label>
              <span>Product</span>
              <select value={form.product} onChange={update("product")}>
                <option value="">Select a product (optional)</option>
                {PRODUCTS.map((c) => (
                  <optgroup key={c.category} label={c.category}>
                    {c.items.map((p) => (
                      <option key={`${c.category}-${p.num}`} value={p.title}>{p.title}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label>
              <span>Requirement *</span>
              <textarea required rows={3} value={form.message} onChange={update("message")} placeholder="Quantity, destination country…" />
            </label>
            <button type="submit" className="wa-submit">Send on WhatsApp</button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`whatsapp-fab ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open WhatsApp enquiry form"
        aria-expanded={open}
      >
        {waIcon}
      </button>
    </div>
  );
}