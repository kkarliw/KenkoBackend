import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Layers, Zap, Palette, ArrowRight } from "lucide-react";
import { PremiumLink } from "./ui/premium-button";

const services = [
  {
    icon: Globe,
    title: "Diseño y desarrollo web",
    description: "Sitios modernos, rápidos y optimizados para generar contacto real.",
  },
  {
    icon: Layers,
    title: "Landing pages y catálogos",
    description: "Páginas diseñadas para captar clientes y mostrar productos.",
  },
  {
    icon: Palette,
    title: "Portafolios y diseños creativos",
    description: "Presentación visual impactante para artistas y profesionales.",
  },
  {
    icon: Zap,
    title: "Animaciones modernas y UI",
    description: "Experiencias interactivas con movimiento fluido y premium.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="services" className="section-padding bg-secondary overflow-hidden">
      <div className="container-custom">
        {/* Header - Centered with enhanced animation */}
        <motion.div
          ref={ref}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 px-3 py-1.5 bg-foreground/5 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
            Servicios
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Lo que hacemos</h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Creamos y diseñamos experiencias digitales pensadas para convertir, escalar y destacar marcas en internet.
          </p>
        </motion.div>

        {/* Services Grid - 2x2 with enhanced animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                }}
                transition={{ duration: 0.25 }}
                className="relative bg-background p-6 md:p-8 lg:p-10 border border-border/50 rounded-2xl group cursor-default overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <motion.div
                  className="relative z-10 mb-5 md:mb-6"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-foreground/5 rounded-xl flex items-center justify-center group-hover:bg-foreground/10 transition-colors duration-300">
                    <Icon 
                      className="w-6 h-6 md:w-7 md:h-7 text-foreground/70 group-hover:text-foreground transition-colors duration-300" 
                      strokeWidth={1.5} 
                    />
                  </div>
                </motion.div>
                <h3 className="relative z-10 text-lg md:text-xl font-semibold mb-2 md:mb-3 tracking-tight">{service.title}</h3>
                <p className="relative z-10 text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-foreground/[0.03] to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Catalog CTA with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-14 md:mt-20 text-center"
        >
          <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-lg mx-auto">
            Los valores se comparten de forma personalizada según las necesidades del proyecto.
          </p>
          <PremiumLink
            href="https://wa.me/573107086902?text=Hola,%20quiero%20recibir%20el%20catálogo%20de%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="rounded-xl"
          >
            Solicitar catálogo
            <ArrowRight className="w-4 h-4" />
          </PremiumLink>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
