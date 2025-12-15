import { MapPin, Car, ShoppingBag, Trees, GraduationCap, Plane} from "lucide-react";
import { TbBeach } from "react-icons/tb";


const Ubicacion = () => {
  const nearbyPlaces = [
    { icon: ShoppingBag, name: "Centros comerciales", distance: "4 km", items: ["Mall Plaza", "La Serrezuela"] },
    { icon: TbBeach, name: "Playas", distance: "2,5 km - 6,6 km", items: ["Marbella", "Playa De La Boquilla"] },
    { icon: Trees, name: "Parques", distance: "300 m", items: ["Parque Lineal", "Parque Crespo"] },
    { icon: GraduationCap, name: "Escuelas", distance: "1 km", items: ["Colegio Naval", "Colegio Beverly Hills"] },
    { icon: Car, name: "Vías Principales", distance: "300 m", items: ["Tunel de Crespo", "Vía Al Mar"] },
    { icon: Plane, name: "Aeropuerto", distance: "600 m", items: ["Aeropuerto Internacional Rafael Núñez"] },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hotel-almirante.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <MapPin className="w-16 h-16 text-accent mx-auto mb-6 animate-bounce-scroll" />
          <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Ubicación <span className="text-accent">Privilegiada</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            En el corazón de la ciudad, con acceso rápido a todo lo que necesitas
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-muted rounded-lg overflow-hidden shadow-elegant mb-12">
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                {/* Stylized map representation */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A86A' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
                  <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7847.337682450095!2d-75.5198927!3d10.4478313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef6250019e7cde9%3A0xedb4e8300131baad!2sVENEZIA%20TOWER%20HOUSE!5e0!3m2!1ses-419!2sco!4v1765310316025!5m2!1ses-419!2sco"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                </div>
              </div>

            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                Todo lo que necesitas <span className="text-accent">cerca</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ubicado estratégicamente para ofrecerte acceso rápido a los mejores servicios y amenidades de la ciudad
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyPlaces.map((place, index) => (
                <div
                  key={index}
                  className="group bg-background border border-border rounded-lg p-8 hover:border-accent hover:shadow-lift transition-elegant animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <place.icon className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-smooth" />
                  <h3 className="text-xl font-bold text-primary mb-2">{place.name}</h3>
                  <p className="text-accent font-medium mb-4">{place.distance}</p>
                  <ul className="space-y-2">
                    {place.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-12 text-center">
              Conectividad <span className="text-accent">Superior</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background p-8 rounded-lg shadow-elegant">
                <h3 className="text-2xl font-bold text-primary mb-6">Vías Principales</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Car className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Túnel de Crespo</p>
                      <p className="text-sm text-muted-foreground">300 m - 2 min</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Car className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Vía Al Mar</p>
                      <p className="text-sm text-muted-foreground">1.5 km - 5 min</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Car className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Avenida Santander</p>
                      <p className="text-sm text-muted-foreground">2 km - 7 min</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-background p-8 rounded-lg shadow-elegant">
                <h3 className="text-2xl font-bold text-primary mb-6">Cerca de lo mejor de Cartagena</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">CH</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Centro Histórico</p>
                      <p className="text-sm text-muted-foreground">3 k m - 10 min</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">ZN</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Zona Norte</p>
                      <p className="text-sm text-muted-foreground">12 km - 20 min</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">BC</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Bocagrande</p>
                      <p className="text-sm text-muted-foreground">7,7 km - 20 min</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Ubicacion;
