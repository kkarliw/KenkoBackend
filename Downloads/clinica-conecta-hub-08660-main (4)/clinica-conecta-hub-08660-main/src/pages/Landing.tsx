import { Link } from "react-router-dom";
import { ArrowRight, Calendar, FileText, Shield, Video, BarChart3, Users, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import kenkoIcon from "@/assets/kenko-icon.svg";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPath } from "@/contexts/AuthContext";

export default function Landing() {
  // Si el usuario ya está logueado, el nav mostrará "Ir a mi Dashboard"
  const { isAuthenticated, user } = useAuth();

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

      {/* ── Nav ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Kenkō inicio">
            <img src={kenkoIcon} alt="" className="h-8 w-8" aria-hidden="true" />
            <span className="font-semibold text-foreground tracking-tight">Kenkō</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            <a href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Funcionalidades
            </a>
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cómo funciona
            </a>
            <a href="#nosotros" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Nosotros
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              /* Usuario ya logueado → botón a su dashboard */
              <Link to={getDashboardPath(user?.role)}>
                <Button size="sm" className="text-sm gap-2">
                  Ir a mi Dashboard <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            ) : (
              /* Sin sesión → login + registro */
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button size="sm" className="text-sm">
                    Registrar consultorio
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="pt-32 pb-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary text-xs uppercase tracking-widest mb-6 font-medium">
              Gestión Médica Profesional v2.0
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
              Transforma tu consultorio en un{" "}
              <span className="text-primary">sistema inteligente</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              La plataforma todo-en-uno diseñada para médicos que valoran su tiempo. Automatiza
              citas, historias clínicas y recordatorios sin complicaciones técnicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {isAuthenticated ? (
                <Link to={getDashboardPath(user?.role)}>
                  <Button size="lg" className="gap-2 text-sm">
                    Ir a mi Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/registro">
                    <Button size="lg" className="gap-2 text-sm">
                      Registrar consultorio <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="text-sm">
                      Iniciar sesión
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="mt-16 rounded-xl border border-border bg-card shadow-lg overflow-hidden">
            <div className="h-9 bg-muted/80 border-b border-border flex items-center gap-1.5 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              <span className="ml-3 text-xs text-muted-foreground">kenko.app/admin/dashboard</span>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4">
              <div className="bg-primary/10 rounded-lg h-20 flex flex-col items-center justify-center gap-1">
                <div className="text-2xl font-bold text-primary">148</div>
                <div className="text-xs text-muted-foreground">Pacientes</div>
              </div>
              <div className="bg-emerald-500/10 rounded-lg h-20 flex flex-col items-center justify-center gap-1">
                <div className="text-2xl font-bold text-emerald-600">12</div>
                <div className="text-xs text-muted-foreground">Citas hoy</div>
              </div>
              <div className="bg-amber-500/10 rounded-lg h-20 flex flex-col items-center justify-center gap-1">
                <div className="text-2xl font-bold text-amber-600">5</div>
                <div className="text-xs text-muted-foreground">Pendientes</div>
              </div>
              <div className="bg-purple-500/10 rounded-lg h-20 flex flex-col items-center justify-center gap-1">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-xs text-muted-foreground">Doctores</div>
              </div>
              <div className="col-span-3 bg-muted rounded-lg h-40 flex items-center justify-center">
                <div className="text-xs text-muted-foreground">Gráfica de citas y facturación</div>
              </div>
              <div className="bg-muted rounded-lg h-40 flex items-center justify-center">
                <div className="text-xs text-muted-foreground">Próximas citas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof ─────────────────────────── */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs uppercase text-muted-foreground tracking-widest mb-4">
            La elección de +2,000 profesionales de la salud
          </p>
          <div className="flex items-center justify-center gap-10 text-muted-foreground flex-wrap">
            {["MediCare", "SaludTotal", "CardioLab", "NeuroCentro", "FarmaRed"].map((name) => (
              <span key={name} className="text-sm font-medium flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5" /> {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles section ────────────────────────── */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Una plataforma, múltiples roles</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Cada integrante del equipo tiene su propio panel adaptado a sus funciones.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { role: "Admin", color: "bg-blue-500/10 text-blue-600 border-blue-200", desc: "KPIs, usuarios, auditoría", emoji: "🏢" },
              { role: "Doctor", color: "bg-emerald-500/10 text-emerald-600 border-emerald-200", desc: "Agenda, historias, notas", emoji: "⚕️" },
              { role: "Recepcionista", color: "bg-amber-500/10 text-amber-600 border-amber-200", desc: "Citas, calendario, checkin", emoji: "📋" },
              { role: "Paciente", color: "bg-purple-500/10 text-purple-600 border-purple-200", desc: "Mis citas, recetas, docs", emoji: "👤" },
              { role: "Cuidador", color: "bg-rose-500/10 text-rose-600 border-rose-200", desc: "Pacientes a cargo, citas", emoji: "🏥" },
            ].map(({ role, color, desc, emoji }) => (
              <div key={role} className={`rounded-xl border p-5 text-center ${color}`}>
                <div className="text-3xl mb-3">{emoji}</div>
                <p className="font-semibold text-sm">{role}</p>
                <p className="text-xs mt-1 opacity-70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section id="funcionalidades" className="py-20" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 id="features-heading" className="text-3xl font-bold mb-3">
              Todo lo que necesitas para operar sin fricción
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Eliminamos las tareas administrativas repetitivas para que puedas enfocarte en lo más
              importante: tus pacientes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="border border-border rounded-xl p-6 bg-card hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────── */}
      <section id="como-funciona" className="py-20 bg-muted/30" aria-labelledby="steps-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="steps-heading" className="text-3xl font-bold mb-12 text-center">
            Comienza en <span className="text-primary">4 pasos</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="h-14 w-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl bg-primary p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-3">Únete a la nueva era de la gestión médica</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Prueba Kenkō gratis por 14 días. Sin tarjeta de crédito.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {isAuthenticated ? (
                <Link to={getDashboardPath(user?.role)}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-sm gap-2">
                    Ir a mi Panel <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/registro">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-sm">
                      Comenzar prueba gratis
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-sm border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      Ya tengo cuenta
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="border-t border-border py-12" id="nosotros">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={kenkoIcon} alt="" className="h-6 w-6" />
                <span className="font-semibold text-sm">Kenkō</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Plataforma integral para la administración eficiente de consultorios médicos.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase text-muted-foreground tracking-widest mb-3">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#funcionalidades" className="hover:text-foreground">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-foreground">Integraciones</a></li>
                <li><a href="#" className="hover:text-foreground">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase text-muted-foreground tracking-widest mb-3">Compañía</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#nosotros" className="hover:text-foreground">Nosotros</a></li>
                <li><Link to="/contacto" className="hover:text-foreground">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase text-muted-foreground tracking-widest mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacidad" className="hover:text-foreground">Privacidad</Link></li>
                <li><Link to="/terminos" className="hover:text-foreground">Términos</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © 2024 Kenkō Health Technologies. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
