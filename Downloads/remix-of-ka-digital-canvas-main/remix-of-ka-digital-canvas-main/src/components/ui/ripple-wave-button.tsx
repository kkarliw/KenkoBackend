import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, useState, useCallback } from "react";

interface RippleProps {
  x: number;
  y: number;
  id: number;
}

interface RippleWaveButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const RippleWaveButton = forwardRef<HTMLButtonElement, RippleWaveButtonProps>(
  ({ className, variant = "primary", size = "default", children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<RippleProps[]>([]);

    const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 800);
    }, []);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        createRipple(event);
        onClick?.(event);
      },
      [createRipple, onClick]
    );

    const baseStyles = "relative inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none overflow-hidden";
    
    const variants = {
      primary: "bg-white text-black hover:bg-white/90",
      outline: "border-2 border-white text-white hover:bg-white hover:text-black",
      ghost: "text-white hover:bg-white/10",
    };

    const sizes = {
      sm: "px-6 py-3 text-[10px]",
      default: "px-8 py-4 text-xs",
      lg: "px-10 py-5 text-sm",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-black/20 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ 
              width: 400, 
              height: 400, 
              x: -200, 
              y: -200, 
              opacity: 0 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
        
        {/* Shimmer effect on hover */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          whileHover={{ translateX: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

RippleWaveButton.displayName = "RippleWaveButton";

// Link version
interface RippleWaveLinkProps extends Omit<HTMLMotionProps<"a">, "ref" | "children"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const RippleWaveLink = forwardRef<HTMLAnchorElement, RippleWaveLinkProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const [ripples, setRipples] = useState<RippleProps[]>([]);

    const createRipple = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
      const link = event.currentTarget;
      const rect = link.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 800);
    }, []);

    const baseStyles = "relative inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background overflow-hidden cursor-pointer";
    
    const variants = {
      primary: "bg-white text-black hover:bg-white/90",
      outline: "border-2 border-white text-white hover:bg-white hover:text-black",
      ghost: "text-white hover:bg-white/10",
    };

    const sizes = {
      sm: "px-6 py-3 text-[10px]",
      default: "px-8 py-4 text-xs",
      lg: "px-10 py-5 text-sm",
    };

    return (
      <motion.a
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onClick={createRipple}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-black/20 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ 
              width: 400, 
              height: 400, 
              x: -200, 
              y: -200, 
              opacity: 0 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
        
        {/* Shimmer effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          initial={false}
        />
        
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }
);

RippleWaveLink.displayName = "RippleWaveLink";

export { RippleWaveButton, RippleWaveLink };
