# 🧪 GUÍA DE PRUEBAS - CRUD Pacientes y Citas

## 📋 Requisitos Previos

- ✅ Backend corriendo en `http://localhost:8081`
- ✅ Frontend corriendo en `http://localhost:5173` o `http://localhost:8082`
- ✅ Usuario autenticado: `admin1@test.com` / `admin123`

---

## 🏥 PRUEBAS DE PACIENTES

### 1. **Acceder a Pacientes**
```
Ruta: http://localhost:5173/pacientes
Componente: PacienteTable
```

### 2. **Crear Nuevo Paciente**
```
1. Click en "Nuevo Paciente"
2. Rellenar formulario:
   - Nombre: Juan
   - Apellido: Pérez
   - Email: juan@example.com
   - Teléfono: (555) 123-4567
   - Documento: CC - 12345678
   - Fecha Nacimiento: 1990-03-15
   - Género: Masculino
   - Dirección: Calle Principal 123
   - Ciudad: Bogotá
   - Tipo Sangre: O+
   - Contacto Emergencia: (555) 987-6543

3. Click "Guardar"
4. Verificar toast: "Paciente creado exitosamente"
5. Verificar que aparece en la tabla
```

### 3. **Buscar Pacientes**
```
1. En campo de búsqueda, escribir:
   - Por nombre: "Juan"
   - Por email: "juan@"
   - Por teléfono: "555"
2. Verificar que la tabla se filtra en tiempo real
```

### 4. **Editar Paciente**
```
1. Click en botón "Editar" en la fila del paciente
2. Modificar algún campo (ej: Email)
3. Click "Guardar"
4. Verificar toast: "Paciente actualizado exitosamente"
```

### 5. **Eliminar Paciente**
```
1. Click en botón "Eliminar" en la fila del paciente
2. Aparecer modal de confirmación
3. Leer: "¿Está seguro de que desea eliminar a Juan Pérez?"
4. Click "Eliminar" en el modal
5. Verificar toast: "Juan Pérez eliminado"
6. Verificar que desaparece de la tabla
```

### 6. **Validaciones de Pacientes**
```
Probar que NO permite:
- Email sin "@" → Error: "Email inválido"
- Teléfono con < 7 dígitos → Error: "Teléfono debe tener mínimo 7 dígitos"
- Dejar campos vacíos → Error: "Campo es requerido"
```

---

## 📅 PRUEBAS DE CITAS

### 1. **Acceder a Citas**
```
Ruta: http://localhost:5173/citas
Componente: CitaTable
```

### 2. **Crear Nueva Cita**
```
1. Click en "Nueva Cita"
2. Seleccionar paciente del dropdown (ej: "Juan Pérez")
3. Rellenar formulario:
   - Fecha: [Mañana o fecha futura]
   - Hora: 14:30
   - Tipo: Consulta
   - Notas: Revisión general

4. Click "Guardar"
5. Verificar toast: "Cita creada exitosamente"
6. Verificar que aparece en la tabla
```

### 3. **Buscar Citas**
```
1. En campo de búsqueda, escribir:
   - Por paciente: "Juan"
   - Por doctor: "Doctor"
2. Verificar que la tabla se filtra en tiempo real
```

### 4. **Filtrar por Estado**
```
1. Click en dropdown "Todos los estados"
2. Seleccionar un estado:
   - Pendiente
   - Confirmada
   - Completada
   - Cancelada
3. Verificar que solo muestra citas de ese estado
```

### 5. **Cambiar Estado de Cita**
```
1. Click en botón "Estado" en la fila de la cita
2. Aparecer modal: "Cambiar estado de cita"
3. Seleccionar nuevo estado del dropdown
4. Click "Cambiar Estado"
5. Verificar toast: "Estado de cita actualizado"
6. Verificar que el estado en la tabla cambió
```

### 6. **Eliminar Cita**
```
1. Click en botón "Eliminar" en la fila de la cita
2. Aparecer modal de confirmación
3. Leer: "¿Está seguro de que desea eliminar la cita con Juan Pérez..."
4. Click "Eliminar"
5. Verificar toast: "Cita eliminada"
6. Verificar que desaparece de la tabla
```

### 7. **Validaciones de Citas**
```
Probar que NO permite:
- Fecha pasada → Error: "La fecha no puede ser anterior a hoy"
- Fecha hoy con hora pasada → Error: "La hora no puede ser en el pasado"
- No seleccionar paciente → Error: "Paciente es requerido"
```

---

## 🎨 PRUEBAS DE UI/UX

