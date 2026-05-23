import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import { MapPin, Plus, Save, Trash2, Power } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { cn } from '../utils/cn';

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: 40.7128, lng: -74.0060 };


const GEOFENCES = [
  { id: 1, name: 'Safe Zone Alpha', type: 'safe', paths: [{ lat: 40.7150, lng: -74.0080 }, { lat: 40.7150, lng: -74.0020 }, { lat: 40.7110, lng: -74.0020 }, { lat: 40.7110, lng: -74.0080 }], status: 'active' },
  { id: 2, name: 'Restricted Area B', type: 'danger', paths: [{ lat: 40.7200, lng: -74.0100 }, { lat: 40.7200, lng: -74.0060 }, { lat: 40.7170, lng: -74.0060 }, { lat: 40.7170, lng: -74.0100 }], status: 'active' }
];

export function Geofencing() {
  const { isDarkMode } = useSystemStore();
  const [activeFences, setActiveFences] = useState(GEOFENCES);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  React.useEffect(() => {
    const checkMap = setInterval(() => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        clearInterval(checkMap);
      }
    }, 100);
    return () => clearInterval(checkMap);
  }, []);

  const darkStyle = [ { elementType: 'geometry', stylers: [{color: '#242f3e'}] }, { elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}] }, { elementType: 'labels.text.fill', stylers: [{color: '#746855'}] }, { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}] }, { featureType: 'road', elementType: 'geometry.stroke', stylers: [{color: '#212a37'}] }, { featureType: 'road', elementType: 'labels.text.fill', stylers: [{color: '#9ca5b3'}] }, { featureType: 'water', elementType: 'geometry', stylers: [{color: '#17263c'}] } ];
  const lightStyle = [ { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e9e9e9' }, { lightness: 17 }] }, { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 20 }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }, { lightness: 17 }] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }] } ];

  const toggleFenceStatus = (id: number) => {
    setActiveFences(prev => prev.map(f => f.id === id ? { ...f, status: f.status === 'active' ? 'inactive' : 'active' } : f));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel block h-full overflow-hidden pb-10 flex flex-col"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto h-full w-full">
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg p-6 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-mono text-sm tracking-widest uppercase opacity-80 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Virtual Boundaries
             </h3>
             <button className="w-8 h-8 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
               <Plus className="w-4 h-4" />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {activeFences.map(fence => (
               <div key={fence.id} className={cn(
                 "p-4 border rounded-lg transition-colors",
                 fence.type === 'safe' ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5",
                 fence.status === 'inactive' && "opacity-50 grayscale"
               )}>
                 <div className="flex justify-between items-center mb-2">
                   <h4 className="font-bold text-sm">{fence.name}</h4>
                   <span className={cn(
                     "font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded",
                     fence.type === 'safe' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                   )}>{fence.type}</span>
                 </div>
                 <div className="flex items-center gap-2 mt-4">
                    <button 
                      onClick={() => toggleFenceStatus(fence.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-xs font-mono tracking-widest transition-colors border",
                        fence.status === 'active' ? "bg-black/10 dark:bg-white/10 border-black/20 dark:border-white/20 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-500" : "bg-blue-500/20 border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white"
                      )}
                    >
                      <Power className="w-3 h-3" /> {fence.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                    <button className="p-1.5 rounded border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                      <Trash2 className="w-3.5 h-3.5 opacity-70" />
                    </button>
                 </div>
               </div>
            ))}
          </div>

          <button className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg">
             <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>

        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg overflow-hidden shadow-xl lg:col-span-2 relative min-h-[400px]">
          <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
          {mapLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
              options={{ styles: isDarkMode ? darkStyle : lightStyle, disableDefaultUI: true }}
            >
                {activeFences.filter(f => f.status === 'active').map(fence => (
                  <Polygon
                    key={fence.id}
                    paths={fence.paths}
                    options={{
                      fillColor: fence.type === 'safe' ? '#22c55e' : '#ef4444',
                      fillOpacity: 0.2,
                      strokeColor: fence.type === 'safe' ? '#22c55e' : '#ef4444',
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                    }}
                  />
                ))}
              </GoogleMap>
            ) : (
              <div className="w-full h-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                 <span className="font-mono text-xs opacity-50 animate-pulse">Loading Map Data...</span>
              </div>
            )}
          </div>
          
          <div className="absolute top-4 right-4 z-10 flex gap-2">
             <div className="px-3 py-1.5 bg-white dark:bg-black/80 backdrop-blur-md rounded border border-black/10 dark:border-white/10 flex items-center gap-2 font-mono text-[10px] uppercase shadow-lg">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Safe Zone
             </div>
             <div className="px-3 py-1.5 bg-white dark:bg-black/80 backdrop-blur-md rounded border border-black/10 dark:border-white/10 flex items-center gap-2 font-mono text-[10px] uppercase shadow-lg">
                <div className="w-2 h-2 rounded-full bg-red-500"></div> Restricted
             </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
