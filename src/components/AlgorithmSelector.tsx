import React from "react";
import { ArrowRight, SearchCode, Radio } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  onNavigate: (tab: 'simulation' | 'pathfinding') => void;
}

export function AlgorithmSelector({ onNavigate }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 animate-in fade-in duration-500 bg-slate-50/50 rounded-3xl">
      <div className="text-center mb-12 max-w-2xl px-6">
        <h1 className="text-4xl font-display font-black text-slate-800 mb-4 tracking-tight">Algorithm Visualizations</h1>
        <p className="text-slate-600 text-lg font-medium">
          Select an algorithmic engine below to explore its real-time behavior, mathematical models, and how it solves Lipa City's traffic problems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-6">
        {/* Adaptive Hub Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="group relative bg-white border border-slate-200 hover:border-indigo-400 rounded-3xl p-8 shadow-xl cursor-pointer overflow-hidden transition-all hover:shadow-indigo-500/20"
          onClick={() => onNavigate('simulation')}
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <Radio className="w-48 h-48 text-indigo-600" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl mb-8 border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform">
              <Radio className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Adaptive Signal Hub</h2>
            <p className="text-indigo-600 font-mono font-bold text-sm mb-4 bg-indigo-50 inline-block self-start px-3 py-1 rounded-md">ALGO: GREEDY POINT SYSTEM</p>
            <p className="text-slate-600 mb-10 flex-1 font-medium leading-relaxed">
              Visualizes a Greedy Algorithm to pick which lanes get a go signal. It uses a point system based on vehicles queued and accumulated waiting time to dynamically manage traffic congestion instead of using fixed timers.
            </p>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-2 transition-transform">
                Launch Interactive UI <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pathfinding Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="group relative bg-white border border-slate-200 hover:border-sky-400 rounded-3xl p-8 shadow-xl cursor-pointer overflow-hidden transition-all hover:shadow-sky-500/20"
          onClick={() => onNavigate('pathfinding')}
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <SearchCode className="w-48 h-48 text-sky-600" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 bg-sky-50 text-sky-600 flex items-center justify-center rounded-2xl mb-8 border border-sky-100 shadow-sm group-hover:scale-110 transition-transform">
              <SearchCode className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Routing Engine</h2>
            <p className="text-sky-600 font-mono font-bold text-sm mb-4 bg-sky-50 inline-block self-start px-3 py-1 rounded-md">ALGO: DIJKSTRA & A* SEARCH</p>
            <p className="text-slate-600 mb-10 flex-1 font-medium leading-relaxed">
              Provides calculation steps using Dijkstra's Algorithm as a fallback and A* Search (f(n) = g(n) + h(n)) with heuristic limits based on current traffic conditions.
            </p>
            <div className="flex items-center justify-between w-full">
               <div className="flex items-center text-sky-600 font-bold group-hover:translate-x-2 transition-transform">
                 Launch Code Trace <ArrowRight className="w-5 h-5 ml-2" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
