# 📋 INSTRUCCIONES PARA TU AMIGA - Crear datos de ejemplo

## Objetivo
Crear una base de datos con clinicas, usuarios (roles diferentes), pacientes, citas y tareas para poder testear la aplicación como si ya estuviera en producción.

## Paso 1️⃣: Descargar/Clonar el proyecto
```
git clone <repo>
cd KenkoBackend-main
```

## Paso 2️⃣: Asegurarse que PostgreSQL está corriendo
```bash
# Windows
# Abre pgAdmin o verifica en Services que PostgreSQL está corriendo en puerto 5432

# macOS/Linux
brew services start postgresql
# o
sudo service postgresql start
```

## Paso 3️⃣: Ejecutar el script SQL 
Abre **pgAdmin** (interfaz gráfica) o la terminal:

### Opción A: Usando pgAdmin (Gráfico - Recomendado)
1. Abre pgAdmin
2. Conéctate con `postgres` / `postgres`
3. Busca la base de datos `kenko`
4. Click derecho → "Query Tool"
5. **Copiar y pegar TODO el contenido de** `sql-scripts/database-seed.sql`
6. Presiona **F5 o click en "Execute"**
7. ✅ Listo

### Opción B: Usando terminal
```bash
# En Windows (cmd o PowerShell):
psql -U postgres -d kenko -f sql-scripts/database-seed.sql

# En macOS/Linux:
psql -U postgres -d kenko -f ./sql-scripts/database-seed.sql
```

## Paso 4️⃣: Verificar que funcionó
Ejecuta este query en pgAdmin:
```sql
SELECT COUNT(*) FROM organization;  -- Debe mostrar 3
SELECT COUNT(*) FROM "user";         -- Debe mostrar 19
SELECT COUNT(*) FROM patient;        -- Debe mostrar 7
```

## 🔑 Usuarios listos para probar

Todo el mundo tiene contraseña: **`admin123`**

### Clínica Central
- **Admin**: admin.central@clinica.com
- **Doctor**: dr.garcia@clinica.com
- **Receptionist**: recepcion1@clinica.com
- **Patient**: paciente1@email.com

### Clínica Sur
- **Admin**: admin.sur@clinica.com
- **Doctor**: dr.lopez@clinica.com
- **Receptionist**: recepcion.sur@clinica.com
- **Patient**: paciente4@email.com

### Centro Médico Norte
- **Admin**: admin.norte@medico.com
- **Doctor**: dr.torres@medico.com
- **Receptionist**: recepcion.norte@medico.com
- **Patient**: paciente6@email.com

---

## ❓ Si algo falla

❌ **"Database kenko does not exist"**
→ Crea primero: `CREATE DATABASE kenko;`

❌ **"Permission denied"**
→ Asegúrate de usar usuario `postgres` con contraseña correcta

❌ **El script tiene errores de sintaxis**
→ Revisa que PostgreSQL está actualizado: `psql --version`

---

## 💡 Lo que esto crea

✅ **3 organizaciones** (clínicas)  
✅ **19 usuarios** con roles: ADMIN, DOCTOR, RECEPTIONIST, PATIENT  
✅ **7 pacientes**  
✅ **7 citas** (appointments)  
✅ **4 tareas** (tasks)  
✅ **3 notificaciones** (notifications)

Cada usuario puede entrar con su rol y verá solo los datos de su organización.

---

## 📞 Variables de conexión
- **Host**: localhost
- **Puerto**: 5432
- **Database**: kenko
- **Usuario**: postgres
- **Contraseña**: postgres (o la que tengas configurada)