### Estados de Carga
```
1. Abrir Pacientes (debería mostrar spinner)
2. Debería cargar datos
3. Repetir en Citas
```

### Mensajes Vacíos
```
1. Crear base de datos vacía
2. Abrir Pacientes → Mostrar "No hay pacientes registrados"
3. Abrir Citas → Mostrar "No hay citas registradas"
4. Botón "Crear Primer Paciente" / "Crear Primera Cita" disponible
```

### Responsive Design
```
1. Abrir en desktop (1920x1080)
2. Abrir en tablet (768x1024)
3. Abrir en móvil (375x667)
4. Verificar que los componentes se adaptan correctamente
5. En móvil, el texto "Editar" / "Eliminar" desaparece, solo iconos visibles
```

### Toasts
```
1. Crear paciente exitosamente → Toast verde "Paciente creado exitosamente"
2. Error en validación → Toast rojo con mensaje de error
3. Intentar crear sin llenar campos → Toast rojo con error de validación
```

---

## 🔍 PRUEBAS DE INTEGRACIÓN

### Headers y Footer
```
1. Verificar que ClinicalLayout se carga correctamente
2. Menú lateral visible con iconos
3. Header con usuario actual
4. Accessibility Toolbar visible
```

### Navegación
```
1. Click en "Pacientes" en el menú → Lleva a /pacientes
2. Click en "Citas" en el menú → Lleva a /citas
3. Breadcrumb actualizado (si existe)
```

### Errores 401/403
```
1. Expirar token (si es posible simularlo)
2. Debería redirigir a /login
3. Mostrar toast: "No tienes permiso para esta acción"
```

---

## 🐛 CASOS DE ERROR - TESTING

### Error de Red
```
1. Desconectar el backend temporalmente
2. Intentar crear paciente
3. Debería mostrar toast: "Error al cargar pacientes"
```

### Datos Duplicados
```
1. Intentar crear dos pacientes con el mismo email
2. Backend debería rechazar
3. Toast mostrando error del servidor
```

### Validación de Documento
```
1. Intentar crear dos pacientes con el mismo documento
2. Frontend permite crear
3. Backend debería validar (si está implementado)
```

---

## 📊 ESCENARIOS DE USO

### Escenario 1: Agendar Nueva Cita
```
1. Ir a Pacientes
2. Crear nuevo paciente: "María García"
3. Ir a Citas
4. Crear nueva cita para "María García"
5. Cambiar estado a "Confirmada"
```

### Escenario 2: Búsqueda y Filtrado
```
1. Ir a Pacientes
2. Crear 5 pacientes con nombres: Juan, Pedro, María, Luis, Ana
3. Buscar "Juan" → Debe mostrar solo 1
4. Buscar "a" → Debe mostrar María, Ana

1. Ir a Citas
2. Crear 3 citas con diferentes estados
3. Filtrar por "Pendiente" → Mostrar solo pendientes
4. Cambiar una a "Completada"
5. Filtrar nuevamente
```

### Escenario 3: Cancelación de Cita
```
1. Crear cita
2. Cambiar estado a "Confirmada"
3. Cambiar estado a "Cancelada"
4. Verificar que muestra como cancelada
```

---

## ✅ CHECKLIST DE VALIDACIÓN

- [ ] Pacientes: CREATE funciona
- [ ] Pacientes: READ funciona
- [ ] Pacientes: UPDATE funciona
- [ ] Pacientes: DELETE funciona
- [ ] Citas: CREATE funciona
- [ ] Citas: READ funciona
- [ ] Citas: UPDATE (state change) funciona
- [ ] Citas: DELETE funciona
- [ ] Búsqueda en tiempo real funciona
- [ ] Filtros funcionan correctamente
- [ ] Validaciones previenen datos inválidos
- [ ] Toasts se muestran correctamente
- [ ] Spinners de carga se muestran
- [ ] Responsivo en móvil
- [ ] No hay errores en consola
- [ ] Frontend de compila sin errores
- [ ] Backend responde correctamente
- [ ] Tokens JWT se envían correctamente

---

## 🎯 NOTAS IMPORTANTES

1. **Búsqueda en tiempo real**: No requiere click, filtra mientras escribes
2. **Validaciones**: Ocurren antes de enviar al backend
3. **Estados de cita**: PENDING → CONFIRMED/CANCELLED → COMPLETED/NO_SHOW
4. **Borrado**: Es irreversible, confirmar siempre
5. **Clean-up**: Al crear/editar, la tabla se recarga automáticamente

---

**Última actualización:** Implementación de CRUD base  
**Versión de pruebas:** 1.0  
**Óxito esperado:** ✅ 100%
