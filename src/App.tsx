import { Activity, Route, Clock, Zap, MapPin, PlayCircle, BarChart3, Radio, Navigation, FileText, Layers, Smartphone, Home, BookOpen } from "lucide-react";
import React, { useState } from "react";
import { ConceptPaper } from "./components/ConceptPaper";
import { IntersectionSimulation } from "./components/IntersectionSimulation";
import { PathfindingSimulation } from "./components/PathfindingSimulation";
import { AlgorithmSelector } from "./components/AlgorithmSelector";
import { DriverApp } from "./components/DriverApp";
import { LandingPage } from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { ExplanationPanel } from "./components/ExplanationPanel";
import { cn } from "./lib/utils";
import "leaflet/dist/leaflet.css";

function App() {
  const [isSystemOptimizing, setIsSystemOptimizing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'landing' | 'app-demo' | 'dashboard' | 'picker' | 'simulation' | 'pathfinding' | 'concept-paper'>('landing');
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  const handleRunOptimization = () => {
    setIsSystemOptimizing(true);
    setTimeout(() => {
      setIsSystemOptimizing(false);
      setHasOptimized(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-system-bg flex flex-col font-sans transition-colors duration-500 relative">
      <ExplanationPanel 
        isOpen={isExplanationOpen} 
        onClose={() => setIsExplanationOpen(false)} 
        activeTab={activeTab} 
      />

      {/* Header Pipeline */}
      <header className="bg-system-panel border-b border-system-border px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-6">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-10 h-10 bg-system-primary/20 rounded-xl flex items-center justify-center border border-system-primary/30 group-hover:bg-system-primary/30 transition-colors">
              <Activity className="w-5 h-5 text-system-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2 group-hover:text-system-primary transition-colors">
                LipAsenso
              </h1>
              <p className="text-[10px] text-system-text-muted uppercase tracking-widest font-mono hidden sm:block">Traffic Optimization Engine</p>
            </div>
          </div>
        </div>

        {/* Global Navigation - Only show if not landing, or optionally always show. Let's always show it but subtle */}
        <div className="hidden lg:flex items-center bg-slate-800/50 p-1.5 rounded-xl border border-slate-700/50">
           <button 
             onClick={() => setActiveTab('landing')}
             className={cn("flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer", activeTab === 'landing' ? 'bg-system-panel text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5')}
           >
             <Home className="w-4 h-4" /> <span className="hidden sm:inline">Home</span>
           </button>
           <button 
             onClick={() => setActiveTab('app-demo')}
             className={cn("flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer", activeTab === 'app-demo' ? 'bg-system-panel text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5')}
           >
             <Smartphone className="w-4 h-4" /> <span className="hidden sm:inline">Driver App</span>
           </button>
           <button 
             onClick={() => setActiveTab('dashboard')}
             className={cn("flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer", activeTab === 'dashboard' ? 'bg-system-panel text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5')}
           >
             <BarChart3 className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
           </button>
           <button 
             onClick={() => setActiveTab('picker')}
             className={cn("flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer", activeTab === 'picker' || activeTab === 'simulation' || activeTab === 'pathfinding' ? 'bg-system-panel text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5')}
           >
             <Layers className="w-4 h-4" /> <span className="hidden sm:inline">Algorithms</span>
           </button>
           <button 
             onClick={() => setActiveTab('concept-paper')}
             className={cn("flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer", activeTab === 'concept-paper' ? 'bg-system-panel text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5')}
           >
             <FileText className="w-4 h-4" /> <span className="hidden sm:inline">Concept Paper</span>
           </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-4 border-r border-system-border pr-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-system-text-muted uppercase font-bold">Network</span>
              <span className="text-sm text-white">Lipa City</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsExplanationOpen(true)}
            className="flex items-center gap-2 text-emerald-400 font-bold font-sans text-sm bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2 rounded-lg transition-all border border-emerald-500/20"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">How does this work?</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full h-full">
         {activeTab === 'landing' ? (
            <LandingPage onNavigate={(tab) => setActiveTab(tab)} />
         ) : activeTab === 'app-demo' ? (
            <DriverApp />
         ) : activeTab === 'dashboard' ? (
            <Dashboard />
         ) : activeTab === 'concept-paper' ? (
            <ConceptPaper onNavigate={(tab) => setActiveTab(tab)} />
         ) : activeTab === 'picker' ? (
            <AlgorithmSelector onNavigate={(tab) => setActiveTab(tab)} />
         ) : activeTab === 'simulation' ? (
            <IntersectionSimulation />
         ) : activeTab === 'pathfinding' ? (
            <PathfindingSimulation />
         ) : null}
      </main>

    </div>
  );
}

export default App;
