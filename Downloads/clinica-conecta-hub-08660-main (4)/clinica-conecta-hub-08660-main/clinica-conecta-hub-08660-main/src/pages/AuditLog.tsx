import { useState, useEffect } from 'react';
import ClinicalLayout from '@/components/layouts/ClinicalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getAuditLog, type AuditLogResponse } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const actionLabels: Record<string, { label: string; emoji: string; color: string }> = {
  'CREATE_USER': { label: 'Crear Usuario', emoji: '➕', color: 'green' },
  'UPDATE_PASSWORD': { label: 'Cambiar Contraseña', emoji: '🔐', color: 'blue' },
  'RESET_PASSWORD': { label: 'Resetear Contraseña', emoji: '🔄', color: 'orange' },
  'UPDATE_PROFILE': { label: 'Actualizar Perfil', emoji: '✏️', color: 'slate' },
  'DELETE_USER': { label: 'Eliminar Usuario', emoji: '🗑️', color: 'red' },
};

export default function AuditLog() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<AuditLogResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({
    action: '',
    userName: '',
  });

  useEffect(() => {
    loadAuditLog();
  }, [currentPage, filters]);

  const loadAuditLog = async () => {
    setIsLoading(true);
    try {
      const response = await getAuditLog(currentPage, 20, {
        action: filters.action || undefined,
      });
      setLogs(response);
    } catch (error: any) {
      toast.error('Error al cargar auditoría');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    const config = actionLabels[action];
    const colorMap: Record<string, string> = {
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      orange: 'bg-orange-100 text-orange-800',
      red: 'bg-red-100 text-red-800',
      slate: 'bg-slate-100 text-slate-800',
    };
    return colorMap[config?.color || 'slate'] || 'bg-slate-100 text-slate-800';
  };

  return (
    <ClinicalLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">📋 Auditoría del Sistema</h1>
            <p className="text-slate-600">Historial de cambios y acciones de seguridad</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Filtrar por Acción
              </label>
              <Select value={filters.action} onValueChange={(value) => {
                setFilters({ ...filters, action: value });
                setCurrentPage(0);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las acciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas las acciones</SelectItem>
                  {Object.entries(actionLabels).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Buscar Usuario
              </label>
              <Input
                placeholder="Nombre del usuario..."
                value={filters.userName}
                onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-end">
              <Button onClick={loadAuditLog} disabled={isLoading} className="w-full">
                {isLoading ? '⏳ Cargando...' : '🔄 Actualizar'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Audit Log Table */}
        <Card className="p-6 overflow-x-auto">
          <div className="space-y-3">
            {!logs || logs.content.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p className="text-lg">📭 No hay registros de auditoría</p>
              </div>
            ) : (
              logs.content.map((log) => {
                const action = actionLabels[log.action];
                return (
                  <div
                    key={log.id}
                    className="flex justify-between items-start p-4 bg-slate-50 rounded border border-slate-200 hover:bg-slate-100 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{action?.emoji || '❓'}</span>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {log.userName || 'Sistema'} → {action?.label || log.action}
                          </p>
                          {log.targetUserName && (
                            <p className="text-sm text-slate-600">
                              En usuario: <strong>{log.targetUserName}</strong>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span>⏰ {new Date(log.timestamp).toLocaleString('es-CO')}</span>
                        <span>💻 IP: {log.ipAddress || 'N/A'}</span>
                        <span
                          className={`px-2 py-1 rounded ${
                            log.status === 'SUCCESS'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {log.status === 'SUCCESS' ? '✅ Exitoso' : '❌ Fallido'}
                        </span>
                      </div>

                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="mt-2 p-2 bg-slate-100 rounded text-xs">
                          <p className="font-semibold text-slate-700 mb-1">Detalles:</p>
                          <pre className="text-slate-600 whitespace-pre-wrap break-words">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div
                      className={`px-3 py-1 rounded text-xs font-semibold ml-4 ${getActionColor(
                        log.action,
                      )}`}
                    >
                      {action?.label || 'Desconocida'}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {logs && logs.totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="text-sm text-slate-600">
                Página {logs.currentPage + 1} de {logs.totalPages} ({logs.totalElements} registros)
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={isLoading || currentPage === 0}
                >
                  ← Anterior
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, logs.totalPages - 1))}
                  disabled={isLoading || currentPage >= logs.totalPages - 1}
                >
                  Siguiente →
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </ClinicalLayout>
  );
}
