import { useEffect, useRef, useState } from "react";
import { QuoteContext } from "./QuoteContext";
import QuoteModal from "./QuoteModal";
export default function QuoteProvider({ children }) {
  const [request, setRequest] = useState(null);
  const trigger = useRef(null);
  const counter = useRef(0);
  function openQuote(product = null, options = {}) {
    trigger.current = document.activeElement;
    setRequest({
      id: ++counter.current,
      product: product?.title || (typeof product === "string" && product) || "",
      productCode: product?.num || "",
      locked: Boolean(product?.num),
      ...options,
    });
  }
  useEffect(() => {
    const close = () => setRequest(null);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);
  function closeQuote() {
    setRequest(null);
    const target = trigger.current;
    requestAnimationFrame(() => {
      if (target?.isConnected && target.getClientRects().length)
        target.focus({ preventScroll: true });
      else
        document
          .querySelector(".mobile-toggle")
          ?.focus({ preventScroll: true });
    });
  }
  return (
    <QuoteContext.Provider value={{ openQuote }}>
      {children}
      {request && (
        <QuoteModal key={request.id} request={request} onClose={closeQuote} />
      )}
    </QuoteContext.Provider>
  );
}
