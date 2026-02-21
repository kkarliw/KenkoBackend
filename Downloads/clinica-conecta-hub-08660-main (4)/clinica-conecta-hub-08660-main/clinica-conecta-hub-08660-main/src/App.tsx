import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Registro from "@/pages/Registro";
import Onboarding from "@/pages/Onboarding";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

// Admin
import AdminDashboard from "@/pages/admin/Dashboard";
// Doctor
import DoctorDashboard from "@/pages/doctor/Dashboard";
// Receptionist
import ReceptionistDashboard from "@/pages/receptionist/Dashboard";
// Patient
import PatientDashboard from "@/pages/patient/Dashboard";
// Caregiver
import CaregiverDashboard from "@/pages/caregiver/Dashboard";
// Telemedicina
import TelemedSala from "@/pages/telemedicina/Sala";

// Shared
import Perfil from "@/pages/Perfil";
import Pacientes from "@/pages/Pacientes";
import Citas from "@/pages/Citas";
import AuditLog from "@/pages/AuditLog";
import UserSettings from "@/pages/UserSettings";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* === PUBLIC ROUTES === */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* === ONBOARDING ROUTE === */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute roles={["ADMIN", "ORGANIZATION_ADMIN"]}>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {/* === ERROR ROUTES === */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/404" element={<NotFound />} />

            {/* === ADMIN ROUTES === */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute roles={["ADMIN", "ORGANIZATION_ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* === DOCTOR ROUTES === */}
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute roles={["MEDICO", "DOCTOR"]}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />

            {/* === RECEPTIONIST ROUTES === */}
            <Route
              path="/receptionist/dashboard"
              element={
                <ProtectedRoute roles={["RECEPCIONISTA", "RECEPTIONIST"]}>
                  <ReceptionistDashboard />
                </ProtectedRoute>
              }
            />

            {/* === PATIENT ROUTES === */}
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute roles={["PACIENTE", "PATIENT"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />

            {/* === CAREGIVER ROUTES === */}
            <Route
              path="/caregiver/dashboard"
              element={
                <ProtectedRoute roles={["CUIDADOR", "CAREGIVER"]}>
                  <CaregiverDashboard />
                </ProtectedRoute>
              }
            />

            {/* === TELEMEDICINA ROUTES === */}
            <Route
              path="/telemedicina/sala/:appointmentId"
              element={
                <ProtectedRoute roles={["MEDICO", "DOCTOR", "PACIENTE", "PATIENT"]}>
                  <TelemedSala />
                </ProtectedRoute>
              }
            />

            {/* === SHARED PROTECTED ROUTES === */}
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit-log"
              element={
                <ProtectedRoute roles={["ADMIN", "ORGANIZATION_ADMIN"]}>
                  <AuditLog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pacientes"
              element={
                <ProtectedRoute>
                  <Pacientes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citas"
              element={
                <ProtectedRoute>
                  <Citas />
                </ProtectedRoute>
              }
            />

            {/* === CATCH ALL === */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
