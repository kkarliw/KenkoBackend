import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BrochureButton = () => {
  const handleDownload = () => {
    const brochureUrl = "/Venezia Tower House_Brochure_C369-109C.pdf";
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = "Venezia Tower House_Brochure_C369-109C.pdf";
    link.click();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleDownload}
          className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lift flex items-center justify-center transition-smooth group"
          aria-label="Descargar Brochure"
        >
          <Download size={24} className="group-hover:scale-110 transition-smooth" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-navy text-primary-foreground border-accent/20">
        <p>Descargar Brochure</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default BrochureButton;