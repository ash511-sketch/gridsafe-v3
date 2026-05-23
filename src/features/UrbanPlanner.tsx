import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Lightbulb, ShieldAlert, Route, Zap, TrendingUp } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/cn';

export function UrbanPlanner() {
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
               <Building2 className="w-4 h-4" /> Infrastructure Analysis
             </h3>
             <span className="font-mono text-[10px] bg-blue-500/10 text-blue-500 px-2 py-1 rounded">Simulation Active</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             <div className="p-4 border border-gs-maroon/20 dark:border-red-500/20 bg-gs-maroon/5 dark:bg-red-500/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-gs-maroon dark:text-red-500" />
                  <span className="font-bold text-gs-maroon dark:text-red-400">Illumination Deficit</span>
                </div>
                <p className="text-sm opacity-80 mb-3">Sector 4 has a 40% drop in street lighting coverage, correlating with a 15% increase in reported incidents.</p>
                <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[60%]"></div>
                </div>
                <div className="mt-1 flex justify-between font-mono text-[9px] opacity-60">
                  <span>Current: 60%</span>
                  <span>Target: 95%</span>
                </div>
             </div>
             
             <div className="p-4 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Route className="w-4 h-4" />
                  <span className="font-bold">Safe Corridors</span>
                </div>
                <p className="text-sm opacity-80 mb-3">AI modeling suggests creating 3 new pedestrian safe-zones along the main transit arteries.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 font-mono text-[10px] uppercase rounded transition-colors border border-blue-500/20">
                    Model Impact
                  </button>
                  <button className="flex-1 py-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 font-mono text-[10px] uppercase rounded transition-colors border border-black/10 dark:border-white/10">
                    Export Data
                  </button>
                </div>
             </div>
           </div>

           <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Predicted Crime Displacement</h3>
           <div className="relative h-48 bg-gs-dark dark:bg-black rounded-lg border border-black/10 dark:border-white/10 overflow-hidden flex items-end p-4 gap-2">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20 grayscale"></div>
              
              {/* Simulated Chart Bars */}
              {[30, 45, 20, 60, 80, 50, 70, 40].map((height, i) => (
                <div key={i} className="flex-1 relative group z-10 flex flex-col justify-end h-full">
                  <div className="w-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors rounded-t" style={{ height: `${height}%` }}></div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded font-mono z-20">
                    Zone {i+1}
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 flex-1">
             <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Resource Allocation</h3>
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between font-mono text-xs mb-1">
                   <span>Police Patrols</span>
                   <span className="text-blue-500">Over-allocated</span>
                 </div>
                 <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[110%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between font-mono text-xs mb-1">
                   <span>CCTV Coverage</span>
                   <span className="text-amber-500">Deficient</span>
                 </div>
                 <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500 w-[45%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between font-mono text-xs mb-1">
                   <span>Emergency Call Boxes</span>
                   <span className="text-red-500">Critical</span>
                 </div>
                 <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-red-500 w-[20%]"></div>
                 </div>
               </div>
             </div>
             
             <div className="mt-6 p-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-xs opacity-80">AI Reallocation plan can increase overall coverage efficiency by 24% without budget increases.</p>
                </div>
             </div>
          </div>
          
          <button className="w-full py-4 bg-gs-gold text-gs-dark font-mono text-xs uppercase tracking-widest rounded shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 font-bold">
            <Zap className="w-4 h-4" /> Generate Policy Report
          </button>
        </div>
      </div>
    </motion.section>
  );
}
