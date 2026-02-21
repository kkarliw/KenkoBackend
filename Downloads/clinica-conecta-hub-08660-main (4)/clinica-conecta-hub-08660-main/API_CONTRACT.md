# Kenkō API Contract v1.0

## Base URL
```
/api/v1
```

## Authentication
All private endpoints require `Authorization: Bearer <JWT>` header.

---

## Endpoint Catalog

### AUTH

| Method | Path | Request Body | Response | Auth | Roles |
|--------|------|-------------|----------|------|-------|
| `POST` | `/auth/register-organization` | `{ nombre, ciudad, email, password, plan }` | `{ id, token, user, organization }` | ❌ | Public |
| `POST` | `/auth/login` | `{ email, password }` | `{ token, user: { id, nombre, apellido, email, role, organizationId } }` | ❌ | Public |

---

### ORGANIZATION

| Method | Path | Request Body | Response | Auth | Roles |
|--------|------|-------------|----------|------|-------|
| `GET` | `/organization/me` | — | `Organization` | ✅ | ADMIN |
| `PUT` | `/organization/me` | `Partial<Organization>` | `Organization` | ✅ | ADMIN |

**Organization Schema:**
```json
{
  "id": 1,
  "nombre": "Consultorio Dr. García",
  "slug": "consultorio-dr-garcia",
  "ciudad": "Bogotá",
  "email": "admin@consultorio.com",
  "plan": "BASIC | PRO",
  "activo": true,
  "propietarioId": 1,
  "createdAt": "2025-01-01T00:00:00"
}
```

---

### USERS (Internal Staff)

| Method | Path | Request Body | Response | Auth | Roles |
|--------|------|-------------|----------|------|-------|
| `GET` | `/users` | — | `StaffUser[]` | ✅ | ADMIN |
| `POST` | `/users` | `{ nombre, apellido, email, password, rol, especialidad?, telefono?, numeroLicencia? }` | `StaffUser` | ✅ | ADMIN |
| `GET` | `/users/{id}` | — | `StaffUser` | ✅ | ADMIN, self |
| `PUT` | `/users/{id}` | `Partial<StaffUser>` | `StaffUser` | ✅ | ADMIN, self |
| `DELETE` | `/users/{id}` | — | `204` | ✅ | ADMIN |

