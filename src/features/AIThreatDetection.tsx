import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Crosshair, Target, ScanEye, Zap } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/cn';

export function AIThreatDetection() {
  const { isDarkMode, activeIncidentsCount } = useSystemStore();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6 lg:col-span-2">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 flex items-center gap-2">
               <ShieldAlert className="w-4 h-4" /> Threat Recognition Matrix
             </h3>
             <span className="font-mono text-[10px] bg-blue-500/10 text-blue-500 px-2 py-1 rounded flex items-center gap-1">
               <ScanEye className="w-3 h-3" /> Scanning
             </span>
           </div>

           <div className="relative aspect-video bg-gs-dark dark:bg-black rounded-lg border border-black/10 dark:border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40"></div>
              
              {/* Simulated Bounding Boxes */}
              <div className="absolute top-[30%] left-[20%] w-[100px] h-[150px] border-2 border-green-500/50 rounded flex flex-col justify-end p-1">
                 <span className="text-[8px] font-mono text-white bg-green-500/50 px-1 w-fit mb-auto -mt-4">PEDESTRIAN: 92%</span>
              </div>
              <div className="absolute top-[40%] left-[60%] w-[80px] h-[120px] border-2 border-green-500/50 rounded flex flex-col justify-end p-1">
                 <span className="text-[8px] font-mono text-white bg-green-500/50 px-1 w-fit mb-auto -mt-4">PEDESTRIAN: 88%</span>
              </div>
              <div className="absolute top-[50%] left-[40%] w-[120px] h-[180px] border-2 border-red-500 rounded flex flex-col justify-end p-1 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse">
                 <span className="text-[8px] font-mono text-white bg-red-500 px-1 w-fit mb-auto -mt-4">SUSPICIOUS_BEHAVIOR: 96%</span>
                 <Crosshair className="w-6 h-6 text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Scanline Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-[scan_3s_linear_infinite]"></div>

              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded flex gap-4">
                 <div className="text-white">
                   <div className="font-mono text-[10px] opacity-70">Model ID</div>
                   <div className="font-mono text-xs font-bold">YOLO-S v4.2</div>
                 </div>
                 <div className="text-white">
                   <div className="font-mono text-[10px] opacity-70">Latency</div>
                   <div className="font-mono text-xs font-bold text-green-400">18ms</div>
                 </div>
                 <div className="text-white">
                   <div className="font-mono text-[10px] opacity-70">FPS</div>
                   <div className="font-mono text-xs font-bold text-blue-400">59.8</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6 flex-1">
             <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Detected Anomalies</h3>
             
             <div className="space-y-3">
               <div className="p-3 border border-red-500/30 bg-red-500/10 rounded-lg flex gap-3 cursor-pointer hover:bg-red-500/20 transition-colors">
                  <Target className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                     <p className="text-sm font-bold text-red-500">Aggressive Posturing</p>
                     <p className="text-xs opacity-80 mb-1">Sector 4 • Camera 12</p>
                     <p className="font-mono text-[9px] uppercase tracking-widest opacity-60">Confidence: 96.4%</p>
                  </div>
               </div>
               
               <div className="p-3 border border-amber-500/30 bg-amber-500/10 rounded-lg flex gap-3 cursor-pointer hover:bg-amber-500/20 transition-colors">
                  <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                     <p className="text-sm font-bold text-amber-500">Rapid Movement / Running</p>
                     <p className="text-xs opacity-80 mb-1">Sector 7 • Camera 04</p>
                     <p className="font-mono text-[9px] uppercase tracking-widest opacity-60">Confidence: 82.1%</p>
                  </div>
               </div>
               
               <div className="p-3 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-lg flex gap-3 opacity-50">
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                     <p className="text-sm font-bold">Unattended Object</p>
                     <p className="text-xs opacity-80 mb-1">Subway Station A</p>
                     <p className="font-mono text-[9px] uppercase tracking-widest opacity-60">Resolved (False Pos)</p>
                  </div>
               </div>
             </div>
          </div>
          
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-mono text-xs tracking-widest uppercase opacity-70">Auto-Response Protocol</h3>
               <div className="w-8 h-4 bg-gs-crimson rounded-full relative cursor-pointer">
                 <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5"></div>
               </div>
             </div>
             <p className="text-xs opacity-70 mb-4">When enabled, verified Level 1 threats will automatically dispatch drones without human intervention.</p>
             <button className="w-full py-2 bg-transparent border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 rounded font-mono text-[10px] tracking-widest uppercase transition-colors">
               Configure Thresholds
             </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </motion.section>
  );
}
