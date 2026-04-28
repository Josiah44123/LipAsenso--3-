import { Activity, Car, Clock, Navigation, TrendingUp, TrendingDown } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function MetricCard({ title, value, icon: Icon, trend, trendUp, className }: MetricCardProps) {
  return (
    <div className={cn("bg-system-panel panel-glass border border-system-border rounded-xl p-6 flex flex-col flex-1 gap-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-system-text-muted font-medium text-sm tracking-wide">{title}</h3>
        <div className="p-2 bg-system-panel-hover border border-system-border rounded-lg">
          <Icon className="w-5 h-5 text-system-primary" />
        </div>
      </div>
      <div>
        <div className="font-display text-3xl font-bold text-system-text">{value}</div>
        {trend && (
          <div className="flex items-center mt-2 gap-1.5 text-xs font-medium">
            <span className={cn("flex items-center gap-0.5", trendUp ? "text-system-accent" : "text-system-danger")}>
              {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {trend}
            </span>
            <span className="text-system-text-muted">vs last hour</span>
          </div>
        )}
      </div>
    </div>
  );
}
