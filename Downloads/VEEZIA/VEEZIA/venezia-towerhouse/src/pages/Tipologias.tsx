import { Link } from "react-router-dom";
import { ArrowRight, Bed, Maximize, Bath } from "lucide-react";
import { Button } from "../components/ui/button";

const Tipologias = () => {
  const tipologias = [
    {
      id: "a",
      name: "Tipología A",
      subtitle: "Confort y Elegancia",
      size: "114, m²",
      rooms: "3",
      bathrooms: "2",
      status: "Agotado",
      description: "Mayor comodidad y funcionalidad en un espacio bien distribuido, acogedor y con acabados de alta calidad que reflejan un estilo de vida moderno.",
      image: "/images/habitacion-04.jpg",
    },
    {
      id: "b",
      name: "Tipología B",
      subtitle: "Espacios eficientes",
      size: "66,2 m²",
      rooms: "1 ",
      bathrooms: "1",
      status: "Disponible",
      description: "Compacta pero espaciosa, ideal para profesionales o parejas que buscan un hogar funcional con todas las comodidades en un diseño moderno.",
      image: "/images/cocina-03.jpg",
    },
    {
      id: "c",
      name: "Tipología C",
      subtitle: "Espacios Funcionales",
      size: "60,9 m²",
      rooms: "1 Habitación",
      bathrooms: "1 Baño",
      status: "Últimas Unidades",
      description: "Diseño compacto y eficiente que maximiza cada metro cuadrado. Perfecto para quienes buscan funcionalidad sin sacrificar estilo.",
      image: "/images/sala23.jpg",
    },
    {
      id: "d1",
      name: "Tipología D1",
      subtitle: "Comodidad y Estilo",
      size: "78,6 m²",
      rooms: "2 ",
      bathrooms: "2 ",
      status: "Últimas Unidades",
      description: "Espacios amplios y bien distribuidos, ideales para familias pequeñas o parejas que buscan un hogar con estilo y funcionalidad.",
      image: "/images/habitacion23.jpg",
    },
    {
      id: "d2",
      name: "Tipología D2",
      subtitle: "Confort Moderno",
      size: "84 m²",
      rooms: "2",
      bathrooms: "2 ",
      status: "Últimas Unidades",
      description: "Versión extendida con jacuzzi en el balcón. Ideal para quienes buscan lujo y confort en su hogar.",
      image: "/images/sala-comedor-01.jpg",
    },
    {
      id: "e",
      name: "Tipología E",
      subtitle: "Apartaestudio de Lujo",
      size: "32,6 m²",
      rooms: "1",
      bathrooms: "1",
      status: "Disponible",
      description: "Diseño inteligente que optimiza el espacio para ofrecer comodidad y funcionalidad en un formato compacto, ideal para profesionales o estudiantes.",
      image: "/images/cocina23.png",
    },
  ];

  const openWhatsApp = (tipoName: string) => {
    const phoneNumber = "573204637230";
    const message = `Hola, me interesa conocer más sobre la ${tipoName} de Venezia Tower House.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/zona-social.jpg"
            alt="Zona Social"
            className="w-full h-full object-cover hover:scale-105 transition-elegant"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-primary-foreground mb-4 sm:mb-6 animate-fade-in-up tracking-heading">
            Nuestras <span className="text-accent">Tipologías</span>
          </h1>
          <p className="text-base sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up font-body">
            Descubre la tipología perfecta para tu estilo de vida.
          </p>
        </div>
      </section>

      {/* Tipologías Sections - Alternating Layout */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-32">
          {tipologias.map((tipo, index) => (
            <div
              key={tipo.id}
              className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""} animate-slide-in-left`}>
                <div className="relative group">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                    <img 
                      src={tipo.image}
                      alt={tipo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-elegant"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                    <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md ${
                      tipo.status === "Agotado" 
                        ? "bg-destructive/90 text-primary-foreground"
                        : tipo.status === "Últimas Unidades"
                        ? "bg-accent/90 text-accent-foreground"
                        : "bg-navy/90 text-primary-foreground"
                    }`}>
                      {tipo.status}
                    </span>
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute ${index % 2 === 0 ? "-bottom-6 -right-6" : "-bottom-6 -left-6"} w-32 sm:w-48 h-32 sm:h-48 bg-accent/10 rounded-lg -z-10 hidden sm:block`} />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""} space-y-4 sm:space-y-6 animate-slide-in-right`}>
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground tracking-heading">{tipo.name}</h2>
                  <p className="text-lg sm:text-xl text-accent font-body font-light">{tipo.subtitle}</p>
                  <div className="w-20 sm:w-24 h-1 bg-accent" />
                </div>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-body">
                  {tipo.description}
                </p>

                {/* Specifications */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Superficie</p>
                      <p className="text-sm sm:text-base font-semibold text-foreground">{tipo.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Habitaciones</p>
                      <p className="text-sm sm:text-base font-semibold text-foreground">{tipo.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Bath className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Baños</p>
                      <p className="text-sm sm:text-base font-semibold text-foreground">{tipo.bathrooms}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to={`/tipologias/${tipo.id}`}>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-display font-bold uppercase tracking-wide group w-full sm:w-auto"
                    >
                      Ver Detalles
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
                    </Button>
                  </Link>
                  <Button 
                    size="lg"
                    onClick={() => openWhatsApp(tipo.name)}
                    className={`${
                      tipo.status === "Agotado"
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold"
                    } font-display font-bold uppercase tracking-wide group`}
                    disabled={tipo.status === "Agotado"}
                  >
                    {tipo.status === "A1" ? "Agotado" : "Solicitar Información"}
                    {tipo.status !== "Agotado" && (
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Tipologias;