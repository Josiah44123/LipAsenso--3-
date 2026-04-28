import React from "react";
import { cn } from "../lib/utils";
import { BarChart3, Navigation } from "lucide-react";

interface Lane {
  id: string;
  name: string;
  vehicleCount: number;
  cumulativeWait: number;
  score: number;
}

const lanes: Lane[] = [
  { id: "north", name: "North Lane", vehicleCount: 45, cumulativeWait: 320, score: 14400 },
  { id: "south", name: "South Lane", vehicleCount: 52, cumulativeWait: 280, score: 14560 },
  { id: "east", name: "East Lane", vehicleCount: 38, cumulativeWait: 150, score: 5700 },
  { id: "west", name: "West Lane", vehicleCount: 42, cumulativeWait: 420, score: 17640 },
];

export function LaneMetrics({ className }: { className?: string }) {
  const maxScore = Math.max(...lanes.map(l => l.score));
  const highestScore = lanes.reduce((prev, current) => (prev.score > current.score) ? prev : current);

  return (
    <div className={cn("bg-system-panel panel-glass border border-system-border rounded-xl p-6 flex flex-col", className)}>
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg text-system-text flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-system-primary" />
          Lane Metrics & Vehicle Counts
        </h3>
        <p className="text-sm text-system-text-muted">YOLO-derived vehicle detection per lane (used for Greedy algorithm)</p>
      </div>

      <div className="flex-1 space-y-3">
        {lanes.map((lane) => {
          const scorePercentage = (lane.score / maxScore) * 100;
          const isHighestPriority = lane.id === highestScore.id;

          return (
            <div
              key={lane.id}
              className={cn(
                "p-4 rounded-lg border transition-all duration-300",
                isHighestPriority
                  ? "bg-system-primary/10 border-system-primary ring-1 ring-system-primary"
                  : "bg-system-panel-hover border-system-border"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-system-text text-sm">{lane.name}</h4>
                    {isHighestPriority && (
                      <span className="text-xs font-bold bg-system-primary/20 text-system-primary px-2 py-0.5 rounded border border-system-primary/50">
                        HIGHEST PRIORITY
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-system-text-muted">
                    {lane.vehicleCount} vehicles • {lane.cumulativeWait}s cumulative wait
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-system-text-muted uppercase tracking-wider font-mono">Score</p>
                  <p className="text-xl font-bold text-system-primary font-mono">{lane.score.toLocaleString()}</p>
                </div>
              </div>

              {/* Score Calculation Formula */}
              <div className="text-xs text-system-text-muted mb-2 font-mono px-2 py-1 bg-black/20 rounded border border-system-border/50">
                <span className="text-system-text">{lane.vehicleCount}</span> vehicles × <span className="text-system-text">{lane.cumulativeWait}s</span> wait = <span className="text-system-primary font-bold">{lane.score}</span>
              </div>

              {/* Score Bar */}
              <div className="w-full h-2 bg-system-panel-hover rounded-full overflow-hidden border border-system-border">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isHighestPriority ? "bg-gradient-to-r from-system-primary to-system-accent shadow-[0_0_8px_rgba(79,70,229,0.6)]" : "bg-system-primary/40"
                  )}
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend & Explanation */}
      <div className="mt-6 p-4 bg-system-panel-hover border border-system-border rounded-lg">
        <p className="text-xs font-medium text-system-text mb-2">Formula: score(lane) = vehicles_queued × cumulative_wait</p>
        <p className="text-xs text-system-text-muted leading-relaxed">
          The highest priority lane gets the green light. YOLO detection provides real-time vehicle counts, which feed into the Greedy algorithm to calculate optimal signal timing.
        </p>
      </div>
    </div>
  );
}