**StaffUser Schema:**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@consultorio.com",
  "rol": "ADMIN | DOCTOR | RECEPCIONIST",
  "especialidad": "Cardiología",
  "telefono": "+57 300 123 4567",
  "numeroLicencia": "MED-12345",
  "activo": true,
  "organizationId": 1
}
```

---

### PATIENTS

| Method | Path | Request Body | Response | Auth | Roles |
|--------|------|-------------|----------|------|-------|
| `GET` | `/patients` | — | `Patient[]` | ✅ | ADMIN, DOCTOR, RECEPCIONIST |
| `POST` | `/patients` | `{ nombre, apellido, email, telefono, direccion, numeroDocumento, fechaNacimiento, genero }` | `Patient` | ✅ | ADMIN, RECEPCIONIST |
| `GET` | `/patients/{id}` | — | `Patient` | ✅ | ADMIN, DOCTOR, RECEPCIONIST |
| `PUT` | `/patients/{id}` | `Partial<Patient>` | `Patient` | ✅ | ADMIN, RECEPCIONIST |
| `DELETE` | `/patients/{id}` | — | `204` | ✅ | ADMIN |

**Patient Schema:**
```json
{
  "id": 1,
  "nombre": "María",
  "apellido": "López",
  "email": "maria@email.com",
  "telefono": "+57 311 000 0000",
  "direccion": "Calle 123",
  "numeroDocumento": "1234567890",
  "fechaNacimiento": "1990-05-15",
  "genero": "MASCULINO | FEMENINO | OTRO",
  "organizationId": 1
}
```

---

### APPOINTMENTS

| Method | Path | Request Body | Response | Auth | Roles |
|--------|------|-------------|----------|------|-------|
| `GET` | `/appointments` | — | `Appointment[]` | ✅ | ADMIN, DOCTOR, RECEPCIONIST |
| `POST` | `/appointments` | `{ pacienteId, profesionalId, fecha, motivo, tipo? }` | `Appointment` | ✅ | ADMIN, DOCTOR, RECEPCIONIST |
| `GET` | `/appointments/{id}` | — | `Appointment` | ✅ | ADMIN, DOCTOR, RECEPCIONIST |
| `PATCH` | `/appointments/{id}/status` | `{ estado }` | `Appointment` | ✅ | ADMIN, DOCTOR, RECEPCIONIST |
| `DELETE` | `/appointments/{id}` | — | `204` | ✅ | ADMIN |

**Valid status transitions:**
- `pendiente` → `confirmada` | `cancelada`
- `confirmada` → `completada` | `cancelada` | `no_show`

**Appointment Schema:**
```json
{
  "id": 1,
  "pacienteId": 1,
  "profesionalId": 2,
  "organizationId": 1,
  "fecha": "2025-03-15T10:00:00",
  "motivo": "Consulta general",
  "tipo": "PRESENCIAL | VIRTUAL",
  "estado": "pendiente | confirmada | completada | cancelada | no_show",
  "paciente": { "nombre": "María", "apellido": "López" },
  "profesional": { "nombre": "Dr. Juan", "apellido": "Pérez", "especialidad": "General" }
}
```

---

### TASKS (Internal Mini-Teams)

| Method | Path | Request Body | Response | Auth | Roles |
|--------|------|-------------|----------|------|-------|
| `GET` | `/tasks` | — | `Task[]` | ✅ | ADMIN, DOCTOR |
| `POST` | `/tasks` | `{ titulo, descripcion?, asignadoAId, fechaLimite? }` | `Task` | ✅ | ADMIN |
| `PATCH` | `/tasks/{id}/complete` | — | `Task` | ✅ | ADMIN, assigned user |
| `DELETE` | `/tasks/{id}` | — | `204` | ✅ | ADMIN |

**Task Schema:**
```json
{
  "id": 1,
  "organizationId": 1,
  "titulo": "Preparar sala 3",
  "descripcion": "Desinfección antes de consulta",
  "asignadoAId": 2,
  "creadoPorId": 1,
  "fechaLimite": "2025-03-15",
  "estado": "PENDIENTE | EN_PROGRESO | COMPLETADA",
  "asignadoNombre": "Juan Pérez",
  "creadoPorNombre": "Admin"
}
```

---

### DASHBOARD (Aggregated Metrics)

| Method | Path | Response | Auth | Roles |
|--------|------|----------|------|-------|
| `GET` | `/dashboard/admin` | `AdminDashboard` | ✅ | ADMIN |
| `GET` | `/dashboard/doctor` | `DoctorDashboard` | ✅ | DOCTOR |
| `GET` | `/dashboard/receptionist` | `ReceptionistDashboard` | ✅ | RECEPCIONIST |

**AdminDashboard:**
```json
{
  "totalPacientes": 150,
  "totalProfesionales": 5,
  "totalCitas": 320,
  "citasHoy": 12,
  "ingresosMes": 5000000,
  "tasaAusentismo": 0.08,
  "citasPorEstado": { "pendiente": 5, "confirmada": 4, "completada": 3 }
}
```

**DoctorDashboard:**
```json
{
  "citasHoy": 8,
  "citasSemana": 35,
  "pacientesActivos": 45,
  "proximaCita": { ... }
}
```

**ReceptionistDashboard:**
```json
{
  "citasHoy": 12,
  "citasPendientes": 5,
  "citasConfirmadas": 7,
  "pacientesRegistradosHoy": 3
}
```

---

## Frontend View → Endpoint Mapping

| Frontend View | Endpoint(s) Required |
|--------------|---------------------|
| Landing (`/`) | None (static) |
| Login (`/login`) | `POST /auth/login` |
| Registro (`/registro`) | `POST /auth/register-organization` |
| Admin Dashboard (`/dashboard`) | `GET /dashboard/admin` |
| Agenda (`/agenda`) | `GET /appointments`, `PATCH /appointments/{id}/status` |
| Pacientes (`/pacientes`) | `GET /patients`, `POST /patients`, `PUT /patients/{id}`, `DELETE /patients/{id}` |
| Historias (`/historias`) | FUTURE: `GET /medical-records` |
| Finanzas (`/finanzas`) | FUTURE: `GET /finance/summary` |
| Tareas (`/tareas`) | `GET /tasks`, `POST /tasks`, `PATCH /tasks/{id}/complete`, `DELETE /tasks/{id}` |
| Telemedicina (`/telemedicina`) | FUTURE: `POST /teleconsultation/start` |
| Profesionales (`/profesionales`) | `GET /users` (filter by DOCTOR role), `POST /users`, `PUT /users/{id}` |
| Doctor Dashboard (`/medico/dashboard`) | `GET /dashboard/doctor` |
| Doctor Agenda (`/medico/agenda`) | `GET /appointments` (filtered by doctor) |
| Doctor Patients (`/medico/pacientes`) | `GET /patients` |
| Doctor History (`/medico/historias/:id`) | FUTURE: `GET /medical-records/patient/{id}` |
| Patient Dashboard (`/mis-citas`) | `GET /appointments` (filtered by patient) |
| Receptionist Dashboard (`/agenda-general`) | `GET /dashboard/receptionist`, `GET /appointments` |

---

## Endpoints Required in Backend v1 (MUST IMPLEMENT)

```
POST   /api/v1/auth/register-organization
POST   /api/v1/auth/login
GET    /api/v1/organization/me
PUT    /api/v1/organization/me
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/{id}
PUT    /api/v1/users/{id}
DELETE /api/v1/users/{id}
GET    /api/v1/patients
POST   /api/v1/patients
GET    /api/v1/patients/{id}
PUT    /api/v1/patients/{id}
DELETE /api/v1/patients/{id}
GET    /api/v1/appointments
POST   /api/v1/appointments
GET    /api/v1/appointments/{id}
PATCH  /api/v1/appointments/{id}/status
DELETE /api/v1/appointments/{id}
GET    /api/v1/tasks
POST   /api/v1/tasks
PATCH  /api/v1/tasks/{id}/complete
DELETE /api/v1/tasks/{id}
GET    /api/v1/dashboard/admin
GET    /api/v1/dashboard/doctor
GET    /api/v1/dashboard/receptionist
```

## Endpoints FUTURE (Not Required for v1)

```
# Medical Records
GET    /api/v1/medical-records
POST   /api/v1/medical-records
GET    /api/v1/medical-records/patient/{id}

