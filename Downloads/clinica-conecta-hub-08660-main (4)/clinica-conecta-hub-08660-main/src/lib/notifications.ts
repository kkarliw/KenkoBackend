import api from './api';

// ============================================
// NOTIFICACIONES - /api/v1/notifications
// FUTURE: Not yet in v1 backend scope
// ============================================

export interface NotificacionInterna {
  id?: number;
  titulo: string;
  mensaje: string;
  remitenteId: number;
  destinatarioId: number;
  tipo: 'cita' | 'paciente_llego' | 'mensaje' | 'sistema';
  leida: boolean;
  fecha: string;
  citaId?: number;
}

export const getNotificaciones = async (usuarioId: number): Promise<NotificacionInterna[]> => {
  const response = await api.get<NotificacionInterna[]>(`/notifications/${usuarioId}`);
  return response.data;
};

export const getNotificacionesNoLeidas = async (usuarioId: number): Promise<NotificacionInterna[]> => {
  const notificaciones = await getNotificaciones(usuarioId);
  return notificaciones.filter(n => !n.leida);
};

export const enviarNotificacion = async (notificacion: Omit<NotificacionInterna, 'id' | 'fecha'>): Promise<NotificacionInterna> => {
  const response = await api.post<NotificacionInterna>('/notifications', {
    titulo: notificacion.titulo,
    mensaje: notificacion.mensaje,
    remitenteId: notificacion.remitenteId,
    destinatarioId: notificacion.destinatarioId,
    tipo: notificacion.tipo.toUpperCase(),
    leida: notificacion.leida,
    citaId: notificacion.citaId,
  });
  return response.data;
};

export const marcarComoLeida = async (notificacionId: number): Promise<void> => {
  await api.put(`/notifications/${notificacionId}/read`);
};

export const notificarPacienteLlego = async (medicoId: number, pacienteNombre: string, citaId: number) => {
  return enviarNotificacion({
    titulo: 'Paciente en sala de espera',
    mensaje: `El paciente ${pacienteNombre} ha llegado y está esperando`,
    remitenteId: 0,
    destinatarioId: medicoId,
    tipo: 'paciente_llego',
    leida: false,
    citaId,
  });
};
