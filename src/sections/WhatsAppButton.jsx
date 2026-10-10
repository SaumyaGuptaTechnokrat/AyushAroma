// Floating WhatsApp button — fixed to the bottom-left of the viewport,
// stacked just above the mobile bottom-nav bar so the two never
// overlap, with a continuous bounce to draw attention, and a real
// wa.me deep link so it works identically on mobile (opens the
// WhatsApp app) and desktop (opens WhatsApp Web).
export default function WhatsAppButton() {
  const rawPhone = import.meta.env.VITE_CONTACT_NUMBER || "";

  // wa.me requires digits only, with country code, no +/spaces/dashes.
  const digitsOnly = rawPhone.replace(/[^\d]/g, "");

  const defaultMessage = encodeURIComponent(
    "Hi, I'd like to know more about your products."
  );
  const whatsappUrl = `https://wa.me/${digitsOnly}?text=${defaultMessage}`;

  // If no phone number is configured, don't render a dead button.
  if (!digitsOnly) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.29.64 4.43 1.75 6.26L4 29l7.94-1.7A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.8a9.7 9.7 0 0 1-4.95-1.36l-.355-.21-4.71 1.01 1.03-4.59-.23-.37A9.7 9.7 0 1 1 25.7 15a9.72 9.72 0 0 1-9.696 9.8z" />
        <path d="M21.4 17.9c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}