import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://<user>.github.io/Portfolio/
export default defineConfig({
  base: "/Portfolio/",
  publicDir: path.resolve(__dirname, "../public"),
  plugins: [react()],
  server: {
    proxy: {
      "/api": { target: "http://localhost:2000", changeOrigin: true },
      "/data": { target: "http://localhost:2000", changeOrigin: true },
    },
  },
});
