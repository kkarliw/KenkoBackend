import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AgendarVisita = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });
  const [dateError, setDateError] = useState("");

  const getAvailableHours = (dateString: string) => {
    if (!dateString) return [];

    const date = new Date(dateString + "T00:00:00");
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Domingo (0) - Cerrado
    if (dayOfWeek === 0) {
      return [];
    }

    // Lunes a Viernes (1-5): 7:00 AM - 5:00 PM
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      return [
        { value: "07:00", label: "7:00 AM" },
        { value: "08:00", label: "8:00 AM" },
        { value: "09:00", label: "9:00 AM" },
        { value: "10:00", label: "10:00 AM" },
        { value: "11:00", label: "11:00 AM" },
        { value: "12:00", label: "12:00 PM" },
        { value: "13:00", label: "1:00 PM" },
        { value: "14:00", label: "2:00 PM" },
        { value: "15:00", label: "3:00 PM" },
        { value: "16:00", label: "4:00 PM" },
        { value: "17:00", label: "5:00 PM" }
      ];
    }

    // Sábado (6): 7:00 AM - 12:00 PM
    if (dayOfWeek === 6) {
      return [
        { value: "07:00", label: "7:00 AM" },
        { value: "08:00", label: "8:00 AM" },
        { value: "09:00", label: "9:00 AM" },
        { value: "10:00", label: "10:00 AM" },
        { value: "11:00", label: "11:00 AM" },
        { value: "12:00", label: "12:00 PM" }
      ];
    }

    return [];
  };

  const getDayName = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days[date.getDay()];
  };

  const getScheduleInfo = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) {
      return "Domingo - Cerrado";
    } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      return "Lunes a Viernes - 7:00 a.m. - 5:00 p.m.";
    } else if (dayOfWeek === 6) {
      return "Sábado - 7:00 a.m. - 12:00 p.m.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Convertir fecha a formato legible
    const date = new Date(formData.date + "T00:00:00");
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${dayName}, ${day} de ${monthName} de ${year}`;

    // Encontrar la hora seleccionada en formato legible
    const availableHours = getAvailableHours(formData.date);
    const selectedHour = availableHours.find(h => h.value === formData.time);
    const timeLabel = selectedHour ? selectedHour.label : formData.time;

    const phoneNumber = "573204637230";
    const message = `Solicitud de Visita - Venezia Tower House

Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Fecha: ${formattedDate}
Hora: ${timeLabel}

¿Podrían confirmar la disponibilidad?`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    toast({
      title: "¡Solicitud enviada!",
      description: "Te contactaremos pronto para confirmar tu visita",
    });

    setFormData({ name: "", email: "", phone: "", date: "", time: "" });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFormData({
      ...formData,
      date: selectedDate,
      time: "", // Reset time when date changes
    });

    const date = new Date(selectedDate + "T00:00:00");
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
      setDateError("❌ No estamos disponibles los domingos");
    } else {
      setDateError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const availableHours = getAvailableHours(formData.date);
  const scheduleInfo = getScheduleInfo(formData.date);
  const dayName = getDayName(formData.date);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <Calendar className="w-16 h-16 text-accent mx-auto mb-6 animate-pulse-opacity" />
          <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Agenda tu <span className="text-accent">Visita</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Descubre tu futuro hogar en persona
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left Column - Info */}
              <div className="space-y-8 animate-slide-in-left">
                <div>
                  <h2 className="text-4xl font-bold text-primary mb-4">
                    ¿Qué incluye la visita?
                  </h2>
                  <div className="w-24 h-1 bg-accent mb-6" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Nuestros asesores especializados te guiarán en un recorrido personalizado por las instalaciones, amenidades y departamentos modelo.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-6 bg-muted rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Duración</h3>
                      <p className="text-muted-foreground">Aproximadamente 60 minutos</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-muted rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Asesoría Personalizada</h3>
                      <p className="text-muted-foreground">Expertos disponibles para responder tus dudas</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 bg-muted rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">Información Completa</h3>
                      <p className="text-muted-foreground">Planos, precios y opciones de financiamiento</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-lg shadow-lift">
                  <h3 className="text-xl font-bold mb-3 text-white">Horarios de Atención</h3>
                  <div className="space-y-2">
                    <p className="flex justify-between text-white">
                      <span>Lunes a Viernes:</span>
                      <span className="font-medium">7:00 a.m. - 5:00 p.m.</span>
                    </p>
                    <p className="flex justify-between text-white">
                      <span>Sábados:</span>
                      <span className="font-medium">7:00 a.m. - 12:00 p.m.</span>
                    </p>
                    <p className="flex justify-between text-white/80">
                      <span>Domingos y Festivos:</span>
                      <span className="font-medium">Cerrado</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="animate-slide-in-right">
                <div className="bg-muted p-8 lg:p-10 rounded-lg shadow-elegant">
                  <h3 className="text-2xl font-bold text-primary mb-6">Completa tus datos</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Nombre completo
                        </div>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="bg-background border-border focus:border-accent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </div>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="bg-background border-border focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Teléfono
                        </div>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+57 123 456 7890"
                        className="bg-background border-border focus:border-accent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-primary mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Fecha preferida
                        </div>
                      </label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        className="bg-background border-border focus:border-accent"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      {dateError && (
                        <div className="flex items-center gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <p className="text-sm text-red-600">{dateError}</p>
                        </div>
                      )}
                      {formData.date && !dateError && (
                        <div className="flex items-center gap-2 mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <p className="text-sm text-green-700">
                            <span className="font-semibold">{dayName}</span> - {scheduleInfo}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-primary mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Hora preferida
                        </div>
                      </label>

                      {availableHours.length > 0 ? (
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                          required
                        >
                          <option value="">Selecciona una hora</option>
                          {availableHours.map((hour) => (
                            <option key={hour.value} value={hour.value}>
                              {hour.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="w-full px-3 py-3 bg-red-50 border border-red-300 rounded-md">
                          <p className="text-red-700 font-semibold flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            No disponible este día
                          </p>
                          <p className="text-sm text-red-600 mt-1">
                            Por favor, selecciona una fecha entre lunes y sábado
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={availableHours.length === 0 || !formData.time}
                      className="w-full bg-accent hover:bg-accent/90 text-primary font-medium shadow-lg text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirmar Visita
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Te contactaremos por WhatsApp para confirmar tu cita
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">
              ¿Prefieres contactarnos directamente?
            </h3>
            <p className="text-muted-foreground mb-8">
              Llámanos o escríbenos por WhatsApp para agendar tu visita
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+573204637230">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                  <Phone className="mr-2" />
                  Llamar Ahora
                </Button>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=573204637230&text=Hola%2C+deseo+recibir+informaci%C3%B3n+sobre+el+proyecto+Venezia+Tower+House.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white">
                  <MessageCircle className="mr-2" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgendarVisita;