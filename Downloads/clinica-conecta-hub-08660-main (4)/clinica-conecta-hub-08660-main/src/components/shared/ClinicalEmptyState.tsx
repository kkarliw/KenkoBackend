import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClinicalEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function ClinicalEmptyState({ icon: Icon, title, description, actionLabel, onAction, className }: ClinicalEmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-clinical-small text-muted-foreground max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm" className="mt-4 gap-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
