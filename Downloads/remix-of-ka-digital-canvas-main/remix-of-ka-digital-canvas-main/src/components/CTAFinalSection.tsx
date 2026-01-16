import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { PremiumLink } from "./ui/premium-button";

const CTAFinalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="heading-xl mb-6">
            ¿Listo para llevar tu idea a la web?
          </h2>
          <p className="body-lg text-muted-foreground mb-10">
            Convierte tu visión en una experiencia digital que conecte con tu audiencia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PremiumLink
                href="https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                Cotizar sitio web
                <ArrowRight className="w-4 h-4" />
              </PremiumLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <PremiumLink
                href="https://wa.me/573107086902"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
              >
                <MessageCircle className="w-4 h-4" />
                Hablar por WhatsApp
              </PremiumLink>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFinalSection;
