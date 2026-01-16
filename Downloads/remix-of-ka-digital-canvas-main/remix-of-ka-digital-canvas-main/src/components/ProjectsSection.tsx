import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { PremiumLink } from "./ui/premium-button";
import projectVeneziaIMac from "@/assets/project-venezia-imac.png";
import projectGiutoursIPad from "@/assets/project-giutours-ipad.png";
import projectSportswearLaptop from "@/assets/project-sportswear-laptop.png";
import projectSportswearMobile from "@/assets/project-sportswear-mobile.png";

interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: string;
  y: string;
}

interface Project {
  id: string;
  title: string;
  watermark: string;
  description: string;
  image: string;
  secondaryImage?: string;
  link: string;
  hotspots: Hotspot[];
  layout: "dual-mockup" | "single-mockup";
}

const projects: Project[] = [
  {
    id: "sportswear",
    title: "AR Sportswear Fit",
    watermark: "SPORTSWEAR FIT",
    description: "Sitio web de e-commerce para marca de ropa deportiva femenina. Diseño moderno, catálogo de productos y compras vía WhatsApp.",
    image: projectSportswearMobile,
    secondaryImage: projectSportswearLaptop,
    link: "https://arsportswearfit.com",
    layout: "dual-mockup",
    hotspots: [
      { id: "1", label: "Catálogo", description: "Productos organizados por categoría", x: "75%", y: "35%" },
      { id: "2", label: "Responsive", description: "Adaptado a todos los dispositivos", x: "85%", y: "55%" },
      { id: "3", label: "WhatsApp", description: "Compras directas por chat", x: "25%", y: "45%" },
      { id: "4", label: "Galería", description: "Imágenes de alta calidad", x: "35%", y: "70%" },
    ],
  },
  {
    id: "giutours",
    title: "GIUTOURS",
    watermark: "GIUTOURS",
    description: "Transporte y experiencias turísticas en Cartagena, diseñadas para viajeros que buscan comodidad, seguridad y atención personalizada.",
    image: projectGiutoursIPad,
    link: "https://giutourscom.netlify.app",
    layout: "single-mockup",
    hotspots: [
      { id: "1", label: "Responsive", description: "Optimizado para móvil y desktop", x: "15%", y: "25%" },
      { id: "2", label: "Bilingüe", description: "Contenido en español e inglés", x: "85%", y: "20%" },
      { id: "3", label: "SEO", description: "Posicionamiento en buscadores", x: "80%", y: "60%" },
      { id: "4", label: "WhatsApp", description: "Cotización instantánea", x: "20%", y: "70%" },
    ],
  },
  {
    id: "venezia",
    title: "Venezia Tower House",
    watermark: "VENEZIA TOWER",
    description: "Proyecto inmobiliario en Cartagena enfocado en la presentación clara de apartamentos, precios y tipologías para facilitar la decisión de compra.",
    image: projectVeneziaIMac,
    link: "https://veneziatowerhouse.com",
    layout: "single-mockup",
    hotspots: [
      { id: "1", label: "Info", description: "Detalles del proyecto claros", x: "20%", y: "30%" },
      { id: "2", label: "Planos", description: "Tipologías y distribución", x: "80%", y: "25%" },
      { id: "3", label: "Precios", description: "Información transparente", x: "75%", y: "65%" },
      { id: "4", label: "Conversión", description: "Diseño enfocado en ventas", x: "25%", y: "75%" },
    ],
  },
];

