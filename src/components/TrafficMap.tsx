import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Play } from "lucide-react";

const initialNodes = [
  { id: "1", label: "SM Lipa", x: 30, y: 40, congestion: "High" },
  { id: "2", label: "Robinsons", x: 60, y: 25, congestion: "Medium" },
  { id: "3", label: "Poblacion", x: 45, y: 60, congestion: "High" },
  { id: "4", label: "Tambo Exit", x: 80, y: 45, congestion: "High" },
  { id: "5", label: "LIMA Tech", x: 85, y: 75, congestion: "Medium" },
  { id: "6", label: "Fiesta Mall", x: 35, y: 80, congestion: "Low" },
  { id: "7", label: "Puregold", x: 50, y: 40, congestion: "High" }
];

const initialEdges = [
  { from: "1", to: "7", weight: 15, traffic: "heavy" },
  { from: "7", to: "2", weight: 10, traffic: "medium" },
  { from: "1", to: "3", weight: 25, traffic: "heavy" },
  { from: "3", to: "6", weight: 12, traffic: "light" },
  { from: "7", to: "3", weight: 8, traffic: "heavy" },
  { from: "2", to: "4", weight: 18, traffic: "medium" },
  { from: "4", to: "5", weight: 22, traffic: "medium" },
  { from: "3", to: "5", weight: 30, traffic: "heavy" },
];

export function TrafficMap({ className, isOptimizing }: { className?: string, isOptimizing?: boolean }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [optimized, setOptimized] = useState(false);

  useEffect(() => {
    if (isOptimizing) {
      setOptimized(false);
      // Simulate algorithm running - flashing states
      const interval = setInterval(() => {
         setNodes(prev => prev.map(n => ({...n, congestion: Math.random() > 0.5 ? "Medium" : "High"})));
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        // Apply optimized state (Dijkstra/A* results)
        setNodes(initialNodes.map(n => ({
          ...n,
          congestion: n.congestion === "High" ? "Medium" : "Low"
        })));
        setEdges(initialEdges.map(e => ({
          ...e,
          traffic: e.traffic === "heavy" ? "medium" : "light",
          weight: Math.round(e.weight * 0.6) // Reduced weights
        })));
        setOptimized(true);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOptimizing]);

  return (
    <div className={cn("bg-system-panel panel-glass border border-system-border rounded-xl p-6 relative overflow-hidden flex flex-col", className)}>
      <div className="mb-4 flex justify-between items-center z-10 relative">
        <div>
          <h3 className="font-display font-bold text-lg text-system-text mb-1 flex items-center gap-2">
            Network Graph Routing
            {optimized && <span className="text-[10px] bg-system-accent/20 text-system-accent px-2 py-0.5 rounded border border-system-accent/50 uppercase tracking-wider">Optimized via A*</span>}
          </h3>
          <p className="text-sm text-system-text-muted">Lipa City Commercial Zones Routing</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-system-accent"></div> Clear</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-system-warning"></div> Moderate</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-system-danger"></div> High</div>
        </div>
      </div>

      <div className="flex-1 relative bg-slate-950 map-grid rounded-lg border border-system-border mt-2 overflow-hidden transition-all duration-1000">
        <svg className="absolute inset-0 w-full h-full opacity-80" preserveAspectRatio="none">
          {edges.map((edge, i) => {
            const start = nodes.find(n => n.id === edge.from)!;
            const end = nodes.find(n => n.id === edge.to)!;
            
            let color = "var(--color-system-border)";
            if (edge.traffic === "heavy") color = "var(--color-system-danger)";
            else if (edge.traffic === "medium") color = "var(--color-system-warning)";
            else if (edge.traffic === "light") color = "var(--color-system-accent)";

            return (
              <g key={i} className="transition-all duration-1000">
                <line 
                  x1={`${start.x}%`} y1={`${start.y}%`} 
                  x2={`${end.x}%`} y2={`${end.y}%`} 
                  stroke={color} 
                  strokeWidth={edge.traffic === "heavy" ? 4 : 2} 
                  strokeOpacity={isOptimizing ? 0.3 : 0.6}
                  className={cn("transition-all duration-1000", optimized && "glow-green", isOptimizing && "animate-pulse")}
                />
                <text 
                  x={`${(start.x + end.x) / 2}%`} 
                  y={`${(start.y + end.y) / 2}%`} 
                  fill={optimized ? "var(--color-system-accent)" : "var(--color-system-text-muted)"} 
                  fontSize="10" 
                  fontFamily="monospace"
                  textAnchor="middle"
                  dy="-5"
                  className="transition-colors duration-1000"
                >
                  w={edge.weight}
                </text>
              </g>
            );
          })}
        </svg>

        {nodes.map(node => (
          <div 
            key={node.id} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-all duration-500"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className={cn(
              "w-4 h-4 rounded-full border-2 border-slate-900 shadow-lg relative z-10 transition-colors duration-500",
              node.congestion === "High" ? "bg-system-danger glow-red" : node.congestion === "Medium" ? "bg-system-warning" : "bg-system-accent glow-green"
            )}>
              {node.congestion === "High" && !isOptimizing && (
                <div className="absolute inset-0 rounded-full animate-ping bg-system-danger opacity-75"></div>
              )}
            </div>
            <div className="bg-slate-900/90 px-2 py-0.5 border border-system-border rounded text-[10px] whitespace-nowrap text-system-text font-medium z-10 backdrop-blur-sm">
              {node.label}
            </div>
          </div>
        ))}
        
        {isOptimizing && (
          <div className="absolute inset-0 bg-system-primary/5 backdrop-blur-[1px] flex items-center justify-center z-20">
             <div className="bg-slate-900/80 border border-system-primary px-4 py-2 rounded-lg text-system-primary font-mono text-xs flex items-center gap-3 shadow-lg">
                <Play className="w-3 h-3 animate-spin" />
                Executing Graph Algorithms...
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
