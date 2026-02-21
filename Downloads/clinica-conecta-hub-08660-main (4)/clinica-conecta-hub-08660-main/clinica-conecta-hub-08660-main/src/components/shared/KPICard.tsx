import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function KPICard({ label, value, icon: Icon, trend, trendUp, className }: KPICardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4 flex items-center gap-4", className)}>
      <div className="h-10 w-10 rounded-md bg-primary/8 flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <p className="text-clinical-small text-muted-foreground">{label}</p>
        {trend && (
          <p className={cn("text-clinical-small font-medium mt-0.5", trendUp ? "text-success" : "text-destructive")}>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}
