import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "localhost", // Força o uso de localhost
    port: 3000, // Opcional: define uma porta específica (ex: 3000)
    open: true, // Opcional: abre o navegador automaticamente
  },
});
