import { Dumbbell, Waves, Users, Car, ShieldCheck, Trees } from "lucide-react";

const Amenidades = () => {
  const amenidades = [
    {
      icon: Dumbbell,
      title: "Salón para Gimnasio",
      description: "Salón destinado para gimnasio, según dotación personal de los propietarios",
    },
    {
      icon: Waves,
      title: "Piscina",
      description: "Piscina con vistas espectaculares y área de descanso",
    },
    {
      icon: Users,
      title: "Salón de Eventos",
      description: "Espacios versátiles para reuniones y celebraciones",
    },
    {
      icon: Car,
      title: "Parqueadero",
      description: "Contará con 3 niveles de parqueadero para tu comodidad",
    },
    {
      icon: ShieldCheck,
      title: "Seguridad 24/7",
      description: "Sistema de vigilancia y control de acceso permanente",
    },
    {
      icon: Trees,
      title: "Zonas Verdes",
      description: "Parque infantil y áreas ajardinadas para el esparcimiento",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/zona4.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            <span className="text-accent">Amenidades</span> Venezia
          </h1>
          <p
            className="text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Disfruta todo un piso de amenidades diseñadas para tu bienestar y
            entretenimiento.
          </p>
        </div>
      </section>

{/* Grid Principal */}
            <section className="py-24 bg-background">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {amenidades.map((amenidad, index) => (
                    <div
                      key={index}
                      className="group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative bg-background p-8 rounded-lg border border-border hover:border-accent transition-smooth overflow-hidden">
                        
                        {/* Círculo decorativo */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-elegant" />

                        {/* CONTENIDO */}
                        <div className="relative z-10">
                          <amenidad.icon className="w-14 h-14 text-accent mb-6 group-hover:scale-110 group-hover:rotate-6 transition-smooth" />
                          <h3 className="text-2xl font-bold text-primary mb-3">
                            {amenidad.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {amenidad.description}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

      {/* Secciones especiales */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Zona Social */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 animate-slide-in-left">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                <img
                  src="/images/zona-social.jpg"
                  alt="Zona Social"
                  className="w-full h-full object-cover hover:scale-105 transition-elegant"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6 animate-slide-in-right">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary">
                Amenidades <span className="text-accent">Venezia</span>
              </h2>
              <div className="w-24 h-1 bg-accent" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Disfruta de vistas espectaculares de la ciudad mientras te
                relajas en nuestras áreas comunes diseñadas para tu confort y
                entretenimiento.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    Salón de eventos para tus celebraciones
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    Terraza panorámica con áreas de descanso
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    Parque infantil para los más pequeños
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Piscina */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary">
                Piscina & <span className="text-accent">Área Social</span>
              </h2>
              <div className="w-24 h-1 bg-accent" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Un espacio perfecto para relajarte, tomar el sol o reunirte con
                tus seres queridos. Ideal para disfrutar del clima cálido de
                Cartagena.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    Piscina con zona de descanso
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    Área social para reuniones
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <span className="text-muted-foreground">
                    Ambiente moderno y tranquilo
                  </span>
                </li>
              </ul>
            </div>

            <div className="animate-slide-in-right">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                <img
                  src="/images/piscina2.jpg"
                  alt="Piscina"
                  className="w-full h-full object-cover hover:scale-105 transition-elegant"
                />
              </div>
            </div>
          </div>

       {/* Gimnasio */}
{/* Gimnasio */}
<div className="grid lg:grid-cols-2 gap-16 items-center mt-32">
<div className="space-y-8 animate-slide-in-left mt-5">
    <h2 className="text-4xl lg:text-5xl font-bold text-primary">
      Salón para <span className="text-accent">Gimnasio</span>
    </h2>
    <div className="w-24 h-1 bg-accent" />
    <p className="text-lg text-muted-foreground leading-relaxed">
      Venezia cuenta con un salón destinado para gimnasio en el que los
      propietarios pueden ubicar su dotación personal. Una vez entregado el
      proyecto y con administración constituida, se coordinará la instalación
      de equipos y mejoras futuras.
    </p>

    <ul className="space-y-3">
      <li className="flex items-start space-x-3">
        <span className="w-2 h-2 bg-accent rounded-full mt-2" />
        <span className="text-muted-foreground">
          Espacio adaptable a pesas, cardio y actividades funcionales
        </span>
      </li>

      <li className="flex items-start space-x-3">
        <span className="w-2 h-2 bg-accent rounded-full mt-2" />
        <span className="text-muted-foreground">
          Salón amplio y bien ventilado para tu comodidad
        </span>
      </li>

      <li className="flex items-start space-x-3">
        <span className="w-2 h-2 bg-accent rounded-full mt-2" />
        <span className="text-muted-foreground">
          Preparado para dotación según administración futura
        </span>
      </li>
    </ul>
  </div>

  <div className="animate-slide-in-right">
    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
      <img
        src="/images/gym.jpg"
        alt="Gimnasio"
        className="w-full h-full object-cover hover:scale-105 transition-elegant"
      />
    </div>
  </div>
</div>
        </div>
      </section>
    </div>
  );
};

export default Amenidades;