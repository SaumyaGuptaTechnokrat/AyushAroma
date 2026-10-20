import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import QuoteProvider from "./components/QuoteProvider";
import "./styles/site.css";
import "./styles/catalogue.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuoteProvider>
      <App />
    </QuoteProvider>
  </StrictMode>,
);
