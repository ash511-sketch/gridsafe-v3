import React from 'react';
import { motion } from 'framer-motion';
import { GoogleMap } from '@react-google-maps/api';
import { Navigation, MapPin } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { useSystemStore } from '../store/useSystemStore';

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: 40.7128, lng: -74.0060 };


export function SafeRoutePanel() {
  const { isDarkMode } = useSystemStore();
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

  const darkStyle = [ { elementType: 'geometry', stylers: [{color: '#242f3e'}] }, { elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}] }, { elementType: 'labels.text.fill', stylers: [{color: '#746855'}] }, { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{color: '#263c3f'}] }, { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{color: '#6b9a76'}] }, { featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}] }, { featureType: 'road', elementType: 'geometry.stroke', stylers: [{color: '#212a37'}] }, { featureType: 'road', elementType: 'labels.text.fill', stylers: [{color: '#9ca5b3'}] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{color: '#746855'}] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{color: '#1f2835'}] }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{color: '#f3d19c'}] }, { featureType: 'transit', elementType: 'geometry', stylers: [{color: '#2f3948'}] }, { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'water', elementType: 'geometry', stylers: [{color: '#17263c'}] }, { featureType: 'water', elementType: 'labels.text.fill', stylers: [{color: '#515c6d'}] }, { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{color: '#17263c'}] } ];
  const lightStyle = [ { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e9e9e9' }, { lightness: 17 }] }, { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 20 }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }, { lightness: 17 }] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }] }, { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 18 }] }, { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 16 }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 21 }] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dedede' }, { lightness: 21 }] }, { elementType: 'labels.text.stroke', stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }] }, { elementType: 'labels.text.fill', stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }] }, { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#f2f2f2' }, { lightness: 19 }] }, { featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#fefefe' }, { lightness: 20 }] }, { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }] } ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="feature-panel h-full flex flex-col pb-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto h-[600px] w-full">
        
        {/* Standard Route */}
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-lg shadow-xl flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 z-0 bg-slate-900 rounded-xl overflow-hidden">
            {mapLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                options={{ styles: isDarkMode ? darkStyle : lightStyle, disableDefaultUI: true }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/10">
                <span className="font-mono text-xs opacity-50 animate-pulse text-white">Initializing Map...</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-red-500/10 pointer-events-none z-10" />
          
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">
            <h3 className="font-mono text-xs tracking-widest uppercase text-white bg-black/60 backdrop-blur-md px-3 py-2 rounded inline-flex items-center gap-2 w-max">
              <MapPin className="w-4 h-4 text-red-500" /> Standard Route
            </h3>
            
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md border border-red-500/30 rounded-lg p-6 pointer-events-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs opacity-70">Risk Score</span>
                <span className="text-red-500 font-bold font-mono">89/100</span>
              </div>
              <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[89%]" />
              </div>
              <p className="mt-4 text-[10px] uppercase font-mono opacity-60">Path contains unlit areas and low crowd density.</p>
            </div>
          </div>
        </div>

        {/* AI Safe Route */}
        <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-green-500/30 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
            {mapLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: 40.7120, lng: -74.0070 }}
                zoom={15}
                options={{
                  styles: isDarkMode ? darkStyle : lightStyle,
                  disableDefaultUI: true,
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/10">
                <span className="font-mono text-xs opacity-50 animate-pulse text-white">Initializing Map...</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-green-500/5 pointer-events-none z-10" />

          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">
            <h3 className="font-mono text-xs tracking-widest uppercase text-white bg-black/60 backdrop-blur-md px-3 py-2 rounded inline-flex items-center gap-2 w-max border border-green-500/30">
              <Navigation className="w-4 h-4 text-green-500" /> AI Safe Route
            </h3>
            
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md border border-green-500/30 rounded-lg p-6 pointer-events-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs opacity-70">Risk Score</span>
                <span className="text-green-500 font-bold font-mono">12/100</span>
              </div>
              <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[12%]" />
              </div>
              <button className="px-5 py-3 bg-green-600 hover:bg-green-500 text-white font-mono text-[10px] tracking-widest uppercase rounded shadow-lg transition-all w-full mt-4 flex justify-center items-center gap-2 font-bold">
                <Navigation className="w-4 h-4" /> Start Navigation
              </button>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
