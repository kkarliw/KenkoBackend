import { motion, useReducedMotion } from "framer-motion";

interface KenkoOpsLogoProps {
  onComplete?: () => void;
  className?: string;
}

export default function KenkoOpsLogo({ onComplete, className = "" }: KenkoOpsLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : 1; // duration multiplier

  return (
    <div className={`flex flex-col items-center justify-center gap-6 select-none ${className}`}>
      {/* Symbol — abstract grid/structure mark */}
      <motion.svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Top-left block */}
        <motion.rect
          x="8" y="8" width="24" height="24" rx="4"
          className="fill-primary"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 * d, delay: 0 * d, ease: "easeOut" }}
        />
        {/* Top-right block */}
        <motion.rect
          x="40" y="8" width="24" height="24" rx="4"
          className="fill-primary/60"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 * d, delay: 0.1 * d, ease: "easeOut" }}
        />
        {/* Bottom-left block */}
        <motion.rect
          x="8" y="40" width="24" height="24" rx="4"
          className="fill-primary/60"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 * d, delay: 0.2 * d, ease: "easeOut" }}
        />
        {/* Bottom-right block — accent */}
        <motion.rect
          x="40" y="40" width="24" height="24" rx="4"
          className="fill-primary/30"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 * d, delay: 0.3 * d, ease: "easeOut" }}
        />
        {/* Center cross connector — horizontal */}
        <motion.rect
          x="30" y="32" width="12" height="8" rx="2"
          className="fill-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.25 * d, delay: 0.35 * d, ease: "easeOut" }}
        />
        {/* Center cross connector — vertical */}
        <motion.rect
          x="32" y="30" width="8" height="12" rx="2"
          className="fill-primary"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.25 * d, delay: 0.35 * d, ease: "easeOut" }}
        />
      </motion.svg>

      {/* Wordmark */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 * d, delay: 0.55 * d, ease: "easeOut" }}
        onAnimationComplete={() => {
          if (!prefersReducedMotion) {
            setTimeout(() => onComplete?.(), 400);
          } else {
            onComplete?.();
          }
        }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Kenkō{" "}
          <span className="font-normal text-muted-foreground">Ops</span>
        </h1>

        {/* Descriptor */}
        <motion.p
          className="text-xs md:text-sm tracking-widest uppercase text-muted-foreground/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 * d, delay: 0.85 * d, ease: "easeOut" }}
        >
          Gestión Institucional en Salud
        </motion.p>
      </motion.div>
    </div>
  );
}
