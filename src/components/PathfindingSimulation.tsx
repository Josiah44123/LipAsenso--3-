import React, { useState } from "react";
import { cn } from "../lib/utils";
import { SearchCode, Route } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  description: string;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

const NODES: Node[] = [
  { id: "A", label: "SM Lipa", x: 20, y: 50, description: "Major commercial hub. High traffic volume." },
  { id: "B", label: "Puregold", x: 40, y: 30, description: "Medium density shopping area." },
  { id: "C", label: "Robinsons", x: 45, y: 70, description: "Congestion choke point." },
  { id: "D", label: "Poblacion", x: 70, y: 20, description: "City center. Tight narrow roads." },
  { id: "E", label: "Tambo Exit", x: 75, y: 60, description: "Highway connection. Heavy volume speed." },
  { id: "F", label: "LIMA Engine", x: 85, y: 85, description: "Industrial park connection." },
];

const EDGES: Edge[] = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 2 },
  { from: "B", to: "C", weight: 5 },
  { from: "B", to: "D", weight: 10 },
  { from: "C", to: "E", weight: 3 },
  { from: "D", to: "E", weight: 4 },
  { from: "D", to: "F", weight: 11 },
  { from: "E", to: "F", weight: 5 },
];

export function PathfindingSimulation() {
  const [activeStep, setActiveStep] = useState(-1);
  const [animating, setAnimating] = useState(false);

  // Dijkstra State Arrays for visual Steps
  const steps = [
    { desc: "Initializing distances. Source 'SM Lipa' (A) set to 0. All others to Infinity.", visiting: "A", distances: { A: 0, B: '∞', C: '∞', D: '∞', E: '∞', F: '∞' }, path: [] },
    { desc: "Current Node: A. Relaxing neighbors B (weight 4) and C (weight 2).", visiting: "A", highlights: ["A-B", "A-C"], distances: { A: 0, B: 4, C: 2, D: '∞', E: '∞', F: '∞' }, path: [] },
    { desc: "Node C has lowest distance (2). Current Node: C. Relaxing neighbors B and E.", visiting: "C", highlights: ["A-C", "C-B", "C-E"], distances: { A: 0, B: 4, C: 2, D: '∞', E: 5, F: '∞' }, path: ["A-C"] },
    { desc: "Node B has lowest distance (4). Current Node: B. Relaxing neighbor D.", visiting: "B", highlights: ["A-B", "B-D"], distances: { A: 0, B: 4, C: 2, D: 14, E: 5, F: '∞' }, path: ["A-C", "A-B"] },
    { desc: "Node E has lowest distance (5). Current Node: E. Relaxing D and F.", visiting: "E", highlights: ["C-E", "E-D", "E-F"], distances: { A: 0, B: 4, C: 2, D: 9, E: 5, F: 10 }, path: ["A-C", "A-B", "C-E"] },
    { desc: "Node D has lowest distance (9). Current Node: D. Relaxing F.", visiting: "D", highlights: ["E-D", "D-F"], distances: { A: 0, B: 4, C: 2, D: 9, E: 5, F: 10 }, path: ["A-C", "A-B", "C-E", "E-D"] },
    { desc: "Node F has lowest distance (10). Current Node: F. No more unvisited neighbors.", visiting: "F", highlights: ["E-F"], distances: { A: 0, B: 4, C: 2, D: 9, E: 5, F: 10 }, path: ["A-C", "A-B", "C-E", "E-D", "E-F"] },
    { desc: "Dijkstra's Algorithm Complete. Shortest paths to all locations plotted.", visiting: null, highlights: [], distances: { A: 0, B: 4, C: 2, D: 9, E: 5, F: 10 }, path: ["A-B", "A-C", "C-E", "E-D", "E-F"], isComplete: true },
  ];

  const currentStepData = activeStep >= 0 ? steps[activeStep] : steps[0];

  const handleStart = () => {
    if (animating) return;
    setAnimating(true);
    setActiveStep(0);
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(timer);
        setAnimating(false);
      } else {
        setActiveStep(step);
      }
    }, 2800); 
  };

  const handleReset = () => {
    setActiveStep(-1);
    setAnimating(false);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full animate-in fade-in duration-500 min-h-[700px] h-[calc(100vh-120px)]">
      
      {/* Simulation World Canvas - Light and Colorful */}
      <div className="flex-1 bg-indigo-50 rounded-2xl border border-indigo-100 relative overflow-hidden h-full shadow-lg p-8">
        <div className="absolute top-4 left-4 bg-white/90 px-4 py-3 rounded-xl text-sm text-indigo-700 font-mono z-30 shadow-md border border-indigo-200 backdrop-blur-md">
          <span className="font-bold text-indigo-900 block mb-1">ALGO_ENGINE: DIJKSTRA_SHORTEST_PATH</span>
          SOURCE: NODE A (SM LIPA)<br/>
          STATUS: <span className={animating ? "text-amber-600" : activeStep === steps.length - 1 ? "text-emerald-600" : "text-slate-500"}>{animating ? 'COMPUTING_RELAXATIONS...' : activeStep === steps.length - 1 ? 'OPTIMIZED_ROUTES_ESTABLISHED' : 'IDLE_WAITING_INPUT'}</span>
        </div>

        <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="xMidYMid slice">
           {EDGES.map((edge) => {
             const start = NODES.find(n => n.id === edge.from)!;
             const end = NODES.find(n => n.id === edge.to)!;
             const edgeId1 = `${edge.from}-${edge.to}`;
             const edgeId2 = `${edge.to}-${edge.from}`;
             const activeEdge = activeStep >= 0;
             const isHighlighted = activeEdge && currentStepData.highlights?.includes(edgeId1) || currentStepData.highlights?.includes(edgeId2);
             const isPath = activeEdge && currentStepData.path?.includes(edgeId1) || currentStepData.path?.includes(edgeId2);

             return (
               <g key={edgeId1}>
                 <line 
                   x1={`${start.x}%`} y1={`${start.y}%`} 
                   x2={`${end.x}%`} y2={`${end.y}%`} 
                   stroke={isPath ? "#0ea5e9" : isHighlighted ? "#f59e0b" : "#cbd5e1"} 
                   strokeWidth={isPath ? 8 : isHighlighted ? 6 : 3} 
                   className="transition-all duration-500"
                 />
                 <circle 
                   cx={`${(start.x + end.x) / 2}%`} 
                   cy={`${(start.y + end.y) / 2}%`} 
                   r="16"
                   fill="#ffffff"
                   stroke={isPath ? "#0ea5e9" : isHighlighted ? "#f59e0b" : "#94a3b8"}
                   strokeWidth={isPath || isHighlighted ? 3 : 2}
                   className="transition-all duration-500"
                 />
                 <text 
                  x={`${(start.x + end.x) / 2}%`} 
                  y={`${(start.y + end.y) / 2}%`} 
                  fill={isPath ? "#0369a1" : isHighlighted ? "#b45309" : "#475569"} 
                  fontSize="16" 
                  fontFamily="monospace"
                  textAnchor="middle"
                  dy="5"
                  className="transition-all duration-500 font-black"
                 >
                   {edge.weight}
                 </text>
               </g>
             );
           })}
        </svg>

        {/* Nodes */}
        {NODES.map(node => {
          const isVisiting = activeStep >= 0 && currentStepData.visiting === node.id;
          const dist = currentStepData.distances?.[node.id as keyof typeof currentStepData.distances];
          const isInfinity = dist === '∞';

          return (
            <div 
              key={node.id} 
              className={cn("absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20 transition-all duration-500")}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className={cn(
                "w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl font-black font-mono transition-all duration-500 shadow-xl relative",
                isVisiting ? "border-amber-400 bg-amber-50 text-amber-600 scale-125 shadow-amber-200/50" : 
                activeStep === steps.length - 1 ? "border-sky-400 bg-sky-50 text-sky-600 shadow-sky-200/50" :
                "border-indigo-200 bg-white text-indigo-700"
              )}>
                {node.id}
                {isVisiting && (
                   <span className="absolute -inset-3 border-4 border-amber-400 rounded-full animate-ping opacity-50"></span>
                )}
              </div>
              <div className="bg-white/90 px-4 py-2 border border-indigo-100 rounded-xl shadow-lg backdrop-blur-md flex flex-col items-center min-w-[130px]">
                <span className="text-sm font-bold text-slate-800 whitespace-nowrap">{node.label}</span>
                {activeStep >= 0 && (
                   <div className="mt-1.5 flex items-center gap-2 bg-indigo-50/80 px-3 py-1 rounded-md border border-indigo-100">
                     <span className="text-[11px] font-bold text-indigo-400">DIST:</span>
                     <span className={cn("text-sm font-mono font-black", !isInfinity ? "text-sky-600" : "text-slate-400")}>
                       {dist}
                     </span>
                   </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Side Panel: Controls and Explanation - Light Mode */}
      <div className="xl:w-[500px] flex flex-col gap-4 w-full h-full overflow-y-auto custom-scrollbar pr-2 pb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl flex flex-col flex-shrink-0">
          <h2 className="font-display font-black text-3xl text-slate-800 mb-6 flex items-center gap-3">
            <Route className="w-8 h-8 text-sky-500" /> Dijkstra Routing Engine
          </h2>
          
          <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 mb-6">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-widest mb-3 font-mono">Mathematical Architecture</h3>
            <div className="text-sky-700 font-mono text-center bg-white border border-sky-200 p-3 rounded-lg mb-4 text-base shadow-sm font-black">
               d(v) = min(d(v), d(u) + w(u, v))
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Dijkstra's Algorithm calculates shortest paths by traversing a graph starting from a single source node. For each unvisited neighbor <code className="text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-md font-bold">v</code> of the current node <code className="text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-md font-bold">u</code>, it performs "relaxation". If the currently known distance <code className="text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-md font-bold">d(v)</code> is larger than the distance through <code className="text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-md font-bold">u</code> (which is <code className="text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-md font-bold">d(u) + w(u,v)</code>), it updates <code className="text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-md font-bold">d(v)</code> with the new shorter distance.
            </p>
          </div>

          <div className="mb-8">
             <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-widest mb-3 font-mono">Application In LipAsenso</h3>
             <p className="text-sm text-slate-600 leading-relaxed font-medium">
               In the actual App, the edge weights <code className="text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-md font-bold">w(u,v)</code> are fluid. If a bottleneck forms (e.g. at Tambo Exit), the weight balloons. The algorithm automatically triggers the relaxation process, naturally dispersing subsequent PUV drivers to alternative parallel arteries, effectively preventing secondary traffic jams.
             </p>
          </div>

          {/* Controller */}
          <div className="flex border-t border-slate-100 pt-6 mb-6 gap-4">
             <button
               onClick={handleStart}
               disabled={animating || activeStep === steps.length - 1}
               className="flex-1 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-black py-4 text-lg rounded-xl flex justify-center items-center gap-3 transition-all shadow-lg shadow-sky-500/20 disabled:shadow-none uppercase tracking-wider font-mono disabled:border disabled:border-slate-200"
             >
               <SearchCode className="w-6 h-6" />
               {animating ? "Computing..." : "Execute Dijkstra"}
             </button>
             {(activeStep >= 0) && (
               <button
                 onClick={handleReset}
                 className="px-6 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-xl text-slate-600 transition-colors font-bold uppercase tracking-wider text-sm shadow-sm"
                 title="Reset"
               >
                 Reset
               </button>
             )}
          </div>

          {/* Ongoing Step Explanation */}
          <div className="flex-1 flex flex-col relative min-h-[160px]">
             <h3 className="font-mono text-xs text-indigo-400 uppercase tracking-widest mb-4 font-bold">Live Execution Trace</h3>
             
             <div className="space-y-4">
               {activeStep === -1 && (
                 <div className="text-slate-400 text-sm italic py-4 text-center rounded-lg border border-dashed border-slate-200 mt-2 bg-slate-50">
                   System standby. Awaiting execution command.
                 </div>
               )}
               <AnimatePresence mode="popLayout">
                 {activeStep >= 0 && (
                   <motion.div
                     key={activeStep}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="bg-white border text-left border-amber-200 border-l-4 border-l-amber-500 p-5 rounded-r-xl shadow-md"
                   >
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-[10px] bg-amber-100 text-amber-700 px-2.5 py-1 rounded-md font-mono font-bold tracking-widest">TRACE_STEP {activeStep + 1} / {steps.length}</span>
                     </div>
                     <p className="text-base text-slate-700 leading-relaxed font-mono font-bold">
                       {currentStepData.desc}
                     </p>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
          
          {/* Distance Table */}
          <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden flex-none shadow-md">
             <div className="bg-indigo-50 px-5 py-4 border-b border-indigo-100">
               <span className="text-xs font-mono text-indigo-700 uppercase tracking-widest font-bold">Shortest Distance Vector (d[v])</span>
             </div>
             <div className="grid grid-cols-6 divide-x divide-slate-100 text-center text-sm font-mono bg-white">
               {['A', 'B', 'C', 'D', 'E', 'F'].map(node => {
                 const isUpdating = activeStep > 0 && currentStepData.distances?.[node as keyof typeof currentStepData.distances] !== steps[activeStep - 1]?.distances?.[node as keyof typeof currentStepData.distances];
                 const distValue = activeStep >= 0 ? currentStepData.distances?.[node as keyof typeof currentStepData.distances] : '-';
                 
                 return (
                   <div key={node} className={cn("p-4 flex flex-col items-center transition-colors duration-500", isUpdating ? "bg-sky-50" : "")}>
                     <span className="text-slate-400 mb-2 font-bold">{node}</span>
                     <span className={cn("text-xl font-black transition-colors duration-300", isUpdating ? "text-sky-600 scale-125" : distValue === '∞' ? "text-slate-300" : "text-indigo-900")}>
                       {distValue}
                     </span>
                   </div>
                 )
               })}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
