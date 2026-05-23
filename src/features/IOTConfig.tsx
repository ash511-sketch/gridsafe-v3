import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Battery, Radio, Zap, Settings, RotateCcw, Save } from 'lucide-react';
import { cn } from '../utils/cn';

export function IOTConfig() {
  const [powerSaving, setPowerSaving] = useState(true);
  const [gpsFreq, setGpsFreq] = useState('10');
  const [sosSensitivity, setSosSensitivity] = useState('high');

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Device Status Sidebar */}
        <div className="flex flex-col gap-6">
           <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-full h-32 bg-gs-dark dark:bg-black absolute top-0 left-0 z-0"></div>
              
              <div className="w-24 h-24 rounded-full bg-white dark:bg-black border-4 border-white dark:border-black shadow-lg relative z-10 flex items-center justify-center mt-8 mb-4">
                 <Cpu className="w-12 h-12 text-blue-500" />
                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white dark:border-black rounded-full"></div>
              </div>
              
              <h2 className="font-display font-bold text-xl relative z-10">ESP32 Core Module</h2>
              <p className="text-xs opacity-70 font-mono mb-6 relative z-10">ID: A8:F3:29:B1:C4:00</p>
              
              <div className="w-full space-y-4">
                 <div className="flex justify-between items-center px-4 py-2 bg-black/5 dark:bg-white/5 rounded">
                    <span className="flex items-center gap-2 text-xs"><Wifi className="w-4 h-4 text-blue-500" /> Connection</span>
                    <span className="font-mono text-xs font-bold text-green-500">Connected</span>
                 </div>
                 <div className="flex justify-between items-center px-4 py-2 bg-black/5 dark:bg-white/5 rounded">
                    <span className="flex items-center gap-2 text-xs"><Battery className="w-4 h-4 text-green-500" /> Battery</span>
                    <span className="font-mono text-xs font-bold">84%</span>
                 </div>
                 <div className="flex justify-between items-center px-4 py-2 bg-black/5 dark:bg-white/5 rounded">
                    <span className="flex items-center gap-2 text-xs"><Radio className="w-4 h-4 text-purple-500" /> Signal</span>
                    <span className="font-mono text-xs font-bold">-62 dBm</span>
                 </div>
              </div>
           </div>
           
           <button className="w-full py-4 bg-gs-dark dark:bg-white text-white dark:text-black rounded-lg font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-xl flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Restart Device
           </button>
        </div>

        {/* Configuration Panel */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl">
           <div className="flex items-center justify-between mb-8 border-b border-black/10 dark:border-white/10 pb-4">
              <h3 className="text-lg font-display font-bold flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" /> Hardware Configuration
              </h3>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-[10px] font-mono uppercase tracking-widest border border-blue-500/20">Firmware v2.1.0</span>
           </div>

           <div className="space-y-8">
              
              {/* Telemetry settings */}
              <div>
                 <h4 className="font-mono text-xs uppercase tracking-widest opacity-70 mb-4 flex items-center gap-2">
                   <Radio className="w-4 h-4" /> Telemetry & Tracking
                 </h4>
                 <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-black/5 dark:border-white/10 rounded bg-white/50 dark:bg-black/20">
                       <div>
                         <p className="font-bold text-sm">GPS Polling Frequency</p>
                         <p className="text-xs opacity-70">How often the device sends coordinates to the GridSafe servers.</p>
                       </div>
                       <select 
                         value={gpsFreq} 
                         onChange={e => setGpsFreq(e.target.value)}
                         className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-3 py-2 text-sm focus:outline-none"
                       >
                         <option value="1">Every 1 second (High Battery Drain)</option>
                         <option value="5">Every 5 seconds</option>
                         <option value="10">Every 10 seconds (Recommended)</option>
                         <option value="30">Every 30 seconds</option>
                         <option value="60">Every 1 minute (Low Battery Drain)</option>
                       </select>
                    </div>
                 </div>
              </div>

              {/* SOS Settings */}
              <div>
                 <h4 className="font-mono text-xs uppercase tracking-widest opacity-70 mb-4 flex items-center gap-2">
                   <Zap className="w-4 h-4 text-amber-500" /> Emergency Triggers
                 </h4>
                 <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-black/5 dark:border-white/10 rounded bg-white/50 dark:bg-black/20">
                       <div>
                         <p className="font-bold text-sm">Foot-Tap SOS Sensitivity</p>
                         <p className="text-xs opacity-70">Required impact force to trigger the silent alarm sequence.</p>
                       </div>
                       <div className="flex bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10 overflow-hidden">
                          <button 
                            onClick={() => setSosSensitivity('low')}
                            className={cn("px-4 py-2 text-xs font-mono transition-colors", sosSensitivity === 'low' ? "bg-blue-500 text-white" : "hover:bg-black/5 dark:hover:bg-white/5")}
                          >Low</button>
                          <button 
                            onClick={() => setSosSensitivity('medium')}
                            className={cn("px-4 py-2 text-xs font-mono transition-colors border-l border-r border-black/10 dark:border-white/10", sosSensitivity === 'medium' ? "bg-blue-500 text-white" : "hover:bg-black/5 dark:hover:bg-white/5")}
                          >Med</button>
                          <button 
                            onClick={() => setSosSensitivity('high')}
                            className={cn("px-4 py-2 text-xs font-mono transition-colors", sosSensitivity === 'high' ? "bg-blue-500 text-white" : "hover:bg-black/5 dark:hover:bg-white/5")}
                          >High</button>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Power Settings */}
              <div>
                 <h4 className="font-mono text-xs uppercase tracking-widest opacity-70 mb-4 flex items-center gap-2">
                   <Battery className="w-4 h-4 text-green-500" /> Power Management
                 </h4>
                 <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 border border-black/5 dark:border-white/10 rounded bg-white/50 dark:bg-black/20 cursor-pointer">
                       <div>
                         <p className="font-bold text-sm">Smart Deep Sleep</p>
                         <p className="text-xs opacity-70">Disable GPS and WiFi when accelerometer detects no movement for 5 minutes.</p>
                       </div>
                       <input 
                         type="checkbox" 
                         checked={powerSaving} 
                         onChange={() => setPowerSaving(!powerSaving)}
                         className="accent-green-500 w-5 h-5" 
                       />
                    </label>
                 </div>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-end">
                 <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-mono text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 transition-colors">
                    <Save className="w-4 h-4" /> Apply Configuration to Hardware
                 </button>
              </div>

           </div>
        </div>

      </div>
    </motion.section>
  );
}
