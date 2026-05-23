import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Crosshair, AlertTriangle, Eye, Navigation, MapPin } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/cn';

const THREATS = [
  { id: 1, type: 'CRITICAL', title: 'Unidentified Drone Detected', location: 'Sector 7G', time: 'Just now', icon: Crosshair, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  { id: 2, type: 'WARNING', title: 'Crowd Anomaly / Rapid Movement', location: 'Transit Hub Alpha', time: '2m ago', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { id: 3, type: 'ALERT', title: 'Perimeter Breach (Fence B)', location: 'Industrial Zone', time: '5m ago', icon: ShieldAlert, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  { id: 4, type: 'INFO', title: 'Suspicious Vehicle Loitering', location: 'Financial District', time: '12m ago', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { id: 5, type: 'WARNING', title: 'Streetlight Failure Grid', location: 'Sector 4', time: '15m ago', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
];

export function ThreatFeed() {
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
               <Activity className="w-4 h-4" /> Global Threat Feed
             </h3>
             <span className="font-mono text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live Stream
             </span>
           </div>

           <div className="space-y-4">
              <AnimatePresence>
                {THREATS.map((threat, idx) => {
                  const Icon = threat.icon;
                  return (
                    <motion.div 
                      key={threat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        "p-4 border rounded-lg flex items-start gap-4 transition-all hover:scale-[1.01] cursor-pointer",
                        threat.bg, threat.border
                      )}
                    >
                      <div className={cn("p-2 rounded bg-white/50 dark:bg-black/50 backdrop-blur-sm", threat.color)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={cn("font-bold text-sm", threat.color)}>{threat.title}</h4>
                          <span className="font-mono text-[9px] uppercase tracking-widest opacity-50">{threat.time}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs opacity-70 font-mono">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {threat.location}</span>
                          <span className="flex items-center gap-1"><Crosshair className="w-3 h-3" /> AI CONFIDENCE: {98 - idx * 4}%</span>
                        </div>
                      </div>
                      <div className="hidden md:flex gap-2">
                         <button className="px-3 py-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded font-mono text-[9px] uppercase tracking-widest transition-colors">
                           Verify
                         </button>
                         <button className="px-3 py-1.5 bg-red-500 text-white rounded font-mono text-[9px] uppercase tracking-widest hover:bg-red-600 transition-colors">
                           Dispatch
                         </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
           </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6">
             <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Feed Filters</h3>
             <div className="space-y-3">
               <label className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer transition-colors">
                 <input type="checkbox" className="accent-red-500 w-4 h-4" defaultChecked />
                 <span className="font-mono text-xs">Level 1 (Critical)</span>
                 <span className="ml-auto bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded font-mono">1</span>
               </label>
               <label className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer transition-colors">
                 <input type="checkbox" className="accent-amber-500 w-4 h-4" defaultChecked />
                 <span className="font-mono text-xs">Level 2 (Warning)</span>
                 <span className="ml-auto bg-amber-500/20 text-amber-500 text-[10px] px-2 py-0.5 rounded font-mono">2</span>
               </label>
               <label className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer transition-colors">
                 <input type="checkbox" className="accent-blue-500 w-4 h-4" defaultChecked />
                 <span className="font-mono text-xs">Level 3 (Info)</span>
                 <span className="ml-auto bg-blue-500/20 text-blue-500 text-[10px] px-2 py-0.5 rounded font-mono">14</span>
               </label>
             </div>
          </div>
          
          <div className="bg-gs-dark dark:bg-black border border-black/10 dark:border-white/10 rounded-lg shadow-xl p-6 relative overflow-hidden flex-1 flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none"></div>
            <Navigation className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-display text-xl text-white mb-2">Automated Dispatch</h3>
            <p className="text-sm opacity-70 text-white/70">Drone 04 is currently investigating the perimeter breach at the Industrial Zone.</p>
            <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono text-[10px] uppercase tracking-widest rounded transition-colors shadow-lg shadow-blue-500/20">
              View Drone Feed
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
