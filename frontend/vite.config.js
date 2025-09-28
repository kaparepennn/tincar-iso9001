import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // proxyea /api -> backend (cuando ambos corréis en el mismo Codespace)
      '/api': {
        target: 'https://fluffy-goggles-699ggxrw9j9g3xqp7-5173.app.github.dev/login',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
