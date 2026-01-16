import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logoLight from "@/assets/logo-light.jpg";

const TermsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoLight} 
              alt="Design by K.A™" 
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver</span>
          </Link>
        </div>
      </motion.header>

      {/* Content */}
      <main className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container-custom max-w-4xl" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span className="label text-muted-foreground mb-4 block">Legal</span>
            <h1 className="heading-xl mb-4">Términos y Condiciones</h1>
            <p className="body-lg text-muted-foreground">
              Al contratar cualquiera de los servicios de diseño y desarrollo web, el cliente acepta los siguientes términos y condiciones.
            </p>
          </motion.div>

          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 md:mb-12"
          >
            <h2 className="heading-md mb-4">1. Alcance del servicio</h2>
            <ul className="space-y-3 text-muted-foreground body-md">
              <li className="pl-4 border-l-2 border-border">
                Cada proyecto incluye únicamente las funcionalidades, secciones y características acordadas previamente en la cotización o propuesta aceptada por el cliente.
              </li>
              <li className="pl-4 border-l-2 border-border">
                Cualquier funcionalidad, sección, contenido o ajuste que no esté contemplado en el alcance inicial será considerado como un servicio adicional y se cotizará aparte.
              </li>
            </ul>
          </motion.section>

          {/* Section 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10 md:mb-12"
          >
            <h2 className="heading-md mb-4">2. Proceso de trabajo</h2>
            <p className="text-muted-foreground body-md mb-4">
              El proyecto se desarrolla por etapas, las cuales pueden incluir:
            </p>
            <ul className="grid grid-cols-2 gap-2 mb-4">
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Diseño
              </li>
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Estructuración de contenido
              </li>
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Desarrollo
              </li>
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Ajustes finales
              </li>
            </ul>
            <p className="text-muted-foreground body-md pl-4 border-l-2 border-border">
              El cliente se compromete a entregar la información necesaria (textos, imágenes, datos) dentro de los tiempos acordados para evitar retrasos en la entrega.
            </p>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 md:mb-12"
          >
            <h2 className="heading-md mb-4">3. Tiempos de entrega</h2>
            <p className="text-muted-foreground body-md mb-4">
              Los tiempos de entrega son estimados y pueden variar según:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> La complejidad del proyecto
              </li>
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> La rapidez con la que el cliente entregue la información
              </li>
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Solicitudes de cambios adicionales
              </li>
            </ul>
            <p className="text-muted-foreground body-md pl-4 border-l-2 border-border">
              Retrasos por parte del cliente pueden afectar el cronograma sin responsabilidad para el proveedor del servicio.
            </p>
          </motion.section>

          {/* Section 4 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10 md:mb-12"
          >
            <h2 className="heading-md mb-4">4. Responsabilidades del cliente</h2>
            <p className="text-muted-foreground body-md mb-4">El cliente es responsable de:</p>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> La veracidad del contenido proporcionado
              </li>
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Contar con los derechos de uso de imágenes, textos y marcas entregadas
              </li>
              <li className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" /> Revisar y aprobar cada etapa del proyecto
              </li>
            </ul>
            <p className="text-muted-foreground body-md pl-4 border-l-2 border-border">
              El proveedor no se hace responsable por contenidos entregados por el cliente que infrinjan derechos de terceros.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="heading-md mb-4">5. Entrega del proyecto</h2>
            <p className="text-muted-foreground body-md pl-4 border-l-2 border-border">
              El proyecto se considera finalizado una vez el cliente aprueba la versión final y realiza el pago total del servicio contratado.
            </p>
          </motion.section>

          {/* Política de Pagos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="heading-lg mb-6 text-foreground">Política de Pagos</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="heading-sm mb-3">1. Anticipo</h3>
                <ul className="space-y-2 text-muted-foreground body-md">
                  <li className="pl-4 border-l-2 border-border">
                    Para iniciar cualquier proyecto se requiere un anticipo mínimo del 50% del valor total del servicio.
                  </li>
                  <li className="pl-4 border-l-2 border-border">
                    Sin el pago del anticipo, el proyecto no será iniciado ni agendado.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="heading-sm mb-3">2. Pago final</h3>
                <ul className="space-y-2 text-muted-foreground body-md">
                  <li className="pl-4 border-l-2 border-border">
                    El 50% restante deberá ser cancelado una vez el proyecto esté finalizado y antes de su entrega o publicación final.
                  </li>
                  <li className="pl-4 border-l-2 border-border">
                    No se realizará la entrega del proyecto ni se habilitará el acceso final sin el pago completo.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="heading-sm mb-3">3. Retrasos en pagos</h3>
                <ul className="space-y-2 text-muted-foreground body-md">
                  <li className="pl-4 border-l-2 border-border">El proyecto podrá ser pausado</li>
                  <li className="pl-4 border-l-2 border-border">Los tiempos de entrega se verán afectados</li>
                  <li className="pl-4 border-l-2 border-border">La reactivación del proyecto quedará sujeta a disponibilidad</li>
                </ul>
              </div>

              <div>
                <h3 className="heading-sm mb-3">4. Reembolsos</h3>
                <p className="text-muted-foreground body-md pl-4 border-l-2 border-border">
                  Los pagos realizados no son reembolsables, ya que corresponden al tiempo y trabajo invertido en el desarrollo del proyecto.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Política de Cambios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="heading-lg mb-6 text-foreground">Política de Cambios y Revisiones</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="heading-sm mb-3">1. Revisiones incluidas</h3>
                <ul className="space-y-2 text-muted-foreground body-md">
                  <li className="pl-4 border-l-2 border-border">
                    Cada proyecto incluye un número limitado de revisiones, las cuales se detallan en la cotización inicial.
                  </li>
                  <li className="pl-4 border-l-2 border-border">
                    Las revisiones incluyen ajustes menores sobre el trabajo presentado.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="heading-sm mb-3">2. Cambios adicionales</h3>
                <p className="text-muted-foreground body-md mb-3">Se consideran cambios adicionales:</p>
                <ul className="space-y-2 text-muted-foreground body-md">
                  <li className="pl-4 border-l-2 border-border">Modificaciones que alteren el diseño aprobado</li>
                  <li className="pl-4 border-l-2 border-border">Cambios de estructura</li>
                  <li className="pl-4 border-l-2 border-border">Nuevas secciones o funcionalidades</li>
                  <li className="pl-4 border-l-2 border-border">Cambios solicitados después de la aprobación final</li>
                </ul>
                <p className="text-muted-foreground body-md mt-3 pl-4 border-l-2 border-foreground/30">
                  Estos cambios se cotizan y cobran de forma independiente.
                </p>
              </div>

              <div>
                <h3 className="heading-sm mb-3">3. Aprobaciones</h3>
                <p className="text-muted-foreground body-md pl-4 border-l-2 border-border">
                  Una vez el cliente aprueba una etapa del proyecto, cualquier modificación posterior sobre esa parte será considerada un cambio adicional.
                </p>
              </div>

              <div>
                <h3 className="heading-sm mb-3">4. Soporte posterior</h3>
                <p className="text-muted-foreground body-md pl-4 border-l-2 border-border">
                  El soporte posterior a la entrega del proyecto no está incluido, salvo que el cliente contrate un servicio de mantenimiento mensual o solicite ajustes puntuales, los cuales se cotizan aparte.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Nota Final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-secondary p-6 md:p-8 rounded-sm"
          >
            <h3 className="heading-sm mb-3">Nota Final</h3>
            <p className="text-muted-foreground body-md">
              La contratación de los servicios implica la aceptación total de estos términos, políticas de pago y políticas de cambios.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 md:mt-16 pt-8 border-t border-border text-center"
          >
            <p className="text-muted-foreground body-md mb-4">¿Tienes dudas sobre estos términos?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:designbyka.studio@gmail.com" 
                className="flex items-center gap-2 text-foreground hover:text-foreground/70 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">designbyka.studio@gmail.com</span>
              </a>
              <a 
                href="https://wa.me/573107086902" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-foreground/70 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
