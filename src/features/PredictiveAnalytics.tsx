import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';

const data = [
  { time: '18:00', risk: 20 },
  { time: '19:00', risk: 35 },
  { time: '20:00', risk: 45 },
  { time: '21:00', risk: 75 },
  { time: '22:00', risk: 90 },
  { time: '23:00', risk: 85 },
  { time: '00:00', risk: 60 },
];

export function PredictiveAnalytics() {
  const { isDarkMode } = useSystemStore();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6 md:col-span-2">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 flex items-center gap-2">
                 <TrendingUp className="w-4 h-4" /> Risk Forecast (Next 6 Hours)
               </h3>
               <span className="font-mono text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded">High Confidence</span>
             </div>
             
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                   <defs>
                     <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={isDarkMode ? '#ef4444' : '#8b0000'} stopOpacity={0.8}/>
                       <stop offset="95%" stopColor={isDarkMode ? '#ef4444' : '#8b0000'} stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} vertical={false} />
                   <XAxis dataKey="time" stroke={isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke={isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: isDarkMode ? '#000' : '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     itemStyle={{ color: isDarkMode ? '#ef4444' : '#8b0000' }}
                   />
                   <Area type="monotone" dataKey="risk" stroke={isDarkMode ? '#ef4444' : '#8b0000'} fillOpacity={1} fill="url(#colorRisk)" strokeWidth={3} />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
           </div>
           
           <div className="flex flex-col gap-6">
             <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6 flex-1">
               <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">AI Insights</h3>
               <div className="space-y-4">
                 <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded">
                   <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                   <div>
                     <p className="text-sm font-bold text-red-500">Spike at 22:00</p>
                     <p className="text-xs opacity-70 mt-1">Historical data shows 40% increase in incidents due to concert letting out.</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded">
                   <ShieldCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                   <div>
                     <p className="text-sm font-bold text-green-500">Route C is clear</p>
                     <p className="text-xs opacity-70 mt-1">Police patrol actively stationed on Route C until 01:00.</p>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gs-dark text-white rounded-lg p-6 shadow-xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555589943-772c21dcfa1d?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
               <div className="relative z-10 flex flex-col items-center text-center">
                 <Activity className="w-8 h-8 mb-4 text-red-400 animate-pulse" />
                 <span className="font-display text-4xl font-bold">89%</span>
                 <span className="font-mono text-xs uppercase tracking-widest mt-2 opacity-70">Threat Accuracy</span>
                 <p className="text-xs mt-4 opacity-50">Model Retrained: Today 14:00</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </motion.section>
  );
}
