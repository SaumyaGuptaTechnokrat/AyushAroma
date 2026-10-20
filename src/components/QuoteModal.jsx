import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { business, emailHref } from "../config/business";
import {
  isEnquiryConnected,
  validateEnquiry,
  submitEnquiry,
  enquiryEmailHref,
} from "../services/enquiries";
export default function QuoteModal({ request, onClose }) {
  const dialog = useRef(null);
  const sending = useRef(false);
  const feedback = useRef(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: request.product,
    productCode: request.productCode,
    quantity: "",
    unit: "kg",
    country: "",
    message: request.message || "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [failure, setFailure] = useState("");
  const connected = isEnquiryConnected();
  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      if (element.open) element.close();
    };
  }, []);
  function close() {
    dialog.current.close();
    onClose();
  }
  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((x) => ({ ...x, [name]: undefined }));
  }
  async function submit(e) {
    e.preventDefault();
    if (sending.current) return;
    const next = validateEnquiry(form);
    setErrors(next);
    if (Object.keys(next).length) {
      dialog.current.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    sending.current = true;
    setStatus("sending");
    setFailure("");
    try {
      const result = await submitEnquiry(
        Object.fromEntries(
          Object.entries(form).map(([k, v]) => [
            k,
            typeof v === "string" ? v.trim() : v,
          ]),
        ),
      );
      setStatus(result.status);
    } catch (error) {
      setFailure(error.message);
      setStatus("error");
    } finally {
      sending.current = false;
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }
  function field(name, label, options = {}) {
    return (
      <div className={`field ${options.full ? "full-field" : ""}`}>
        <label htmlFor={`quote-${name}`}>
          {label}
          {options.required && <span aria-hidden="true"> *</span>}
        </label>
        <input
          id={`quote-${name}`}
          name={name}
          type={options.type || "text"}
          value={form[name]}
          onChange={update}
          required={options.required}
          readOnly={options.readOnly}
          autoComplete={options.autoComplete || "off"}
          placeholder={options.placeholder || ""}
          maxLength={name === "email" ? 254 : 150}
          min={name === "quantity" ? "0.001" : undefined}
          step={name === "quantity" ? "any" : undefined}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={
            errors[name]
              ? `quote-${name}-error`
              : name === "phone"
                ? "quote-phone-help"
                : undefined
          }
        />
        {name === "phone" && (
          <small id="quote-phone-help">Include + and your country code.</small>
        )}
        {errors[name] && (
          <p className="field-error" id={`quote-${name}-error`}>
            {errors[name]}
          </p>
        )}
      </div>
    );
  }
  return (
    <dialog
      ref={dialog}
      className="quote-dialog"
      aria-labelledby="quote-title"
      aria-describedby="quote-description"
      aria-modal="true"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const elements = [
          ...dialog.current.querySelectorAll(
            "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
          ),
        ].filter(
          (element) => element.tabIndex >= 0 && element.getClientRects().length,
        );
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close();
        }
      }}
    >
      <div className="quote-dialog-heading">
        <div>
          <span className="eyebrow">BUSINESS ENQUIRIES</span>
          <h2 id="quote-title">Request a bulk quote</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={close}
          aria-label="Close quote form"
        >
          <Icon name="close" />
        </button>
      </div>
      <p id="quote-description">
        Share your requirements with {business.name}. Fields marked * are
        required.
      </p>
      {status === "sent" ? (
        <div
          className="quote-result"
          role="status"
          ref={feedback}
          tabIndex="-1"
        >
          <Icon name="check" />
          <h3>Thank you for your enquiry.</h3>
          <p>Your enquiry has been sent to our team.</p>
          <button className="button" onClick={close}>
            Return to product
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="quote-form-grid">
            {field("name", "Full name", {
              required: true,
              autoComplete: "name",
              placeholder: "Your full name",
            })}
            {field("company", "Company name", {
              autoComplete: "organization",
              placeholder: "Business / organisation",
            })}
            {field("email", "Business email", {
              required: true,
              type: "email",
              autoComplete: "email",
              placeholder: "you@company.com",
            })}
            {field("phone", "Phone with country code", {
              required: true,
              type: "tel",
              autoComplete: "tel",
              placeholder: "+91 8267000606",
            })}
            {field("product", "Product name", {
              required: true,
              readOnly: request.locked,
              full: true,
              placeholder: "Product or ingredient",
            })}
            {field("quantity", "Required quantity", {
              type: "number",
              placeholder: "e.g. 100",
            })}
            <div className="field">
              <label htmlFor="quote-unit">Quantity unit</label>
              <select
                name="unit"
                id="quote-unit"
                value={form.unit}
                onChange={update}
              >
                {["kg", "litres", "tonnes", "g"].map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>
            {field("country", "Destination country", {
              full: true,
              autoComplete: "country-name",
              placeholder: "Delivery destination",
            })}
            <div className="field full-field">
              <label htmlFor="quote-message">Additional requirements</label>
              <textarea
                id="quote-message"
                name="message"
                rows="3"
                maxLength="3000"
                value={form.message}
                onChange={update}
                placeholder="Specification, packaging, documentation or delivery requirements"
              />
            </div>
          </div>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="quote-website">Leave empty</label>
            <input
              name="website"
              id="quote-website"
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={update}
            />
          </div>
          {!connected && (
            <p className="connection-note">
              <Icon name="mail" />
              <span>
                Online submission is not connected yet. You can prepare an email
                draft below and send it from your email app.
              </span>
            </p>
          )}
          <div
            ref={feedback}
            tabIndex="-1"
            className={`quote-feedback ${status === "error" ? "has-error" : ""}`}
            role={status === "error" ? "alert" : "status"}
          >
            {failure}
            {status === "unconfigured" && (
              <>
                Online submission is pending setup. No enquiry has been sent.{" "}
                <a href={enquiryEmailHref(form)}>Open your email draft</a> to
                review and send it.
              </>
            )}
          </div>
          <div className="quote-form-actions">
            <button
              className="button"
              disabled={status === "sending"}
              type="submit"
            >
              {status === "sending"
                ? "Sending enquiry..."
                : connected
                  ? "Send enquiry"
                  : "Prepare email draft"}
              <Icon name="arrow" />
            </button>
            <a className="text-link" href={emailHref}>
              Email us directly <Icon name="mail" />
            </a>
          </div>
          <p className="quote-privacy">
            {connected
              ? "Your details are used to respond to this business enquiry."
              : "Preparing a draft does not send an enquiry."}{" "}
            You can also <a href={emailHref}>email {business.email}</a>.
          </p>
        </form>
      )}
    </dialog>
  );
}
