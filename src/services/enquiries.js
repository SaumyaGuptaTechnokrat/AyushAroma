import emailjs from "@emailjs/browser";
import { business } from "../config/business";
const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
let inFlight = false;
let lastSent = 0;
export function isEnquiryConnected() {
  return Boolean(config.serviceId && config.templateId && config.publicKey);
}
export function validateEnquiry(form) {
  const errors = {};
  if (!form.name?.trim()) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email?.trim() || ""))
    errors.email = "Enter a valid business email address.";
  const phone = form.phone?.trim() || "";
  const digits = phone.replace(/\D/g, "");
  if (!/^\+[\d ()-]+$/.test(phone) || digits.length < 8 || digits.length > 15)
    errors.phone =
      "Use a country code and phone number, for example +91 8267000606.";
  if (!form.product?.trim()) errors.product = "Enter the product you need.";
  if (
    form.quantity &&
    (!Number.isFinite(Number(form.quantity)) || Number(form.quantity) <= 0)
  )
    errors.quantity = "Enter a quantity greater than zero.";
  return errors;
}
export function enquiryMessage(form) {
  return [
    `Product: ${form.product}`,
    form.quantity &&
      `Quantity: ${form.quantity}${form.unit ? ` ${form.unit}` : ""}`,
    form.country && `Destination: ${form.country}`,
    form.phone && `Phone: ${form.phone}`,
    form.message,
  ]
    .filter(Boolean)
    .join("\n");
}
export function enquiryEmailHref(form) {
  return `mailto:${business.email}?subject=${encodeURIComponent(`Bulk enquiry: ${form.product || "Product requirements"}`)}&body=${encodeURIComponent(`Name: ${form.name || ""}\nCompany: ${form.company || ""}\nEmail: ${form.email || ""}\n${enquiryMessage(form)}`)}`;
}
// Provider adapter: replace this function when a server-owned enquiry endpoint is available.
// A result is 'sent' only after EmailJS acknowledges the actual request.
export async function submitEnquiry(form) {
  if (!isEnquiryConnected()) return { status: "unconfigured" };
  if (form.website)
    throw new Error(
      "We could not submit this enquiry. Please contact our team directly.",
    );
  if (inFlight)
    throw new Error("An enquiry is already being sent. Please wait.");
  if (Date.now() - lastSent < 60000)
    throw new Error("Please wait one minute before sending another enquiry.");
  inFlight = true;
  try {
    await emailjs.send(
      config.serviceId,
      config.templateId,
      { ...form, reply_to: form.email, message: enquiryMessage(form) },
      {
        publicKey: config.publicKey,
        blockHeadless: true,
        limitRate: { id: "ayush-enquiry", throttle: 60000 },
      },
    );
    lastSent = Date.now();
    return { status: "sent" };
  } catch (error) {
    if (error?.status === 429)
      throw new Error(
        "Please wait one minute and try again, or email our team directly.",
        { cause: error },
      );
    throw new Error(
      "Your enquiry could not be sent. Please try again or email our team directly.",
      { cause: error },
    );
  } finally {
    inFlight = false;
  }
}
