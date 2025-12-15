import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "INICIO", path: "/" },
    { name: "PROYECTO", path: "/proyecto" },
    { name: "AMENIDADES", path: "/amenidades" },
    { name: "TIPOLOGÍAS", path: "/tipologias" },
    { name: "UBICACIÓN", path: "/ubicacion" },
    { name: "TRAYECTORIA", path: "/trayectoria" },
    { name: "GALERÍA", path: "/galeria" },
    { name: "CONTACTO", path: "/contacto" },
  ];

  const openWhatsApp = () => {
    const phoneNumber = "573204637230";
    const message = "Hola, me gustaría recibir más información sobre Venezia Tower House.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-elegant border-b ${
        isScrolled
          ? "bg-background/98 backdrop-blur-md border-border/40 shadow-sm"
          : "bg-background/95 backdrop-blur-sm border-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - Premium size with better positioning */}
          <Link to="/" className="flex items-center transition-smooth hover:opacity-90 -ml-2">
            <img 
              src="/images/venezia-logo-new.png" 
              alt="Venezia Tower House" 
              className="h-28 lg:h-36 w-auto object-contain"
              loading="lazy"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-display font-semibold tracking-widest transition-smooth relative group ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-foreground/80 hover:text-accent"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Button
              onClick={openWhatsApp}
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-medium px-6 py-2 transition-smooth uppercase text-sm tracking-wide"
            >
              Contactar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground hover:text-accent transition-smooth p-2"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Rendered via Portal */}
      {typeof window !== 'undefined' && createPortal(
        <>
          {/* Overlay */}
          <div 
            className={`fixed inset-0 bg-black/60 transition-all duration-300 lg:hidden ${
              isMobileMenuOpen ? "opacity-100 z-[9998]" : "opacity-0 pointer-events-none z-[-1]"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel with Slide Animation */}
          <div
            className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background shadow-2xl lg:hidden transition-all duration-300 ease-out ${
              isMobileMenuOpen ? "translate-x-0 z-[9999]" : "translate-x-full z-[-1]"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-accent/30 bg-background">
                <span className="text-foreground font-display font-bold text-lg uppercase tracking-wide">Menú</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-all"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6 text-foreground" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col py-6 px-4 overflow-y-auto bg-background">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-display font-semibold py-4 px-5 rounded-lg transition-all ${
                      location.pathname === link.path
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:bg-accent/5"
                    }`}
                    style={{
                      animation: isMobileMenuOpen ? `slide-in-right 0.3s ease-out ${index * 0.05}s both` : 'none'
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* WhatsApp CTA Button */}
              <div className="p-6 border-t border-accent/30 bg-background">
                <Button 
                  onClick={() => {
                    openWhatsApp();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base font-semibold uppercase tracking-wide shadow-lg"
                >
                  Contactar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
};

export default Header;