// Enhanced Hotspot component with elegant tooltip - CENTERED
const HotspotDot = ({ 
  hotspot, 
  isActive, 
  onHover, 
  onLeave,
  delay 
}: { 
  hotspot: Hotspot; 
  isActive: boolean; 
  onHover: () => void; 
  onLeave: () => void;
  delay: number;
}) => (
  <motion.div
    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
    style={{ left: hotspot.x, top: hotspot.y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
  >
    <div
      className="relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Dot - more rounded */}
      <div className="relative">
        <div className="w-5 h-5 md:w-6 md:h-6 bg-foreground rounded-full flex items-center justify-center shadow-lg">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-background rounded-full" />
        </div>
        <div className="absolute inset-0 w-5 h-5 md:w-6 md:h-6 bg-foreground/20 rounded-full animate-ping" />
      </div>

      {/* Enhanced Tooltip - properly centered above dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-30 pointer-events-none"
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="bg-foreground text-background px-4 py-2.5 rounded-xl shadow-2xl min-w-[130px] max-w-[180px] text-center">
          <p className="text-xs font-semibold mb-0.5 whitespace-nowrap">{hotspot.label}</p>
          <p className="text-[10px] opacity-75 leading-tight">{hotspot.description}</p>
          {/* Arrow - centered and more rounded */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-foreground" />
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Section Divider - transition between projects
const ProjectDivider = ({ index }: { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      className="relative h-[30vh] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      {/* Center dot */}
      <motion.div
        className="relative z-10 w-3 h-3 bg-foreground/30 rounded-full"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="absolute inset-0 bg-foreground/10 rounded-full animate-ping" />
      </motion.div>

      {/* Project number indicator */}
      <motion.span
        className="absolute right-8 md:right-16 text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        0{index + 2}
      </motion.span>
    </motion.div>
  );
};

// Dual Mockups Project Card - LARGER MOCKUPS & IMPROVED LAYOUT
const DualMockupProjectCard = ({ project }: { project: Project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven animations
  const mobileY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -30, -60]);
  const mobileRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, -2, -4]);
  const laptopX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 40]);
  const laptopScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.05]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Watermark */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ x: watermarkX }}
        >
          <span className="text-[12vw] sm:text-[15vw] md:text-[18vw] font-bold tracking-tighter whitespace-nowrap text-foreground/[0.03]">
            {project.watermark}
          </span>
        </motion.div>

        <div className="container-custom relative z-10 flex flex-col h-full justify-center py-20">
          {/* Dual Mockups - FIRST on mobile */}
          <div className="relative flex justify-center items-end gap-2 sm:gap-4 md:gap-8 lg:gap-12 order-1 md:order-1 mb-6 md:mb-10">
            {/* Mobile mockup - LARGER */}
            <motion.div
              className="relative z-10"
              style={{ y: mobileY, rotate: mobileRotate }}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={project.image}
                alt={`${project.title} mobile`}
                className="w-[100px] sm:w-[150px] md:w-[240px] lg:w-[320px] xl:w-[400px] h-auto drop-shadow-2xl rounded-2xl md:rounded-3xl"
              />
            </motion.div>

            {/* Laptop mockup - LARGER */}
            <motion.div
              className="relative"
              style={{ x: laptopX, scale: laptopScale }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src={project.secondaryImage}
                alt={`${project.title} desktop`}
                className="w-[180px] sm:w-[280px] md:w-[420px] lg:w-[550px] xl:w-[680px] h-auto drop-shadow-2xl"
              />
              
              {/* Hotspots - only on larger screens */}
              <div className="hidden md:block">
                {project.hotspots.map((hotspot, idx) => (
                  <HotspotDot
                    key={hotspot.id}
                    hotspot={hotspot}
                    isActive={activeHotspot === hotspot.id}
                    onHover={() => setActiveHotspot(hotspot.id)}
                    onLeave={() => setActiveHotspot(null)}
                    delay={0.8 + idx * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mobile: Feature badges below mockups */}
          <motion.div
            className="flex md:hidden flex-wrap justify-center gap-2 mt-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {project.hotspots.slice(0, 4).map((hotspot, idx) => (
              <span 
                key={hotspot.id}
                className="text-[10px] px-3 py-1.5 bg-foreground/5 rounded-full text-muted-foreground"
              >
                {hotspot.label}
              </span>
            ))}
          </motion.div>

          {/* Content BELOW mockups - centered */}
          <motion.div
            className="text-center max-w-xl mx-auto px-4 order-2"
            style={{ opacity: contentOpacity }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 px-3 py-1.5 bg-foreground/5 rounded-full">
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
              Proyecto destacado
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">{project.title}</h3>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-5 md:mb-8 max-w-md mx-auto leading-relaxed">
              {project.description}
            </p>

            <PremiumLink
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="rounded-xl"
            >
              Ver proyecto
              <ArrowRight className="w-4 h-4" />
            </PremiumLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Single mockup project - LARGER MOCKUPS
const SingleMockupProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.04]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -40 : 40]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[180vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Watermark */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ x: watermarkX }}
        >
          <span className="text-[12vw] sm:text-[15vw] md:text-[18vw] font-bold tracking-tighter whitespace-nowrap text-foreground/[0.03]">
            {project.watermark}
          </span>
        </motion.div>

        <div className="container-custom relative z-10 pt-16 md:pt-20">
          <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 md:gap-10 lg:gap-16`}>
            
            {/* Mockup - LARGER with rounded corners */}
            <motion.div
              className="relative w-full lg:w-[60%] flex justify-center"
              style={{ y: mockupY, scale: mockupScale }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-[280px] sm:w-[380px] md:w-[500px] lg:w-[600px] xl:w-[720px] h-auto drop-shadow-2xl"
                />
                
                {/* Hotspots - only on larger screens */}
                <div className="hidden md:block">
                  {project.hotspots.map((hotspot, idx) => (
                    <HotspotDot
                      key={hotspot.id}
                      hotspot={hotspot}
                      isActive={activeHotspot === hotspot.id}
                      onHover={() => setActiveHotspot(hotspot.id)}
                      onLeave={() => setActiveHotspot(null)}
                      delay={0.6 + idx * 0.1}
                    />
                  ))}
                </div>
                
                {/* Mobile: Feature badges */}
                <motion.div
                  className="flex md:hidden flex-wrap justify-center gap-2 mt-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {project.hotspots.slice(0, 4).map((hotspot) => (
                    <span 
                      key={hotspot.id}
                      className="text-[10px] px-3 py-1.5 bg-foreground/5 rounded-full text-muted-foreground"
                    >
                      {hotspot.label}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className={`w-full lg:w-[40%] text-center ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'} px-4`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className={`inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 px-3 py-1.5 bg-foreground/5 rounded-full ${index % 2 !== 0 ? 'lg:ml-auto' : ''}`}>
                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
                Proyecto destacado
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">{project.title}</h3>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-5 md:mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed">
                {project.description}
              </p>

              <PremiumLink
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className={`rounded-xl ${index % 2 !== 0 ? 'lg:ml-auto' : ''}`}
              >
                Ver proyecto
                <ArrowRight className="w-4 h-4" />
              </PremiumLink>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative bg-background">
      {/* Section Header */}
      <motion.div 
        ref={headerRef}
        className="container-custom py-16 md:py-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 px-3 py-1.5 bg-foreground/5 rounded-full">
          <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
          Portafolio
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Proyectos</h2>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
          Sitios web diseñados como productos digitales premium, enfocados en conversión y experiencia de usuario.
        </p>
      </motion.div>

      {/* Projects with pinned scroll and dividers */}
      {projects.map((project, index) => (
        <div key={project.id}>
          {project.layout === "dual-mockup" ? (
            <DualMockupProjectCard project={project} />
          ) : (
            <SingleMockupProjectCard project={project} index={index} />
          )}
          
          {/* Add divider between projects */}
          {index < projects.length - 1 && (
            <ProjectDivider index={index} />
          )}
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection;
