import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Root-relative deployment. Change to '/sub-path/' only if the site is
  // served from a subdirectory instead of the domain root.
  base: "/AyushAroma/",
  envDir: "src",
  build: {
    target: "es2018",
    outDir: "dist",
    sourcemap: false, // don't ship source maps to a public production server
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
  },

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,
  },
});