import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BrochureButton from "./components/BrochureButton";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Proyecto from "./pages/Proyecto";
import Amenidades from "./pages/Amenidades";
import Tipologias from "./pages/Tipologias";
import TipologiaA from "./pages/TipologiaA";
import TipologiaB from "./pages/TipologiaB";
import TipologiaC from "./pages/TipologiaC";
import TipologiaD1 from "./pages/TipologiaD1";
import TipologiaD2 from "./pages/TipologiaD2";
import TipologiaE from "./pages/TipologiaE";
import Ubicacion from "./pages/Ubicacion";
import Trayectoria from "./pages/Trayectoria";
import Galeria from "./pages/Galeria";
import Contacto from "./pages/Contacto";
import AgendarVisita from "./pages/AgendarVisita";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/proyecto" element={<Proyecto />} />
              <Route path="/amenidades" element={<Amenidades />} />
              <Route path="/tipologias" element={<Tipologias />} />
              <Route path="/tipologias/a" element={<TipologiaA />} />
              <Route path="/tipologias/b" element={<TipologiaB />} />
              <Route path="/tipologias/c" element={<TipologiaC />} />
              <Route path="/tipologias/d1" element={<TipologiaD1 />} />
              <Route path="/tipologias/d2" element={<TipologiaD2 />} />
              <Route path="/tipologias/e" element={<TipologiaE />} />
              <Route path="/ubicacion" element={<Ubicacion />} />
              <Route path="/trayectoria" element={<Trayectoria />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/agendar-visita" element={<AgendarVisita />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <BrochureButton />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;