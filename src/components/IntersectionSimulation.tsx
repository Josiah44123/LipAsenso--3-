import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { Hand, Info, Zap, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Lane = 'N' | 'S' | 'E' | 'W';

const TopDownCar = ({ lane }: { lane: Lane }) => {
  const isHorizontal = lane === 'E' || lane === 'W';
  const color = lane === 'N' ? 'bg-indigo-500' : lane === 'S' ? 'bg-sky-500' : lane === 'E' ? 'bg-rose-500' : 'bg-amber-500';

  if (isHorizontal) {
    // E (Eastbound: left to right) -> Headlights on the right
    // W (Westbound: right to left) -> Headlights on the left
    return (
      <div className={cn("w-12 h-6 shadow-[0_4px_10px_rgba(0,0,0,0.3)] rounded-md relative flex items-center justify-between p-1 shrink-0", color, lane === 'W' ? 'flex-row-reverse' : 'flex-row')}>
        <div className="w-1.5 h-full bg-black/40 rounded-sm"></div>
        <div className="flex-1 h-3 mx-0.5 bg-white/20 rounded-sm"></div>
        <div className="w-2 h-full bg-black/40 rounded-sm"></div>
        
        {/* Headlights */}
        <div className={cn("absolute top-0.5 w-1 h-1 bg-yellow-100 rounded-full shadow-[0_0_5px_rgba(253,224,71,0.9)]", lane === 'E' ? '-right-0.5' : '-left-0.5')}></div>
        <div className={cn("absolute bottom-0.5 w-1 h-1 bg-yellow-100 rounded-full shadow-[0_0_5px_rgba(253,224,71,0.9)]", lane === 'E' ? '-right-0.5' : '-left-0.5')}></div>
        
        {/* Taillights */}
        <div className={cn("absolute top-1 w-0.5 h-1 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.9)]", lane === 'E' ? '-left-0.5' : '-right-0.5')}></div>
        <div className={cn("absolute bottom-1 w-0.5 h-1 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.9)]", lane === 'E' ? '-left-0.5' : '-right-0.5')}></div>
      </div>
    );
  }

  // Vertical (N/S)
  // N (Northbound: bottom to top) -> Headlights on the top
  // S (Southbound: top to bottom) -> Headlights on the bottom
  return (
    <div className={cn("w-6 h-12 shadow-[0_4px_10px_rgba(0,0,0,0.3)] rounded-md relative flex flex-col justify-between p-1 shrink-0", color, lane === 'N' ? 'flex-col-reverse' : 'flex-col')}>
       <div className="w-full h-1.5 bg-black/40 rounded-sm"></div>
       <div className="flex-1 w-3 mx-auto my-0.5 bg-white/20 rounded-sm"></div>
       <div className="w-full h-2 bg-black/40 rounded-sm"></div>
       
       {/* Headlights */}
       <div className={cn("absolute left-0.5 w-1 h-1 bg-yellow-100 rounded-full shadow-[0_0_5px_rgba(253,224,71,0.9)]", lane === 'N' ? '-top-0.5' : '-bottom-0.5')}></div>
       <div className={cn("absolute right-0.5 w-1 h-1 bg-yellow-100 rounded-full shadow-[0_0_5px_rgba(253,224,71,0.9)]", lane === 'N' ? '-top-0.5' : '-bottom-0.5')}></div>
       
       {/* Taillights */}
       <div className={cn("absolute left-1 w-1 h-0.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.9)]", lane === 'N' ? '-bottom-0.5' : '-top-0.5')}></div>
       <div className={cn("absolute right-1 w-1 h-0.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.9)]", lane === 'N' ? '-bottom-0.5' : '-top-0.5')}></div>
    </div>
  );
};

function DensityOverlay({ count, max, direction }: { count: number, max: number, direction: 'N'|'S'|'E'|'W' }) {
  const isMax = count === max && count > 0;
  return (
    <div className={cn("absolute z-40 bg-white border border-slate-200 shadow-xl rounded-lg px-2 py-1 font-mono text-xs tracking-widest flex items-center gap-1.5 transition-all", isMax ? "border-amber-400 bg-amber-50 ring-2 ring-amber-400/50 scale-110" : "scale-100", direction === 'N' ? "-top-8 -translate-x-1/2 left-1/2" : direction === 'S' ? "-bottom-8 -translate-x-1/2 left-1/2" : direction === 'E' ? "-left-16 -translate-y-1/2 top-1/2" : "-right-16 -translate-y-1/2 top-1/2")}>
       <span className={cn("font-black", isMax ? "text-amber-600 font-bold" : "text-slate-800")}>{count}</span>
       {isMax && <Zap className="w-3 h-3 text-amber-500" />}
    </div>
  );
}

const getCarAnimation = (lane: Lane, turn: 'straight' | 'left' | 'right') => {
  let x: number[] = [], y: number[] = [], rotate: number[] = [], times = [0, 0.4, 0.5, 0.6, 1.0];
  
  if (lane === 'S') {
    if (turn === 'right') {
       x = [-60, -60,  -90, -120, -300];
       y = [-300,-120, -90, -60,  -60];
       rotate = [0, 0, 45, 90, 90];
    } else if (turn === 'left') {
       x = [-60, -60,  0, 60, 300];
       y = [-300,-60,  0, 60, 60];
       rotate = [0, 0, -45, -90, -90];
    } else {
       x = [-60, -60, -60]; y = [-300, 0, 300]; rotate = [0,0,0]; times = [0, 0.5, 1];
    }
  } else if (lane === 'N') {
    if (turn === 'right') {
       x = [60,  60,  90, 120, 300];
       y = [300, 120, 90, 60,  60];
       rotate = [0, 0, 45, 90, 90];
    } else if (turn === 'left') {
       x = [60,  60,  0, -60, -300];
       y = [300, 60,  0, -60, -60];
       rotate = [0, 0, -45, -90, -90];
    } else {
       x = [60, 60, 60]; y = [300, 0, -300]; rotate = [0,0,0]; times = [0, 0.5, 1];
    }
  } else if (lane === 'E') {
    if (turn === 'right') {
       x = [-300,-120,-90, -60, -60];
       y = [60,  60,   90,  120, 300];
       rotate = [0, 0, 45, 90, 90];
    } else if (turn === 'left') {
       x = [-300,-60, 0, 60, 60];
       y = [60,  60,  0, -60, -300];
       rotate = [0, 0, -45, -90, -90];
    } else {
       x = [-300, 0, 300]; y = [60, 60, 60]; rotate = [0,0,0]; times = [0, 0.5, 1];
    }
  } else if (lane === 'W') {
    if (turn === 'right') {
       x = [300, 120, 90, 60, 60];
       y = [-60, -60, -90,-120,-300];
       rotate = [0, 0, 45, 90, 90];
    } else if (turn === 'left') {
       x = [300, 60, 0, -60, -60];
       y = [-60, -60, 0, 60, 300];
       rotate = [0, 0, -45, -90, -90];
    } else {
       x = [300, 0, -300]; y = [-60, -60, -60]; rotate = [0,0,0]; times = [0, 0.5, 1];
    }
  }

  const initial = { x: x[0], y: y[0], rotate: rotate[0] };
  return { 
     initial, 
     animate: { x, y, rotate }, 
     transition: { duration: 1.5, ease: "linear", times } 
  };
};

const CrossingCarBox: React.FC<{ car: {id: number; lane: Lane; startTime: number, turnDirection: 'straight' | 'left' | 'right'} }> = ({ car }) => {
  const anim = getCarAnimation(car.lane, car.turnDirection);

  return (
    <div className="absolute left-1/2 top-1/2 z-30">
      <motion.div
        initial={anim.initial}
        animate={anim.animate}
        transition={anim.transition as any}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <TopDownCar lane={car.lane} />
      </motion.div>
    </div>
  );
};

export function IntersectionSimulation() {
  const nextIdRef = useRef(15);
  const queuesRef = useRef<Record<Lane, {id: number}[]>>({ 
    N: [{id: 1}, {id: 2}, {id: 3}, {id: 4}], 
    S: [{id: 5}, {id: 6}], 
    E: [{id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}], 
    W: [{id: 14}] 
  });
  const [queues, setQueues] = useState(queuesRef.current);
  
  const lightRef = useRef<{ active: Lane, color: 'green' | 'yellow' }>({ active: 'E', color: 'green' });
  const [light, setLight] = useState(lightRef.current);

  const statsRef = useRef({ processed: 0, greedySwitches: 0 });
  const [stats, setStats] = useState(statsRef.current);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [algoLog, setAlgoLog] = useState<string[]>(["[SYSTEM_INIT] Greedy dynamic polling activated."]);

  const crossingCarsRef = useRef<{id: number, lane: Lane, startTime: number, turnDirection: 'straight' | 'left' | 'right'}[]>([]);
  const [crossingCars, setCrossingCars] = useState<{id: number, lane: Lane, startTime: number, turnDirection: 'straight' | 'left' | 'right'}[]>([]);

  const addLog = (msg: string) => setAlgoLog(prev => [msg, ...prev].slice(0, 5));

  const getMax = () => Math.max(queues.N.length, queues.S.length, queues.E.length, queues.W.length);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      crossingCarsRef.current = crossingCarsRef.current.filter(c => now - c.startTime < 1500);

      // Simulate waiting time increases
      (Object.keys(queuesRef.current) as Lane[]).forEach(lane => {
         queuesRef.current[lane].forEach(car => {
            car.wait = (car.wait || 0) + 1;
         });
      });

      if (lightRef.current.color === 'green') {
        const active = lightRef.current.active;
        
        if (queuesRef.current[active].length > 0) {
          const removed = queuesRef.current[active].shift();
          if (removed) {
             const r = Math.random();
             const turnDirection = r < 0.2 ? 'left' : r < 0.4 ? 'right' : 'straight';
             crossingCarsRef.current.push({ id: removed.id, lane: active, startTime: Date.now(), turnDirection });
          }
          statsRef.current.processed += 1;
        }

        let maxPoints = -1;
        let maxLane = active;
        
        (Object.entries(queuesRef.current) as [Lane, {id: number, wait?: number}[]][]).forEach(([lane, arr]) => {
          let waitSum = 0;
          arr.forEach(c => waitSum += (c.wait || 0));
          const numQueued = arr.length;
          // Greedy points: queued + waitSum
          const points = (numQueued * 10) + waitSum; 
          
          if (points > maxPoints) { 
             maxPoints = points; 
             maxLane = lane; 
          }
        });

        // Determine points for current active lane
        let activeWaitSum = 0;
        queuesRef.current[active].forEach(c => activeWaitSum += (c.wait || 0));
        const activePoints = (queuesRef.current[active].length * 10) + activeWaitSum;

        const shouldSwitch = (maxLane !== active) && 
          ((maxPoints > activePoints + 20) || (queuesRef.current[active].length === 0 && maxPoints > 0));

        if (shouldSwitch) {
           addLog(`[GREEDY_TRIGGER] Point system favored ${maxLane} phase (${maxPoints} pts) vs active (${activePoints} pts). Switching...`);
           lightRef.current = { active: active, color: 'yellow' };
           statsRef.current.greedySwitches += 1;
           setLight({...lightRef.current});
           setTimeout(() => {
               addLog(`[SIGNAL_ACTIVE] Green light assigned to Lane ${maxLane} to clear bottleneck.`);
               lightRef.current = { active: maxLane, color: 'green' };
               setLight({...lightRef.current});
           }, 1500);
        }

        setQueues({...queuesRef.current});
        setStats({...statsRef.current});
      } else {
        const now2 = Date.now();
        crossingCarsRef.current = crossingCarsRef.current.filter(c => now2 - c.startTime < 1500);
      }
      setCrossingCars([...crossingCarsRef.current]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddCar = (lane: Lane, amount: number = 1) => {
    for(let i=0; i<amount; i++) queuesRef.current[lane].push({id: nextIdRef.current++});
    setQueues({...queuesRef.current});
    addLog(`[SENSOR] Vehicle added to queue ${lane}.`);
  };

  const handleDrop = (e: React.DragEvent, lane: Lane) => {
    e.preventDefault();
    if (e.dataTransfer.getData("type") === "car") {
      handleAddCar(lane);
      setDraggedItem(null);
    }
  };

  const LightIndicator = ({ lane, orientation }: { lane: Lane, orientation: string }) => {
    const isActive = light.active === lane;
    const isGreen = isActive && light.color === 'green';
    const isYellow = isActive && light.color === 'yellow';
    const isRed = !isActive;

    return (
      <div className={cn("flex bg-slate-900 px-2 py-2 rounded-xl border-2 border-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.6)] z-50 gap-2 relative", orientation)}>
        <div className={cn("w-5 h-5 rounded-full", isRed ? "bg-red-500 shadow-[0_0_20px_2px_rgba(239,68,68,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] border-2 border-red-300 ring-2 ring-red-500/50" : "bg-red-950/50 border-2 border-slate-800")} />
        <div className={cn("w-5 h-5 rounded-full", isYellow ? "bg-amber-400 shadow-[0_0_20px_2px_rgba(251,191,36,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] border-2 border-amber-200 ring-2 ring-amber-400/50" : "bg-amber-950/50 border-2 border-slate-800")} />
        <div className={cn("w-5 h-5 rounded-full", isGreen ? "bg-emerald-400 shadow-[0_0_20px_2px_rgba(52,211,153,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] border-2 border-emerald-200 ring-2 ring-emerald-400/50" : "bg-emerald-950/50 border-2 border-slate-800")} />
      </div>
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full animate-in fade-in duration-500 min-h-[700px]">
      
      <div className="flex-1 bg-slate-100 rounded-3xl border border-slate-200 relative flex items-center justify-center overflow-hidden min-h-[600px] shadow-2xl">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px]"></div>

        <div className="absolute top-6 left-6 bg-white/90 px-5 py-3 rounded-xl text-sm text-indigo-700 font-mono z-30 shadow-lg border border-indigo-100 backdrop-blur-md">
          <span className="font-black text-indigo-900 text-base">ALGO: GREEDY_MAX_DENSITY</span><br/>
          TICK_RATE: <span className="font-bold text-sky-600">1.0/s</span>
        </div>

        <div className="absolute w-[240px] h-full bg-slate-400 flex shadow-inner border-l-4 border-r-4 border-slate-500">
          <div className="flex-1 border-r-2 border-dashed border-white/50 h-full relative"
               onDragOver={(e) => { e.preventDefault(); setDraggedItem('S'); }}
               onDragLeave={() => setDraggedItem(null)}
               onDrop={(e) => handleDrop(e, 'S')}
               onClick={() => handleAddCar('S')}
               title="Click to add car">
               <DensityOverlay count={queues.S.length} max={getMax()} direction="S" />
               <div className="absolute bottom-[calc(50%+120px)] w-full flex flex-col-reverse items-center gap-3 p-2">
                 <AnimatePresence>
                   {queues.S.slice(0, 7).map((car) => (
                     <motion.div key={car.id} layout initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, transition: {duration: 0.1} }} transition={{ duration: 0.3 }}>
                       <TopDownCar lane="S" />
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 {queues.S.length > 7 && <div className="bg-white text-sky-600 font-bold px-3 py-1 rounded-full text-xs font-mono shadow">+{queues.S.length - 7} more</div>}
               </div>
               {draggedItem === 'S' && <div className="absolute inset-0 bg-sky-500/20 backdrop-blur-sm transition-all"/>}
          </div>
          <div className="flex-1 h-full relative" 
               onDragOver={(e) => { e.preventDefault(); setDraggedItem('N'); }}
               onDragLeave={() => setDraggedItem(null)}
               onDrop={(e) => handleDrop(e, 'N')}
               onClick={() => handleAddCar('N')}
               title="Click to add car">
               <DensityOverlay count={queues.N.length} max={getMax()} direction="N" />
               <div className="absolute top-[calc(50%+120px)] w-full flex flex-col items-center gap-3 p-2">
                 <AnimatePresence>
                   {queues.N.slice(0, 7).map((car) => (
                     <motion.div key={car.id} layout initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, transition: {duration: 0.1} }} transition={{ duration: 0.3 }}>
                       <TopDownCar lane="N" />
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 {queues.N.length > 7 && <div className="bg-white text-indigo-600 font-bold px-3 py-1 rounded-full text-xs font-mono shadow">+{queues.N.length - 7} more</div>}
               </div>
               {draggedItem === 'N' && <div className="absolute inset-0 bg-indigo-500/20 backdrop-blur-sm transition-all"/>}
          </div>
        </div>

        <div className="absolute h-[240px] w-full bg-slate-400 flex flex-col shadow-inner border-t-4 border-b-4 border-slate-500 pointer-events-none">
          <div className="flex-1 border-b-2 border-dashed border-white/50 w-full relative pointer-events-auto"
               onDragOver={(e) => { e.preventDefault(); setDraggedItem('W'); }}
               onDragLeave={() => setDraggedItem(null)}
               onDrop={(e) => handleDrop(e, 'W')}
               onClick={() => handleAddCar('W')}
               title="Click to add car">
               <DensityOverlay count={queues.W.length} max={getMax()} direction="W" />
               <div className="absolute left-[calc(50%+120px)] h-full flex flex-row-reverse items-center justify-end gap-3 pl-4">
                 <AnimatePresence>
                   {queues.W.slice(0, 6).map((car) => (
                     <motion.div key={car.id} layout initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, transition: {duration: 0.1} }} transition={{ duration: 0.3 }}>
                       <TopDownCar lane="W" />
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 {queues.W.length > 6 && <div className="bg-white text-amber-600 font-bold px-3 py-1 rounded-full text-xs font-mono shadow mr-2">+{queues.W.length - 6}</div>}
               </div>
               {draggedItem === 'W' && <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-sm transition-all"/>}
          </div>
          <div className="flex-1 w-full relative pointer-events-auto"
               onDragOver={(e) => { e.preventDefault(); setDraggedItem('E'); }}
               onDragLeave={() => setDraggedItem(null)}
               onDrop={(e) => handleDrop(e, 'E')}
               onClick={() => handleAddCar('E')}
               title="Click to add car">
               <DensityOverlay count={queues.E.length} max={getMax()} direction="E" />
               <div className="absolute right-[calc(50%+120px)] h-full flex flex-row items-center justify-end gap-3 pr-4">
                 <AnimatePresence>
                   {queues.E.slice(0, 6).map((car) => (
                     <motion.div key={car.id} layout initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, transition: {duration: 0.1} }} transition={{ duration: 0.3 }}>
                       <TopDownCar lane="E" />
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 {queues.E.length > 6 && <div className="bg-white text-rose-600 font-bold px-3 py-1 rounded-full text-xs font-mono shadow ml-2">+{queues.E.length - 6}</div>}
               </div>
               {draggedItem === 'E' && <div className="absolute inset-0 bg-rose-500/20 backdrop-blur-sm transition-all"/>}
          </div>
        </div>

        <div className="absolute w-[240px] h-[240px] pointer-events-none z-10 flex items-center justify-center">
            {/* The Intersection box itself */}
            <div className="w-[240px] h-[240px] border-4 border-slate-600/20 absolute flex items-center justify-center bg-slate-400">
                <div className="w-16 h-16 bg-amber-400/20 rotate-45 border-4 border-amber-400/40 outline outline-4 outline-offset-4 outline-amber-400/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
            </div>
            
            {/* Crossing Cars inside intersection */}
            <AnimatePresence>
               {crossingCars.map(car => (
                 <CrossingCarBox key={'cross-'+car.id} car={car} />
               ))}
            </AnimatePresence>
            
            {/* Traffic Lights mounted cleanly on the intersection corners */}
            {/* S lane (coming down) */}
            <div className="absolute top-[calc(50%-150px)] left-[calc(50%-60px)] -translate-x-1/2 z-40">
                <LightIndicator lane="S" orientation="flex-row" />
            </div>
            {/* N lane (coming up) */}
            <div className="absolute bottom-[calc(50%-150px)] left-[calc(50%+60px)] -translate-x-1/2 z-40">
                <LightIndicator lane="N" orientation="flex-row-reverse" />
            </div>
            {/* E lane (going right) */}
            <div className="absolute top-[calc(50%+60px)] left-[calc(50%-150px)] -translate-y-1/2 z-40">
                <LightIndicator lane="E" orientation="flex-col-reverse" />
            </div>
            {/* W lane (going left) */}
            <div className="absolute top-[calc(50%-60px)] right-[calc(50%-150px)] -translate-y-1/2 z-40">
                <LightIndicator lane="W" orientation="flex-col" />
            </div>
        </div>
      </div>

      <div className="xl:w-[480px] flex flex-col gap-6 w-full">
        <div className="bg-white border text-left border-slate-200 rounded-2xl shadow-xl flex flex-col overflow-hidden h-72">
           <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100 flex items-center gap-3">
              <Terminal className="w-5 h-5 text-indigo-600" />
              <h3 className="font-mono text-base font-black text-indigo-900 uppercase">Algorithm Log</h3>
           </div>
           <div className="p-5 flex flex-col gap-3 overflow-y-auto font-mono text-sm custom-scrollbar bg-slate-50 flex-1">
              <AnimatePresence>
                 {algoLog.map((log, idx) => (
                    <motion.div layout initial={{opacity: 0, x: -10}} animate={{opacity: idx === 0 ? 1 : 0.6, x: 0}} key={log + idx} className={cn("flex gap-2 font-bold", log.includes("GREEDY") ? "text-amber-600" : log.includes("SIGNAL") ? "text-emerald-600" : "text-slate-500")}>
                       <span className="opacity-50">›</span> {log}
                    </motion.div>
                 ))}
               </AnimatePresence>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          <h2 className="font-display font-black text-2xl text-slate-800 mb-3 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500" /> Greedy Adaptive Timing
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
            The light dynamically assigns "green" to the lane with the highest density. Watch the cars—if one lane builds up past a threshold, the system intelligently pre-empts the active lane to prevent starvation.
          </p>

          <div className="grid grid-cols-2 gap-5 mb-8">
             <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
               <span className="text-3xl font-mono font-black text-emerald-600">{stats.processed}</span>
               <span className="text-[10px] uppercase text-emerald-800 font-bold mt-1 tracking-widest">Cleared</span>
             </div>
             <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
               <span className="text-3xl font-mono font-black text-sky-600">{stats.greedySwitches}</span>
               <span className="text-[10px] uppercase text-sky-800 font-bold mt-1 tracking-widest">Adaptations</span>
             </div>
          </div>

          <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-6 text-center">
             <p className="text-sm text-indigo-700 font-bold mb-4 flex items-center justify-center gap-2">
                <Hand className="w-4 h-4" /> Drag the token below entirely into a lane's road area to spawn traffic!
             </p>
             <div 
              draggable 
              onDragStart={(e) => {
                e.dataTransfer.setData("type", "car");
              }}
              onDragEnd={() => setDraggedItem(null)}
              className="bg-white border-2 border-dashed border-indigo-300 rounded-xl py-3 px-6 inline-flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:bg-slate-50 transition-colors shadow-sm mx-auto"
            >
              <div className="w-8 h-12 bg-indigo-500 rounded p-1 mb-2 shadow-md flex flex-col justify-between">
                 <div className="w-full h-2 bg-black/30 rounded-sm"></div>
                 <div className="w-full h-1.5 bg-black/30 rounded-sm"></div>
              </div>
              <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Spawner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
