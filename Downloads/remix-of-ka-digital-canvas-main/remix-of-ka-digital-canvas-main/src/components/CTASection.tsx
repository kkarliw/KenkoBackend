import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-foreground text-background">
      <div className="container-custom text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="label text-background/60 mb-6 block">Contacto</span>
          
          <h2 className="heading-xl mb-6 md:mb-8">
            ¿Tienes un proyecto en mente?
          </h2>
          
          <p className="body-lg text-background/70 mb-10 md:mb-12 max-w-xl mx-auto">
            Hablemos y construyamos una solución web adaptada a tu negocio.
          </p>

          <a
            href="https://wa.me/573107086902?text=Hola,%20tengo%20un%20proyecto%20en%20mente"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-background text-foreground font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:gap-5 group"
          >
            Cotizar sitio web
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
