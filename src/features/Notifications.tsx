import React from 'react';
import { motion } from 'framer-motion';
import { BellRing, ShieldAlert, Smartphone, Mail, Globe, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

const NOTIFICATIONS = [
  { id: 1, type: 'push', title: 'Route Deviation Alert', desc: 'User #4829 deviated from Safe Route Alpha by >50m.', time: 'Just now', icon: Smartphone, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 2, type: 'system', title: 'Drone Deployed', desc: 'Drone 07 en route to Sector 4. ETA: 2m 14s.', time: '2m ago', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 3, type: 'critical', title: 'SOS Triggered', desc: 'Smart Shoe #922 registered panic sequence.', time: '5m ago', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 4, type: 'email', title: 'Daily Safety Report', desc: 'GridSafe analytics report for 11/12/2026 is ready.', time: '1h ago', icon: Mail, color: 'text-green-500', bg: 'bg-green-500/10' },
];

export function Notifications() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 lg:p-8 flex-1">
          <div className="flex items-center justify-between mb-8">
             <div>
               <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                 <BellRing className="w-6 h-6 text-gs-crimson" /> Communication Center
               </h2>
               <p className="text-sm opacity-70 mt-1">Manage alerts, dispatches, and automated messaging.</p>
             </div>
             <button className="px-4 py-2 bg-gs-dark dark:bg-white text-white dark:text-black rounded font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity">
               <CheckCircle2 className="w-4 h-4" /> Mark All Read
             </button>
          </div>

          <div className="space-y-4">
            {NOTIFICATIONS.map(note => {
              const Icon = note.icon;
              return (
                <div key={note.id} className="p-4 border border-black/5 dark:border-white/10 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-colors flex gap-4 cursor-pointer">
                   <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", note.bg, note.color)}>
                     <Icon className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm">{note.title}</h4>
                        <span className="font-mono text-[10px] opacity-50">{note.time}</span>
                      </div>
                      <p className="text-xs opacity-80">{note.desc}</p>
                   </div>
                   <div className="flex flex-col gap-2 justify-center">
                      <button className="px-3 py-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded text-[10px] font-mono uppercase tracking-widest transition-colors">Action</button>
                   </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
             <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-70">Notification Preferences</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-3 border border-black/10 dark:border-white/10 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                  <span className="text-sm">Critical SOS Alerts</span>
                  <input type="checkbox" defaultChecked className="accent-red-500 w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 border border-black/10 dark:border-white/10 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                  <span className="text-sm">Drone Dispatch Updates</span>
                  <input type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 border border-black/10 dark:border-white/10 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                  <span className="text-sm">Safe Route Deviations</span>
                  <input type="checkbox" defaultChecked className="accent-amber-500 w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 border border-black/10 dark:border-white/10 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                  <span className="text-sm">Daily Analytics Report</span>
                  <input type="checkbox" className="accent-green-500 w-4 h-4" />
                </label>
             </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
