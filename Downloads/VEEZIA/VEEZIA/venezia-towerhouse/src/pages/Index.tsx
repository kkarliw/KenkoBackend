import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Building2, GraduationCap, Heart, ShoppingBag, Car, Award, Clock, Users, CheckCircle, Bed, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const proyectosTrayectoria = [
    { year: "2016", name: "Turín", status: "Entregado", units: 22, image: "/images/turin.jpg" },
    { year: "2019", name: "Bilbao", status: "Entregado", units: 48, image: "/images/bilbao.jpg" },
    { year: "2022", name: "Barak", status: "En Entrega", units: 36, image: "/images/barak.jpg" },
    { year: "2024", name: "Venezia Tower House", status: "En Proceso", units: 50, image: "/images/fachada-02.jpg" },
  ];

  const tipologiasPreview = [
    { id: "b", name: "Tipo B", size: "66.2 m²", rooms: "1 habitación", status: "Disponible", image: "/images/planta-tipo-b1.png" },
    { id: "d1", name: "Tipo D1", size: "78.6 m²", rooms: "2 habitaciones", status: "Disponible", image: "/images/planta-tipo-d1.png" },
    { id: "d2", name: "Tipo D2", size: "84.0 m²", rooms: "2 habitaciones", status: "Últimas unidades", image: "/images/planta-tipo-d2.png" },
    { id: "e", name: "Tipo E", size: "32.6 m²", rooms: "Apartaetudio", status: "Disponible", image: "/images/planta-tipo-e1.png" },
  ];

  const ubicacionBeneficios = [
    { icon: ShoppingBag, title: "Centro Histórico", desc: "A 10 min" },
    { icon: Car, title: "Aeropuerto", desc: "A 5 min" },
    { icon: Heart, title: "Playas y Parque", desc: "A 3 min" },
    { icon: GraduationCap, title: "Escuelas", desc: "Cerca" },
  ];

  const [counts, setCounts] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 });

  useEffect(() => {
    const targets = [150, 10, 98, 100];
    const durations = [2000, 2000, 2000, 2000];
    const intervals = [16, 200, 20, 16];

    const updateCounts = (target: number, idx: number) => {
      let current = 0;
      const interval = setInterval(() => {
        current = Math.min(current + Math.ceil(target / (durations[idx] / intervals[idx])), target);
        setCounts(prev => ({ ...prev, [idx]: current }));
        if (current >= target) clearInterval(interval);
      }, intervals[idx]);
      return interval;
    };

    const intervalsIds = targets.map((target, idx) => updateCounts(target, idx));

    return () => intervalsIds.forEach(clearInterval);
  }, []);

  const estadisticas = [
    { icon: Building2, value: counts[0], label: "Unidades Entregadas" },
    { icon: Clock, value: `${counts[1]} Años`, label: "Años de Experiencia" },
    { icon: Users, value: `${counts[2]}%`, label: "Clientes Satisfechos" },
    { icon: Award, value: `${counts[3]}%`, label: "Entregas a Tiempo" },
  ];

  const galeriaImages = [
    "/images/cocina-03.jpg",
    "/images/habitacion-04.jpg",
    "/images/sala-comedor-01.jpg",
    "/images/sala-comedor-02.jpg",
  ];

  const openWhatsApp = (message: string) => {
    const phoneNumber = "573203637230";
    const url = `https://wa.me/${573203637230}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: "url('/images/fachada-01.jpg')",
            transform: `scale(${1 + scrollY * 0.0003})`,
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 sm:px-12 py-24 max-w-4xl mx-auto">
          <div className="mb-6 animate-fade-in-up">
            <div className="inline-block px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <span className="text-white text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] uppercase">Ubicado en Crespo, Cartagena</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-6 leading-[1.05] tracking-heading animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Tu mejor inversión
            <br />
            <span className="text-accent">en Cartagena</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 font-body font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Una zona estratégica que combina movilidad, valorización y un entorno residencial tranquilo. Vivir en Crespo significa disfrutar de brisa marina, caminar a la playa y tener todo cerca.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            <Button 
              size="lg" 
              onClick={() => openWhatsApp("Hola, me gustaría agendar una visita a Venezia Tower House.")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold px-8 py-6 text-sm shadow-gold group transition-smooth uppercase tracking-wide"
            >
              Contáctanos por WhatsApp
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Link to="/tipologias">
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white hover:text-navy px-8 py-6 text-sm font-display font-bold uppercase tracking-wide transition-smooth w-full sm:w-auto">
                Ver Tipologías
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Concepto Section */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="space-y-8 sm:space-y-10 animate-slide-in-left">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] tracking-heading">
                  Un estilo de vida
                  <span className="text-accent block mt-2">único</span>
                </h2>
                <div className="w-16 sm:w-20 h-[2px] bg-accent" />
              </div>
              
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-[1.8] font-body font-light">
                Venezia Tower House en Crespo es más que un lugar para vivir. Es un estilo de vida tranquilo con acceso inmediato a playas, restaurantes, servicios esenciales y todo lo que necesitas, sin perder esa sensación de privacidad y bienestar.
              </p>
              
              <div className="grid grid-cols-2 gap-8 sm:gap-10 pt-6 sm:pt-8">
                <div className="space-y-2 sm:space-y-3">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-accent">50</div>
                  <div className="text-xs sm:text-sm lg:text-base text-muted-foreground font-body uppercase tracking-wide">Apartamentos</div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-accent">16</div>
                  <div className="text-xs sm:text-sm lg:text-base text-muted-foreground font-body uppercase tracking-wide">Pisos</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="aspect-[4/5] bg-cover bg-center rounded-lg overflow-hidden shadow-elegant border border-accent/20">
                <img 
                  src="/images/fachada-01.jpg" 
                  alt="Venezia Tower House"
                  className="w-full h-full object-cover hover:scale-105 transition-elegant"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 sm:w-40 h-32 sm:h-40 border border-accent/30 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipologías Preview - Visual Cards */}
      <section className="py-20 sm:py-32 bg-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-foreground tracking-heading mb-4">
          Nuestras <span className="text-accent">Tipologías</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
          7 opciones de diseño adaptadas a tu estilo de vida
        </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {tipologiasPreview.map((tipo, index) => (
          <Link 
        key={tipo.id} 
        to="/tipologias"
        className="group animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
          >
        <div className="bg-background rounded-lg overflow-hidden shadow-elegant border border-accent/20 hover:border-accent/50 hover:shadow-lift transition-all duration-300">
          <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-background">
        <img 
          src={tipo.image} 
          alt={tipo.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-elegant"
          loading="lazy"
        />
          </div>
          <div className="p-3 sm:p-5 min-h-[80px] flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm sm:text-base font-display font-bold text-foreground group-hover:text-accent transition-smooth line-clamp-1">{tipo.name}</h3>
          <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${
        tipo.status === "Últimas unidades" 
          ? "bg-accent/20 text-accent" 
          : "bg-primary/10 text-primary"
          }`}>
        {tipo.status}
          </span>
        </div>
        <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
        <Maximize className="w-3 h-3 flex-shrink-0" />
        {tipo.size}
          </span>
          <span className="flex items-center gap-1">
        <Bed className="w-3 h-3 flex-shrink-0" />
        {tipo.rooms}
          </span>
        </div>
          </div>
        </div>
          </Link>
        ))}
          </div>

          <div className="text-center">
        <Link to="/tipologias">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold px-10 py-6 text-sm shadow-gold uppercase tracking-wide transition-smooth">
        Explorar Todas las Tipologías
        <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
          </div>
        </div>
      </section>
      {/* Estadísticas Section */}
      <section className="py-20 sm:py-32 bg-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {estadisticas.map((stat, index) => (
          <div 
            key={index}
            className="text-center animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <stat.icon className="w-8 h-8 text-accent" />
            </div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-accent mb-2">
          {stat.value}
            </div>
            <p className="text-sm sm:text-base text-white/80 font-body font-light uppercase tracking-wide">
          {stat.label}
            </p>
          </div>
        ))}
          </div>
        </div>
      </section>
      {/* Ubicación Preview */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
            <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7847.337682450095!2d-75.5198927!3d10.4478313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef6250019e7cde9%3A0xedb4e8300131baad!2sVENEZIA%20TOWER%20HOUSE!5e0!3m2!1ses-419!2sco!4v1765310316025!5m2!1ses-419!2sco"          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Crespo Cartagena"
          className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 text-primary-foreground">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="font-display font-bold">Crespo, Cartagena</span>
          </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-8">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-heading mb-4">
          Ubicación <span className="text-accent">Estratégica</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-body font-light">
          Vivir bien es vivir cerca de todo. En Crespo disfrutarás de la playa, servicios y áreas importantes a solo unos minutos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {ubicacionBeneficios.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-4 bg-stone rounded-lg border border-accent/10 hover:border-accent/30 transition-smooth"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-display font-semibold text-foreground">{item.title}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
            ))}
          </div>

          <div className="flex justify-center lg:justify-start">
            <Link to="/ubicacion">
          <Button variant="outline" size="lg" className="border-2 border-foreground/80 text-foreground hover:bg-foreground hover:text-background font-display font-bold uppercase tracking-wide transition-smooth">
            Conocer Ubicación
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
            </Link>
          </div>
        </div>
          </div>
        </div>
      </section>


      {/* Amenidades Section */}
      <section className="py-20 sm:py-32 bg-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-foreground tracking-heading mb-4">
          Nuestras <span className="text-accent">Amenidades</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-body font-light leading-relaxed">
          Espacios diseñados para tu bienestar y confort
        </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12">
        {[
          { title: "Piscina", description: "Espacio para relajación", image: "/images/piscina.jpg" },
          { title: "Gimnasio", description: "Salón para ejercicios", image: "/images/gym.jpg" },
          { title: "Zona BBQ", description: "Reuniones familiares", image: "/images/bbq.jpg" },
          { title: "Lobby", description: "Diseño exclusivo", image: "/images/lobby.jpg" },
          { title: "Zonas Sociales", description: "Áreas comunes", image: "/images/zona-social.jpg" },
        ].map((amenity, index) => (
          <div 
            key={index}
            className="group relative rounded-lg overflow-hidden shadow-elegant border border-accent/20 hover:border-accent/50 h-64 sm:h-72 animate-fade-in-up hover:shadow-lift transition-all duration-500"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <img 
          src={amenity.image}
          alt={amenity.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          <div className="group-hover:-translate-y-2 transition-transform duration-500">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 group-hover:text-accent transition-smooth">
              {amenity.title}
            </h3>
            <p className="text-sm sm:text-base text-white/80 font-body font-light">
              {amenity.description}
            </p>
          </div>
            </div>

            <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent"></div>
            </div>
          </div>
        ))}
          </div>

          <div className="text-center">
        <Link to="/amenidades">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold px-10 py-6 text-sm shadow-gold uppercase tracking-wide transition-smooth group"
          >
            Explorar Amenidades
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
          </Button>
        </Link>
          </div>
        </div>
      </section>

      {/* Proyectos / Trayectoria Section */}
      <section className="py-20 sm:py-32 bg-navy text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 sm:mb-16 animate-fade-in-up">
        <div className="lg:max-w-md">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-heading leading-tight text-white">
            Descubre nuestra <span className="text-accent">trayectoria</span>
          </h2>
        </div>
        <div className="lg:self-end animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/trayectoria">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-bold px-8 py-5 text-sm shadow-gold uppercase tracking-wide transition-smooth group">
          Ver Todos los Proyectos
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
          </Link>
        </div>
          </div>

          {/* Projects Cards - Animated carousel */}
          <div className="relative">
        <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible">
          {proyectosTrayectoria.map((proyecto, index) => (
            <div
          key={index}
          className="group relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto h-[320px] sm:h-[380px] lg:h-[450px] snap-center animate-fade-in-up hover:shadow-lift transition-all duration-500"
          style={{ animationDelay: `${index * 0.15}s` }}
            >
          <img 
            src={proyecto.image}
            alt={proyecto.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
          
          {/* Year badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.15 + 0.1}s` }}>
            <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs sm:text-sm font-display font-bold rounded-full shadow-gold hover:scale-105 transition-transform duration-300">
              {proyecto.year}
            </span>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8">
            <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <h3 className="text-white font-display font-bold text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
            {proyecto.name}
              </h3>
              
              <div className="flex items-center gap-3 mb-3 sm:mb-4 animate-fade-in" style={{ animationDelay: `${index * 0.15 + 0.2}s` }}>
            <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              proyecto.status === "Entregado" 
                ? "bg-white/20 text-white backdrop-blur-sm group-hover:bg-white/40"
                : proyecto.status === "En Proceso"
                ? "bg-accent text-accent-foreground group-hover:shadow-gold"
                : "bg-white/30 text-white backdrop-blur-sm group-hover:bg-white/50"
            }`}>
              {proyecto.status}
            </span>
            <span className="text-white/80 text-sm font-body group-hover:text-white transition-colors duration-300">{proyecto.units} unidades</span>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <Link to="/trayectoria">
              <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-accent text-white hover:text-accent-foreground font-display font-bold text-xs uppercase tracking-wide border border-white/30 hover:border-accent transition-all duration-300 group/btn hover:shadow-gold">
                Ver Proyecto
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-smooth" />
              </Button>
            </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent animate-pulse"></div>
          </div>
            </div>
          ))}
        </div>
        
        {/* Mobile scroll indicator */}
        <div className="flex justify-center gap-2 mt-4 lg:hidden">
          {proyectosTrayectoria.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}></div>
          ))}
        </div>
          </div>
        </div>
      </section>

      {/* Galería Preview */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-heading mb-4">
              Galería <span className="text-accent">Visual</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-body font-light">
              Un vistazo a lo que será tu nuevo hogar
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {galeriaImages.map((image, index) => (
              <div 
                key={index}
                className="aspect-square rounded-lg overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={image}
                  alt={`Galería ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-elegant"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/galeria">
              <Button variant="outline" size="lg" className="border-2 border-foreground/80 text-foreground hover:bg-foreground hover:text-background font-display font-bold uppercase tracking-wide transition-smooth">
                Ver Galería Completa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;