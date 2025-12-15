import { useState } from "react";
import { X } from "lucide-react";

const Galeria = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      url: "/images/fachada-01.jpg",
      category: "Fachada",
      title: "Fachada Principal",
    },
    {
      url: "/images/fachada-02.jpg",
      category: "Fachada",
      title: "Vista Exterior",
    },
    {
      url: "/images/lobby.jpg",
      category: "Interiores",
      title: "Lobby",
    },
    {
      url: "/images/sala-comedor-01.jpg",
      category: "Interiores",
      title: "Sala - Comedor",
    },
    {
      url: "/images/sala-comedor-02.jpg",
      category: "Interiores",
      title: "Sala - Comedor",
    },
    {
      url: "/images/cocina-03.jpg",
      category: "Interiores",
      title: "Cocina",
    },
    {
      url: "/images/habitacion-04.jpg",
      category: "Interiores",
      title: "Habitación",
    },
    {
      url: "/images/habitacion23.jpg",
      category: "Interiores",
      title: "Habitación Principal",
    },
    {
      url: "public/images/gym.jpg",
      category: "Amenidades",
      title: "Gimnasio",
    },
    {
      url: "/images/piscina.jpg",
      category: "Amenidades",
      title: "Piscina",
    },
    {
      url: "/images/zona4.jpg",
      category: "Amenidades",
      title: "Zona Social",
    },
      {
      url: "/images/zona-social.jpg",
      category: "Amenidades",
      title: "Zona Social",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/piscina.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            <span className="text-accent">Galería</span> Visual
          </h1>
          <p
            className="text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Explora cada rincón de Venezia Tower House
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-elegant"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-accent text-sm font-medium mb-1">
                      {image.category}
                    </p>
                    <p className="text-primary-foreground text-lg font-bold">
                      {image.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-sm flex items-center justify-center p-4 animate-lightbox-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent hover:bg-accent/90 text-primary flex items-center justify-center transition-smooth shadow-gold"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lift"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Galeria;
