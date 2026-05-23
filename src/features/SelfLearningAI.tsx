import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Network, Activity, GitCommit, GitPullRequest } from 'lucide-react';

export function SelfLearningAI() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-500/20 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <Brain className="w-64 h-64 text-indigo-500" />
           </div>
           
           <div className="w-24 h-24 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0 relative z-10">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
              <Brain className="w-10 h-10 text-indigo-500" />
           </div>

           <div className="flex-1 relative z-10 text-center md:text-left">
              <h2 className="text-2xl font-display font-bold text-indigo-600 dark:text-indigo-400 mb-2">Cognitive Grid Core</h2>
              <p className="text-sm opacity-80 max-w-2xl">The AI continually adapts to urban patterns. It learns from incident reports, traffic flow, and environmental changes to update threat models and optimize safe routes daily.</p>
           </div>
           
           <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto z-10">
              <div className="bg-white dark:bg-black/50 backdrop-blur-sm px-4 py-3 rounded-lg border border-black/5 dark:border-white/10 flex justify-between items-center gap-6 shadow-sm">
                 <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">Model Version</span>
                 <span className="font-mono text-xs font-bold text-indigo-500">v4.2.1-beta</span>
              </div>
              <div className="bg-white dark:bg-black/50 backdrop-blur-sm px-4 py-3 rounded-lg border border-black/5 dark:border-white/10 flex justify-between items-center gap-6 shadow-sm">
                 <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">Last Training Epoch</span>
                 <span className="font-mono text-xs font-bold">2 hours ago</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                 <Database className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Data Ingestion</h3>
              <p className="text-xs opacity-70 mb-4 flex-1">Processing 4.2TB of daily telemetry from IoT shoes, CCTV, and user reports.</p>
              <div className="w-full bg-black/5 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-blue-500 h-full w-[100%] animate-pulse"></div>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest mt-2 opacity-50">Stream Active</span>
           </div>

           <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
                 <Network className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Pattern Recognition</h3>
              <p className="text-xs opacity-70 mb-4 flex-1">Identifying anomalous crowd behaviors and predicting potential threat vectors.</p>
              <div className="w-full bg-black/5 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-purple-500 h-full w-[85%]"></div>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest mt-2 opacity-50">Confidence: High</span>
           </div>

           <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                 <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Model Deployment</h3>
              <p className="text-xs opacity-70 mb-4 flex-1">Updating routing algorithms and risk heatmaps across the global edge network.</p>
              <div className="w-full bg-black/5 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-green-500 h-full w-[40%]"></div>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest mt-2 opacity-50">Syncing...</span>
           </div>
        </div>

        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl p-6">
           <h3 className="font-mono text-sm uppercase tracking-widest opacity-80 mb-6 flex items-center gap-2">
             <Cpu className="w-4 h-4" /> Neural Network Adjustments
           </h3>
           <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">
                 <GitCommit className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                 <div>
                    <h4 className="text-sm font-bold">Decreased Weight on Ambient Noise</h4>
                    <p className="text-xs opacity-70 mt-1">Found false positive correlations between traffic noise and panic events in Sector 2.</p>
                 </div>
                 <span className="font-mono text-[10px] opacity-40 ml-auto whitespace-nowrap">2m ago</span>
              </div>
              <div className="flex items-start gap-4 p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">
                 <GitPullRequest className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                 <div>
                    <h4 className="text-sm font-bold">New Factor: Streetlight Outages</h4>
                    <p className="text-xs opacity-70 mt-1">Successfully integrated real-time city infrastructure API to factor lighting into Safe Routes.</p>
                 </div>
                 <span className="font-mono text-[10px] opacity-40 ml-auto whitespace-nowrap">1h ago</span>
              </div>
              <div className="flex items-start gap-4 p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors">
                 <GitCommit className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                 <div>
                    <h4 className="text-sm font-bold">Route Alpha Optimization</h4>
                    <p className="text-xs opacity-70 mt-1">Shifted recommended night-time pathing slightly east to align with recent police patrol density.</p>
                 </div>
                 <span className="font-mono text-[10px] opacity-40 ml-auto whitespace-nowrap">5h ago</span>
              </div>
           </div>
        </div>

      </div>
    </motion.section>
  );
}
