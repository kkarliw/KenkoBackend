// Kenkō App — v3 (role-based routing)
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, getDashboardPath } from "@/contexts/AuthContext";
import ClinicalLayout from "@/components/layouts/ClinicalLayout";

// Public Pages (always visible)
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Registro from "@/pages/Registro";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

// Protected Generic Pages
import Pacientes from "@/pages/Pacientes";
import Citas from "@/pages/Citas";
import Perfil from "@/pages/Perfil";

// Role-specific Dashboards
import AdminDashboard from "@/pages/AdminDashboard";
import DoctorDashboard from "@/pages/DoctorDashboard";
import ReceptionistDashboard from "@/pages/ReceptionistDashboard";
import PatientDashboard from "@/pages/PatientDashboard";
import CaregiverDashboard from "@/pages/CaregiverDashboard";
import Profesionales from "@/pages/Profesionales";
import Reportes from "@/pages/Reportes";
import Historias from "@/pages/Historias";
import Documentos from "@/pages/Documentos";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

// ──────────────────────────────────────────
// Route guards
// ──────────────────────────────────────────

/** Spinner shown while auth state loads */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

/**
 * AuthGate: routes like /login and /registro
 * → If already logged in, redirect to the user's dashboard
 * → If not logged in, show the page normally
 */
function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) return <Navigate to={getDashboardPath(user?.role)} replace />;
  return <>{children}</>;
}

/**
 * ProtectedRoute: any authenticated user allowed
 * → Not authenticated → /login
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <ClinicalLayout>{children}</ClinicalLayout>;
}

/**
 * RoleRoute: only a specific role is allowed
 * → Not authenticated → /login
 * → Wrong role → /unauthorized
 */
function RoleRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: string;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== allowedRole) return <Navigate to="/unauthorized" replace />;
  return <ClinicalLayout>{children}</ClinicalLayout>;
}

/**
 * RoleRedirect: /dashboard → smart redirect to role-specific dashboard
 * → Not authenticated → /login
 */
function RoleRedirect() {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={getDashboardPath(user?.role)} replace />;
}

// ──────────────────────────────────────────
// App
// ──────────────────────────────────────────

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/*
             * ── PÚBLICO SIEMPRE ────────────────────────────────────
             * La landing page es visible para TODOS (logueados o no).
             * El usuario puede ver la info, luego decidir si hace login.
             */}
            <Route path="/" element={<Landing />} />

            {/*
             * ── AUTH GATES ─────────────────────────────────────────
             * Si ya estás logueado y entras a /login o /registro,
             * te redirige directo a tu dashboard.
             */}
            <Route path="/login" element={<AuthGate><Login /></AuthGate>} />
            <Route path="/registro" element={<AuthGate><Registro /></AuthGate>} />

            {/*
             * ── SMART REDIRECT ─────────────────────────────────────
             * /dashboard detecta tu rol y te lleva al correcto.
             */}
            <Route path="/dashboard" element={<RoleRedirect />} />

            {/*
             * ── DASHBOARDS POR ROL ─────────────────────────────────
             * Cada uno protegido para su rol específico.
             * Si otro rol intenta entrar → /unauthorized
             */}
            <Route
              path="/admin/dashboard"
              element={<RoleRoute allowedRole="ADMIN"><AdminDashboard /></RoleRoute>}
            />
            <Route
              path="/doctor/dashboard"
              element={<RoleRoute allowedRole="DOCTOR"><DoctorDashboard /></RoleRoute>}
            />
            <Route
              path="/receptionist/dashboard"
              element={<RoleRoute allowedRole="RECEPTIONIST"><ReceptionistDashboard /></RoleRoute>}
            />
            <Route
              path="/patient/dashboard"
              element={<RoleRoute allowedRole="PATIENT"><PatientDashboard /></RoleRoute>}
            />
            <Route
              path="/caregiver/dashboard"
              element={<RoleRoute allowedRole="CAREGIVER"><CaregiverDashboard /></RoleRoute>}
            />

            {/*
             * ── PÁGINAS COMPARTIDAS (cualquier rol autenticado) ─────
             */}
            <Route path="/pacientes" element={<ProtectedRoute><Pacientes /></ProtectedRoute>} />
            <Route path="/citas" element={<ProtectedRoute><Citas /></ProtectedRoute>} />
            <Route path="/profesionales" element={<RoleRoute allowedRole="ADMIN"><Profesionales /></RoleRoute>} />
            <Route path="/reportes" element={<RoleRoute allowedRole="ADMIN"><Reportes /></RoleRoute>} />
            <Route path="/historias" element={<ProtectedRoute><Historias /></ProtectedRoute>} />
            <Route path="/documentos" element={<ProtectedRoute><Documentos /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />

            {/*
             * ── PÁGINAS DE ERROR ───────────────────────────────────
             */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
