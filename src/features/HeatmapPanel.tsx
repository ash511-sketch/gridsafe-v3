import { motion } from 'framer-motion';
import { ExternalLink, CornerUpRight } from 'lucide-react';

export function HeatmapPanel() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full relative bg-[#0e1626] overflow-hidden"
    >
      {/* Synthetic Map Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Grid Lines to simulate roads */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }}
      />

      {/* Simulated Central Park area (darker green patch) */}
      <div className="absolute top-[10%] right-[10%] w-[40%] h-[30%] bg-[#022416] opacity-30 rounded-bl-[100px] transform rotate-12 blur-2xl pointer-events-none" />

      {/* Fake Map Labels (Subtle) */}
      <div className="absolute top-[20%] right-[30%] text-[#4b6878] font-sans text-sm font-bold opacity-30 tracking-widest pointer-events-none rotate-[-15deg]">MANHATTAN</div>
      <div className="absolute top-[50%] right-[20%] text-[#4b6878] font-sans text-xs font-bold opacity-20 tracking-widest pointer-events-none">LENOX HILL</div>
      <div className="absolute top-[40%] left-[40%] text-[#4b6878] font-sans text-xs font-bold opacity-20 tracking-widest pointer-events-none">HELL'S KITCHEN</div>
      <div className="absolute bottom-[20%] left-[30%] text-[#4b6878] font-sans text-xs font-bold opacity-20 tracking-widest pointer-events-none">CHELSEA</div>

      {/* LIVE HEATMAP GLOW OVERLAY */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Massive ambient glow */}
        <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,30,0,0.15)_0%,transparent_60%)]" />
        
        {/* Core intensity zone */}
        <div className="absolute w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(220,10,0,0.3)_0%,rgba(180,0,0,0.15)_40%,transparent_70%)] transform -rotate-12" />
        
        {/* Extreme hotspots with pulse animation */}
        <motion.div 
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[200px] h-[100px] bg-[radial-gradient(ellipse_at_center,rgba(255,100,0,0.6)_0%,rgba(255,0,0,0.4)_30%,transparent_70%)] transform -rotate-12 translate-x-[-50px] translate-y-[20px]" 
        />
        
        <motion.div 
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[150px] h-[150px] bg-[radial-gradient(circle_at_center,rgba(255,150,0,0.5)_0%,rgba(255,0,0,0.3)_40%,transparent_70%)] transform translate-x-[80px] translate-y-[-40px]" 
        />
      </div>

      {/* UI OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none p-6">
        {/* Top Left Google Maps Info Card Replica */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111111]/90 backdrop-blur-sm border border-white/10 rounded shadow-2xl p-4 w-80 pointer-events-auto"
        >
           <div className="flex justify-between items-start mb-1">
              <h3 className="font-mono font-bold tracking-widest text-white uppercase text-xs">Live Fear Density</h3>
              <div className="flex gap-2">
                 <button className="text-blue-500 hover:text-blue-400"><ExternalLink className="w-4 h-4" /></button>
                 <button className="text-blue-500 hover:text-blue-400"><CornerUpRight className="w-4 h-4" /></button>
              </div>
           </div>
           <p className="text-[#9ca3af] text-xs font-sans mb-3">Manhattan, New York, NY, USA</p>
           <p className="text-[#9ca3af] text-[11px] font-sans">No reviews</p>
        </motion.div>

        {/* Bottom Left Zone Analytics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 left-6 pointer-events-auto"
        >
           <div className="bg-[#050e1d]/80 backdrop-blur-md border border-[#00f0ff]/20 rounded-xl p-5 w-80 shadow-[0_0_30px_rgba(0,240,255,0.05)] text-white">
             <h4 className="font-mono text-xs tracking-widest mb-4 font-bold text-white shadow-none uppercase">Zone Analytics</h4>
             <div className="space-y-3 font-sans">
               <div className="flex justify-between text-xs">
                 <span className="text-[#9ca3af]">High Risk Zones</span> 
                 <span className="text-[#ef4444] font-bold">3 Active</span>
               </div>
               <div className="flex justify-between text-xs">
                 <span className="text-[#9ca3af]">Predicted Night Risk</span> 
                 <span className="text-[#eab308] font-bold">Elevated (78%)</span>
               </div>
             </div>
           </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
