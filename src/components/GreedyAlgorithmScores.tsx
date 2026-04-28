import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Zap, TrendingUp } from "lucide-react";

interface Phase {
  id: string;
  name: string;
  lanes: string[];
  currentScore: number;
  previousScore: number;
  isActive: boolean;
  greenLightDuration: number;
}

const initialPhases: Phase[] = [
  {
    id: "ns-straight",
    name: "N-S Straight",
    lanes: ["North", "South"],
    currentScore: 29160,
    previousScore: 28540,
    isActive: true,
    greenLightDuration: 45,
  },
  {
    id: "ew-straight",
    name: "E-W Straight",
    lanes: ["East", "West"],
    currentScore: 23340,
    previousScore: 24120,
    isActive: false,
    greenLightDuration: 0,
  },
  {
    id: "ns-left",
    name: "N-S Left Turn",
    lanes: ["North Left", "South Left"],
    currentScore: 8420,
    previousScore: 8100,
    isActive: false,
    greenLightDuration: 0,
  },
];

export function GreedyAlgorithmScores({ className }: { className?: string }) {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [cycleTime, setCycleTime] = useState(0);

  // Simulate score updates and phase cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleTime((prev) => (prev + 1) % 120); // 120 second cycle

      setPhases((prev) => {
        const updated = prev.map((phase) => ({
          ...phase,
          previousScore: phase.currentScore,
          currentScore: Math.max(
            5000,
            phase.currentScore + (Math.random() - 0.5) * 2000
          ),
        }));

        // Determine which phase should be active (Greedy selection)
        const maxScorePhase = updated.reduce((prev, current) =>
          prev.currentScore > current.currentScore ? prev : current
        );

        return updated.map((phase) => ({
          ...phase,
          isActive: phase.id === maxScorePhase.id,
          greenLightDuration: phase.id === maxScorePhase.id ? 45 : 0,
        }));
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const maxScore = Math.max(...phases.map((p) => p.currentScore));
  const activePhase = phases.find((p) => p.isActive);

  return (
    <div className={cn("bg-system-panel panel-glass border border-system-border rounded-xl p-6 flex flex-col", className)}>
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg text-system-text flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-system-primary" />
          Greedy Algorithm Scoring
        </h3>
        <p className="text-sm text-system-text-muted">Real-time phase priority calculation</p>
      </div>

      {/* Active Phase Highlight */}
      {activePhase && (
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-system-primary/20 to-transparent border-2 border-system-primary ring-1 ring-system-primary">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-system-text-muted uppercase font-mono tracking-wider mb-1">
                Currently Active Phase
              </p>
              <h4 className="text-lg font-bold text-system-text">{activePhase.name}</h4>
              <p className="text-xs text-system-text-muted mt-1">
                Green light for: {activePhase.lanes.join(", ")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-system-text-muted uppercase tracking-wider mb-1">Duration</p>
              <p className="text-3xl font-bold text-system-primary font-mono">
                {activePhase.greenLightDuration}s
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-system-primary">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Score: {activePhase.currentScore.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* All Phases Scoring */}
      <div className="flex-1 space-y-3 mb-6 overflow-y-auto pr-2 custom-scrollbar">
        {phases.map((phase) => {
          const scorePercentage = (phase.currentScore / maxScore) * 100;
          const scoreChange = phase.currentScore - phase.previousScore;
          const isImproving = scoreChange > 0;

          return (
            <div
              key={phase.id}
              className={cn(
                "p-4 rounded-lg border transition-all duration-300",
                phase.isActive
                  ? "bg-system-primary/10 border-system-primary ring-1 ring-system-primary shadow-[0_0_12px_rgba(79,70,229,0.3)]"
                  : "bg-system-panel-hover border-system-border"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-system-text text-sm">{phase.name}</h4>
                  <p className="text-xs text-system-text-muted mt-0.5">
                    Phases: {phase.lanes.join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-system-text font-mono">
                    {phase.currentScore.toLocaleString()}
                  </p>
                  <p
                    className={cn(
                      "text-xs font-semibold mt-1",
                      isImproving ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {isImproving ? "+" : ""}{scoreChange.toFixed(0)}
                  </p>
                </div>
              </div>

              {/* Score Bar */}
              <div className="w-full h-2 bg-system-panel-hover rounded-full overflow-hidden border border-system-border mb-2">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    phase.isActive
                      ? "bg-gradient-to-r from-system-primary to-system-accent shadow-[0_0_8px_rgba(79,70,229,0.6)]"
                      : "bg-system-primary/40"
                  )}
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>

              {/* Phase Details */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-system-text-muted">Percentage of Max</p>
                  <p className="text-system-text font-semibold">
                    {((phase.currentScore / maxScore) * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-system-text-muted">
                    {phase.isActive ? "Signal Duration" : "Waiting"}
                  </p>
                  <p className="text-system-text font-semibold">
                    {phase.isActive ? `${phase.greenLightDuration}s` : "Next cycle"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Algorithm Explanation */}
      <div className="p-4 bg-system-panel-hover border border-system-border rounded-lg">
        <p className="text-xs font-medium text-system-text mb-2">Greedy Algorithm Logic:</p>
        <p className="text-xs text-system-text-muted leading-relaxed">
          1. Calculate score for each phase: <span className="font-mono text-system-primary">vehicles × wait_time</span><br/>
          2. Select phase with highest score<br/>
          3. Grant green light for optimal duration<br/>
          4. Repeat cycle based on real-time vehicle detection
        </p>
      </div>
    </div>
  );
}
