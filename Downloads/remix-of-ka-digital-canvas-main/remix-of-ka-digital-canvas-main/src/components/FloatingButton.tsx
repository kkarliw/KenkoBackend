import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web',
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none"
          >
            <div>¿Necesitas cotizar?</div>
            <div className="absolute bottom-0 right-4 transform translate-y-full">
              <div className="border-4 border-transparent border-t-black"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleWhatsApp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        
        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 bg-green-400 rounded-full"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={isHovered ? { scale: 1.5, opacity: 0 } : { scale: 0, opacity: 0.5 }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>
    </div>
  );
};

export default FloatingButton;