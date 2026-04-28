import React, { useEffect, useState } from "react";
import { GitCommit, ArrowRightCircle } from "lucide-react";
import { cn } from "../lib/utils";

const initialLogs = [
  { time: "Just now", algo: "Dijkstra", action: "Rerouted 85 vehicles from SM Lipa to bypass pure congestion.", costSaved: "8m" },
  { time: "2 min ago", algo: "Greedy", action: "Extended Robinsons junction green light by +12s.", costSaved: "N/A" },
  { time: "5 min ago", algo: "A* Search", action: "Identified optimal path for emergency vehicle via Tambo.", costSaved: "14m" },
  { time: "12 min ago", algo: "Historical", action: "Analyzed historical buildup near LIMA, suggested alternative routes.", costSaved: "N/A" },
  { time: "18 min ago", algo: "Dijkstra", action: "Updated primary route weights for Poblacion exits.", costSaved: "5m" },
];

export function OptimizationLog({ className, isOptimizing }: { className?: string, isOptimizing?: boolean }) {
  const [logs, setLogs] = useState(initialLogs);

  useEffect(() => {
    if (isOptimizing) {
       // While optimizing, we add new rapid logs
       const newLogs = [
         { time: "Now", algo: "A* Search", action: "Recalculating heuristic scores for SM Lipa to Tambo route...", costSaved: "N/A" },
         { time: "Now", algo: "YOLO", action: "Analyzing arrival/departure rates at Poblacion Market.", costSaved: "N/A" }
       ];
       setLogs(prev => [...newLogs, ...prev].slice(0, 6)); // keep top 6

       setTimeout(() => {
         const resolvedLogs = [
           { time: "Just now", algo: "Global", action: "System-wide A* & Dijkstra optimization complete.", costSaved: "22m avg" },
           { time: "Just now", algo: "Greedy", action: "Synchronized signals from Robinsons to Fiesta Mall.", costSaved: "15m" }
         ];
         setLogs(prev => [...resolvedLogs, ...prev].slice(0, 6));
       }, 3000);
    }
  }, [isOptimizing]);

  return (
    <div className={cn("bg-system-panel panel-glass border border-system-border rounded-xl p-6 flex flex-col", className)}>
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h3 className="font-display font-bold text-lg text-system-text mb-1">Algorithmic Decision Log</h3>
          <p className="text-sm text-system-text-muted">Live routing, signals, and heuristic updates</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-system-primary">
          <span className="relative flex h-2 w-2">
            <span className={cn("absolute inline-flex h-full w-full rounded-full bg-system-primary opacity-75", isOptimizing ? "animate-ping" : "animate-pulse")}></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-system-primary"></span>
          </span>
          {isOptimizing ? "PROCESSING" : "LIVE"}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative pl-2">
        <div className="absolute left-[13px] top-2 bottom-2 w-px bg-system-border"></div>
        <div className="space-y-6 relative z-10 transition-all">
          {logs.map((log, i) => (
            <div key={`${log.time}-${i}`} className="flex gap-4 relative animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="bg-system-panel relative p-0.5 mt-0.5">
                <GitCommit className={cn("w-5 h-5", i === 0 && isOptimizing ? "text-system-primary animate-pulse" : "text-system-text-muted")} />
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-system-primary px-1.5 py-0.5 bg-system-primary/10 rounded border border-system-primary/20">
                    {log.algo}
                  </span>
                  <span className="text-xs text-system-text-muted">{log.time}</span>
                </div>
                <p className="text-sm text-system-text leading-relaxed">{log.action}</p>
                {log.costSaved !== "N/A" && (
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] text-system-accent font-medium uppercase tracking-wider bg-system-accent/10 w-fit px-2 py-1 rounded inline-flex">
                    <ArrowRightCircle className="w-3.5 h-3.5" />
                    Est. Saved: {log.costSaved}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
