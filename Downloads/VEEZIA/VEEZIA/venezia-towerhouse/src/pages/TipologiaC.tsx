import { Link } from "react-router-dom";
import { ArrowLeft, Maximize, Bed, Bath, Check, FileText } from "lucide-react";
const planoTipologiaC = "/images/planta-tipo-c1.png";

const TipologiaC = () => {
  const tipologia = {
    id: "c",
    name: "Tipología C",
    subtitle: "Espacios Funcionales",
    price: "$493.290.000",
    status: "Últimas Unidades",
    size: "60,9",
    rooms: "1",
    bathrooms: "1",
    description: "Diseño compacto y eficiente que maximiza cada metro cuadrado. Perfecto para quienes buscan funcionalidad sin sacrificar estilo.",
         images: [
      "/images/sala23.jpg",  // Primera imagen grande
      "/images/cocina-03.jpg",       // Segunda imagen
      "/images/habitacion-04.jpg", // Tercera imagen
    ],
    features: [
      "Gran sala con amplios ventanales",
      "Cocina abierta estilo gourmet",
      "Habitación con closet integrado",
      "Habitación principal con baño privado",
      "Baño auxiliar para visitas",
      "Cuarto de lavado",
      "Terraza de 7,2 m²",
      "Espacio para aire acondicionado",
    ],
    finishes: [
    "Pisos en porcelanato formato 60x60",
  "Puertas principales y de habitaciones de piso a techo",
  "Puntos para aire acondicionado",
  "Cocina con gabinetes inferiores y superiores",
  "Estufa con campana de extracción de calor",
  "Baños completamente dotados con enchape, accesorios y vidrio templado en zonas húmedas"
    ],
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Header */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/tipologias" className="inline-flex items-center text-accent hover:text-accent/80 transition-smooth mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Volver a Tipologías</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground">{tipologia.name}</h1>
              <p className="text-xl text-accent font-light">{tipologia.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-accent/20 text-accent">
                {tipologia.status}
              </span>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Desde</p>
                <p className="text-3xl font-bold text-accent">{tipologia.price} COP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                <img 
                  src={tipologia.images[0]}
                  alt={`${tipologia.name} - Vista principal`}
                  className="w-full h-full object-cover hover:scale-105 transition-elegant"
                />
              </div>
            </div>
            <div className="aspect-video lg:aspect-auto rounded-lg overflow-hidden shadow-elegant">
              <img 
                src={tipologia.images[1]}
                alt={`${tipologia.name} - Detalle 1`}
                className="w-full h-full object-cover hover:scale-105 transition-elegant"
              />
            </div>
            <div className="aspect-video lg:aspect-auto rounded-lg overflow-hidden shadow-elegant">
              <img 
                src={tipologia.images[2]}
                alt={`${tipologia.name} - Detalle 2`}
                className="w-full h-full object-cover hover:scale-105 transition-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-3 lg:px-8">
          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            <div className="text-center p-6 bg-background rounded-lg shadow-elegant">
              <Maximize className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{tipologia.size}</p>
              <p className="text-sm text-muted-foreground">m² totales</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg shadow-elegant">
              <Bed className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{tipologia.rooms}</p>
              <p className="text-sm text-muted-foreground">Habitaciones</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg shadow-elegant">
              <Bath className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground">{tipologia.bathrooms}</p>
              <p className="text-sm text-muted-foreground">Baños</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Descripción</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{tipologia.description}</p>
          </div>
        </div>
      </section>

      {/* Floor Plan */}
            <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">Plano Arquitectónico</h2>
            <div className="bg-background rounded-lg shadow-elegant overflow-hidden">
              <img 
                src={planoTipologiaC}
                alt={`Plano arquitectónico - ${tipologia.name}`}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features & Finishes */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Características</h2>
              <ul className="space-y-3">
                {tipologia.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Acabados de Lujo</h2>
              <ul className="space-y-3">
                {tipologia.finishes.map((finish, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{finish}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TipologiaC;