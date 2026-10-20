import { useEffect, useRef, useState } from "react";
import { business, emailHref, phoneHref } from "../config/business";
import { categories, categoryPath } from "../data/catalogue";
import Icon from "./Icon";
import useQuote from "../hooks/useQuote";

export function Brand() {
  return (
    <a className="brand" href="#" aria-label={`${business.name} home`}>
      <span className="brand-logo" aria-hidden="true">
        <img src={business.logo} width="120" height="120" alt="" />
      </span>
      <span className="brand-copy">
        {business.name}
        <small>Natural Ingredients. Trusted Partnerships.</small>
      </span>
    </a>
  );
}
export function SocialLinks() {
  return business.socials.map((s) => (
    <a
      key={s.name}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.name}
    >
      <Icon name={s.icon} />
    </a>
  ));
}
export default function Header({ quoteProduct = null }) {
  const { openQuote } = useQuote();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const header = useRef(null);
  const menuButton = useRef(null);
  const productsButton = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver(() =>
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.current.offsetHeight}px`,
      ),
    );
    observer.observe(header.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = () => {
      setOpen(false);
      setProductsOpen(false);
    };
    const outside = (e) => {
      if (!header.current.contains(e.target)) close();
    };
    const resize = () => {
      if (window.innerWidth > 1100) close();
    };
    window.addEventListener("hashchange", close);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("hashchange", close);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
    };
  }, []);
  function escape(e) {
    if (e.key === "Escape") {
      setOpen(false);
      setProductsOpen(false);
      (window.innerWidth > 1100 ? productsButton : menuButton).current?.focus();
    }
  }
  return (
    <header className="site-header" ref={header} onKeyDown={escape}>
      <div className="utility">
        <div className="container utility-inner">
          <div>
            <a href={emailHref}>
              <Icon name="mail" />
              {business.email}
            </a>
            <a href={phoneHref}>
              <Icon name="phone" />
              {business.phone}
            </a>
          </div>
          <div className="utility-right">
            <span>Bulk enquiries · India & international buyers</span>
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="container navigation">
        <Brand />
        <button
          ref={menuButton}
          className="icon-button mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="primary-nav"
          className={open ? "primary-nav is-open" : "primary-nav"}
          aria-label="Main navigation"
          onClick={(e) => {
            if (e.target.closest("a")) {
              setOpen(false);
              setProductsOpen(false);
            }
          }}
        >
          <a href="#">Home</a>
          <a href="#about">About us</a>
          <div
            className="nav-products"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setProductsOpen(false);
            }}
          >
            <button
              ref={productsButton}
              aria-expanded={productsOpen}
              aria-controls="product-menu"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              Products <Icon name="down" />
            </button>
            {productsOpen && (
              <div className="product-menu" id="product-menu">
                <p>EXPLORE OUR RANGE</p>
                {categories.map((c) => (
                  <a key={c.category} href={categoryPath(c.category)}>
                    {c.category}
                    <Icon name="arrow" />
                  </a>
                ))}
                <a href="#products" className="menu-all">
                  View all products
                </a>
              </div>
            )}
          </div>
          <a href="#quality">Quality</a>
          <a href="#contact">Contact us</a>
          <button
            className="button"
            onClick={() => {
              setOpen(false);
              setProductsOpen(false);
              openQuote(quoteProduct);
            }}
          >
            Get a quote <Icon name="arrow" />
          </button>
        </nav>
      </div>
    </header>
  );
}
