import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, ShieldAlert, Users, Zap, Clock } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';

export function TacticalAnalytics() {
  const { isDarkMode } = useSystemStore();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-6">
        
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl flex items-center justify-between">
          <div>
             <h3 className="text-xs uppercase tracking-widest font-mono opacity-70">Grid Safety Index</h3>
             <p className="text-3xl font-display font-bold text-green-500 mt-2">92.4%</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl flex items-center justify-between">
          <div>
             <h3 className="text-xs uppercase tracking-widest font-mono opacity-70">Active Patrols</h3>
             <p className="text-3xl font-display font-bold text-blue-500 mt-2">14</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl flex items-center justify-between">
          <div>
             <h3 className="text-xs uppercase tracking-widest font-mono opacity-70">Avg Response Time</h3>
             <p className="text-3xl font-display font-bold text-purple-500 mt-2">2.4m</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl flex items-center justify-between">
          <div>
             <h3 className="text-xs uppercase tracking-widest font-mono opacity-70">Threats Neutralized</h3>
             <p className="text-3xl font-display font-bold text-amber-500 mt-2">8</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-amber-500" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl min-h-[400px] flex flex-col">
           <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-mono text-sm tracking-widest uppercase opacity-80">Incident Distribution by Sector</h3>
           </div>
           
           <div className="flex-1 flex items-end gap-4 px-4 pb-4 border-b border-l border-black/10 dark:border-white/10 relative">
              <div className="w-full flex justify-between items-end h-full">
                 <div className="w-[12%] bg-blue-500 hover:bg-blue-400 transition-colors rounded-t" style={{ height: '40%' }}></div>
                 <div className="w-[12%] bg-blue-500 hover:bg-blue-400 transition-colors rounded-t" style={{ height: '75%' }}></div>
                 <div className="w-[12%] bg-red-500 hover:bg-red-400 transition-colors rounded-t" style={{ height: '90%' }}></div>
                 <div className="w-[12%] bg-blue-500 hover:bg-blue-400 transition-colors rounded-t" style={{ height: '20%' }}></div>
                 <div className="w-[12%] bg-blue-500 hover:bg-blue-400 transition-colors rounded-t" style={{ height: '50%' }}></div>
                 <div className="w-[12%] bg-amber-500 hover:bg-amber-400 transition-colors rounded-t" style={{ height: '65%' }}></div>
              </div>
           </div>
           <div className="flex justify-between mt-2 px-4 font-mono text-[10px] opacity-50 uppercase">
              <span>S-1</span><span>S-2</span><span>S-3</span><span>S-4</span><span>S-5</span><span>S-6</span>
           </div>
        </div>

        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl min-h-[400px] flex flex-col">
           <div className="flex items-center gap-2 mb-6">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <h3 className="font-mono text-sm tracking-widest uppercase opacity-80">Risk Assessment Heat Levels</h3>
           </div>
           <div className="flex-1 flex flex-col justify-center gap-6 px-4">
              <div className="w-full">
                 <div className="flex justify-between mb-2">
                    <span className="font-mono text-xs uppercase opacity-70">Physical Confrontation</span>
                    <span className="text-red-500 font-bold font-mono text-xs">82%</span>
                 </div>
                 <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[82%]" />
                 </div>
              </div>
              <div className="w-full">
                 <div className="flex justify-between mb-2">
                    <span className="font-mono text-xs uppercase opacity-70">Property Damage</span>
                    <span className="text-orange-500 font-bold font-mono text-xs">64%</span>
                 </div>
                 <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[64%]" />
                 </div>
              </div>
              <div className="w-full">
                 <div className="flex justify-between mb-2">
                    <span className="font-mono text-xs uppercase opacity-70">Suspicious Loitering</span>
                    <span className="text-amber-500 font-bold font-mono text-xs">45%</span>
                 </div>
                 <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[45%]" />
                 </div>
              </div>
              <div className="w-full">
                 <div className="flex justify-between mb-2">
                    <span className="font-mono text-xs uppercase opacity-70">Traffic Anomalies</span>
                    <span className="text-blue-500 font-bold font-mono text-xs">28%</span>
                 </div>
                 <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[28%]" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </motion.section>
  );
}
