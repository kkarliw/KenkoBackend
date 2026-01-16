import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, MessageCircle, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoDark from "@/assets/logo-dark.jpg";
import sandCloud from "@/assets/sand-cloud.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <footer ref={ref} className="relative py-16 md:py-24 bg-black text-white overflow-hidden">
      {/* Sand cloud background - inverted to contrast with black */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${sandCloud})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          filter: 'invert(1)',
        }}
      />

      <motion.div 
        className="container-custom relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Left side - Branding */}
          <motion.div variants={revealVariants} className="lg:col-span-1">
            <motion.img 
              src={logoDark} 
              alt="Design by K.A™" 
              className="h-14 md:h-20 w-auto mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />
            <motion.p 
              className="text-lg md:text-xl text-white/70 max-w-md mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Diseño y desarrollo de sitios web modernos, funcionales y optimizados para negocios.
            </motion.p>
            
            {/* Social links with stagger */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.a
                href="https://instagram.com/designbyka__"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-white/20 rounded-xl hover:border-white/50 hover:bg-white/5 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Instagram className="w-4 h-4" />
                <span className="text-sm font-medium">Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </motion.a>
              
              <motion.a
                href="https://wa.me/573107086902"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl hover:bg-white/90 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Center - Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">Contacto</h3>
            <div className="space-y-3 mb-8">
              <motion.a 
                href="mailto:designbyka.studio@gmail.com" 
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-4 h-4" />
                <span className="text-base">designbyka.studio@gmail.com</span>
              </motion.a>
              <p className="text-lg text-white/80">@designbyka__</p>
            </div>

            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">Stack tecnológico</h3>
            <motion.p 
              className="text-2xl md:text-3xl font-semibold mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              React
            </motion.p>
            <p className="text-white/60">& tecnologías modernas</p>
          </motion.div>

          {/* Right side - Legal */}
          <motion.div variants={itemVariants} className="lg:col-span-1 lg:text-right">
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">Legal</h3>
            <Link 
              to="/terminos" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <span className="text-base">Términos y Condiciones</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            
            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-4">Política de pagos</h3>
              <p className="text-sm text-white/60 max-w-xs lg:ml-auto">
                Todos los proyectos se inician con anticipo del 50%. El alcance y funcionalidades se definen antes de iniciar el desarrollo.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider with enhanced animation */}
        <motion.div
          className="h-px bg-white/10 mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "left" }}
        />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <p className="text-sm text-white/50">
            © {currentYear} Design by K.A™. Todos los derechos reservados.
          </p>

          <Link 
            to="/terminos" 
            className="text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            Ver términos y condiciones completos
          </Link>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
