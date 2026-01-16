import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface PremiumButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-foreground text-background hover:bg-foreground/90",
      outline: "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
      ghost: "text-foreground hover:bg-foreground/5",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-[10px]",
      default: "px-7 py-3.5 text-xs",
      lg: "px-9 py-4 text-sm",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

// Link version
interface PremiumLinkProps extends Omit<HTMLMotionProps<"a">, "ref"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const PremiumLink = forwardRef<HTMLAnchorElement, PremiumLinkProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background";
    
    const variants = {
      primary: "bg-foreground text-background hover:bg-foreground/90",
      outline: "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
      ghost: "text-foreground hover:bg-foreground/5",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-[10px]",
      default: "px-7 py-3.5 text-xs",
      lg: "px-9 py-4 text-sm",
    };

    return (
      <motion.a
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);

PremiumLink.displayName = "PremiumLink";

export { PremiumButton, PremiumLink };
