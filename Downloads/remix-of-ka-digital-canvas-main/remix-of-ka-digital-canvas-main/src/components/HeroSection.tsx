import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import macbookImage from "@/assets/macbook-mockup-angle.png";
import sandCloudBg from "@/assets/sand-cloud-bg.png";
import { RippleWaveLink } from "./ui/ripple-wave-button";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Zoom INTO the laptop screen effect
  const laptopScale = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1.8, 8]);
  const laptopY = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 50, 200]);
  
  // Fade out elements as we zoom in
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const bezelOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);
  
  // Parallax for text
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh]"
    >
      {/* Black background with sand cloud overlay */}
      <div 
        className="sticky top-0 h-screen w-full bg-black"
      >
        {/* Sand cloud background overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${sandCloudBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 sm:pt-20 md:pt-24">
            {/* Desktop: side by side | Mobile/Tablet: text first, mockup second */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
              
              {/* Text Content - First on mobile, second on desktop */}
              <motion.div 
                style={{ y: textY, opacity: textOpacity }}
                className="order-1 lg:order-1 text-center lg:text-left"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block text-[9px] sm:text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 md:mb-6"
                >
                  Agencia Digital Boutique
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[3rem] xl:text-[3.5rem] font-bold leading-[1.2] tracking-[-0.01em] text-white"
                >
                  Websites &<br />
                  <span className="italic font-light text-white/80">Digital</span> Experiences
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-white/60 mt-4 sm:mt-5 md:mt-8 max-w-md sm:max-w-lg mx-auto lg:mx-0 text-[0.85rem] sm:text-[0.9rem] md:text-base lg:text-lg leading-relaxed"
                >
                  Diseño y desarrollo de experiencias web modernas, funcionales y optimizadas para generar contacto y conversión en negocios y marcas.
                </motion.p>

                {/* CTA Button - Ripple Wave - Responsive sizing */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mt-6 sm:mt-8 md:mt-10"
                >
                  <RippleWaveLink
                    href="https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="default"
                    className="text-[10px] sm:text-xs md:text-sm px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4"
                  >
                    Cotizar Proyecto
                  </RippleWaveLink>
                </motion.div>
              </motion.div>

              {/* MacBook Mockup - Second on mobile, first on desktop */}
              <motion.div 
                style={{ 
                  scale: laptopScale,
                  y: laptopY,
                }}
                className="order-2 lg:order-2 origin-center mt-6 sm:mt-8 lg:mt-0"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                >
                  <motion.img 
                    src={macbookImage}
                    alt="MacBook Pro"
                    style={{ opacity: bezelOpacity }}
                    className="w-full h-auto relative z-10 pointer-events-none max-w-[200px] sm:max-w-[280px] md:max-w-sm lg:max-w-lg xl:max-w-2xl mx-auto"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator - Hidden on very small screens */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[8px] sm:text-[9px] md:text-xs text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium">
                Explorar
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/40" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;