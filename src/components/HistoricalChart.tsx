import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "../lib/utils";
import { Settings2 } from "lucide-react";

const initialData = [
  { time: "06:00", congestion: 30, arrival: 45, departure: 35 },
  { time: "07:00", congestion: 55, arrival: 70, departure: 50 },
  { time: "08:00", congestion: 80, arrival: 90, departure: 70 },
  { time: "09:00", congestion: 95, arrival: 100, departure: 60 },
  { time: "10:00", congestion: 85, arrival: 80, departure: 50 },
  { time: "11:00", congestion: 70, arrival: 60, departure: 45 },
  { time: "12:00", congestion: 90, arrival: 85, departure: 55 },
  { time: "13:00", congestion: 85, arrival: 75, departure: 60 },
  { time: "14:00", congestion: 80, arrival: 70, departure: 55 },
  { time: "15:00", congestion: 85, arrival: 80, departure: 60 },
  { time: "16:00", congestion: 90, arrival: 95, departure: 65 },
  { time: "17:00", congestion: 100, arrival: 110, departure: 70 }, // Peak
];

const optimizedData = [
  { time: "06:00", congestion: 30, arrival: 45, departure: 35 },
  { time: "07:00", congestion: 45, arrival: 70, departure: 65 },
  { time: "08:00", congestion: 60, arrival: 90, departure: 85 },
  { time: "09:00", congestion: 65, arrival: 90, departure: 90 },
  { time: "10:00", congestion: 50, arrival: 70, departure: 80 },
  { time: "11:00", congestion: 45, arrival: 60, departure: 65 },
  { time: "12:00", congestion: 55, arrival: 85, departure: 80 },
  { time: "13:00", congestion: 50, arrival: 75, departure: 75 },
  { time: "14:00", congestion: 45, arrival: 70, departure: 70 },
  { time: "15:00", congestion: 55, arrival: 80, departure: 75 },
  { time: "16:00", congestion: 65, arrival: 95, departure: 85 },
  { time: "17:00", congestion: 75, arrival: 110, departure: 100 }, // Flattened Peak
];

export function HistoricalChart({ className, isOptimizing }: { className?: string, isOptimizing?: boolean }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (isOptimizing) {
      setTimeout(() => {
        setData(optimizedData);
      }, 3000); // Sync with the global optimization timer
    }
  }, [isOptimizing]);

  return (
    <div className={cn("bg-system-panel panel-glass border border-system-border rounded-xl p-6 flex flex-col relative", className)}>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="font-display font-bold text-lg text-system-text mb-1 flex items-center gap-2">
            Historical Model
            {data === optimizedData && <span className="text-[10px] bg-system-accent/20 text-system-accent px-2 py-0.5 rounded border border-system-accent/50 uppercase tracking-wider">Data Updated</span>}
          </h3>
          <p className="text-sm text-system-text-muted leading-tight">Analyzing historical congestion via arrival/departure rates</p>
        </div>
      </div>
      <div className="flex-1 w-full relative">
        {isOptimizing && (
           <div className="absolute inset-0 z-10 flex text-center flex-col justify-center items-center bg-system-panel/50 backdrop-blur-sm rounded-lg">
             <Settings2 className="w-6 h-6 text-system-primary mb-2 animate-spin" />
             <span className="text-xs font-mono text-system-primary">Recalculating routing algorithms based on historical parameters...</span>
           </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCongestion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={data === optimizedData ? "var(--color-system-warning)" : "var(--color-system-danger)"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={data === optimizedData ? "var(--color-system-warning)" : "var(--color-system-danger)"} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorArrival" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-system-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-system-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-system-border)" vertical={false} />
            <XAxis dataKey="time" stroke="var(--color-system-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-system-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "var(--color-system-panel)", borderColor: "var(--color-system-border)", borderRadius: "8px", color: "var(--color-system-text)" }}
              itemStyle={{ color: "var(--color-system-text)" }}
            />
            <Area type="monotone" dataKey="congestion" stroke={data === optimizedData ? "var(--color-system-warning)" : "var(--color-system-danger)"} strokeWidth={2} fillOpacity={1} fill="url(#colorCongestion)" name="Historical Congestion %" className="transition-all duration-1000" />
            <Area type="monotone" dataKey="arrival" stroke="var(--color-system-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorArrival)" name="Arrival Rate" className="transition-all duration-1000" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
