import { Award, Building, CheckCircle, Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const letter = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.4 },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Trayectoria = () => {
  const projects = [
    {
      year: "2018",
      name: "Edifício Turín",
      status: "Entregado",
      units: 22,
      description:
        "Nuestro primer proyecto, estableciendo las bases de calidad y diseño que hoy nos representan.",
      image: "images/turin.jpg",
    },
    {
      year: "2019",
      name: "Edificio Bilbao",
      status: "Entregado",
      units: 48,
      description:
        "Un paso firme en nuestro crecimiento, mejorando cada detalle constructivo y funcional.",
      image: "images/bilbao.jpg",
    },
    {
      year: "2022",
      name: "Barak Apartamentos",
      status: "En Entrega",
      units: 36,
      description:
        "Un proyecto exitoso que combina diseño contemporáneo y alta funcionalidad.",
      image: "images/barak.jpg",
    },
    {
      year: "2024",
      name: "Venezia Tower House",
      status: "En Proceso",
      units: 50,
      description:
        "Nuestro proyecto más ambicioso, elevando los estándares de lujo y confort.",
      image: "images/fachada-02.jpg",
    },
  ];

  const achievements = [
    { icon: Building, number: "150+", text: "Unidades Entregadas" },
    { icon: Award, number: "10+", text: "Años de Experiencia" },
    { icon: CheckCircle, number: "98%", text: "Satisfacción de Clientes" },
    { icon: Clock, number: "100%", text: "Entregas a Tiempo" },
  ];

  const values = [
    {
      icon: Award,
      title: "Excelencia",
      description: "Compromiso inquebrantable con la más alta calidad en cada detalle",
    },
    {
      icon: CheckCircle,
      title: "Confianza",
      description: "Transparencia y honestidad en cada etapa del proceso",
    },
    {
      icon: Building,
      title: "Innovación",
      description: "Diseños vanguardistas que anticipan las necesidades del futuro",
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background overflow-hidden">
      {/* HERO SECTION - Optimizado para móvil */}
      <section className="relative h-[60vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/zona-social.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70" />
        </div>

        {/* Partículas flotantes (solo desktop) */}
        <motion.div className="hidden lg:block absolute top-20 left-10">
          <motion.div
            className="w-2 h-2 bg-accent rounded-full opacity-60"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Nuestra <span className="text-accent block sm:inline">Trayectoria</span>
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto font-light">
            Más de una década construyendo sueños y superando expectativas
          </p>
        </motion.div>
      </section>

      {/* NUESTRA HISTORIA - Responsivo */}
      <section className="py-16 sm:py-28 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-16 items-center px-4 sm:px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6 tracking-tight leading-tight"
              variants={container}
            >
              {"Nuestra ".split("").map((char, i) => (
                <motion.span key={i} variants={letter}>
                  {char}
                </motion.span>
              ))}
              <span className="text-accent">
                {"Historia".split("").map((char, i) => (
                  <motion.span key={`h-${i}`} variants={letter}>
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h2>

            <motion.div
              className="w-16 h-1 bg-accent rounded-full"
              variants={fadeInUp}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-8 sm:leading-9 text-justify">
              Desde nuestros inicios en 2016, hemos recorrido un camino marcado por
              la visión, el compromiso y la pasión por crear espacios que
              trascienden en el tiempo. Cada proyecto desarrollado ha sido una
              oportunidad para perfeccionar nuestros procesos, elevar nuestros
              estándares de diseño y responder con excelencia.
              <br />
              <br />
              Nuestra dedicación a la calidad constructiva, la estética
              arquitectónica y la satisfacción del cliente nos ha permitido
              consolidarnos como referente en Cartagena, con más de 150 unidades
              residenciales entregadas.
            </p>

            <div className="mt-8">
              <div className="w-16 h-px bg-accent mb-4" />
              <p className="text-xs sm:text-sm tracking-widest text-primary font-medium">
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS - Mejorado para móvil */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-12 sm:mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Proyectos <span className="text-accent">Destacados</span>
          </motion.h2>

          <div className="space-y-12 sm:space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`grid lg:grid-cols-2 gap-6 sm:gap-12 items-center ${
                  index % 2 ? "lg:flex-row-reverse" : ""
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <motion.div
                  variants={index % 2 ? slideInRight : slideInLeft}
                  className={index % 2 ? "lg:order-2" : ""}
                >
                  <div className="relative group">
                    <div className="rounded-lg sm:rounded-2xl shadow-lg overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full object-contain h-96 sm:h-[500px] lg:h-[600px] bg-muted group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Year Badge */}
                    <motion.div
                      className="absolute top-4 sm:top-6 left-4 sm:left-6"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-primary font-bold text-sm sm:text-lg">
                          {project.year}
                        </span>
                      </div>
                    </motion.div>

                    {/* Status Badge */}
                    <motion.div
                      className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      <span
                        className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md ${
                          project.status === "Entregado"
                            ? "bg-primary/90 text-white"
                            : "bg-accent/90 text-primary"
                        }`}
                      >
                        {project.status}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  variants={index % 2 ? slideInLeft : slideInRight}
                  className={`space-y-4 sm:space-y-6 ${index % 2 ? "lg:order-1" : ""}`}
                >
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
                      {project.name}
                    </h3>
                    <div className="w-12 sm:w-16 h-1 bg-accent rounded-full" />
                  </div>

                  <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-accent">
                        {project.units}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Unidades</p>
                    </div>
                    <div className="w-px h-10 sm:h-12 bg-accent/30" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-primary">
                        {project.status}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Estado Actual</p>
                    </div>
                  </div>

                  {project.status === "Entregado" && (
                    <motion.div
                      className="flex items-center gap-2 text-primary pt-2 sm:pt-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">
                        Proyecto Concluido Exitosamente
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGROS - Premium y responsive */}
      <section className="py-20 sm:py-32 bg-background relative overflow-hidden">
        {/* Fondo decorativo */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-center">
              Nuestros <span className="text-accent">Logros</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-6 sm:p-8 bg-gradient-to-br from-muted to-muted/50 rounded-xl hover:from-accent/5 hover:to-accent/10 transition-all duration-500 border border-transparent hover:border-accent/20 h-full flex flex-col items-center justify-center">
                    <motion.div
                      className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-4 bg-accent/15 rounded-full flex items-center justify-center relative overflow-hidden"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="absolute inset-0 bg-accent/10 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                      <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-accent relative z-10" />
                    </motion.div>

                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-center mb-2 tracking-tight">
                      {item.number}
                    </p>

                    <p className="text-center text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {item.text}
                    </p>

                    <motion.div
                      className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALORES - Premium y responsive */}
      <section className="py-20 sm:py-32 bg-muted relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-center">
              Nuestros <span className="text-accent">Valores</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="p-8 sm:p-10 bg-background rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-transparent hover:border-accent/30 relative overflow-hidden h-full flex flex-col">
                    <motion.div
                      className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-accent/5 rounded-full blur-3xl -z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <motion.div
                      className="w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-4 sm:mb-6 bg-accent/20 rounded-full flex items-center justify-center relative"
                      whileHover={{
                        scale: 1.2,
                        rotate: 15,
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-7 sm:w-8 h-7 sm:h-8 text-accent" />
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-bold text-primary text-center mb-3 sm:mb-4">
                      {value.title}
                    </h3>

                    <div className="w-10 sm:w-12 h-0.5 bg-accent mx-auto mb-4 sm:mb-4 rounded-full" />

                    <p className="text-muted-foreground text-center text-xs sm:text-sm leading-relaxed flex-grow">
                      {value.description}
                    </p>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION - Premium y móvil optimizado */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from/100 text-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">  
          <motion.h2
            className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            ¿Listo para <span className="text-accent">Construir tu Futuro</span> con Nosotros?
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg mb-8 sm:mb-12 text-blue/90"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
Nuestro propósito es construir relaciones basadas en la confianza, para que juntos demos vida al hogar que mereces.          </motion.p>

          <motion.a
            href="/contacto"
            className="inline-block bg-accent hover:bg-accent/90 text-blue font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            Contáctanos
          </motion.a>
        </div>
      </section>
        </div>
  );
};

export default Trayectoria;