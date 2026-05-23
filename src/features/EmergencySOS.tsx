import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadioReceiver, MapPin, Navigation, Phone, ShieldAlert, X } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { useTelemetryStore } from '../store/useTelemetryStore';

export function EmergencySOS() {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { addNotification, setCitySafetyScore, citySafetyScore } = useSystemStore();
  const { device } = useTelemetryStore();

  const handleTriggerSOS = () => {
    setSosActive(true);
    let count = 5;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        addNotification({
          type: 'PANIC',
          message: 'SOS TRIGGERED. Dispatching units to your location.'
        });
        setCitySafetyScore(Math.max(20, citySafetyScore - 10));
      }
    }, 1000);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setCountdown(5);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-10 text-center relative overflow-hidden">
          {sosActive && (
             <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none"></div>
          )}
          
          <h2 className="font-display text-2xl mb-2 text-gs-dark dark:text-white">Emergency Dispatch</h2>
          <p className="opacity-70 text-sm mb-10 max-w-md mx-auto">This will immediately broadcast your location to all assigned emergency contacts and the nearest tactical response unit.</p>
          
          <AnimatePresence>
            {!sosActive ? (
              <motion.button 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTriggerSOS}
                className="w-48 h-48 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.4)] mx-auto relative group transition-colors"
              >
                <div className="absolute inset-0 rounded-full border-4 border-red-400 opacity-0 group-hover:animate-ping"></div>
                <RadioReceiver className="w-12 h-12 mb-2" />
                <span className="font-display font-bold text-2xl uppercase tracking-widest">SOS</span>
              </motion.button>
            ) : (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-48 h-48 rounded-full bg-black/10 dark:bg-white/10 flex flex-col items-center justify-center mx-auto border-4 border-red-600 relative"
              >
                 {countdown > 0 ? (
                   <>
                     <span className="text-6xl font-display font-bold text-red-600">{countdown}</span>
                     <span className="font-mono text-[10px] uppercase tracking-widest mt-2 opacity-70">To Cancel</span>
                   </>
                 ) : (
                   <>
                     <ShieldAlert className="w-12 h-12 text-red-600 mb-2 animate-pulse" />
                     <span className="font-mono text-xs uppercase tracking-widest font-bold text-red-600">Dispatched</span>
                   </>
                 )}
              </motion.div>
            )}
          </AnimatePresence>

          {sosActive && countdown > 0 && (
            <button 
              onClick={cancelSOS}
              className="mt-8 px-8 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded font-mono text-xs tracking-widest uppercase transition-colors"
            >
              Cancel Request
            </button>
          )}

          <div className="grid grid-cols-2 gap-4 mt-12 text-left">
            <div className="p-4 border border-black/5 dark:border-white/5 rounded-lg bg-black/5 dark:bg-white/5">
               <div className="flex items-center gap-3 mb-2">
                 <MapPin className="w-4 h-4 text-blue-500" />
                 <span className="font-mono text-[10px] uppercase tracking-widest">Your Location</span>
               </div>
               <p className="font-mono font-bold text-sm">40.7128° N, -74.0060° W</p>
               <p className="text-xs opacity-60">Accuracy: ±4 meters</p>
            </div>
            
            <div className="p-4 border border-black/5 dark:border-white/5 rounded-lg bg-black/5 dark:bg-white/5">
               <div className="flex items-center gap-3 mb-2">
                 <Phone className="w-4 h-4 text-green-500" />
                 <span className="font-mono text-[10px] uppercase tracking-widest">Active Links</span>
               </div>
               <p className="font-mono font-bold text-sm">3 Contacts • 1 Unit</p>
               <p className="text-xs opacity-60">Status: Ready</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
