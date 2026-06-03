import type { FC } from "react";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  subtext?: string;
  type?: "default" | "success" | "warning";
  icon: React.JSX.Element;
}

export const StatCard: FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  subtext,
  type,
}) => {
  const colorMap = {
    success: "text-(--color-success)",
    warning: "text-(--color-warning)",
    default: "text-(--color-text-primary)",
  };

  const textColor = colorMap[type as keyof typeof colorMap] || colorMap.default;

  return (
    <div className="flex flex-col gap-1 rounded-xl border border-(--color-border-soft) bg-(--color-bg-card) p-5">
      <span className="text-xs font-bold uppercase tracking-wider text-(--color-text-muted)">
        {label}
      </span>

      <div className="flex items-center justify-between">
        <span className={`text-2xl font-bold ${textColor}`}>{value}</span>
        {icon}
      </div>

      {trend && (
        <p className="text-xs font-medium text-(--color-success)">{trend}</p>
      )}

      {subtext && (
        <p className="text-xs text-(--color-text-muted)">{subtext}</p>
      )}
    </div>
  );
};
