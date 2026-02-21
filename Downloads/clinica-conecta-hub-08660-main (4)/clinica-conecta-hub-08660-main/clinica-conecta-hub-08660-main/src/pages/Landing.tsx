import { Link } from "react-router-dom";
import { ArrowRight, Calendar, FileText, Shield, Video, BarChart3, Users, Building2, Stethoscope, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import kenkoIcon from "@/assets/kenko-icon.svg";

export default function Landing() {
  const features = [
    { icon: Calendar, title: "Agenda Inteligente", desc: "Reduce el ausentismo hasta un 40% con recordatorios automáticos y confirmación con 1 clic." },
    { icon: FileText, title: "Historia Clínica Digital", desc: "Formatos personalizables. Almacenamiento seguro en la nube y acceso instantáneo." },
    { icon: Video, title: "Telemedicina Integrada", desc: "Sesiones virtuales seguras con token temporal. Chat durante la consulta." },
    { icon: BarChart3, title: "Finanzas y Reportes", desc: "Ingresos por servicio, médico y proyecciones mensuales automatizadas." },
    { icon: Users, title: "Gestión de Equipo", desc: "Tareas internas tipo Kanban. Asignación, seguimiento y notificaciones." },
    { icon: Shield, title: "Seguridad HIPAA", desc: "Datos encriptados, aislamiento por organización y auditoría completa." },
  ];

  const steps = [
    { num: "01", title: "Registra tu consultorio", desc: "En menos de 2 minutos. Sin tarjeta de crédito." },
    { num: "02", title: "Invita a tu equipo", desc: "Agrega médicos, recepcionistas y personal." },
    { num: "03", title: "Configura tu agenda", desc: "Horarios, servicios y reglas de agendamiento." },
    { num: "04", title: "Comienza a operar", desc: "Tu consultorio inteligente listo para funcionar." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Kenkō">
            <img src={kenkoIcon} alt="" className="h-8 w-8" aria-hidden="true" />
            <span className="font-semibold text-foreground tracking-tight">Kenkō</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación">
            <a href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Precios</a>
            <a href="#nosotros" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nosotros</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-sm">Iniciar sesión</Button>
            </Link>
            <Link to="/registro">
              <Button size="sm" className="text-sm">Registrar consultorio</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/8 text-primary text-clinical-caption uppercase tracking-widest mb-6">
              Gestión Médica Profesional v2.0
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
              Transforma tu consultorio en un{" "}
              <span className="text-primary">sistema inteligente</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              La plataforma todo-en-uno diseñada para médicos que valoran su tiempo. Automatiza citas, historias clínicas y recordatorios sin complicaciones técnicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/registro">
                <Button size="lg" className="gap-2 text-sm">
                  Registrar consultorio <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="text-sm">
                  Ver demostración
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard preview placeholder */}
          <div className="mt-16 rounded-lg border border-border bg-card shadow-clinical overflow-hidden">
            <div className="h-8 bg-muted border-b border-border flex items-center gap-1.5 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/40" />
            </div>
            <div className="p-6 grid grid-cols-4 gap-4">
              <div className="bg-muted rounded-md h-20 animate-pulse" />
              <div className="bg-muted rounded-md h-20 animate-pulse" />
              <div className="bg-muted rounded-md h-20 animate-pulse" />
              <div className="bg-muted rounded-md h-20 animate-pulse" />
              <div className="col-span-3 bg-muted rounded-md h-40 animate-pulse" />
              <div className="bg-muted rounded-md h-40 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-clinical-caption uppercase text-muted-foreground tracking-widest mb-4">
            La elección de +2,000 profesionales de la salud
          </p>
          <div className="flex items-center justify-center gap-10 text-muted-foreground">
            {["MediCare", "SaludTotal", "CardioLab", "NeuroCentro", "FarmaRed"].map(name => (
              <span key={name} className="text-sm font-medium flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5" /> {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-20" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 id="features-heading" className="text-3xl font-bold mb-3">
              Todo lo que necesitas para operar sin fricción
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Eliminamos las tareas administrativas repetitivas para que puedas enfocarte en lo más importante: tus pacientes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="border border-border rounded-lg p-6 bg-card hover:border-primary/30 transition-colors">
                <div className="h-10 w-10 rounded-md bg-primary/8 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-20 bg-muted/30" aria-labelledby="steps-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="steps-heading" className="text-3xl font-bold mb-12 text-center">
            Comienza en <span className="text-primary">4 pasos</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="h-14 w-14 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-lg bg-primary p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-3">Únete a la nueva era de la gestión médica</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Prueba Kenkō gratis por 14 días. Sin tarjeta de crédito.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/registro">
                <Button size="lg" variant="secondary" className="text-sm bg-white text-primary hover:bg-white/90">
                  Comenzar prueba gratis
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="text-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Agendar demostración
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={kenkoIcon} alt="" className="h-6 w-6" />
                <span className="font-semibold text-sm">Kenkō</span>
              </div>
              <p className="text-clinical-small text-muted-foreground">
                Plataforma integral para la administración eficiente de consultorios médicos.
              </p>
            </div>
            <div>
              <h4 className="text-clinical-caption uppercase text-muted-foreground tracking-widest mb-3">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#funcionalidades" className="hover:text-foreground">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-foreground">Integraciones</a></li>
                <li><a href="#" className="hover:text-foreground">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-clinical-caption uppercase text-muted-foreground tracking-widest mb-3">Compañía</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#nosotros" className="hover:text-foreground">Nosotros</a></li>
                <li><Link to="/contacto" className="hover:text-foreground">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-clinical-caption uppercase text-muted-foreground tracking-widest mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacidad" className="hover:text-foreground">Privacidad</Link></li>
                <li><Link to="/terminos" className="hover:text-foreground">Términos</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-clinical-small text-muted-foreground">
            © 2024 Kenkō Health Technologies. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
