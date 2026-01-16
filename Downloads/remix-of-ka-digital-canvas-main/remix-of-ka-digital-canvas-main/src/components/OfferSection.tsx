import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowUpRight } from "lucide-react";

const features = [
  "Diseño moderno",
  "Desarrollo en React",
  "Sitios optimizados y responsivos",
  "Enfoque en contacto y conversión",
];

const OfferSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="label text-muted-foreground mb-4 block">Oferta Especial</span>
          
          <h2 className="heading-xl mb-4">
            Tu página web desde menos de{" "}
            <span className="text-foreground">200 USD</span>
          </h2>
          
          <p className="body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Soluciones web claras y funcionales para negocios que buscan presencia digital sin complicaciones.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-foreground" strokeWidth={2} />
                <span className="body-sm">{feature}</span>
              </motion.div>
            ))}
          </div>

          <p className="body-sm text-muted-foreground mb-8">
            El valor final depende del alcance y funcionalidades del proyecto.
          </p>

          <a
            href="https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:gap-5 group"
          >
            Cotizar ahora
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferSection;
