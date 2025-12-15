import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Por favor completa todos los campos obligatorios");
      setIsSubmitting(false);
      return;
    }

    const phoneNumber = "573204637230";
    const message = `Hola, me llamo ${formData.name}.\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\nMensaje: ${formData.message || "Solicito información sobre Venezia Tower House"}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen pt-20 bg-background overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] sm:h-[45vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/psicina.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70" />
        </div>

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className="text-accent">Contáctanos</span>
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto font-light">
            Cotiza tu mejor opción de vivienda con nosotros
          </p>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
            {/* CONTACT INFO */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
                  Hablemos sobre tu <span className="text-accent">futuro hogar</span>
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full mb-4 sm:mb-6" />
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Nuestro equipo de asesores está listo para responder todas tus preguntas y guiarte en el proceso de adquisición de tu apartamento en Venezia Tower House.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Location Card */}
                <motion.div
                  className="p-6 sm:p-8 bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-transparent hover:border-accent/20 hover:from-accent/5 hover:to-accent/10 transition-all duration-500 group cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <motion.div
                      className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <MapPin className="w-6 sm:w-7 h-6 sm:h-7 text-accent" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Dirección</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">Crespo, Cra 3 #65-109</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">Cartagena, Colombia</p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  className="p-6 sm:p-8 bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-transparent hover:border-accent/20 hover:from-accent/5 hover:to-accent/10 transition-all duration-500 group cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => window.open("tel:+573204637230")}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <motion.div
                      className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                    >
                      <Phone className="w-6 sm:w-7 h-6 sm:h-7 text-accent" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Teléfono</h3>
                      <p className="text-accent hover:text-accent/80 transition-colors font-semibold text-sm sm:text-base">
                        +57 (320) 4637230
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">Lunes a Sábados</p>
                    </div>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  className="p-6 sm:p-8 bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-transparent hover:border-accent/20 hover:from-accent/5 hover:to-accent/10 transition-all duration-500 group cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => window.open("mailto:veneziatowerhouse@gmail.com")}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <motion.div
                      className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Mail className="w-6 sm:w-7 h-6 sm:h-7 text-accent" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Email</h3>
                      <p className="text-accent hover:text-accent/80 transition-colors font-semibold text-sm sm:text-base break-all">
                        veneziatowerhouse@gmail.com
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">Respuestas en menos de 24 horas</p>
                    </div>
                  </div>
                </motion.div>

                {/* Hours Card */}
                <motion.div
                  className="p-6 sm:p-8 bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-transparent hover:border-accent/20 hover:from-accent/5 hover:to-accent/10 transition-all duration-500 group cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <motion.div
                      className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                    >
                      <Clock className="w-6 sm:w-7 h-6 sm:h-7 text-accent" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Horarios</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">Lunes a Viernes: 7:00 a.m. - 5:00 p.m.</p>
                      <p className="text-muted-foreground text-xs sm:text-sm mt-1">Sábados y Domingos: 7:00 a.m. - 12:00 p.m.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* CONTACT FORM */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <div className="bg-gradient-to-br from-muted to-muted/50 p-6 sm:p-10 lg:p-12 rounded-2xl shadow-lg border border-accent/10 relative overflow-hidden">
                {/* Fondo animado */}
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {submitSuccess && (
                  <motion.div
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 text-sm sm:text-base font-medium">
                      ¡Mensaje enviado! Te contactaremos pronto.
                    </p>
                  </motion.div>
                )}

                <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-accent" />
                  Envíanos un mensaje
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-primary mb-2 tracking-wide">
                      Nombre completo *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 sm:py-4 bg-background text-primary placeholder-muted-foreground border border-accent/20 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-primary mb-2 tracking-wide">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@gmail.com"
                      className="w-full px-4 py-3 sm:py-4 bg-background text-primary placeholder-muted-foreground border border-accent/20 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-primary mb-2 tracking-wide">
                      Teléfono *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+57 320 123 4567"
                      className="w-full px-4 py-3 sm:py-4 bg-background text-primary placeholder-muted-foreground border border-accent/20 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-primary mb-2 tracking-wide">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      className="w-full px-4 py-3 sm:py-4 bg-background text-primary placeholder-muted-foreground border border-accent/20 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
                      rows={4}
                    />
                  </div>

                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-primary font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>

                  <p className="text-xs text-muted-foreground text-center">
                    Envía tu mensaje y te responderemos a la brevedad posible.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-16 sm:py-24 bg-muted relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-primary text-center">
              Encuéntranos en el <span className="text-accent">corazón de Cartagena</span>
            </h2>
          </motion.div>

          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-accent/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7847.337682450095!2d-75.5198927!3d10.4478313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef6250019e7cde9%3A0xedb4e8300131baad!2sVENEZIA%20TOWER%20HOUSE!5e0!3m2!1ses-419!2sco!4v1765310316025!5m2!1ses-419!2sco"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;