import React, { useState } from "react";
import { cn } from "../lib/utils";
import { AlertCircle, Map } from "lucide-react";

interface Hotspot {
  id: number;
  name: string;
  severity: "critical" | "moderate" | "clear";
  congestionLevel: number; // 0-100
  vehicleCount: number;
  avgWaitTime: number;
}

const hotspots: Hotspot[] = [
  { id: 1, name: "SM Lipa Intersection", severity: "critical", congestionLevel: 92, vehicleCount: 247, avgWaitTime: 85 },
  { id: 2, name: "Poblacion Market", severity: "critical", congestionLevel: 88, vehicleCount: 203, avgWaitTime: 120 },
  { id: 3, name: "Robinsons Junction", severity: "moderate", congestionLevel: 54, vehicleCount: 98, avgWaitTime: 32 },
  { id: 4, name: "Tambo Exit", severity: "clear", congestionLevel: 18, vehicleCount: 24, avgWaitTime: 3 },
  { id: 5, name: "City Hall Area", severity: "moderate", congestionLevel: 62, vehicleCount: 156, avgWaitTime: 45 },
];

export function TrafficHotspots({ className }: { className?: string }) {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(hotspots[0]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 border-red-500/50 text-red-300";
      case "moderate":
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-300";
      case "clear":
        return "bg-green-500/20 border-green-500/50 text-green-300";
      default:
        return "bg-slate-500/20 border-slate-500/50 text-slate-300";
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "from-red-600 to-red-900";
      case "moderate":
        return "from-yellow-600 to-yellow-900";
      case "clear":
        return "from-green-600 to-green-900";
      default:
        return "from-slate-600 to-slate-900";
    }
  };

  return (
    <div className={cn("bg-system-panel panel-glass border border-system-border rounded-xl p-6 flex flex-col h-full", className)}>
      <div className="mb-4">
        <h3 className="font-display font-bold text-lg text-system-text flex items-center gap-2 mb-1">
          <Map className="w-5 h-5 text-system-primary" />
          Traffic Hotspots
        </h3>
        <p className="text-sm text-system-text-muted">Real-time congestion density map (YOLO-derived vehicle counts)</p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {/* Hotspot List */}
        <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => setSelectedHotspot(hotspot)}
              className={cn(
                "p-3 rounded-lg border transition-all text-left cursor-pointer",
                selectedHotspot?.id === hotspot.id
                  ? "bg-system-primary/20 border-system-primary ring-1 ring-system-primary"
                  : "bg-system-panel-hover border-system-border hover:border-system-primary/50"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-system-text">{hotspot.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded border", getSeverityColor(hotspot.severity))}>
                      {hotspot.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-system-text-muted">{hotspot.vehicleCount} vehicles</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="w-12 h-6 bg-gradient-to-r from-red-900 to-green-900 rounded-full overflow-hidden border border-system-border">
                    <div
                      className={`h-full bg-gradient-to-r ${getSeverityBgColor(hotspot.severity)} transition-all`}
                      style={{ width: `${hotspot.congestionLevel}%` }}
                    />
                  </div>
                  <span className="text-xs text-system-text-muted mt-1">{hotspot.congestionLevel}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Hotspot Details */}
        {selectedHotspot && (
          <div className={cn("p-4 rounded-lg border-2 bg-gradient-to-br", 
            selectedHotspot.severity === "critical" ? "border-red-500/50 from-red-500/10 to-transparent" :
            selectedHotspot.severity === "moderate" ? "border-yellow-500/50 from-yellow-500/10 to-transparent" :
            "border-green-500/50 from-green-500/10 to-transparent"
          )}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-system-text">{selectedHotspot.name}</h4>
                <p className="text-xs text-system-text-muted mt-1">Current Status</p>
              </div>
              {selectedHotspot.severity === "critical" && (
                <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-system-text-muted mb-1">Congestion</p>
                <p className="text-lg font-bold text-system-text">{selectedHotspot.congestionLevel}%</p>
              </div>
              <div>
                <p className="text-system-text-muted mb-1">Vehicles</p>
                <p className="text-lg font-bold text-system-text">{selectedHotspot.vehicleCount}</p>
              </div>
              <div>
                <p className="text-system-text-muted mb-1">Avg Wait</p>
                <p className="text-lg font-bold text-system-text">{selectedHotspot.avgWaitTime}s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
