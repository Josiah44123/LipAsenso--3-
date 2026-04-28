import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, SearchCode, Zap, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
}

export function ExplanationPanel({ isOpen, onClose, activeTab }: Props) {
  // Define content based on the active tab
  const getContent = () => {
    switch (activeTab) {
      case 'app-demo':
        return {
          title: "Commuter Web App Integration",
          icon: <MapPin className="w-5 h-5 text-indigo-500" />,
          sections: [
            {
              heading: "Problem Addressed",
              text: "As stated in the concept paper, arbitrary roadside stops and commuter uncertainty lead to heavy traffic and congestion in Lipa City."
            },
            {
              heading: "Dynamic Loading Zones",
              text: "Instead of flagging down PUVs anywhere, the app directs users to specific 'Loading Zones' (e.g., SM Lipa Terminal, Puregold). This formalizes stops, preventing random blockages on main arteries like Ayala Highway."
            },
            {
              heading: "Load-Balanced Routing Feedback",
              text: "While commuters see a simple map, the backend uses Dijkstra's algorithm to actively distribute PUV drivers across parallel routes, balancing the traffic load dynamically."
            }
          ]
        };
      case 'simulation':
        return {
          title: "Adaptive Hub (Greedy Logic)",
          icon: <Zap className="w-5 h-5 text-amber-500" />,
          sections: [
            {
              heading: "The Traffic Light Bottleneck",
              text: "In Section B (Specific Problems), fixed-timer traffic lights often cause starvation—green lights for empty lanes while heavy lanes wait endlessly."
            },
            {
              heading: "Greedy Max-Density Algorithm",
              text: "This visualization shows the Greedy Algorithm in action. It actively polls the density of each lane and dynamically assigns standard 'green' time to the heaviest queue."
            },
            {
              heading: "LGU Dashboard Context",
              text: "Traffic enforcers can view this live metric. If a node repeatedly triggers adaptive switches excessively, it's flagged by Kruskal's MST for permanent structural widening."
            }
          ]
        };
      case 'pathfinding':
        return {
          title: "Dijkstra Routing Engine",
          icon: <SearchCode className="w-5 h-5 text-sky-500" />,
          sections: [
            {
              heading: "Network Modeling",
              text: "LipaAsenso models Lipa City (from Poblacion to LIMA) as a directed, weighted graph. Intersections are nodes, and road segments are edges."
            },
            {
              heading: "Dynamic Edge Weights",
              text: "Instead of fixed distances, edge weights represent 'travel time'. If an accident blocks Tambo Exit, its edge weight balloons to near infinity."
            },
            {
              heading: "Mathematical Resolution",
              text: "The algorithm performs 'relaxation' across all nodes—instantly finding alternative paths with lower aggregate weights, naturally routing PUVs into parallel arteries."
            }
          ]
        };
      case 'dashboard':
      case 'picker':
      default:
        return {
          title: "Underlying Concepts",
          icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
          sections: [
            {
              heading: "Algocom Application",
              text: "This system demonstrates the practical implementation of Graph Theory and Greedy Algorithms applied to Lipa City's real-world traffic issues."
            },
            {
              heading: "Role-Based Features",
              text: "Use the UI to switch between commuter-facing features and backend algorithmic processing tools intended for city planners."
            }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[9998] lg:hidden"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-[72px] bottom-0 w-80 lg:w-96 bg-white border-l border-slate-200 shadow-2xl z-[9999] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
               <div className="flex items-center gap-3">
                 <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                    {content.icon}
                 </div>
                 <h2 className="font-bold text-slate-800 tracking-tight">Concept Link</h2>
               </div>
               <button 
                 onClick={onClose}
                 className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 hover:text-slate-700"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
               <div>
                  <h3 className="text-xl font-display font-black text-slate-800 mb-2 leading-tight">
                     {content.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">Implementation Analysis</p>
               </div>

               <div className="space-y-6">
                 {content.sections.map((section, idx) => (
                    <div key={idx} className="relative">
                       {idx !== content.sections.length - 1 && (
                         <div className="absolute left-2.5 top-8 bottom-[-24px] w-px bg-slate-100"></div>
                       )}
                       <div className="flex gap-4">
                          <div className="w-5 h-5 rounded-full bg-indigo-50 border-2 border-indigo-200 shrink-0 mt-1 flex items-center justify-center">
                             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                          </div>
                          <div>
                             <h4 className="font-bold text-slate-800 text-sm mb-2">{section.heading}</h4>
                             <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">{section.text}</p>
                          </div>
                       </div>
                    </div>
                 ))}
               </div>

               <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold text-sm mb-2">
                     <BookOpen className="w-4 h-4" /> Academic Reference
                  </div>
                  <p className="text-xs text-center text-indigo-600/80 font-medium leading-relaxed">
                     This feature translates the theoretical models presented in the Concept Paper into actionable software logic.
                  </p>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
