// Defaults verified against ayusharomatics.com on 18 October 2026.
const env = import.meta.env;
function officialUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}
export const business = {
  name: env.VITE_COMPANY_NAME || "Ayush Aromatics",
  phone: env.VITE_CONTACT_NUMBER || "+918267000606",
  email: env.VITE_CONTACT_EMAIL || "info@ayusharomatics.com",
  locality: env.VITE_COMPANY_LOCALITY || "Koharapeer, Bareilly",
  region: env.VITE_COMPANY_REGION || "Uttar Pradesh",
  siteUrl: officialUrl(env.VITE_SITE_URL) || "https://www.ayusharomatics.com/",
  logo:
    env.VITE_LOGO_URL ||
    "https://res.cloudinary.com/w33ctko3/image/upload/v1792229975/WhatsApp_Image_2026-10-16_at_12.54.01_PM.jpg",
  socials: [
    {
      name: "Facebook",
      icon: "facebook",
      url: officialUrl(env.VITE_FACEBOOK_URL),
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: officialUrl(env.VITE_INSTAGRAM_URL),
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: officialUrl(env.VITE_LINKEDIN_URL),
    },
  ].filter((s) => s.url),
  privacyUrl: officialUrl(env.VITE_PRIVACY_URL),
  termsUrl: officialUrl(env.VITE_TERMS_URL),
};
export const phoneHref = `tel:${business.phone.replace(/[^+\d]/g, "")}`;
export const emailHref = `mailto:${business.email}`;
export function whatsappHref(
  message = `Hello ${business.name}, I would like to enquire about bulk oils and ingredients.`,
) {
  return `https://wa.me/${business.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
export function quotePath(product = "") {
  return product
    ? `#contact?product=${encodeURIComponent(product)}`
    : "#contact";
}
