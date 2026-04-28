import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, Navigation, Radio, Clock, Zap, MapPin, Hand, Car, Users } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

// Fix for default Leaflet markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PUV_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const HUB_ICON = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ROUTES_DEF = [
  { id: 'r1', name: "SM Lipa", color: "bg-orange-500", pathColor: "#f97316", fromId: "sm", toId: "pob", count: 12 },
  { id: 'r2', name: "Tamb Exit Route", color: "bg-sky-500", pathColor: "#0ea5e9", fromId: "rob", toId: "tambo", count: 8 },
  { id: 'r3', name: "Fiesta Mall Route", color: "bg-emerald-500", pathColor: "#10b981", fromId: "pob", toId: "fiesta", count: 15 },
  { id: 'r4', name: "Lima Estate Fast", color: "bg-rose-500", pathColor: "#f43f5e", fromId: "sm", toId: "lima", count: 6 },
];

export function DriverApp() {
  const [activeTab, setActiveTab] = useState<'routes'>('routes');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  const [locations, setLocations] = useState([
    { id: "sm", name: "SM City Lipa", coords: [13.9515, 121.1643] as [number, number], zone: "Loading Zone", demand: "High (45 waits)" },
    { id: "rob", name: "Robinsons Place Lipa", coords: [13.9587, 121.1622] as [number, number], zone: "Loading Zone", demand: "Medium (20 waits)" },
    { id: "pob", name: "Poblacion", coords: [13.9416, 121.1611] as [number, number], zone: "Central Hub", demand: "Critical (80+ waits)" },
    { id: "tambo", name: "Tambo Exit", coords: [13.9688, 121.1558] as [number, number], zone: "Highway Transit", demand: "Low (5 waits)" },
    { id: "lima", name: "LIMA Estate", coords: [13.9934, 121.1442] as [number, number], zone: "Industrial Hub", demand: "Peak (120 waits)" },
    { id: "fiesta", name: "Fiesta World Mall", coords: [13.9213, 121.1656] as [number, number], zone: "Loading Zone", demand: "High (35 waits)" },
  ]);

  const [puvs, setPuvs] = useState([
    { id: 1, routeId: 'r1', progress: 0.1, dir: 1, speed: 0.05, plate: "DXB-1234", capacity: "12/20" },
    { id: 2, routeId: 'r1', progress: 0.8, dir: -1, speed: 0.04, plate: "VVT-9921", capacity: "5/20" },
    { id: 3, routeId: 'r2', progress: 0.5, dir: 1, speed: 0.06, plate: "PUV-001X", capacity: "18/20" },
    { id: 4, routeId: 'r3', progress: 0.3, dir: -1, speed: 0.04, plate: "BAT-8822", capacity: "8/20" },
    { id: 5, routeId: 'r4', progress: 0.7, dir: 1, speed: 0.03, plate: "LIP-552", capacity: "19/20"},
  ]);

  const [routePaths, setRoutePaths] = useState<Record<string, [number, number][]>>({});

  useEffect(() => {
    // Progress loops between 0 and 1
    const interval = setInterval(() => {
      setPuvs(currentPuvs => currentPuvs.map(puv => {
        let newProg = puv.progress + (puv.speed * puv.dir);
        let newDir = puv.dir;
        if (newProg >= 1) {
           newProg = 1;
           newDir = -1;
        } else if (newProg <= 0) {
           newProg = 0;
           newDir = 1;
        }
        return { ...puv, progress: newProg, dir: newDir };
      }));
    }, 500); // UI tick
    return () => clearInterval(interval);
  }, []);

  const fetchRouteValues = async () => {
    const newPaths: Record<string, [number, number][]> = {};
    for (const route of ROUTES_DEF) {
      const fromLoc = locations.find(l => l.id === route.fromId);
      const toLoc = locations.find(l => l.id === route.toId);
      if (fromLoc && toLoc) {
        try {
          const url = `https://router.project-osrm.org/route/v1/driving/${fromLoc.coords[1]},${fromLoc.coords[0]};${toLoc.coords[1]},${toLoc.coords[0]}?overview=full&geometries=geojson`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.routes && data.routes.length > 0) {
            // OSRM returns coordinates as [lng, lat], Leaflet wants [lat, lng]
            newPaths[route.id] = data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
          } else {
            newPaths[route.id] = [fromLoc.coords, toLoc.coords];
          }
        } catch {
          newPaths[route.id] = [fromLoc.coords, toLoc.coords];
        }
      }
    }
    setRoutePaths(newPaths);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchRouteValues();
    }, 800);
    return () => clearTimeout(handler);
  }, [locations]);

  const getDistance = (c1: [number, number], c2: [number, number]) => {
     return Math.sqrt(Math.pow(c1[0]-c2[0], 2) + Math.pow(c1[1]-c2[1], 2));
  };

  // Compute dynamic stats based on exact distances
  const dynamicRoutes = useMemo(() => {
    return ROUTES_DEF.map(route => {
       const fromLoc = locations.find(l => l.id === route.fromId)!;
       const toLoc = locations.find(l => l.id === route.toId)!;
       const dist = getDistance(fromLoc.coords, toLoc.coords);
       
       // Calculate dynamic ETA and Traffic Status
       const baseTime = Math.ceil(dist * 600); // Arbitrary formula for demo
       const hasTraffic = dist > 0.035; // If locations are pulled far apart, simulate traffic
       
       return {
          ...route,
          fromCoords: fromLoc.coords,
          toCoords: toLoc.coords,
          distance: dist,
          eta: hasTraffic ? `${baseTime + 15} min` : `${baseTime + 2} min`,
          status: hasTraffic ? "Rerouting (Heavy Traffic)" : "Optimal",
          isStressed: hasTraffic
       };
    });
  }, [locations]);

  const updateLocation = (id: string, coords: [number, number]) => {
     setLocations(prev => prev.map(loc => loc.id === id ? { ...loc, coords } : loc));
  };

  return (
    <div className="w-full h-full flex flex-col xl:flex-row bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 animate-in fade-in duration-500">
      
      {/* Sidebar Navigation & Controls */}
      <div className="w-full xl:w-[400px] border-r border-slate-200 flex flex-col bg-slate-50/50 z-10 shrink-0">
         <div className="p-6 bg-white border-b border-slate-200">
            <h1 className="font-display font-black text-2xl text-indigo-900 tracking-tight flex items-center gap-2">
               <Car className="text-indigo-500 w-6 h-6" /> LipAsenso
            </h1>
            <p className="text-xs uppercase tracking-widest font-bold text-sky-600 mt-1">Driver Routing Engine</p>
         </div>

         <div className="flex border-b border-slate-200 bg-white px-2 pt-2">
            <button onClick={() => setActiveTab('routes')} className={cn("flex-1 pb-3 pt-2 text-sm font-bold border-b-2 transition-colors border-indigo-600 text-indigo-700")}>
               Live Routing Map
            </button>
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/50">
            <AnimatePresence mode="wait">
               {activeTab === 'routes' && (
                  <motion.div key="routes" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
                     <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 shadow-sm">
                        <h4 className="flex items-center gap-2 font-bold text-indigo-800 text-sm mb-2">
                          <Hand className="w-4 h-4" /> Routing Playground
                        </h4>
                        <p className="text-xs text-indigo-600/80 font-medium leading-relaxed">
                          Drag the blue location hubs (passenger hotspots) on the map! The LipAsenso engine recalculates optimal routes dynamically, ensuring you can reach highest passenger demand without getting stuck in traffic.
                        </p>
                     </div>

                     <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex items-center gap-2 mb-6">
                       <Search className="w-5 h-5 text-slate-400 ml-2" />
                       <input type="text" placeholder="Search destination" className="flex-1 bg-transparent border-none text-sm outline-none placeholder:text-slate-400 font-medium text-slate-800 p-2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                     </div>

                     <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Navigation className="w-4 h-4" /> Filter By Route
                     </h3>
                     <div className="flex flex-wrap gap-2 mb-8">
                        <button onClick={() => setSelectedRoute(null)} className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all border", !selectedRoute ? "bg-slate-800 text-white border-slate-800 shadow-md" : "bg-white text-slate-600 border-slate-200")}>
                           All
                        </button>
                        {dynamicRoutes.map(r => (
                          <button key={r.id} onClick={() => setSelectedRoute(r.id)} className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2", selectedRoute === r.id ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white text-slate-600 border-slate-200")}>
                            <span className={cn("w-2 h-2 rounded-full", r.color, selectedRoute === r.id && "bg-white")}></span>
                            {r.name}
                          </button>
                        ))}
                     </div>

                     <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Route Demand & Traffic</h3>
                     <div className="space-y-4">
                        {dynamicRoutes.filter(r => !selectedRoute || r.id === selectedRoute).filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())).map(route => (
                           <div key={route.id} className={cn("bg-white rounded-2xl p-5 border shadow-sm transition-all", route.isStressed ? "border-rose-200 bg-rose-50/30" : "border-slate-200")}>
                              <div className="flex justify-between items-start mb-3">
                                 <div className="flex items-center gap-2">
                                    <div className={cn("w-3 h-3 rounded-full mt-0.5", route.color)}></div>
                                    <h4 className="font-bold text-slate-800 leading-tight">{route.name}</h4>
                                 </div>
                              </div>
                              
                              <div className="flex justify-between items-center text-sm font-medium text-slate-500 mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                 <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-indigo-700 font-bold">
                                        <Users className="w-4 h-4"/> ~{route.count * 15} waiting passengers
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Radio className="w-3 h-3 text-slate-400"/> Live GPS Updates
                                    </div>
                                 </div>
                                 <div className={cn("flex justify-end font-bold rounded-lg px-2 py-1 text-xs uppercase items-center gap-1.5", route.isStressed ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700")}>
                                     {route.isStressed && <Zap className="w-3 h-3" />}
                                     {route.eta}
                                 </div>
                              </div>

                              {route.isStressed && (
                                 <div className="mt-3 text-xs font-bold text-rose-600 flex items-center gap-2 bg-rose-100/50 p-2 rounded-lg border border-rose-100">
                                    <Clock className="w-3 h-3 shrink-0" />
                                    {route.count * 15 > 100 ? "High Demand & Congestion: Rerouting Suggested" : "Heavy Traffic: Recalculating Path"}
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>

      {/* Main Map View */}
      <div className="flex-1 relative min-h-[500px]">
         <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200 z-[1000] flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-[ping_2s_ease-out_infinite] relative">
               <div className="w-3 h-3 rounded-full bg-emerald-500 absolute top-0 left-0"></div>
            </div>
            <span className="text-sm font-black text-slate-800 tracking-tight">Dynamic Routing Active</span>
         </div>

         <MapContainer center={[13.9450, 121.1600]} zoom={13} zoomControl={false} className="w-full h-full [&>.leaflet-control-container]:hidden bg-slate-100">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            
            {/* Render the dynamically updating Polyline Routes */}
            {dynamicRoutes.filter(r => !selectedRoute || r.id === selectedRoute).map(route => (
               <Polyline 
                 key={'path-'+route.id} 
                 positions={routePaths[route.id] || [route.fromCoords, route.toCoords]}
                 pathOptions={{ 
                    color: route.pathColor, 
                    weight: route.isStressed ? 6 : 4, 
                    opacity: 0.6,
                    dashArray: route.isStressed ? "10, 10" : undefined 
                 }} 
               />
            ))}

            {/* Draggable Locations */}
            {locations.map(term => (
              <Marker 
                key={term.id} 
                position={term.coords} 
                icon={HUB_ICON}
                draggable={true}
                eventHandlers={{
                  dragend: (e) => {
                     const marker = e.target;
                     const position = marker.getLatLng();
                     updateLocation(term.id, [position.lat, position.lng]);
                  }
                }}
              >
                <Popup className="custom-popup min-w-[150px]">
                  <div className="p-2">
                    <h4 className="font-black text-slate-800 text-sm mb-1">{term.name}</h4>
                    <div className="flex justify-between items-center mt-2 border-b border-slate-100 pb-2 mb-2">
                       <p className="text-[10px] uppercase tracking-widest text-indigo-600 font-bold">{term.zone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Users className="w-3 h-3 text-slate-400" />
                       <span className="text-xs font-bold text-slate-600">Demand: <span className={cn("font-black", term.demand.includes('High') || term.demand.includes('Peak') || term.demand.includes('Critical') ? "text-rose-600" : "text-emerald-600")}>{term.demand}</span></span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Moving PUVs based on Route Progress */}
            {puvs.filter(p => !selectedRoute || p.routeId === selectedRoute).map(puv => {
               const rInfo = dynamicRoutes.find(r => r.id === puv.routeId);
               if (!rInfo) return null;

               let lat, lng;
               const path = routePaths[puv.routeId];
               if (path && path.length > 1) {
                  // Calculate total distance of path
                  const segmentDists = [];
                  let totalDist = 0;
                  for (let i = 0; i < path.length - 1; i++) {
                     const d = Math.sqrt(Math.pow(path[i+1][0] - path[i][0], 2) + Math.pow(path[i+1][1] - path[i][1], 2));
                     segmentDists.push(d);
                     totalDist += d;
                  }
                  
                  const targetDist = puv.progress * totalDist;
                  let currentDist = 0;
                  let segIdx = 0;
                  
                  while (segIdx < segmentDists.length && currentDist + segmentDists[segIdx] < targetDist) {
                     currentDist += segmentDists[segIdx];
                     segIdx++;
                  }
                  
                  if (segIdx >= segmentDists.length) {
                     lat = path[path.length - 1][0];
                     lng = path[path.length - 1][1];
                  } else {
                     const segmentDist = segmentDists[segIdx];
                     const weight = segmentDist > 0 ? (targetDist - currentDist) / segmentDist : 0;
                     const p1 = path[segIdx];
                     const p2 = path[segIdx + 1];
                     lat = p1[0] + (p2[0] - p1[0]) * weight;
                     lng = p1[1] + (p2[1] - p1[1]) * weight;
                  }
               } else {
                  lat = rInfo.fromCoords[0] + (rInfo.toCoords[0] - rInfo.fromCoords[0]) * puv.progress;
                  lng = rInfo.fromCoords[1] + (rInfo.toCoords[1] - rInfo.fromCoords[1]) * puv.progress;
               }

               return (
                <Marker key={puv.id} position={[lat, lng]} icon={PUV_ICON}>
                   <Popup className="custom-popup">
                     <div className="p-2 min-w-[160px]">
                       <div className="flex items-center gap-2 mb-3">
                          <div className={cn("w-2.5 h-2.5 rounded-full", rInfo.color)}></div>
                          <span className="font-bold text-xs text-slate-500 uppercase tracking-widest text-[10px]">Active Driver • {puv.plate}</span>
                       </div>
                       <h4 className="font-black text-sm text-slate-800 leading-tight mb-3">On Route: {rInfo.name}</h4>
                       
                       <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100 mb-2">
                         <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Current Load</span>
                         <span className={cn("text-sm font-mono font-black", puv.capacity.includes('Full') ? "text-rose-600" : "text-emerald-600")}>{puv.capacity}</span>
                       </div>

                       {rInfo.isStressed && (
                         <div className="bg-rose-100 border border-rose-200 text-rose-700 text-[10px] uppercase font-bold p-1.5 rounded text-center">
                            Dijkstra Rerouting Suggested
                         </div>
                       )}
                     </div>
                   </Popup>
                </Marker>
               )
            })}
          </MapContainer>
      </div>
    </div>
  );
}
