import { ReactNode, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Users, FileText, BarChart3,
  ListChecks, Video, Package, Settings, LogOut, Search,
  Bell, ChevronLeft, Stethoscope, ClipboardList, ShieldCheck, User
} from "lucide-react";
import kenkoIcon from "@/assets/kenko-icon.svg";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";

interface ClinicalLayoutProps {
  children: ReactNode;
}

const adminMenu = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Pacientes", url: "/pacientes", icon: Users },
  { title: "Citas", url: "/citas", icon: Calendar },
  { title: "Profesionales", url: "/profesionales", icon: Stethoscope },
  { title: "Perfil", url: "/perfil", icon: User },
];

export default function ClinicalLayout({ children }: ClinicalLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menu = adminMenu;

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'U'
    : 'U';

  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Usuario';

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen border-r border-border bg-card flex flex-col transition-all duration-200 z-30 ${
          collapsed ? "w-16" : "w-60"
        }`}
        role="navigation"
        aria-label="Menú principal"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-border">
          <img src={kenkoIcon} alt="Kenkō" className="h-12 w-12" />
        </div>

        {!collapsed && (
          <div className="px-4 pt-4 pb-1">
            <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Menú</span>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {menu.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                } ${collapsed ? "justify-center px-2" : ""}`}
                aria-label={item.title}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="border-t border-border p-3">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{displayName}</p>
                <p className="text-[10px] text-muted-foreground truncate capitalize">
                  {user?.role?.toLowerCase().replace("_", " ") || "usuario"}
                </p>
              </div>
              <button
                onClick={logout}
                className="text-muted-foreground hover:text-destructive p-1 rounded"
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full flex justify-center text-muted-foreground hover:text-destructive p-2 rounded"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground shadow-sm z-40"
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <ChevronLeft className={`h-3 w-3 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${collapsed ? "ml-16" : "ml-60"}`}>
        <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4 sticky top-0 z-20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Buscar..."
              className="pl-9 h-9 bg-muted border-0 text-sm"
              aria-label="Buscar"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Notificaciones"
            >
              <Bell className="h-4 w-4" />
            </button>

            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-[10px] text-muted-foreground capitalize">
                {user?.role?.toLowerCase().replace("_", " ") || ""}
              </p>
            </div>

            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6" role="main">
          {children}
        </main>
      </div>

      <AccessibilityToolbar />
    </div>
  );
}