# Prescriptions
POST   /api/v1/prescriptions
GET    /api/v1/prescriptions/patient/{id}

# Finance
GET    /api/v1/finance/summary

# Teleconsultation
POST   /api/v1/teleconsultation/start
GET    /api/v1/teleconsultation/session/{token}

# Waitlist
GET    /api/v1/waitlist
POST   /api/v1/waitlist

# Notifications
GET    /api/v1/notifications/{userId}
POST   /api/v1/notifications
PUT    /api/v1/notifications/{id}/read

# Patient Health
GET    /api/v1/patients/{id}/health-panel
GET    /api/v1/patients/{id}/vital-signs
GET    /api/v1/patients/{id}/vaccines

# Caregiver
GET    /api/v1/caregivers/{id}/patients
POST   /api/v1/caregivers/{id}/patients

# ML Placeholders
GET    /api/v1/ml/no-show-prediction/{appointmentId}
GET    /api/v1/ml/revenue-projection
```

## Obsolete Endpoints (REMOVED from frontend)

```
POST   /api/auth/login              → replaced by /api/v1/auth/login
POST   /api/auth/register           → replaced by /api/v1/auth/register-organization
POST   /api/organizations/register  → replaced by /api/v1/auth/register-organization
GET    /api/profesionales            → replaced by /api/v1/users (DOCTOR filter)
POST   /api/profesionales            → replaced by /api/v1/users
GET    /api/pacientes                → replaced by /api/v1/patients
GET    /api/citas/*                  → replaced by /api/v1/appointments
GET    /api/estadisticas             → replaced by /api/v1/dashboard/admin
PUT    /api/appointments/{id}/confirm → replaced by PATCH /api/v1/appointments/{id}/status
PUT    /api/appointments/{id}/cancel  → replaced by PATCH /api/v1/appointments/{id}/status
PUT    /api/appointments/{id}/no-show → replaced by PATCH /api/v1/appointments/{id}/status
GET    /api/notificaciones/*         → replaced by /api/v1/notifications/*
GET    /api/profesionales/mi-perfil  → replaced by /api/v1/users/{id}
GET    /api/usuarios/{id}            → replaced by /api/v1/users/{id}
```

---

## Data Serialization Standards

- **Dates**: `YYYY-MM-DD` (e.g., `2025-03-15`)
- **DateTimes**: `YYYY-MM-DDTHH:mm:ss` (e.g., `2025-03-15T10:00:00`)
- **IDs**: Integer (auto-generated by backend)
- **organizationId**: Auto-injected by backend from JWT — never sent by frontend
- **Roles**: `ADMIN`, `DOCTOR`, `RECEPCIONIST` (backend values)
- **Plan**: `BASIC`, `PRO`

## Security Requirements

- All data MUST be scoped to `organizationId` extracted from JWT
- No cross-organization data leakage
- Role-based access control on every endpoint
- JWT expiration and refresh strategy required
