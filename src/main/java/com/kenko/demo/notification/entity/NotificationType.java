package com.kenko.demo.notification.entity;

public enum NotificationType {
    // SISTEMA
    SYSTEM("Notificación del sistema"),

    // CITAS
    CITA("Notificación de cita"),
    CITA_CONFIRMADA("Cita confirmada"),
    CITA_CANCELADA("Cita cancelada"),
    CITA_RECORDATORIO_48H("Recordatorio: cita en 48 horas"),
    CITA_RECORDATORIO_24H("Recordatorio: cita en 24 horas"),
    CITA_RECORDATORIO_2H("Recordatorio: cita en 2 horas"),

    // PACIENTES
    PACIENTE_LLEGO("Paciente ha llegado"),
    PACIENTE_REGISTRADO("Nuevo paciente registrado"),

    // ACOMPAÑAMIENTO
    ACOMPANAMIENTO_CONFIRMADO("Acompañamiento confirmado"),
    ACOMPANAMIENTO_SOLICITADO("Solicitud de acompañamiento"),
    ACOMPANAMIENTO_RECHAZADO("Acompañamiento rechazado"),

    // TAREAS
    TAREA("Notificación de tarea"),
    TAREA_ASIGNADA("Tarea asignada"),
    TAREA_COMPLETADA("Tarea completada"),

    // MEDICAMENTOS
    MEDICAMENTO_RECORDATORIO("Recordatorio: tomar medicamento"),

    // REPORTES
    REPORTE_PENDIENTE("Recordatorio: registrar reporte diario"),

    // AUTORIZACIONES
    AUTORIZACION_REQUERIDA("Se requiere autorización"),
    AUTORIZACION_APROBADA("Autorización aprobada"),

    // MENSAJES
    MENSAJE("Nuevo mensaje"),
    MENSAJE_DOCTOR("Mensaje del doctor"),
    MENSAJE_PACIENTE("Mensaje del paciente"),

    // ALERTAS
    ALERTA_CRITICA("Alerta crítica"),
    ALERTA_VITAL("Vital crítico detectado"),

    // ADMISIÓN
    ADMISION_REQUERIDA("Se requiere admisión");

    private final String descripcion;

    NotificationType(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}