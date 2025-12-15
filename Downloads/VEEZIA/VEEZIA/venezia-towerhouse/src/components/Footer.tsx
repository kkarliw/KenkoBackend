import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/573204637230?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <footer className="relative bg-navy text-white overflow-hidden">

      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />

      {/* Contenido principal */}
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-14 py-16 sm:py-18">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-12">

          {/* LOGO + INFO */}
          <div className="space-y-5">
            <img
              src="/images/venezia-logo-light.png"
              alt="Venezia Tower House"
              className="h-14"
              loading="lazy"
            />

            <p className="text-xs text-accent font-display font-bold tracking-widest uppercase">
              Cartagena, Bolívar
            </p>

            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Un proyecto pensado para vivir con estilo, exclusividad y comodidad en una de las mejores zonas de Cartagena.
            </p>

            <p className="text-white/60 text-xs uppercase tracking-wide">
              PROMOTORA VENEZIA TOWER HOUSE SAS <br />
              NIT: 901670453
            </p>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() =>
                  openWhatsApp(
                    "Hola, me gustaría obtener más información sobre Venezia Tower House."
                  )
                }
                title="Contactar por WhatsApp"
                className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-gold hover:scale-110 transition"
              >
                <FaWhatsapp className="w-5 h-5" />
              </button>

              {[FaInstagram, FaFacebook, FaTiktok].map((Icon, i) => (
                <a
                  key={i}
                  title={["Instagram", "Facebook", "TikTok"][i]}
                  className="w-10 h-10 bg-white/10 hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* NAVEGACIÓN (CON FONDO PROPIO) */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h3 className="font-display font-bold text-base mb-4 uppercase tracking-wide text-accent">
              Navegación
            </h3>

            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="/" className="hover:text-accent transition">Inicio</a></li>
              <li><a href="/tipologias" className="hover:text-accent transition">Tipologías</a></li>
              <li><a href="/ubicacion" className="hover:text-accent transition">Ubicación</a></li>
              <li><a href="/galeria" className="hover:text-accent transition">Galería</a></li>
              <li><a href="/trayectoria" className="hover:text-accent transition">Trayectoria</a></li>
              <li><a href="/contacto" className="hover:text-accent transition">Contacto</a></li>
            </ul>
          </div>

          {/* CENTRO DE VENTAS (CON FONDO PROPIO) */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h3 className="font-display font-bold text-base mb-4 uppercase tracking-wide text-accent">
              Centro de Ventas
            </h3>

            <div className="space-y-4 text-sm text-white/80">
              <div>
                <p className="text-xs uppercase text-white/50 mb-1">Ubicación</p>
                Cartagena, Bolívar
              </div>

              <div>
                <p className="text-xs uppercase text-white/50 mb-1">Horario</p>
                Lun - Vie: 7:00 a.m - 05:00 p.m <br />
                Sáb: 7:00 a.m - 12:00 p.m
              </div>

              <div>
                <p className="text-xs uppercase text-white/50 mb-1">Teléfono</p>
                <a
                  href="tel:+573204637230"
                  className="hover:text-accent transition"
                >
                  +57 (320) 463-7230
                </a>
              <button
                onClick={() =>
                  openWhatsApp(
                    "Hola, quiero información del proyecto Venezia Tower House."
                  )
                }
                title="Contactar ahora por WhatsApp"
                className="mt-3 w-full bg-accent text-accent-foreground font-bold py-2.5 rounded-lg hover:scale-105 transition"
              >
                Contactar ahora
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {currentYear} Venezia Tower House. Todos los derechos reservados.
          </p>

          <div className="flex gap-5">
            <a className="hover:text-accent transition"></a>
            <a className="hover:text-accent transition"></a>
            <a className="hover:text-accent transition"></a>
          </div>
        </div>
      </div>

      {/* WhatsApp flotante móvil */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          onClick={() =>
            openWhatsApp(
              "Hola, me gustaría obtener más información sobre Venezia Tower House."
            )
          }
          title="Contactar por WhatsApp"
          className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
        >
          <FaWhatsapp className="w-7 h-7" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
