import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center container-custom">
        <span className="heading-display text-foreground/10 mb-8 block">404</span>
        <h1 className="heading-lg mb-4">Página no encontrada</h1>
        <p className="body-lg text-muted-foreground mb-8 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida.
        </p>
        <a 
          href="/" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
