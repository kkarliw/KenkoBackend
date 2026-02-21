import { cn } from "@/lib/utils";

type StatusType = "confirmed" | "pending" | "cancelled" | "noshow" | "completed" | "in_progress";

const statusConfig: Record<StatusType, { label: string; dotColor: string; className: string }> = {
  confirmed: { label: "Confirmada", dotColor: "bg-success", className: "status-confirmed" },
  completed: { label: "Completada", dotColor: "bg-success", className: "status-confirmed" },
  pending: { label: "Pendiente", dotColor: "bg-warning", className: "status-pending" },
  in_progress: { label: "En Revisión", dotColor: "bg-warning", className: "status-pending" },
  cancelled: { label: "Cancelada", dotColor: "bg-destructive", className: "status-cancelled" },
  noshow: { label: "No-Show", dotColor: "bg-muted-foreground", className: "status-noshow" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-clinical-small font-medium", config.className, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotColor)} aria-hidden="true" />
      {config.label}
    </span>
  );
}

export type { StatusType };
