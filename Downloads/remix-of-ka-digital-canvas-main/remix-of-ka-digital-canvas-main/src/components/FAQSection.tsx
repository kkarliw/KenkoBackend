import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Qué información necesitas para comenzar mi proyecto?",
    answer: "Necesito los textos o contenido de tu página, logotipo en buena calidad, paleta de colores (si ya tienes una definida), tipografías de marca, imágenes de productos o servicios, y referencias de diseño que te gusten. Si no tienes todo definido, puedo ayudarte a estructurarlo.",
  },
  {
    question: "¿Cuánto tiempo toma desarrollar un sitio web?",
    answer: "Depende del proyecto. Una landing page puede tomar entre 5-10 días hábiles. Un sitio web completo con varias secciones puede tomar de 2-4 semanas. Los tiempos dependen también de qué tan rápido se entregue la información necesaria.",
  },
  {
    question: "¿El sitio se verá bien en celulares y tablets?",
    answer: "Sí. Todos los proyectos están 100% optimizados para verse perfectos en desktop, tablet y móvil. El diseño responsive no es opcional, es parte esencial del desarrollo.",
  },
  {
    question: "¿Cómo funciona el proceso de pago?",
    answer: "Se requiere un anticipo del 50% para iniciar el proyecto. El 50% restante se paga al finalizar, antes de la entrega final. Sin el anticipo, el proyecto no se agenda ni se inicia.",
  },
  {
    question: "¿Puedo hacer cambios después de que esté terminado?",
    answer: "Cada proyecto incluye un número limitado de revisiones durante el desarrollo. Cambios solicitados después de la aprobación final se consideran adicionales y se cotizan por separado.",
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer: "Directo por WhatsApp. Me cuentas qué tipo de proyecto necesitas, te hago algunas preguntas para entender mejor tu negocio, y te envío una propuesta personalizada con tiempos y precios.",
  },
];

const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onClick,
  index 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'bg-foreground text-background shadow-lg' 
          : 'bg-foreground/5 hover:bg-foreground/10'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left group gap-4"
      >
        <span className={`font-medium text-base md:text-lg pr-4 transition-colors ${
          isOpen ? 'text-background' : 'text-foreground'
        }`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen 
              ? 'bg-background/20' 
              : 'bg-foreground/10 group-hover:bg-foreground/20'
          }`}
        >
          <ChevronDown className={`w-4 h-4 transition-colors ${
            isOpen ? 'text-background' : 'text-foreground'
          }`} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-base text-background/80 px-5 md:px-6 pb-5 md:pb-6 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 px-3 py-1.5 bg-foreground/5 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
            FAQ
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Preguntas frecuentes</h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Todo lo que necesitas saber antes de empezar tu proyecto.
          </p>
        </motion.div>

        {/* FAQ Items - Accordion style with rounded cards */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
