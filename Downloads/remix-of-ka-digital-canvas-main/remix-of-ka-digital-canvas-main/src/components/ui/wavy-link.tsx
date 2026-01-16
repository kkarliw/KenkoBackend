import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WavyLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

const WavyLink = ({ children, onClick, className, isActive }: WavyLinkProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative body-sm transition-colors hover:text-foreground/70 py-1",
        className
      )}
      whileHover="hover"
    >
      <span className="relative z-10">{children}</span>
      
      {/* Wavy underline animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 1 }
        }}
      >
        <motion.svg
          viewBox="0 0 100 4"
          preserveAspectRatio="none"
          className="w-full h-full"
          initial={{ x: "-100%" }}
          variants={{
            hover: { 
              x: 0,
              transition: { duration: 0.3, ease: "easeOut" }
            }
          }}
        >
          <motion.path
            d="M0 2 Q 10 0, 20 2 T 40 2 T 60 2 T 80 2 T 100 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
            initial={{ pathLength: 0 }}
            variants={{
              hover: { 
                pathLength: 1,
                transition: { duration: 0.4, ease: "easeOut" }
              }
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-foreground rounded-full"
          layoutId="activeIndicator"
          initial={{ x: "-50%" }}
        />
      )}
    </motion.button>
  );
};

export { WavyLink };
