import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "historialApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Historial": "./src/app/app.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: { port: 3002 },
  build: { target: "esnext" },
});
