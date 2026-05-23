import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareWarning, Camera, MapPin, Mic, Send } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/cn';

export function IncidentReport() {
  const { addNotification, setCitySafetyScore, citySafetyScore, incrementIncidents } = useSystemStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    incrementIncidents();
    setCitySafetyScore(Math.max(10, citySafetyScore - 5));
    addNotification({
      type: 'WARNING',
      message: 'New incident reported near your location. Threat mapping updated.',
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-black/10 dark:border-white/10">
            <MessageSquareWarning className="w-6 h-6 text-gs-maroon dark:text-red-500" />
            <h2 className="font-display text-2xl text-gs-dark dark:text-white">Log Incident</h2>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                 <Send className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Report Submitted Successfully</h3>
              <p className="opacity-70 text-sm">Threat feed and heatmap have been dynamically updated. Authorities notified.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] tracking-widest uppercase opacity-70 mb-2">Incident Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center p-3 border border-black/10 dark:border-white/10 rounded cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <input type="radio" name="type" className="mr-3 accent-gs-crimson" defaultChecked /> Suspicious Activity
                  </label>
                  <label className="flex items-center p-3 border border-black/10 dark:border-white/10 rounded cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <input type="radio" name="type" className="mr-3 accent-gs-crimson" /> Poor Lighting
                  </label>
                  <label className="flex items-center p-3 border border-black/10 dark:border-white/10 rounded cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <input type="radio" name="type" className="mr-3 accent-gs-crimson" /> Harassment
                  </label>
                  <label className="flex items-center p-3 border border-black/10 dark:border-white/10 rounded cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <input type="radio" name="type" className="mr-3 accent-gs-crimson" /> Other
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-widest uppercase opacity-70 mb-2">Description</label>
                <textarea 
                  required
                  rows={4} 
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded p-3 text-sm focus:outline-none focus:border-red-500 transition-colors resize-none" 
                  placeholder="Provide any details about the situation..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase opacity-70 mb-2">Location</label>
                  <button type="button" className="w-full flex justify-between items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded p-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                    <span>Use Current GPS</span>
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </button>
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase opacity-70 mb-2">Media</label>
                  <div className="flex gap-2">
                    <button type="button" className="flex-1 flex justify-center items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded p-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                      <Camera className="w-4 h-4 opacity-70" />
                    </button>
                    <button type="button" className="flex-1 flex justify-center items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded p-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                      <Mic className="w-4 h-4 opacity-70" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <label className="flex items-center text-sm cursor-pointer">
                  <input type="checkbox" className="mr-2 accent-gs-crimson" defaultChecked />
                  Submit Anonymously
                </label>
                <button type="submit" className="px-8 py-3 bg-gs-maroon dark:bg-gs-crimson hover:bg-gs-crimson dark:hover:bg-red-700 text-white font-mono text-xs tracking-widest uppercase rounded shadow-lg transition-all flex items-center gap-2">
                  Dispatch Report <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
}
