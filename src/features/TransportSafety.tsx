import React from 'react';
import { motion } from 'framer-motion';
import { Train, Bus, AlertTriangle, ShieldCheck, Video, MapPin, Activity } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/cn';

export function TransportSafety() {
  const { isDarkMode } = useSystemStore();

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
              <Train className="w-4 h-4" /> Transit Grid Status
            </h3>
            <span className="font-mono text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded">Optimal</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             <div className="p-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-blue-500" />
                    <span className="font-bold">Subway Line Red</span>
                  </div>
                  <span className="font-mono text-[10px] text-green-500 bg-green-500/10 px-2 py-1 rounded">Clear</span>
                </div>
                <div className="space-y-2 text-sm opacity-80">
                  <div className="flex justify-between"><span className="opacity-70">Active Trains</span><span className="font-mono">14</span></div>
                  <div className="flex justify-between"><span className="opacity-70">Security Personnel</span><span className="font-mono">42</span></div>
                  <div className="flex justify-between"><span className="opacity-70">AI Camera Feeds</span><span className="font-mono text-blue-500">128/128 Online</span></div>
                </div>
             </div>
             
             <div className="p-4 bg-gs-maroon/5 dark:bg-red-500/5 border border-gs-maroon/20 dark:border-red-500/20 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500 animate-pulse"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bus className="w-5 h-5 text-gs-maroon dark:text-red-500" />
                    <span className="font-bold text-gs-maroon dark:text-red-400">Night Route 42</span>
                  </div>
                  <span className="font-mono text-[10px] text-red-500 bg-red-500/10 px-2 py-1 rounded">Alert</span>
                </div>
                <div className="space-y-2 text-sm opacity-80">
                  <div className="flex justify-between"><span className="opacity-70">Active Buses</span><span className="font-mono">8</span></div>
                  <div className="flex justify-between"><span className="opacity-70">Security Personnel</span><span className="font-mono text-red-500">0 (Dispatched)</span></div>
                  <div className="flex justify-between"><span className="opacity-70">AI Camera Feeds</span><span className="font-mono text-amber-500">2 Offline</span></div>
                </div>
             </div>
          </div>

          <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Live CCTV Feeds (AI Annotated)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="relative aspect-video bg-black rounded overflow-hidden group">
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="font-mono text-[8px] text-white bg-black/50 px-1 rounded">CAM-0{i}</span>
                  </div>
                  {i === 2 && (
                    <div className="absolute inset-0 border-2 border-red-500/50 m-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="absolute -top-2 left-2 bg-red-500 text-white text-[8px] px-1 font-mono">PERSON_DETECTED 98%</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                    <button className="flex items-center gap-2 font-mono text-[10px] uppercase text-white hover:text-blue-400 transition-colors">
                      <Video className="w-4 h-4" /> Expand
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6">
            <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Route Companion</h3>
            <p className="text-sm opacity-70 mb-4">Enable AI companion to track your transit route. If your vehicle deviates or stops unexpectedly, authorities will be alerted.</p>
            
            <div className="space-y-4">
               <div className="relative">
                 <MapPin className="absolute left-3 top-3 w-4 h-4 opacity-50" />
                 <input type="text" placeholder="Enter Train/Bus ID" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-blue-500" />
               </div>
               <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-[10px] uppercase tracking-widest rounded shadow-lg transition-colors flex items-center justify-center gap-2">
                 <ShieldCheck className="w-4 h-4" /> Start Companion
               </button>
            </div>
          </div>

          <div className="bg-gs-dark dark:bg-black border border-black/10 dark:border-white/10 rounded-lg shadow-xl p-6 relative overflow-hidden flex-1 flex flex-col justify-center items-center text-center">
            <Activity className="w-10 h-10 text-gs-maroon dark:text-red-500 mb-4 animate-pulse" />
            <h3 className="font-display text-xl text-white mb-2">Crowd Density Alert</h3>
            <p className="text-sm opacity-70 text-white/70 max-w-[200px]">Central Station is experiencing 140% capacity. Proceed with caution.</p>
            <button className="mt-6 px-4 py-2 border border-white/20 text-white hover:bg-white/10 font-mono text-[10px] uppercase tracking-widest rounded transition-colors">
              Reroute Options
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
