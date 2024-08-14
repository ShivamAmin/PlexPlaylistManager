import path from "path"
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';


export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
});