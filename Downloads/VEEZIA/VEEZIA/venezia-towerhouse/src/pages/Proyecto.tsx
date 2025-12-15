import { Building2, Home, TreePine, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Proyecto = () => {
  const features = [
    {
      icon: Building2,
      title: "Arquitectura Moderna",
      description: "Diseño contemporáneo con líneas limpias y materiales de alta calidad, pensado para integrarse a la dinámica urbana de Crespo.",
    },
    {
      icon: Home,
      title: "Espacios Eficientes",
      description: "Distribuciones funcionales que maximizan la luz natural, la ventilación y el aprovechamiento de cada metro cuadrado.",
    },
    {
      icon: TreePine,
      title: "Áreas Verdes",
      description: "Parque infantil y zonas verdes para la recreación y el esparcimiento de toda la familia.",
    },
    {
      icon: Shield,
      title: "Seguridad 24/7",
      description: "Sistema de seguridad integral con acceso controlado y vigilancia",
    },
  ];

  const proyectoInfo = {
    fechaInicio: "2024",
    fechaEntrega: "Segundo semestre de 2028",
    estado: "En desarrollo",
  };

  return (
    <div className="min-h-screen pt-20">
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(217, 119, 6, 0.3);
          }
          50% {
            opacity: 0.98;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 10px rgba(217, 119, 6, 0);
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/fachada-01.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.6)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            El <span className="text-accent">Proyecto</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Una obra maestra arquitectónica en el corazón de la ciudad
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary">
                Venezia Tower House
              </h2>
              <div className="w-24 h-1 bg-accent" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ubicado en Crespo, Cartagena. Venezia Tower House es un proyecto residencial contemporáneo diseñado para quienes buscan confort, ubicación estratégica y un estilo de vida práctico y moderno.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Con 16 niveles, 3 pisos de parqueaderos, 50 unidades exclusivas y amenidades completas, Venezia integra arquitectura actual, funcionalidad y espacios pensados para la vida cotidiana y las nuevas dinámicas de vivienda y renta.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-accent">16</div>
                  <div className="text-sm text-muted-foreground">Niveles de Altura</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-accent">50</div>
                  <div className="text-sm text-muted-foreground">Apartamentos</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-accent">7</div>
                  <div className="text-sm text-muted-foreground">Tipologías Únicas</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-accent">215,4 m²</div>
                  <div className="text-sm text-muted-foreground">Áreas Comunes</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-elegant">
                <img 
                  src="/images/fachada-02.jpg"
                  alt="Render del proyecto"
                />
              </div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent/20 rounded-lg -z-10" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Características <span className="text-accent">Distintivas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elementos que hacen de Venezia Tower House un proyecto único
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-8 rounded-lg shadow-elegant hover:shadow-lift transition-elegant group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-smooth" />
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Timeline & Status */}
      <section className="py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Estado del <span className="text-accent">Proyecto</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cronograma de desarrollo y hitos clave del proyecto Venezia Tower House
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="space-y-12">
              {[
                {
                  year: "2024",
                  phase: "Inicio del Proyecto",
                  title: "Licencias y Preparación",
                  description: "Obtención de licencias, diseño final y preparación del terreno",
                  icon: Building2,
                  status: "completed",
                },
                {
                  year: "2025-2028",
                  phase: "En Construcción",
                  title: "Fase Actual",
                  description: "Construcción activa con avances significativos",
                  icon: Home,
                  status: "active",
                },
                {
                  year: "Segundo Semestre de 2028",
                  phase: "Entrega",
                  title: "Entrega de Unidades",
                  description: "Entrega de todas las unidades a los propietarios",
                  icon: Shield,
                  status: "pending",
                }
              ].map((milestone, index) => {
                const Icon = milestone.icon;
                const isActive = milestone.status === 'active';
                const isCompleted = milestone.status === 'completed';

                return (
                  <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    {/* Línea conectora (solo entre items) */}
                    {index < 2 && (
                      <div className="absolute left-8 top-24 w-0.5 h-16 bg-gradient-to-b from-accent/60 to-accent/20" />
                    )}

                    <div className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lift hover:-translate-y-1 ${
                      isCompleted ? 'bg-green-50 border-green-200' :
                      isActive ? 'bg-amber-50 border-amber-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      
                      {/* Status Badge */}
                      <div className="absolute -top-3 right-6">
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                            <Check className="w-4 h-4" />
                            Completado
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center gap-1 bg-accent text-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-md animate-bounce" style={{ animationDuration: '2s' }}>
                            ⚡ En Curso
                          </span>
                        )}
                        {milestone.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                            Próximo
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex gap-6">
                        {/* Icon Circle */}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted ? 'bg-green-200 text-green-700' :
                          isActive ? 'bg-amber-200 text-amber-700' :
                          'bg-blue-200 text-blue-700'
                        }`}>
                          <Icon className="w-8 h-8" />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                            isCompleted ? 'text-green-700' :
                            isActive ? 'text-amber-700' :
                            'text-blue-700'
                          }`}>
                            {milestone.phase}
                          </p>
                          <h3 className="text-2xl font-bold text-primary mb-1">{milestone.year}</h3>
                          <h4 className="text-lg font-bold text-primary mb-2">{milestone.title}</h4>
                          <p className="text-muted-foreground text-sm">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Financing Plans */}
          <div className="mb-16">
            <h3 className="text-4xl font-bold text-primary text-center mb-10">
              Planes de <span className="text-accent">Financiación</span>
              <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                Descubre las opciones flexibles que ofrecemos para hacer realidad la compra de tu apartamento en Venezia Tower House.
              </p>
            </h3>
            
            {/* Plan 1: Separación */}
            <div className="mb-12 animate-fade-in-up">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl overflow-hidden shadow-2xl hover:shadow-lift transition-all duration-300 transform hover:-translate-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/30">
                  <div className="px-6 py-8 lg:px-8 lg:py-10 text-center text-white hover:bg-white/10 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-white/90">Separación</p>
                    <p className="text-4xl lg:text-5xl font-bold text-white">5%</p>
                    <p className="text-xs lg:text-sm mt-2 text-white/90">Máx. 2 cuotas</p>
                  </div>
                  <div className="px-6 py-8 lg:px-8 lg:py-10 text-center text-white hover:bg-white/10 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-white/90">Cuota Inicial</p>
                    <p className="text-4xl lg:text-5xl font-bold text-white">25%</p>
                    <p className="text-xs lg:text-sm mt-2 text-white/90">Al momento de compra</p>
                  </div>
                  <div className="px-6 py-8 lg:px-8 lg:py-10 text-center text-white hover:bg-white/10 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-white/90">Cuotas Mensuales</p>
                    <p className="text-4xl lg:text-5xl font-bold text-white">36</p>
                    <p className="text-xs lg:text-sm mt-2 text-white/90">Hasta entrega</p>
                  </div>
                  <div className="px-6 py-8 lg:px-8 lg:py-10 text-center text-white hover:bg-white/10 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-white/90">Saldo Final</p>
                    <p className="text-4xl lg:text-5xl font-bold text-white">70%</p>
                    <p className="text-xs lg:text-sm mt-2 text-white/90">Al momento de entrega</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan 2: Hipotecario */}
            <div className="mb-12 animate-fade-in-up relative" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-center mb-6">
                <div className="animate-bounce" style={{ animationDuration: '2s' }}>
                  <span className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
                    ⭐ Forma de Pago Popular ⭐
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl overflow-hidden shadow-2xl hover:shadow-lift transition-all duration-300 transform hover:-translate-y-2 animate-pulse-subtle">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                  <div className="px-4 sm:px-6 py-8 lg:px-8 lg:py-10 text-center text-primary hover:bg-white/20 transition-colors duration-300 border-b sm:border-b-0 sm:border-r border-white/30">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-primary/90">Cuota Inicial</p>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">30%</p>
                    <p className="text-xs lg:text-sm mt-2 text-primary/90">Separación + 25%</p>
                  </div>
                  <div className="px-4 sm:px-6 py-8 lg:px-8 lg:py-10 text-center text-primary hover:bg-white/20 transition-colors duration-300 border-b sm:border-b-0 sm:border-r border-white/30">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-primary/90">Cuotas Ordinarias</p>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">36</p>
                    <p className="text-xs lg:text-sm mt-2 text-primary/90">Pagos mensuales</p>
                  </div>
                  <div className="px-4 sm:px-6 py-8 lg:px-8 lg:py-10 text-center text-primary hover:bg-white/20 transition-colors duration-300 border-b sm:border-b-0 sm:border-r border-white/30">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-primary/90">Crédito Hipotecario</p>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">70%</p>
                    <p className="text-xs lg:text-sm mt-2 text-primary/90">Hasta 20 años</p>
                  </div>
                  <div className="px-4 sm:px-6 py-8 lg:px-8 lg:py-10 text-center text-primary hover:bg-white/20 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-primary/90">Tasa</p>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Preferencial</p>
                    <p className="text-xs lg:text-sm mt-2 text-primary/90">Depende de su banco </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan 3: Contado */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-lift transition-all duration-300 transform hover:-translate-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                  <div className="px-6 py-8 lg:px-8 lg:py-10 text-center text-white hover:bg-white/10 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-white/90">Pago en Contado</p>
                    <p className="text-4xl lg:text-5xl font-bold text-white">100%</p>
                    <p className="text-xs lg:text-sm mt-2 text-white/90">Descuentos especiales</p>
                  </div>
                  <div className="px-6 py-8 lg:px-8 lg:py-10 text-center text-white hover:bg-white/10 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-white/90">Beneficio</p>
                    <p className="text-4xl lg:text-5xl font-bold text-accent">+5%</p>
                    <p className="text-xs lg:text-sm mt-2 text-white/90">Descuento directo</p>
                  </div>
                  <div className="px-6 py-8 lg:px-8 lg:py-10 text-center text-white hover:bg-white/10 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-white/90">Cierre Rápido</p>
                    <p className="text-4xl lg:text-5xl font-bold text-white">Inmediato</p>
                    <p className="text-xs lg:text-sm mt-2 text-white/90">Sin trámites bancarios</p>
                  </div>
                  <div className="px-6 py-8 lg:px-8 lg:py-10 text-center text-white hover:bg-white/10 transition-colors duration-300">
                    <p className="text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 text-white/90">Entrega</p>
                    <p className="text-4xl lg:text-5xl font-bold text-accent">Prioritaria</p>
                    <p className="text-xs lg:text-sm mt-2 text-white/90">Acceso preferente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 rounded-2xl p-12 text-center shadow-2xl hover:shadow-lift transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23ffffff'><polygon points='36 30 0 55 0 9'/><polygon points='6 4 30 29 0 43'/></g></g></svg>')]" />
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                ¿Listo para invertir en tu futuro?
              </h3>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Contáctanos para conocer más detalles sobre el avance, oportunidades de inversión y planes de financiación disponibles. Nuestro equipo está listo para ayudarte.
              </p>
              <a href="/agendar-visita">
                <button className="px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 transition-all duration-300 text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                  Agendar Cita
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Proyecto;