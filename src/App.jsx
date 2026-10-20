import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import {
  AboutSection,
  PopularProducts,
  CategoriesSection,
  WhySection,
  IndustriesSection,
  CompanyDetails,
} from "./components/HomeSections";
import Footer, { FloatingContact } from "./components/Footer";
import Products from "./sections/Products";
import ProductDetail from "./sections/ProductDetail";
import Contact from "./sections/Contact";
import FAQ from "./sections/FAQ";
import { business } from "./config/business";
import { resolveBrowseRoute } from "./data/catalogue";
import PageMetadata from "./components/PageMetadata";
function readLocation() {
  return window.location.hash.slice(1);
}
export default function App() {
  const [location, setLocation] = useState(readLocation);
  const [routeKey, query = ""] = location.split("?");
  const params = new URLSearchParams(query);
  const browseRoute = resolveBrowseRoute(routeKey, query);
  const isBrowsePage = Boolean(browseRoute);
  const company = [
    "/company",
    "process",
    "manufacturing",
    "quality",
    "faq",
  ].includes(routeKey);
  useEffect(() => {
    const change = () => setLocation(readLocation());
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    const id =
      isBrowsePage || (company && routeKey === "/company")
        ? "main"
        : routeKey || "main";
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(
        id === "manufacturing" ? "process" : id,
      );
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "instant" });
        target.focus({ preventScroll: true });
      } else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location, isBrowsePage, company, routeKey]);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: business.siteUrl,
    logo: business.logo,
    email: business.email,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.locality,
      addressRegion: business.region,
      addressCountry: "IN",
    },
    ...(business.socials.length
      ? { sameAs: business.socials.map((s) => s.url) }
      : {}),
  };
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main");
          main.focus();
          main.scrollIntoView({ block: "start", behavior: "instant" });
        }}
      >
        Skip to main content
      </a>
      <Header
        quoteProduct={
          browseRoute?.product || browseRoute?.category?.category || null
        }
      />
      <main id="main" tabIndex="-1">
        {browseRoute?.type === "product" ? (
          <ProductDetail
            product={browseRoute.product}
            key={browseRoute.product?.id || location}
          />
        ) : browseRoute?.type === "listing" ? (
          <Products key={location} category={browseRoute.category} />
        ) : browseRoute?.type === "missing" ? (
          <section className="section">
            <div className="container empty-state">
              <PageMetadata
                title="Collection not found"
                description="Browse the Ayush Aromatics product catalogue."
              />
              <h1>Collection not found.</h1>
              <p>Please choose a collection from the product catalogue.</p>
              <a className="button" href="#products">
                Browse products
              </a>
            </div>
          </section>
        ) : company ? (
          <>
            <PageMetadata
              title="About Us - Quality & Product Requirements"
              description="Learn about Ayush Aromatics and discuss product specifications, documentation and bulk supply requirements."
            />
            <CompanyDetails />
            <FAQ />
          </>
        ) : (
          <>
            <PageMetadata
              title="Essential Oils, Mint & Menthol for Bulk Buyers"
              description="Explore essential oils, menthol and mint products, carrier oils and aromatic ingredients from Ayush Aromatics, Bareilly, India. Enquire for bulk supply."
            />
            <HeroSlider />
            <AboutSection />
            <PopularProducts />
            <CategoriesSection />
            <WhySection />
            <IndustriesSection />
            <Contact
              key={params.get("product") || "enquiry"}
              selectedProduct={params.get("product") || ""}
            />
          </>
        )}
      </main>
      <Footer />
      <FloatingContact />
      <script type="application/ld+json">
        {JSON.stringify(organization).replace(/</g, "\\u003c")}
      </script>
    </>
  );
}
