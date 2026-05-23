import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Battery, Activity, AlertTriangle, RefreshCw } from 'lucide-react';
import { useTelemetryStore } from '../store/useTelemetryStore';
import { cn } from '../utils/cn';

export function IoTTerminal() {
  const { device, isPairing, startPairing, triggerFall, clearFall, disconnectDevice } = useTelemetryStore();
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [device.sensorData]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-y-auto pb-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Live Hardware Telemetry
            </h3>
            <div className="flex items-center gap-2">
              <span className={cn("w-2 h-2 rounded-full", device.status === 'ONLINE' ? "bg-green-500 animate-pulse" : "bg-red-500")}></span>
              <span className="font-mono text-[10px] uppercase tracking-widest">{device.status}</span>
            </div>
          </div>
          
          <div className="bg-gs-dark dark:bg-black rounded-lg p-4 font-mono text-xs text-green-400 flex-1 overflow-y-auto h-96 relative border border-black/10 dark:border-white/10" ref={logRef}>
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[length:100%_4px] opacity-20"></div>
            <p className="opacity-50">Initializing secure ESP32-WROOM-32 connection...</p>
            <p className="opacity-50">Handshake complete. AES-256 encryption active.</p>
            <p className="opacity-50 mb-4">Listening for BLE telemetry on characteristic UUID 0x2A37...</p>
            
            {/* Simulated Live Logs */}
            <div className="space-y-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} className="opacity-80">
                  [{device.lastPing.toISOString()}] RECV: ACCEL[x:{device.sensorData.accel.x.toFixed(2)} y:{device.sensorData.accel.y.toFixed(2)} z:{device.sensorData.accel.z.toFixed(2)}] HR:{device.sensorData.heartRate}bpm MOT:{device.sensorData.motionIntensity}
                </p>
              ))}
              {device.sensorData.fallDetected && (
                <p className="text-red-500 font-bold animate-pulse mt-2">
                  [CRITICAL] SUDDEN IMPACT DETECTED! G-FORCE EXCEEDED 4.2G. TRIGGERING AUTO-SOS PROTOCOL.
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6">
             <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Device Status</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <Battery className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Battery</span>
                  </div>
                  <span className="font-mono font-bold">{device.battery}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Signal</span>
                  </div>
                  <span className="font-mono font-bold">-42 dBm</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Heart Rate</span>
                  </div>
                  <span className="font-mono font-bold text-red-500">{device.sensorData.heartRate} BPM</span>
                </div>
             </div>
          </div>
          
          <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl shadow-black/5 dark:shadow-black/20 p-6 flex-1">
             <h3 className="font-mono text-xs tracking-widest uppercase opacity-70 mb-4">Diagnostics</h3>
             <div className="space-y-3">
               <button 
                 onClick={device.sensorData.fallDetected ? clearFall : triggerFall}
                 className={cn(
                   "px-5 py-2 text-white font-mono text-[10px] tracking-widest uppercase rounded shadow-lg transition-all w-full text-left flex justify-between",
                   device.sensorData.fallDetected ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                 )}
               >
                 {device.sensorData.fallDetected ? "Clear Fall Alert" : "Simulate Fall Event"} <AlertTriangle className="w-4 h-4" />
               </button>
               
               <button 
                 onClick={disconnectDevice}
                 disabled={device.status === 'OFFLINE'}
                 className="px-5 py-2 bg-transparent border border-black/20 dark:border-white/20 text-gs-dark dark:text-white font-mono text-[10px] tracking-widest uppercase hover:bg-black/5 dark:hover:bg-white/5 rounded transition-all w-full text-left flex justify-between disabled:opacity-50"
               >
                 Force Disconnect <Wifi className="w-4 h-4" />
               </button>
               
               <button 
                 className="px-5 py-2 bg-transparent border border-blue-500/20 text-blue-500 font-mono text-[10px] tracking-widest uppercase hover:bg-blue-500/10 rounded transition-all w-full text-left flex justify-between"
               >
                 Recalibrate IMU <RefreshCw className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
