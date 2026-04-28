import React, { useState } from "react";
import { Activity, Route, Clock, Zap, Lock, ScanLine, Camera, Users, LogIn, Shield } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { HistoricalChart } from "./HistoricalChart";
import { OptimizationLog } from "./OptimizationLog";
import { TrafficMap } from "./TrafficMap";
import { AdaptiveSignals } from "./AdaptiveSignals";
import { TrafficHotspots } from "./TrafficHotspots";
import { LaneMetrics } from "./LaneMetrics";
import { GreedyAlgorithmScores } from "./GreedyAlgorithmScores";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export default function Dashboard() {
  const [isSystemOptimizing, setIsSystemOptimizing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("lgu") || email.includes("admin")) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid LGU credentials. (Hint: use an email with 'lgu' or 'admin')");
    }
  };

  const handleRunOptimization = () => {
    setIsSystemOptimizing(true);
    setTimeout(() => {
      setIsSystemOptimizing(false);
      setHasOptimized(true);
    }, 2500);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Shield className="w-48 h-48 text-indigo-500" />
          </div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
               <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-display font-black text-white tracking-tight">LGU Portal</h2>
            <p className="text-slate-400 mt-2 text-sm font-medium">Lipa City Traffic Management Center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider mb-2 block">Official Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="official@lgu-lipa.gov.ph"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                required
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider mb-2 block">Secure Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}
            
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2 mt-6">
               <LogIn className="w-5 h-5" /> Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      
      {/* Dashboard Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
         <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               <Activity className="w-5 h-5 text-indigo-400" /> 
               LGU Traffic Operations Center
            </h2>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">Live monitoring • Lipa City</p>
         </div>

         <div className="flex items-center gap-4">
             <button
              onClick={handleRunOptimization}
              disabled={isSystemOptimizing}
              className={cn(
                "px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all min-w-[200px]",
                isSystemOptimizing 
                  ? "bg-system-bg border border-system-border text-system-primary" 
                  : "bg-system-primary hover:bg-indigo-400 text-slate-900 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              )}
            >
              {isSystemOptimizing ? (
                <>
                  <Activity className="w-5 h-5 animate-pulse" />
                  Optimizing City Grid...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Run Global Optimization
                </>
              )}
            </button>
         </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 flex-none">
        <MetricCard 
          title="Active Vehicles" 
          value="12,450" 
          icon={Activity} 
          trend="14%" 
          trendUp={true} 
          className="col-span-1"
        />
        <MetricCard 
          title="Avg. Wait Time Reduction" 
          value={hasOptimized ? "42%" : "34%"} 
          icon={Clock} 
          trend={hasOptimized ? "8%" : "2%"} 
          trendUp={true} 
          className="col-span-1 transition-all duration-1000"
        />
        <MetricCard 
          title="YOLO Live Cameras" 
          value="12 / 12" 
          icon={Camera} 
          className="col-span-1 transition-all duration-1000 text-sky-400"
        />
        <MetricCard 
          title="Routes Optimized" 
          value={hasOptimized ? "1.5M" : "1.2M"} 
          icon={Route} 
          trend={hasOptimized ? "300k" : "18k"} 
          trendUp={true} 
          className="col-span-1 transition-all duration-1000"
        />
      </div>

      {/* Second Row - Hotspots, YOLO Feed, and Lane Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TrafficHotspots className="lg:col-span-1 h-[500px]" />
        <YoloCameraViewer className="lg:col-span-1 h-[500px]" />
        <LaneMetrics className="lg:col-span-1 h-[500px]" />
      </div>

      {/* Third Row - Greedy Algorithm Scores */}
      <div className="grid grid-cols-1 gap-6">
        <GreedyAlgorithmScores className="h-[400px]" />
      </div>

      {/* Fourth Row - Adaptive Signals */}
      <div className="grid grid-cols-1 gap-6">
        <AdaptiveSignals className="h-[400px]" />
      </div>

      {/* Fifth Row - Historical Chart */}
      <div className="grid grid-cols-1 gap-6">
        <HistoricalChart className="h-[350px]" isOptimizing={isSystemOptimizing} />
      </div>

      {/* Sixth Row - Optimization Log */}
      <div className="grid grid-cols-1 gap-6">
        <OptimizationLog className="h-[400px]" isOptimizing={isSystemOptimizing} />
      </div>
    </div>
  );
}

// Inline YOLO Camera Viewer component for the dashboard
function YoloCameraViewer({ className }: { className?: string }) {
   const [feed, setFeed] = useState<'poblacion' | 'tambo' | 'smlipa'>('poblacion');

   return (
      <div className={cn("bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-xl", className)}>
         <div className="flex justify-between items-center mb-4 relative z-10">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-sky-400" /> YOLO Intersection Feed
            </h3>
            <div className="flex gap-2">
               <button onClick={() => setFeed('poblacion')} className={cn("text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded transition-colors", feed === 'poblacion' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700')}>Poblacion</button>
               <button onClick={() => setFeed('tambo')} className={cn("text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded transition-colors", feed === 'tambo' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700')}>Tambo Exit</button>
            </div>
         </div>

         <div className="flex-1 rounded-xl overflow-hidden relative group border border-slate-800" style={{backgroundImage: 'url(/intersection-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            {/* Simulated Live Camera Effect overlay */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none z-20" />
            
            {/* Overlay to darken the background and add contrast */}
            <div className="absolute inset-0 bg-black/30 z-0" />

            {/* Simulated YOLO Bounding Boxes overlay */}
            <div className="absolute inset-0 z-10 mix-blend-screen p-4">
               {/* Just random animated boxes to simulate YOLO detection */}
               {feed === 'poblacion' && (
                  <>
                     <motion.div animate={{ x: [0, 20, -10, 0], y: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} className="absolute top-1/4 left-1/4 w-16 h-12 border border-green-500 bg-green-500/10 rounded-sm">
                        <span className="absolute -top-4 left-0 text-[8px] bg-green-500 text-black font-bold px-1 rounded-sm tracking-wider">CAR 0.92</span>
                     </motion.div>
                     <motion.div animate={{ x: [0, -30, 20, 0], y: [0, 10, -5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'linear' }} className="absolute top-1/2 left-2/3 w-20 h-16 border border-green-500 bg-green-500/10 rounded-sm">
                        <span className="absolute -top-4 left-0 text-[8px] bg-green-500 text-black font-bold px-1 rounded-sm tracking-wider">TRUCK 0.88</span>
                     </motion.div>
                  </>
               )}
               {feed === 'tambo' && (
                  <>
                     <motion.div animate={{ x: [0, 50, 0], y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} className="absolute bottom-1/4 right-1/4 w-12 h-10 border border-yellow-500 bg-yellow-500/10 rounded-sm">
                        <span className="absolute -top-4 left-0 text-[8px] bg-yellow-500 text-black font-bold px-1 rounded-sm tracking-wider">CAR 0.85</span>
                     </motion.div>
                  </>
               )}
            </div>

            <div className="absolute top-2 left-2 flex items-center gap-2 z-30">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]" />
               <span className="text-[10px] font-mono text-white text-shadow uppercase">LIVE REC</span>
            </div>
            
            <div className="absolute bottom-2 left-2 z-30 text-[10px] font-mono text-sky-400 bg-black/60 px-2 py-1 rounded backdrop-blur border border-sky-400/20">
               YOLOv8 Det: {feed === 'poblacion' ? '42 objs' : '15 objs'} / 30fps
            </div>
         </div>
      </div>
   );
}
