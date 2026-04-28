import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Zap } from "lucide-react";

const initialIntersections = [
  { id: 1, name: "SM Lipa Intersection", status: "red", wait: 85, density: "High", isOptimizing: false },
  { id: 2, name: "Robinsons Junction", status: "green", wait: 0, density: "Medium", isOptimizing: false },
  { id: 3, name: "Tambo Exit", status: "yellow", wait: 3, density: "Low", isOptimizing: false },
  { id: 4, name: "Poblacion Market", status: "red", wait: 120, density: "High", isOptimizing: false },
];

export function AdaptiveSignals({ className }: { className?: string }) {
  const [intersections, setIntersections] = useState(initialIntersections);

  const handleGreedyAdjust = (id: number) => {
    // Simulate Greedy Algorithm adjusting signal duration based on real-time density
    setIntersections(prev => prev.map(int => 
      int.id === id ? { ...int, isOptimizing: true } : int
    ));

    setTimeout(() => {
      setIntersections(prev => prev.map(int => {
        if (int.id === id) {
          return {
            ...int,
            isOptimizing: false,
            status: "green",
            wait: 0,
            density: "Low" // Simplified resolution
          }
        }
        return int;
      }));
    }, 1500);
  };

  return (
    <div className={cn("bg-system-panel panel-glass border border-system-border rounded-xl p-6 flex flex-col", className)}>
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg text-system-text mb-1">Adaptive Signal Control</h3>
        <p className="text-sm text-system-text-muted leading-tight">Greedy algorithm dynamically adjusts light durations to minimize wait time</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-4">
          {intersections.map((intersection) => (
            <div key={intersection.id} className="flex items-center justify-between p-3 rounded-lg bg-system-panel-hover border border-system-border transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1 w-6 items-center bg-black/40 p-1.5 rounded-full border border-system-border">
                  <div className={cn("w-3 h-3 rounded-full transition-colors", intersection.status === "red" ? "bg-system-danger shadow-[0_0_8px_rgba(239,68,68,0.8)] glow-red" : "bg-system-danger/20")} />
                  <div className={cn("w-3 h-3 rounded-full transition-colors", intersection.status === "yellow" ? "bg-system-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]" : "bg-system-warning/20")} />
                  <div className={cn("w-3 h-3 rounded-full transition-colors", intersection.status === "green" ? "bg-system-accent shadow-[0_0_8px_rgba(34,197,94,0.8)] glow-green" : "bg-system-accent/20")} />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-system-text">{intersection.name}</h4>
                  <div className="text-xs text-system-text-muted mt-0.5 flex items-center gap-2">
                    Density: <span className={cn(
                      "transition-colors duration-500 font-semibold",
                      intersection.density === "High" ? "text-system-danger" : intersection.density === "Medium" ? "text-system-warning" : "text-system-accent"
                    )}>{intersection.density}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right w-12 text-center">
                  <div className={cn("font-mono text-xl font-bold transition-all", intersection.wait > 0 && intersection.status === "red" ? "text-system-danger" : "text-system-text")}>
                    {intersection.wait > 0 ? `${intersection.wait}s` : '--'}
                  </div>
                  <div className="text-[10px] text-system-text-muted uppercase tracking-wider">Wait</div>
                </div>
                {intersection.status === "red" && intersection.wait > 60 && (
                   <button 
                     onClick={() => handleGreedyAdjust(intersection.id)}
                     disabled={intersection.isOptimizing}
                     className="bg-system-primary/10 hover:bg-system-primary/20 border border-system-primary/50 text-system-primary p-2 rounded-md transition-colors disabled:opacity-50"
                     title="Apply Greedy Signal Optimization"
                   >
                     <Zap className={cn("w-4 h-4", intersection.isOptimizing && "animate-pulse")} />
                   </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
