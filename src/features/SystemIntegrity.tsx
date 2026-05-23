import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Database, Network, ShieldCheck, Activity } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const cpuData = [
  { time: '00', usage: 45 }, { time: '05', usage: 52 }, { time: '10', usage: 48 },
  { time: '15', usage: 60 }, { time: '20', usage: 55 }, { time: '25', usage: 65 },
  { time: '30', usage: 58 }, { time: '35', usage: 70 }, { time: '40', usage: 62 },
];

export function SystemIntegrity() {
  const { isDarkMode } = useSystemStore();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 md:col-span-3">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 flex items-center gap-2">
                 <Server className="w-4 h-4" /> Core Infrastructure Status
               </h3>
               <span className="font-mono text-[10px] text-green-500 flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> All Systems Operational
               </span>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border border-black/10 dark:border-white/10 rounded-lg bg-black/5 dark:bg-white/5">
                  <Cpu className="w-5 h-5 mb-2 opacity-70" />
                  <p className="text-2xl font-display font-bold">62%</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest opacity-60">CPU Load (Cluster A)</p>
                </div>
                <div className="p-4 border border-black/10 dark:border-white/10 rounded-lg bg-black/5 dark:bg-white/5">
                  <Database className="w-5 h-5 mb-2 opacity-70" />
                  <p className="text-2xl font-display font-bold">14.2<span className="text-sm">TB</span></p>
                  <p className="font-mono text-[9px] uppercase tracking-widest opacity-60">Database Size</p>
                </div>
                <div className="p-4 border border-black/10 dark:border-white/10 rounded-lg bg-black/5 dark:bg-white/5">
                  <Network className="w-5 h-5 mb-2 opacity-70" />
                  <p className="text-2xl font-display font-bold">1.2<span className="text-sm">Gbps</span></p>
                  <p className="font-mono text-[9px] uppercase tracking-widest opacity-60">Network Traffic</p>
                </div>
                <div className="p-4 border border-black/10 dark:border-white/10 rounded-lg bg-black/5 dark:bg-white/5">
                  <ShieldCheck className="w-5 h-5 mb-2 text-green-500" />
                  <p className="text-2xl font-display font-bold text-green-500">0</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest opacity-60">Intrusion Attempts</p>
                </div>
             </div>
             
             <div className="mt-8 h-48 w-full">
               <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">Live CPU Utilization</h4>
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={cpuData}>
                   <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} vertical={false} />
                   <XAxis dataKey="time" stroke={isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} fontSize={10} tickLine={false} axisLine={false} />
                   <YAxis stroke={isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} fontSize={10} tickLine={false} axisLine={false} />
                   <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
           </div>

           <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 md:col-span-3">
              <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Node Distribution</h3>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-4">
                   <div className="w-24 font-mono text-xs opacity-70">US-EAST-1</div>
                   <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-[80%]"></div>
                   </div>
                   <div className="w-12 font-mono text-xs text-right">80%</div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-24 font-mono text-xs opacity-70">EU-WEST-2</div>
                   <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-[45%]"></div>
                   </div>
                   <div className="w-12 font-mono text-xs text-right">45%</div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-24 font-mono text-xs opacity-70 text-red-500">AP-SOUTH-1</div>
                   <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-red-500 w-[95%]"></div>
                   </div>
                   <div className="w-12 font-mono text-xs text-right text-red-500">95%</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 flex-1">
             <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">System Logs</h3>
             <div className="font-mono text-[9px] space-y-2 opacity-80 h-full overflow-y-auto">
               <p><span className="text-blue-500">[INFO]</span> 14:02:01 - Node cluster auto-scaled (+2 instances)</p>
               <p><span className="text-blue-500">[INFO]</span> 14:05:12 - Database snapshot completed</p>
               <p><span className="text-amber-500">[WARN]</span> 14:10:44 - High latency detected on AP-SOUTH-1</p>
               <p><span className="text-blue-500">[INFO]</span> 14:11:02 - Re-routing traffic via EU-WEST-2</p>
               <p><span className="text-red-500">[ERR]</span> 14:15:30 - Failed to connect to Weather API</p>
               <p><span className="text-blue-500">[INFO]</span> 14:15:35 - Fallback weather data loaded</p>
             </div>
          </div>
          <button className="w-full py-4 bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500/10 font-mono text-[10px] uppercase tracking-widest rounded transition-colors flex justify-center items-center gap-2">
            <Activity className="w-4 h-4" /> Reboot Core Systems
          </button>
        </div>
      </div>
    </motion.section>
  );
}
