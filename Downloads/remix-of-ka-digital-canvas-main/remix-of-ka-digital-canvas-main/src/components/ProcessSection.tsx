import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Palette, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Análisis",
    description: "Revisión de objetivos, necesidades del negocio y alcance del proyecto.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Diseño",
    description: "Definición de estructura visual, jerarquía de contenido y experiencia de usuario.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Desarrollo",
    description: "Construcción del sitio web utilizando React y tecnologías modernas, asegurando rendimiento y adaptación a dispositivos.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Entrega",
    description: "Ajustes finales y entrega del proyecto listo para su publicación.",
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="label text-muted-foreground mb-4 block">Proceso</span>
          <h2 className="heading-xl max-w-2xl">
            Cómo trabajamos.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line - desktop */}
          <motion.div
            className="hidden lg:block absolute top-14 left-0 right-0 h-px bg-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: "easeOut" }}
                  className="relative group"
                >
                  {/* Icon circle with animation */}
                  <motion.div
                    className="relative mb-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="w-24 h-24 md:w-28 md:h-28 border border-border rounded-full flex items-center justify-center bg-background relative z-10 group-hover:border-foreground/30 transition-colors duration-500"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.15, type: "spring", stiffness: 100 }}
                    >
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-foreground" strokeWidth={1.5} />
                    </motion.div>
                    
                    {/* Pulse effect on hover */}
                    <div className="absolute inset-0 w-24 h-24 md:w-28 md:h-28 rounded-full bg-foreground/5 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                  </motion.div>

                  {/* Step number */}
                  <motion.span
                    className="heading-display text-secondary-foreground/10 mb-3 block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                  >
                    {step.number}
                  </motion.span>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                  >
                    <h3 className="heading-sm mb-3 group-hover:text-foreground/80 transition-colors">{step.title}</h3>
                    <p className="body-sm text-muted-foreground">{step.description}</p>
                  </motion.div>
                  
                  {/* Arrow connector - desktop only */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:flex absolute top-14 left-full w-full items-center justify-center -translate-y-1/2 z-0"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                    >
                      <motion.div
                        className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-border ml-auto mr-4"
                        initial={{ x: -10 }}
                        animate={isInView ? { x: 0 } : { x: -10 }}
                        transition={{ duration: 0.4, delay: 1 + index * 0.15 }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;