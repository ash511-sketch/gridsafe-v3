import React from 'react';
import { 
  ShieldAlert, LayoutGrid, Map as MapIcon, Navigation, MessageSquareWarning, 
  Footprints, RadioReceiver, TrendingUp, Train, Satellite, Server, 
  Building2, Activity, Bot, BarChart2, MapPin, BellRing, Brain, Cpu 
} from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { id: 'panel-command', icon: LayoutGrid, label: 'Command Center' },
  { id: 'panel-heatmap', icon: MapIcon, label: 'Live Fear Heatmap' },
  { id: 'panel-route', icon: Navigation, label: 'Safe Route AI' },
  { id: 'panel-report', icon: MessageSquareWarning, label: 'Incident Report' },
  { id: 'panel-shoe', icon: Footprints, label: 'Smart Shoe Hub' },
  { id: 'panel-sos', icon: RadioReceiver, label: 'Emergency SOS' },
  { id: 'panel-predictive', icon: TrendingUp, label: 'Predictive Analytics' },
  { id: 'panel-transport', icon: Train, label: 'Transport Safety' },
  { id: 'panel-threat', icon: ShieldAlert, label: 'AI Threat Detection' },
  { id: 'panel-tracking', icon: Satellite, label: 'Live Tracking' },
  { id: 'panel-integrity', icon: Server, label: 'System Integrity' },
  { id: 'panel-planner', icon: Building2, label: 'Urban Planner' },
  { id: 'panel-feed', icon: Activity, label: 'Threat Feed' },
  { id: 'panel-assistant', icon: Bot, label: 'AI Assistant' },
  { id: 'panel-tactical', icon: BarChart2, label: 'Tactical Analytics' },
  { id: 'panel-geofencing', icon: MapPin, label: 'Geofencing' },
  { id: 'panel-notifications', icon: BellRing, label: 'Notifications' },
  { id: 'panel-learning', icon: Brain, label: 'Self-Learning AI' },
  { id: 'panel-iot', icon: Cpu, label: 'ESP32 + IoT' },
];

export function Sidebar() {
  const { activePanel, setActivePanel } = useSystemStore();

  return (
    <aside className="w-20 md:w-64 h-full bg-white/80 dark:bg-black/30 backdrop-blur-xl border-r border-black/5 dark:border-white/10 flex flex-col justify-between py-6 z-20 shrink-0 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all duration-300">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gs-crimson rounded flex items-center justify-center animate-pulse-red shrink-0">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div className="hidden md:block">
            <h1 className="font-display font-bold text-lg leading-tight tracking-wide whitespace-nowrap">GRID SAFE</h1>
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">System v3.2</span>
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id)}
                className={cn(
                  "flex items-center gap-4 px-3 py-2 rounded font-mono text-[10px] uppercase tracking-widest transition-all",
                  isActive 
                    ? "bg-gs-maroon/10 text-gs-maroon dark:bg-white/10 dark:text-white font-semibold opacity-100" 
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="hidden md:block whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
