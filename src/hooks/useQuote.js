import { useContext } from "react";
import { QuoteContext } from "../components/QuoteContext";
export default function useQuote() {
  return useContext(QuoteContext);
}
