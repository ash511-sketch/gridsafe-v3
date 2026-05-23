import React, { useState } from 'react';
import { Sun, Moon, Bell, User, Settings, LogOut, EyeOff, Crosshair, AlertTriangle, Radio, Info } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';
import { cn } from '../../utils/cn';

export function Header() {
  const { isDarkMode, toggleDarkMode, activePanel, notifications, markRead } = useSystemStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPanelName = () => {
    const names: Record<string, string> = {
      'panel-command': 'Command Center',
      'panel-heatmap': 'Live Fear Heatmap',
      'panel-route': 'Safe Route AI',
      'panel-report': 'Incident Report',
      'panel-shoe': 'Smart Shoe Hub',
      'panel-sos': 'Emergency SOS',
      'panel-predictive': 'Predictive Analytics',
      'panel-transport': 'Transport Safety',
      'panel-threat': 'AI Threat Detection',
      'panel-tracking': 'Live Tracking',
      'panel-integrity': 'System Integrity',
      'panel-planner': 'Urban Planner',
      'panel-feed': 'Threat Feed',
      'panel-assistant': 'AI Assistant',
      'panel-tactical': 'Tactical Analytics',
      'panel-geofencing': 'Geofencing',
      'panel-notifications': 'Notifications',
      'panel-learning': 'Self-Learning AI',
      'panel-iot': 'ESP32 + IoT',
    };
    return names[activePanel] || 'Dashboard';
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-black/30 backdrop-blur-xl border-b border-black/5 dark:border-white/10 flex items-center justify-between px-8 z-10 shrink-0 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all duration-300">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-xl dark:text-white text-gs-maroon">{getPanelName()}</h2>
        <span className="inline-flex items-center px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] uppercase rounded-sm border border-transparent bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] ml-4">
          <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></span>
          Live
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <button onClick={toggleDarkMode} className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <div className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-gs-crimson rounded-full animate-pulse-red"></span>
            )}
          </button>
          
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
              <div className="p-3 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 text-xs font-mono tracking-widest uppercase flex justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && <span className="text-gs-crimson">{unreadCount} New</span>}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} onClick={() => markRead(n.id)} className={cn("p-4 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer", n.read && "opacity-50")}>
                    <div className={cn("flex items-center gap-2 mb-1 font-mono text-[10px]", 
                      n.type === 'PANIC' ? 'text-red-500' : n.type === 'WARNING' ? 'text-amber-500' : 'text-blue-500'
                    )}>
                      {n.type === 'PANIC' && <AlertTriangle className="w-3 h-3" />}
                      {n.type === 'WARNING' && <Radio className="w-3 h-3" />}
                      {n.type === 'SYSTEM' && <Info className="w-3 h-3" />}
                      {n.type}
                    </div>
                    <p className="text-sm">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="w-8 h-8 rounded bg-gs-maroon/20 dark:bg-white/20 flex items-center justify-center cursor-pointer hover:bg-gs-maroon/30 dark:hover:bg-white/30 transition-colors">
            <User className="w-4 h-4" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
               <div className="p-4 border-b border-black/10 dark:border-white/10">
                 <p className="font-bold text-sm">Admin Access</p>
                 <p className="text-xs opacity-60 font-mono">ID: AUTH-9021</p>
               </div>
               <div className="p-4 border-b border-black/10 dark:border-white/10">
                 <p className="text-[10px] uppercase tracking-widest font-mono opacity-50 mb-4">Personalization</p>
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-xs flex items-center gap-2"><Bell className="w-4 h-4" /> Sound Alerts</span>
                   <input type="checkbox" className="w-4 h-4" defaultChecked />
                 </div>
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-xs flex items-center gap-2"><EyeOff className="w-4 h-4" /> Stealth Mode</span>
                   <input type="checkbox" className="w-4 h-4" />
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-xs flex items-center gap-2"><Crosshair className="w-4 h-4" /> Auto-Center Map</span>
                   <input type="checkbox" className="w-4 h-4" defaultChecked />
                 </div>
               </div>
               <div className="py-2">
                 <button className="w-full text-left px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"><Settings className="w-4 h-4" /> Advanced Settings</button>
                 <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2"><LogOut className="w-4 h-4" /> Secure Logout</button>
               </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
