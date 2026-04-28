import React, { useState } from 'react';
import { Network, SearchCode, Megaphone, ArrowRight, Smartphone, BarChart3, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface Props {
  onNavigate: (tab: 'app-demo' | 'dashboard' | 'picker' | 'simulation' | 'pathfinding' | 'concept-paper') => void;
}

export function LandingPage({ onNavigate }: Props) {
  return (
    <div className="flex-1 flex flex-col w-full animate-in fade-in duration-500 overflow-y-auto">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 w-full flex items-center justify-center overflow-hidden" style={{backgroundImage: 'url(/intersection-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
        
        {/* Content over hero */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-sm font-bold mb-6 border border-indigo-500/30 backdrop-blur-sm">
            <Network className="w-4 h-4" />
            ALGOCOM PROPOSAL
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tight mb-4 leading-tight drop-shadow-lg">
            LipAsenso<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Traffic Intelligence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-md">
            Smart city traffic optimization powered by AI-driven insights and real-time monitoring
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col items-center justify-start p-8 md:p-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Select Your Role</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Choose how you&apos;d like to interact with our traffic optimization platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Driver Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => onNavigate('app-demo')}
            className="group cursor-pointer bg-slate-800/80 backdrop-blur border border-slate-700 hover:border-indigo-400 rounded-3xl p-8 flex flex-col items-start transition-all shadow-2xl hover:shadow-indigo-500/30"
          >
            <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-indigo-500/30">
               <Smartphone className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Driver App</h2>
            <p className="text-slate-400 font-medium mb-8 flex-1">
               Experience the modern driver application. Search routes, avoid congestion, and view real-time traffic mapping in your city.
            </p>
            <div className="text-indigo-400 font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Open App Demo <ArrowRight className="w-5 h-5" />
            </div>
          </motion.div>

          {/* LGU / Traffic Engineer Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => onNavigate('dashboard')}
            className="group cursor-pointer bg-slate-800/80 backdrop-blur border border-slate-700 hover:border-amber-400 rounded-3xl p-8 flex flex-col items-start transition-all shadow-2xl hover:shadow-amber-500/30"
          >
            <div className="w-14 h-14 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-amber-500/30">
               <BarChart3 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">LGU Dashboard</h2>
            <p className="text-slate-400 font-medium mb-8 flex-1">
               Access the LGU portal to view real-time traffic analysis, live camera feeds, historical data, and optimize city traffic flow.
            </p>
            <div className="text-amber-400 font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              View Dashboard <ArrowRight className="w-5 h-5" />
            </div>
          </motion.div>

          {/* Algorithm Card */}
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => onNavigate('picker')}
            className="group cursor-pointer bg-slate-800/80 backdrop-blur border border-slate-700 hover:border-sky-400 rounded-3xl p-8 flex flex-col items-start transition-all shadow-2xl hover:shadow-sky-500/30"
          >
            <div className="w-14 h-14 bg-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-sky-500/30">
               <SearchCode className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Algorithm Visualizer</h2>
            <p className="text-slate-400 font-medium mb-8 flex-1">
               Visualize how Dijkstra's pathfinding and YOLO/Greedy adaptive traffic algorithms resolve bottlenecks in real-time.
            </p>
            <div className="text-sky-400 font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              View Algorithms <ArrowRight className="w-5 h-5" />
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
