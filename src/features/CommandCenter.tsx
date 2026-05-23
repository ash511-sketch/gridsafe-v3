
import { motion } from 'framer-motion';
import { Activity, Shield, Users, MapPin, Zap, AlertTriangle, ChevronRight, Navigation } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';


export function CommandCenter() {
  const { citySafetyScore, activeIncidentsCount } = useSystemStore();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6 lg:col-span-2">
          <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-6">Grid Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-display font-bold">{citySafetyScore}%</span>
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Safety Index</span>
            </div>
            
            <div className="p-4 bg-gs-maroon/10 dark:bg-red-500/10 rounded-lg border border-gs-maroon/20 dark:border-red-500/20 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-gs-maroon/20 dark:bg-red-500/20 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-gs-maroon dark:text-red-500" />
              </div>
              <span className="text-2xl font-display font-bold text-gs-maroon dark:text-red-500">{activeIncidentsCount}</span>
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Active Threats</span>
            </div>
            
            <div className="p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-2xl font-display font-bold">14.2k</span>
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Active Nodes</span>
            </div>
            
            <div className="p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-2xl font-display font-bold">12ms</span>
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">System Latency</span>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-mono text-xs tracking-widest uppercase opacity-70">Live Activity Feed</h3>
              <a href="#" className="font-mono text-[10px] uppercase tracking-widest text-gs-maroon dark:text-red-400 hover:underline">View All</a>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-black/5 dark:border-white/5 flex items-start gap-4">
                <div className="mt-0.5"><MapPin className="w-4 h-4 text-blue-500" /></div>
                <div className="flex-1">
                  <p className="text-sm">Safe Route Generated: Downtown to Sector 4</p>
                  <p className="text-[10px] font-mono opacity-50 mt-1">2 MIN AGO • AI PATHFINDER</p>
                </div>
              </div>
              <div className="p-3 bg-gs-maroon/5 dark:bg-red-500/5 rounded border border-gs-maroon/20 dark:border-red-500/20 flex items-start gap-4">
                <div className="mt-0.5"><AlertTriangle className="w-4 h-4 text-gs-maroon dark:text-red-500" /></div>
                <div className="flex-1">
                  <p className="text-sm text-gs-maroon dark:text-red-400">Suspicious Loitering Detected: Alley 2B</p>
                  <p className="text-[10px] font-mono opacity-50 mt-1 text-gs-maroon/70 dark:text-red-400/70">5 MIN AGO • CAMERA FEED 04</p>
                </div>
                <button className="text-[10px] font-mono uppercase bg-gs-maroon dark:bg-red-600 text-white px-2 py-1 rounded">Review</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6 flex-1">
             <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-6">Quick Actions</h3>
             <div className="space-y-3">
               <button className="px-5 py-2 bg-gs-maroon dark:bg-gs-crimson text-white font-mono text-[10px] tracking-widest uppercase hover:bg-gs-crimson dark:hover:bg-red-700 rounded shadow-lg shadow-gs-maroon/20 transition-all w-full text-left flex justify-between">
                 Trigger Alert <AlertTriangle className="w-4 h-4" />
               </button>
               <button className="px-5 py-2 bg-gs-maroon dark:bg-gs-crimson text-white font-mono text-[10px] tracking-widest uppercase hover:bg-gs-crimson dark:hover:bg-red-700 rounded shadow-lg shadow-gs-maroon/20 transition-all w-full text-left flex justify-between bg-transparent border border-gs-maroon/20 dark:border-white/20 text-gs-maroon dark:text-white">
                 Dispatch Drone <Navigation className="w-4 h-4" />
               </button>
               <button className="px-5 py-2 bg-gs-maroon dark:bg-gs-crimson text-white font-mono text-[10px] tracking-widest uppercase hover:bg-gs-crimson dark:hover:bg-red-700 rounded shadow-lg shadow-gs-maroon/20 transition-all w-full text-left flex justify-between bg-transparent border border-gs-maroon/20 dark:border-white/20 text-gs-maroon dark:text-white">
                 Lockdown Sector <Shield className="w-4 h-4" />
               </button>
             </div>
          </div>
          
          <div className="bg-gs-dark dark:bg-gs-bgdark text-white rounded-lg shadow-xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555589943-772c21dcfa1d?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-red-400">High Risk Area</h3>
              </div>
              <p className="font-display text-xl mb-4">Financial District</p>
              <p className="text-sm opacity-70 mb-6">Crime probability up 14% due to power outage in adjacent block.</p>
              <button className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-red-400 transition-colors">
                View Tactical Map <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
