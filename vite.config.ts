import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
  host: true,          // permite acessar na rede
  port: 5173,          // tenta usar a 8080
  strictPort: false,   // se a 8080 estiver ocupada, pega a próxima livre
  open: true,          // abre automaticamente no navegador
},
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
