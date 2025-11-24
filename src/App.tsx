import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Flora from "./pages/Flora";
import Fauna from "./pages/Fauna";
import Videos from "./pages/Videos";
import Curiosidades from "./pages/Curiosidades";
import Preservacao from "./pages/Preservacao";
import Jogos from "./pages/Jogos";
import Comunidade from "./pages/Comunidade";
import Auth from "./pages/Auth";
import Perfil from "./pages/Perfil";
import ReefKids from "./pages/ReefKids";
import Colorir from "./pages/Colorir";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/flora" element={<Flora />} />
              <Route path="/fauna" element={<Fauna />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/curiosidades" element={<Curiosidades />} />
              <Route path="/preservacao" element={<Preservacao />} />
              <Route path="/jogos" element={<Jogos />} />
              <Route path="/comunidade" element={<Comunidade />} />
              <Route path="/reefkids" element={<ReefKids />} />
              <Route path="/colorir" element={<Colorir />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/perfil" element={<Perfil />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
