import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoLight from "@/assets/logo-light.jpg";
import logoDark from "@/assets/logo-dark.jpg";
import { WavyLink } from "./ui/wavy-link";
import { PremiumLink } from "./ui/premium-button";
import { RippleWaveLink } from "./ui/ripple-wave-button";

const Header = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Sobre", id: "about" },
    { label: "Servicios", id: "services" },
    { label: "Proyectos", id: "projects" },
    { label: "Proceso", id: "process" },
  ];

  // Animation variants for stagger effect
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 },
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
      >
        <div className="container-custom flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 z-50">
            <img 
              src={logoLight} 
              alt="Design by K.A™" 
              className="h-8 sm:h-10 md:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <WavyLink
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                isActive={activeSection === item.id}
              >
                {item.label}
              </WavyLink>
            ))}
          </nav>

          {/* Mobile Menu Button - Premium animated burger */}
          <button 
            className="md:hidden relative w-10 h-10 flex items-center justify-center z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="relative w-6 h-4 flex flex-col justify-between">
              <motion.span
                animate={mobileMenuOpen 
                  ? { rotate: 45, y: 7, backgroundColor: "#ffffff" } 
                  : { rotate: 0, y: 0, backgroundColor: "#1a1a1a" }
                }
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="block h-[2px] w-full rounded-full origin-center"
                style={{ backgroundColor: "#1a1a1a" }}
              />
              <motion.span
                animate={mobileMenuOpen 
                  ? { opacity: 0, scaleX: 0, backgroundColor: "#ffffff" } 
                  : { opacity: 1, scaleX: 1, backgroundColor: "#1a1a1a" }
                }
                transition={{ duration: 0.2 }}
                className="block h-[2px] w-4 rounded-full"
                style={{ backgroundColor: "#1a1a1a" }}
              />
              <motion.span
                animate={mobileMenuOpen 
                  ? { rotate: -45, y: -7, backgroundColor: "#ffffff" } 
                  : { rotate: 0, y: 0, backgroundColor: "#1a1a1a" }
                }
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="block h-[2px] w-5 rounded-full origin-center"
                style={{ backgroundColor: "#1a1a1a" }}
              />
            </div>
          </button>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <PremiumLink
              href="https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              Cotizar sitio web
            </PremiumLink>
          </div>
        </div>
      </motion.header>

      {/* Premium Full Screen Dark Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Dark gradient background */}
            <motion.div 
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Subtle gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />

            {/* Logo in menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute top-4 sm:top-5 left-6"
            >
              <img 
                src={logoDark} 
                alt="Design by K.A™" 
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </motion.div>

            {/* Navigation Content */}
            <motion.nav 
              className="relative h-full flex flex-col items-center justify-center px-6"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Nav Items */}
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative text-3xl sm:text-4xl font-medium py-2 text-white/90 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* Underline hover effect */}
                    <motion.span 
                      className="absolute bottom-1 left-0 w-0 h-[1px] bg-white/60 group-hover:w-full transition-all duration-300 ease-out"
                    />
                    {/* Glow effect on hover */}
                    <motion.span 
                      className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110"
                    />
                  </motion.button>
                ))}
              </div>
              
              {/* CTA Button with Ripple Wave */}
              <motion.div
                variants={itemVariants}
                className="mt-10 sm:mt-12"
              >
                <RippleWaveLink
                  href="https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="default"
                  className="text-sm px-6 py-3 sm:px-8 sm:py-4"
                >
                  Cotizar Proyecto
                </RippleWaveLink>
              </motion.div>

              {/* Contact info */}
              <motion.div
                variants={itemVariants}
                className="mt-10 sm:mt-14 flex flex-col items-center gap-3"
              >
                <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em]">
                  Contacto
                </p>
                <a 
                  href="mailto:designbyka.studio@gmail.com"
                  className="text-sm sm:text-base text-white/50 hover:text-white/80 transition-colors duration-300"
                >
                  designbyka.studio@gmail.com
                </a>
              </motion.div>

              {/* Footer branding */}
              <motion.p
                variants={itemVariants}
                className="absolute bottom-8 sm:bottom-10 text-[9px] sm:text-[10px] text-white/20 tracking-[0.3em] uppercase"
              >
                Design by K.A™
              </motion.p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
