import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Zap, Users } from "lucide-react";

const stats = [
  { icon: Code, label: "React & Tech Moderno", description: "Tecnología actual" },
  { icon: Palette, label: "Diseño Premium", description: "Estética cuidada" },
  { icon: Zap, label: "Rendimiento", description: "Sitios rápidos" },
  { icon: Users, label: "Enfoque en Conversión", description: "Resultados reales" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Main content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="label text-muted-foreground mb-4 block">Sobre el estudio</span>
            
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 mb-6">
              <span className="font-semibold">Design by K.A™</span> es un estudio de diseño y desarrollo web enfocado en crear sitios modernos, claros y funcionales.
            </p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-lg text-muted-foreground mb-6"
            >
              Utilizamos tecnologías actuales como React para garantizar rendimiento, estabilidad y una experiencia de usuario fluida en cada proyecto.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="body-md text-muted-foreground"
            >
              Cada proyecto se desarrolla con visión estratégica, cuidando el diseño, la estructura del contenido y la experiencia del usuario, con el objetivo de fortalecer la presencia digital de cada marca.
            </motion.p>
          </motion.div>

          {/* Right - Stats/Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-secondary p-5 md:p-6 rounded-sm border border-border/30"
                >
                  <Icon className="w-6 h-6 text-foreground/70 mb-3" strokeWidth={1.5} />
                  <h3 className="text-sm md:text-base font-medium mb-1">{stat.label}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
