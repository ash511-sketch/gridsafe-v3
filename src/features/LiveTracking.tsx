import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Satellite, MapPin, Navigation, Radio, Maximize2 } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/cn';

export function LiveTracking() {
  const { isDarkMode } = useSystemStore();
  const [activeAsset, setActiveAsset] = useState<string | null>('unit-alpha');

  const assets = [
    { id: 'unit-alpha', name: 'Tactical Unit Alpha', type: 'Responder', status: 'In Transit', loc: 'Sector 4' },
    { id: 'drone-7', name: 'Aerial Drone 07', type: 'Surveillance', status: 'Patrolling', loc: 'Sector 7G' },
    { id: 'user-902', name: 'VIP Escort', type: 'User', status: 'Active', loc: 'Financial Dist.' },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto h-[600px]">
        
        {/* Asset List Sidebar */}
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 flex flex-col">
           <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4 flex items-center gap-2">
             <Satellite className="w-4 h-4" /> Tracked Assets
           </h3>
           
           <div className="space-y-3 flex-1 overflow-y-auto pr-2">
             {assets.map((asset) => (
               <div 
                 key={asset.id} 
                 onClick={() => setActiveAsset(asset.id)}
                 className={cn(
                   "p-3 rounded-lg border cursor-pointer transition-all",
                   activeAsset === asset.id 
                     ? "bg-blue-500/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                     : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
                 )}
               >
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-bold text-sm text-gs-dark dark:text-white">{asset.name}</span>
                   <span className="flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                   </span>
                 </div>
                 <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest opacity-60 mt-2">
                   <span>{asset.type}</span>
                   <span>{asset.loc}</span>
                 </div>
               </div>
             ))}
           </div>
           
           <button className="mt-4 w-full py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 rounded font-mono text-[10px] uppercase tracking-widest transition-colors flex justify-center items-center gap-2">
             <MapPin className="w-4 h-4" /> Add Tracker
           </button>
        </div>

        {/* Main Tracking Map Area */}
        <div className="lg:col-span-3 bg-gs-dark dark:bg-black rounded-lg border border-black/10 dark:border-white/10 relative overflow-hidden flex flex-col">
           {/* Mock Grid Map Background */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 pointer-events-none"></div>
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"></div>

           <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded p-3 text-white">
                 <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-70 mb-1">Active Target</h4>
                 <div className="font-bold text-lg">{assets.find(a => a.id === activeAsset)?.name || 'None'}</div>
                 <div className="font-mono text-xs text-blue-400 mt-1 flex items-center gap-2">
                   <Radio className="w-3 h-3 animate-pulse" /> Signal Lock: Optimal
                 </div>
              </div>
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded p-2 text-white pointer-events-auto cursor-pointer hover:bg-black/80 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </div>
           </div>

           {/* Radar Sweep Effect */}
           <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20 pointer-events-none">
             <div className="w-full h-full rounded-full border border-blue-500/10 scale-75"></div>
             <div className="absolute inset-0 rounded-full border border-blue-500/5 scale-50"></div>
             <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent to-blue-500/50 origin-left animate-[spin_4s_linear_infinite]"></div>
           </div>

           {/* Asset Blips */}
           <div className="absolute top-[40%] left-[60%] w-4 h-4 -translate-x-1/2 -translate-y-1/2">
             <div className="w-full h-full bg-blue-500 rounded-full animate-ping opacity-70"></div>
             <div className="absolute inset-0 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]"></div>
             <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white font-mono text-[8px] px-2 py-0.5 rounded border border-white/20 whitespace-nowrap">
               Drone 07
             </div>
           </div>
           
           <div className="absolute top-[60%] left-[30%] w-4 h-4 -translate-x-1/2 -translate-y-1/2">
             <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-70"></div>
             <div className="absolute inset-0 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,1)]"></div>
             <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white font-mono text-[8px] px-2 py-0.5 rounded border border-white/20 whitespace-nowrap">
               Unit Alpha
             </div>
           </div>

           <div className="absolute bottom-4 left-4 z-10 text-white font-mono text-[10px] opacity-50">
             LAT: 40.7128 N<br/>LNG: -74.0060 W
           </div>
        </div>

      </div>
    </motion.section>
  );
}
