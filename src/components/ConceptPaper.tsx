import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Leaf, MapPin, SearchCode, ShieldAlert, Cpu, ArrowRight, Activity, Network, Zap } from "lucide-react";
import { cn } from "../lib/utils";

// Fix for default Leaflet markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LIPA_LOCATIONS = [
  { name: "SM City Lipa", coords: [13.9515, 121.1643], type: "mall" },
  { name: "Robinsons Place Lipa", coords: [13.9587, 121.1622], type: "mall" },
  { name: "Poblacion (City Center)", coords: [13.9416, 121.1611], type: "center" },
  { name: "Puregold Lipa", coords: [13.9430, 121.1615], type: "commercial" },
  { name: "Tambo Exit (STAR Tollway)", coords: [13.9688, 121.1558], type: "highway" },
  { name: "LIMA Technology Center", coords: [13.9934, 121.1442], type: "industrial" },
  { name: "Fiesta World Mall", coords: [13.9213, 121.1656], type: "mall" },
];

export function ConceptPaper({ onNavigate }: { onNavigate: (tab: 'picker' | 'simulation' | 'pathfinding') => void }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full animate-in fade-in duration-500 min-h-[800px] h-[calc(100vh-100px)]">
      
      {/* Left Column: Conceptual Narrative */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-4 h-full">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl">
          <div className="mb-10 border-b border-slate-800 pb-8">
             <h1 className="text-4xl font-display font-black text-white mb-4 leading-tight text-shadow-lg">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">LipaAsenso App:</span><br/>
                INTELLIGENT TRAFFIC OPTIMIZATION SYSTEM
             </h1>
             <p className="text-system-primary font-mono tracking-widest text-sm uppercase">Concept Paper & Proposal</p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
              <span className="bg-system-accent/20 text-system-accent p-2 rounded-lg"><Leaf className="w-5 h-5" /></span>
              A. Introduction
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
              <p>Lipa City is a first-class city located in the northern part of Batangas province. According to the 2024 Philippine census, it has a population of 387,392 people. The city is known as a center for business, trade, and manufacturing, with places like the Lima Estate helping its economy grow. Because of this progress, more people and businesses are moving to Lipa. However, this fast growth also brings a major problem of traffic congestion on the city’s main roads.</p>
              <p>Traffic in Lipa has become a daily struggle for many people. Trips that used to be quick can now take up to an hour, especially in busy areas like the public market and Poblacion, going to places such as De La Salle Lipa, Robinsons Lipa, and SM City Lipa. One reason for this problem is the lack of a smart traffic system that can manage the flow of vehicles. Without proper coordination and real-time updates, traffic becomes slow, unorganized, and frustrating for both drivers and commuters.</p>
              <p>To help solve this problem, the proponents propose LipAsenso: An Intelligent Traffic Optimization System Using Graph and Data-Driven Algorithms, a smart and data-driven system that aims to improve traffic flow in Lipa City. This system uses algorithms like Dijkstra’s Algorithm and A* Search to suggest the best routes for drivers based on current and expected traffic conditions, while utilizing the YOLO algorithm for real-time traffic detection and a Greedy algorithm for adaptive traffic signal synchronization. It can also analyze where traffic might build up, so drivers can avoid those areas ahead of time.</p>
              <p>In addition, LipAsenso includes a smart traffic light system that adjusts the timing of signals depending on how many vehicles are on each road. This helps reduce waiting time and keeps traffic moving more smoothly. The system also has a dashboard for local government units (LGUs), allowing them to monitor traffic and make better decisions. Overall, LipAsenso aims to reduce congestion, improve travel time, and support the continuous progress or asenso of Lipa City.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
              <span className="bg-orange-500/20 text-orange-400 p-2 rounded-lg"><ShieldAlert className="w-5 h-5" /></span>
              B. Problems and Objectives
            </h2>
            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              <p>Lipa City is one of the most rapidly developing cities in Batangas, making its population and economic activities more dynamic and continuously increasing. However, because of these developments, traffic congestion has become unavoidable. The growing number of vehicles on the road has led to frequent delays, longer travel times, and inefficient road usage, especially in major intersections and commercial areas. One of the major causes of this issue is the lack of an organized and intelligent traffic management system capable of adapting to real-time road conditions. Additionally, there is limited access to real-time traffic information and route guidance, making it difficult for drivers to make informed decisions.</p>
              <p>To address these problems, the proposed LipAsenso, an intelligent traffic optimization system, aims to provide a more efficient and data-driven solution for managing traffic in Lipa City. The system will offer real-time traffic monitoring and route guidance, allowing users to choose the most efficient paths based on current conditions. It will utilize graph-based algorithms such as Dijkstra’s Algorithm and A* Search to generate optimal route recommendations. Furthermore, an adaptive traffic signal control mechanism powered by a greedy algorithm will dynamically adjust traffic light timings based on real-time vehicle density, improving flow at intersections and YOLO algorithm to provide the data needed. The system will also provide a centralized dashboard for local government units (LGUs) to monitor traffic conditions, analyze congestion patterns, and implement data-driven decisions. Through these features, LipAsenso aims to reduce congestion, improve travel efficiency, and support sustainable urban development in Lipa City.</p>
              <div>
                <p className="font-bold text-white mb-2 font-mono text-base uppercase text-orange-400">The project proposal aims to address the following:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide real-time traffic monitoring and route guidance for more informed travel decisions</li>
                  <li>To utilize graph-based algorithms (Dijkstra’s and A*) to recommend optimal routes</li>
                  <li>To implement adaptive traffic signal control using a greedy algorithm and YOLO to improve intersection efficiency</li>
                  <li>To provide a centralized dashboard for LGUs to monitor traffic conditions and analyze congestion patterns</li>
                  <li>To improve overall road utilization and reduce travel time through intelligent traffic management</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
              <span className="bg-purple-500/20 text-purple-400 p-2 rounded-lg"><MapPin className="w-5 h-5" /></span>
              C. Scope and Limitations
            </h2>
            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              <p>The study focuses on the development of a proposed Lipa Asenso App designed to improve the driving experience in Lipa City, whether it be from private vehicles or commuting. The application will cover features such as real-time tracking and route selection to improve traffic congestion. The study is limited to the conceptual design, proposed functionalities, and sample user interface of the application, and does not include full implementation or deployment in a real-world environment.</p>
              <p>However, this study also has other limitations. Since the proponents are drivers, they do not have direct access to government transportation data, official traffic management systems, or coordination with local authorities. As a result, some data used in the study, such as routes are based on estimates and assumptions. Additionally, in order for the app to truly provide an accurate estimation, this project would require a long-term experimentation, analysis, and continuous data collection to ensure reliability and precision of the system.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
              <span className="badge-glow p-2 rounded-lg text-system-primary"><SearchCode className="w-5 h-5" /></span>
              D. Significance of the Study
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>This app has two main target audiences: drivers and LGUs. They will be the main focus, as the app is specifically made to help these users in their travel throughout Lipa City.</p>
              <p>Drivers can be described as any person over the legal age of eighteen (18) and owns/rents any sort of vehicle for a variety of purposes, which are not limited to: work, school, and travel. These drivers have to make sure every minute counts in their drive to and from varying destinations. With increased  delays caused by traffic, they often have to leave early to beat the rush. With LipAsenso, these drivers will be able to properly monitor and anticipate where traffic might be, and then reroute accordingly. Of course, not all areas can have alternate routes, so with the app giving data to traffic lights, they will be prioritized based on how heavy the traffic is within a specific lane, which can reduce the frustration of how most traffic lights simply run on a timer. This will help cut down on travel time, which will ensure they can get to their destinations faster. As a side-effect, these shortened travel times may also help slightly cut down on their gas consumption, as they will be spending less time stalled in the middle of a busy highway.</p>
              <p>The local government units (LGUs) play an important role in travel, because they are the people who have to maintain, regulate, and develop all of the local roads. By accessing data inside of LipAsenso, they will be able to figure out where hotspots of traffic may be located at, along with the possible reasons for why. With these kinds of information, they will be able to make better data-driven decisions that can influence how they decide to plan out a city. These future policies could help shape how the roads of Lipa will form, which can in turn help increase its overall economy by catering to a larger group of drivers/people on the road.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
              <span className="bg-system-accent/20 text-system-accent p-2 rounded-lg"><Cpu className="w-5 h-5" /></span>
              E. The Algorithms in the App
            </h2>
            
            <div className="space-y-8">
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 border-l-4 border-l-system-primary relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Activity className="w-24 h-24 text-system-primary" />
                 </div>
                 <h3 className="font-mono text-xl text-system-primary font-bold mb-4 relative z-10">Dijkstra’s Algorithm</h3>
                 <div className="space-y-4 text-slate-300 relative z-10">
                   <p>Dijkstra's algorithm will be utilized to find the shortest path across the road network. It operates on a weighted graph representation of the map and systematically explores routes to guarantee the path with the least total travel time is found. It serves as a reliable fallback option when more dynamic routing methods are unavailable or insufficient.</p>
                   <p className="font-bold mt-4">Architecture</p>
                   <p>The algorithm is built on top of a weighted graph structure composed of the following components:</p>
                   <ul className="list-disc pl-6 space-y-2">
                     <li><strong>Nodes</strong> - represent specific points on the road network, including intersections, waypoints, and key destinations</li>
                     <li><strong>Edges</strong> - represent the road segments connecting each pair of nodes</li>
                     <li><strong>Weights</strong> - assigned to each edge based on travel time, reflecting how long it takes to traverse a given road segment</li>
                   </ul>
                   <p>At each step, Dijkstra's Algorithm selects the unvisited node with the lowest cumulative travel time from the source, updates the tentative costs of its neighbouring nodes, and repeats until the destination is reached. This greedy node expansion guarantees that once a node is finalized, its shortest path has been found.</p>
                   <p>In this application, the weighted graph is constructed from the road map data, where every intersection or notable point of interest is registered as a node and every connecting road segment is assigned a travel-time weight. When the primary routing methods A* search and live traffic heuristics are unable to produce a result, Dijkstra's Algorithm is a fallback to compute a guaranteed shortest path. This ensures the system can always return a valid route to the user, even under degraded or incomplete traffic data conditions.</p>
                 </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 border-l-4 border-l-system-accent relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Network className="w-24 h-24 text-system-accent" />
                 </div>
                 <h3 className="font-mono text-xl text-system-accent font-bold mb-4 relative z-10">A* Search Algorithm</h3>
                 <div className="space-y-4 text-slate-300 relative z-10">
                   <p>The A* search algorithm will be utilized to find the shortest route while incorporating a heuristic cost, making it particularly well-suited for dynamic routing scenarios. Unlike standard shortest-path algorithms, A* accounts for both travel distance and real-world conditions such as traffic congestion.</p>
                   <p className="font-bold mt-4">Mathematical model</p>
                   <p>The core formula governing A* is:</p>
                   <p><code className="bg-slate-800 text-system-accent px-2 py-1 rounded font-mono">f(n) = g(n) + h(n)</code></p>
                   <ul className="list-disc pl-6 space-y-2">
                     <li><strong>f(n)</strong> - the total estimated cost from the start node through node n to the goal</li>
                     <li><strong>g(n)</strong> - the actual distance cost incurred to travel from the start to node n</li>
                     <li><strong>h(n)</strong> - the heuristic cost, estimating the remaining cost from n to the goal</li>
                   </ul>
                   <p>The edge weight between nodes is computed as:</p>
                   <p><code className="bg-slate-800 text-system-accent px-2 py-1 rounded font-mono">edge_weight = base_distance + congestion_penalty + historical_delay</code></p>
                   <p>This formulation allows the algorithm to dynamically adjust path costs based on measurable inputs rather than static distances alone.</p>
                   <p className="font-bold mt-4">Traversal Process</p>
                   <ol className="list-decimal pl-6 space-y-2">
                     <li><strong>Initialization</strong> - The origin node is placed into an open list (priority queue) with f(n) = 0. All other nodes are assigned an infinite cost. A closed list is maintained to track already-evaluated nodes.</li>
                     <li><strong>Node selection</strong> - At each step, the node with the lowest f(n) value is extracted from the open list. This is the current node being evaluated.</li>
                     <li><strong>Goal check</strong> - If the current node is the destination, the algorithm terminates and the shortest path is reconstructed by tracing back through recorded parent nodes.</li>
                     <li><strong>Neighbour expansion</strong> - For each road segment connected to the current node, the algorithm computes the tentative g(n) by adding the current node's g cost to the edge weight of the connecting segment, where edge_weight = base_distance + congestion_penalty.</li>
                     <li><strong>Cost comparison</strong> - If the tentative g(n) for a neighbour is lower than its previously recorded cost, the neighbour's cost is updated, its parent is set to the current node, and its f(n) is recalculated as g(n) + h(n). The neighbour is then added or re-prioritized in the open list.</li>
                     <li><strong>Heuristic guidance</strong> - The h(n) component guides the search directionally toward the destination. Rather than exploring all roads equally, the algorithm deprioritises nodes that are estimated to be far or costly, focusing computation on the most viable paths.</li>
                     <li><strong>Repetition</strong> - Steps 2 through 6 repeat until the destination node is reached or the open list is exhausted, the latter indicating no valid path exists.</li>
                   </ol>
                   <p>In this application, the heuristic function h(n) is designed to reflect current traffic conditions capturing both the level of congestion (high or low) and historical traffic trends over time. The congestion penalty and historical delay components of the edge weight formula are derived from live and historical traffic data. By embedding these real-world factors directly into the cost function, A* can intelligently favour routes that are not only geometrically shorter but also faster under current conditions, making it an effective choice for adaptive route recommendation.</p>
                 </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 border-l-4 border-l-amber-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-24 h-24 text-amber-500" />
                 </div>
                 <h3 className="font-mono text-xl text-amber-500 font-bold mb-4 relative z-10">Greedy Algorithm</h3>
                 <div className="space-y-4 text-slate-300 relative z-10">
                   <p>The software will utilize a greedy algorithm to determine which lane or phase should be given the go signal at any point in time. Rather than following a fixed timing cycle, the algorithm dynamically evaluates all available lanes at each decision step and selects the one that appears most urgent based on current traffic conditions.</p>
                   <p>The priority of each lane or phase is determined through a scoring formula:</p>
                   <p><code className="bg-slate-800 text-amber-400 px-2 py-1 rounded font-mono">score(phase) = Σ ( vehicles_queued[lane] × cumulative_wait[lane] )</code></p>
                   <ul className="list-disc pl-6 space-y-2">
                     <li><strong>vehicles_queued[lane]</strong> - the number of vehicles currently waiting in a given lane</li>
                     <li><strong>cumulative_wait[lane]</strong> - the total accumulated waiting time of vehicles in that lane</li>
                     <li><strong>Σ</strong> - the summation across all lanes belonging to the phase</li>
                   </ul>
                   <p>The product of queue length and waiting time ensures that both congestion volume and wait duration jointly influence priority. A lane with many vehicles waiting a long time will score significantly higher than one with few vehicles or short waits.</p>
                   <p>In this application, lanes may be grouped into phases when their directions are compatible, for example, a North–South phase or an East–West phase. When lanes are paired, their individual scores are summed to produce a combined phase score. At each decision interval, the algorithm evaluates all active phases, computes their scores using current sensor or input data, and immediately grants the go signal to the phase with the highest score. This greedy selection strategy prioritises the most congested and longest-waiting traffic at every step, aiming to reduce overall vehicle wait times across the intersection.</p>
                 </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 border-l-4 border-l-red-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <SearchCode className="w-24 h-24 text-red-500" />
                 </div>
                 <h3 className="font-mono text-xl text-red-400 font-bold mb-4 relative z-10">YOLO Algorithm</h3>
                 <div className="space-y-4 text-slate-300 relative z-10">
                   <p>The YOLO algorithm, or You Only Look Once, is a real-time object detection system. It detects objects by proposing parts of the image and classifying them. Pre-training for the detection of objects is required to train the algorithm. The data that will be used for pre-training will come from ImageNet. There are three stages to the algorithm:</p>
                   <ol className="list-decimal pl-6 space-y-4">
                     <li>It first captures simple patterns in the initial layers such as edges and textures. Specifically, it divides the input image into an S × S grid (where S = 7, producing a 7×7 grid of cells) in order to capture this information. Each cell in the grid is responsible for predicting B bounding boxes (where B = 2), meaning each cell produces two candidate box predictions. Each bounding box contains five values: the x and y coordinates of the box center relative to the cell, the width and height of the box relative to the full image, and a confidence score reflecting how certain the model is that an object exists within that box. If an object's center falls within a cell, that cell becomes solely responsible for detecting it. If the object spans multiple cells, only the cell containing its center is assigned as the predictor; the other cells do not participate in that object's detection.</li>
                     <li>The captured information is then processed by performing predictions on how confident the model is in each detected object. The confidence score is formally defined as: <br/><code className="bg-slate-800 text-red-300 px-2 py-1 rounded font-mono inline-block my-2">confidence = Pr(Object) × IOU(pred, truth)</code><br/>This means confidence reflects both the probability that an object exists in the box and how well the predicted box fits the actual object. Among the B bounding boxes predicted by a single cell, YOLO designates the one with the highest IOU as the primary predictor responsible for that object; the remaining boxes from that cell are discarded for that detection. The IOU (Intersection over Union) measures how much the predicted box overlaps with the actual known box (ground truth), and a predicted box must meet a minimum IOU threshold to be accepted as a valid detection. In addition to bounding box predictions, each cell also predicts class probabilities for the object it contains. For this application, the relevant classes are vehicles, specifically cars, motorcycles, trucks, and buses.</li>
                     <li>Lastly, YOLO applies a post-processing step to improve object detection. Non-maximum suppression (NMS) works by first ranking all predicted bounding boxes by their confidence score. It keeps the box with the highest confidence, then suppresses all other boxes that overlap it above a set IOU threshold, treating them as duplicate detections of the same object. This process repeats for the remaining boxes until only one bounding box per object remains, eliminating redundant or incorrect predictions and producing a clean final output.</li>
                   </ol>
                   <p>The YOLO algorithm will be used for scanning roads for traffic levels by processing a live camera feed positioned at the traffic light. It will count the number of vehicles detected per lane, with the resulting count passed directly as the <code className="bg-slate-800 text-red-300 px-1 rounded font-mono">vehicles_queued[lane]</code> value into the greedy algorithm's scoring formula for deciding which lane or phase should be given the green light.</p>
                 </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
              <span className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg"><SearchCode className="w-5 h-5" /></span>
              F. Functionalities of the App
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <h3 className="font-bold text-white uppercase mt-6 tracking-wide">Route optimization based on traffic data</h3>
              
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-sky-300">Map routing (Lipa localized):</strong> The map routing feature will provide better routes for drivers to take when traveling in lipa. It optimizes what routes it should take when going from one point to another. The data utilized for this function is provided by the real-time traffic analysis of specific routes. Through receiving data from those functions, the map uses an algorithm to calculate the most efficient route to take. The algorithm that will be used are Dijkstra’s Algorithm and A* Search to find the most efficient route and reduce congestion across major road networks.
                </li>
              </ul>

              <h3 className="font-bold text-white uppercase mt-6 tracking-wide">Traffic management</h3>
              
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-sky-300">Dashboard for LGU & Login for officials:</strong> The login page will be utilized to authorize users that are part of the local government. An email address and password will be required to access the rest of the features of the dashboard. The email and passwords will be saved in a secured database to store authorized emails addresses.
                </li>
                <li>
                  <strong className="text-sky-300">Real-Time traffic analysis with historical graph:</strong> The dashboard will provide a real-time tracking of traffic analysis on roads that can be specified. The data gathered from the real time analysis will be saved in a database. A graph showing the historical data including the time per hour in the x axis and a unit for the amount of congestion for the y axis. This can provide insights on how congested the specific route is currently.
                </li>
                <li>
                  <strong className="text-sky-300">Traffic monitoring:</strong> Traffic monitoring shows real time traffic through cameras placed on traffic lights. The user can switch to any roads where the camera is installed to observe the current traffic volume.
                </li>
                <li>
                  <strong className="text-sky-300">Adaptive traffic light signals (IOT):</strong> The traffic lights will have an installed camera to detect traffic levels in the road. The traffic lights adapt based on how many vehicles are on the road. It utilizes computer vision to detect the traffic congestion and makes a decision based on the Greedy algorithm. It helps prioritize cars that are more abundant and have been there the longest.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
              <span className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg"><Leaf className="w-5 h-5" /></span>
              G. Bibliography
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-400 text-base">
              <li>GeeksforGeeks. (2012, November 25). Dijkstra’s Algorithm to find Shortest Paths from a Source to all. GeeksforGeeks. https://www.geeksforgeeks.org/dsa/dijkstras-shortest-path-algorithm-greedy-algo-7/</li>
              <li>GeeksforGeeks. “A* Search Algorithm.” GeeksforGeeks, 16 June 2016, www.geeksforgeeks.org/dsa/a-search-algorithm/.</li>
              <li>Kundu, R. (2023, January 17). YOLO: Real-Time Object Detection Explained. Www.v7labs.com. https://www.v7labs.com/blog/yolo-object-detection</li>
              <li>Ma, Z., Cui, T., Deng, W., Jiang, F., & Zhang, L. (2021). Adaptive Optimization of Traffic Signal Timing via Deep Reinforcement Learning. Journal of Advanced Transportation, 2021, 1–14. https://doi.org/10.1155/2021/6616702</li>
            </ul>
          </section>

          <div className="pt-8 border-t border-slate-800">
             <div className="p-8 bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl text-center">
                <h3 className="font-display text-2xl font-bold text-white mb-4">Ready to experiment with the Algorithms?</h3>
                <p className="text-indigo-200 mb-8 max-w-lg mx-auto">
                   Explore the interactive visualizations of Dijkstra's Routing Engine, A* Search, and the Adaptive Greedy Hub to see the mathematics in action.
                </p>
                <button 
                  onClick={() => onNavigate('picker')}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center gap-3 mx-auto"
                >
                  Open Algorithm UI <ArrowRight className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Right Column: Leaflet Visualization (Light & Colorful Mode) */}
      <div className="lg:w-[500px] xl:w-[600px] flex flex-col gap-6 h-full flex-shrink-0">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xl flex-1 flex flex-col relative z-0">
          <div className="p-4 border-b border-slate-200 bg-white/90 backdrop-blur-md z-10 flex justify-between items-center shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <MapPin className="text-red-500 w-5 h-5" /> Scope Area Visualization
            </h3>
            <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md font-bold shadow-sm border border-indigo-100">LIPA CITY AREA</span>
          </div>
          
          <div className="flex-1 relative">
            <MapContainer 
              center={[13.9450, 121.1600]} 
              zoom={13} 
              scrollWheelZoom={false} 
              className="w-full h-full [&>.leaflet-control-container]:hidden" // hide leaflet controls nicely
              style={{ background: '#f8fafc' }} // light tailwind slate-50
            >
              {/* Light mode colorful Voyager map tiles */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              
              {/* Highlighting specific bottlenecks */}
              <Circle 
                 center={[13.9416, 121.1611]} // Poblacion
                 pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3 }} 
                 radius={800} 
              />
              
              <Circle 
                 center={[13.9515, 121.1643]} // SM Lipa area
                 pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.3 }} 
                 radius={600} 
              />

              <Circle 
                 center={[13.9688, 121.1558]} // Tambo
                 pathOptions={{ color: '#8b5cf6', fillColor: '#8b5cf6', fillOpacity: 0.3 }} 
                 radius={500} 
              />

              {LIPA_LOCATIONS.map((loc, idx) => (
                <Marker key={idx} position={loc.coords as [number, number]}>
                   <Popup className="custom-popup">
                    <div className="font-sans text-slate-800 p-1">
                      <strong className="text-base block mb-1 text-indigo-900">{loc.name}</strong>
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">{loc.type} ZONE</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

