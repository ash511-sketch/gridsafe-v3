import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import { ExternalLink, CornerUpRight } from 'lucide-react';

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: 40.7600, lng: -73.9800 }; // Centered near Manhattan

export function HeatmapPanel() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Check periodically if the global Google Maps API has loaded
    const checkMap = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.visualization) {
        setMapLoaded(true);
        clearInterval(checkMap);
      }
    }, 100);
    return () => clearInterval(checkMap);
  }, []);

  const customDarkStyle = [
    { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
    { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] },
    { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#64779e' }] },
    { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] },
    { featureType: 'landscape.man_made', elementType: 'geometry.stroke', stylers: [{ color: '#334e87' }] },
    { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#023e58' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#283d6a' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6f9ba5' }] },
    { featureType: 'poi', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
    { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#023e58' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#3C7680' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] },
    { featureType: 'road', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2c6675' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#255763' }] },
    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#b0d5ce' }] },
    { featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{ color: '#023e58' }] },
    { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] },
    { featureType: 'transit', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
    { featureType: 'transit.line', elementType: 'geometry.fill', stylers: [{ color: '#283d6a' }] },
    { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#3a4762' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4e6d70' }] }
  ];

  const heatmapData = useMemo(() => {
    if (!mapLoaded || !window.google) return [];
    
    // Always use the same seed for random points
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const points = [];
    
    // Target the long glowing strip shown in the screenshot near Manhattan
    // The hotzone seems to cover a large part of midtown/downtown
    const centerLat = 40.7550;
    const centerLng = -73.9850;
    
    for (let i = 0; i < 2000; i++) {
       const u = random() + random();
       const r = u > 1 ? 2 - u : u;
       const theta = random() * 2 * Math.PI;
       
       const latOffset = r * Math.cos(theta) * 0.04;
       const lngOffset = r * Math.sin(theta) * 0.04;
       
       points.push(
         new window.google.maps.LatLng(
           centerLat + latOffset,
           centerLng + lngOffset
         )
       );
    }
    
    // Add intense core points
    for (let i = 0; i < 500; i++) {
        points.push(new window.google.maps.LatLng(40.7550 + (random() - 0.5) * 0.01, -73.9850 + (random() - 0.5) * 0.01));
    }

    return points;
  }, [mapLoaded]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full relative"
    >
      <div className="absolute inset-0 z-0 bg-[#0e1626]">
        {mapLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={{
              styles: customDarkStyle,
              disableDefaultUI: true,
            }}
          >
            <HeatmapLayer
              data={heatmapData}
              options={{
                radius: 40,
                opacity: 0.8,
                gradient: [
                  'rgba(255, 0, 0, 0)',
                  'rgba(180, 0, 0, 1)',
                  'rgba(200, 30, 0, 1)',
                  'rgba(255, 69, 0, 1)',
                  'rgba(255, 140, 0, 1)',
                  'rgba(255, 215, 0, 1)'
                ]
              }}
            />
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black/10">
            <span className="font-mono text-xs opacity-50 animate-pulse text-white">Initializing Map...</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none p-6 z-10">
        {/* Top Left Google Maps Info Card Replica */}
        <div className="bg-[#111111] border border-white/5 rounded shadow-2xl p-4 w-80 pointer-events-auto">
           <div className="flex justify-between items-start mb-1">
              <h3 className="font-mono font-bold tracking-widest text-white uppercase text-xs">Live Fear Density</h3>
              <div className="flex gap-2">
                 <button className="text-blue-500 hover:text-blue-400"><ExternalLink className="w-4 h-4" /></button>
                 <button className="text-blue-500 hover:text-blue-400"><CornerUpRight className="w-4 h-4" /></button>
              </div>
           </div>
           <p className="text-[#9ca3af] text-xs font-sans mb-3">Manhattan, New York, NY, USA</p>
           <p className="text-[#9ca3af] text-[11px] font-sans">No reviews</p>
        </div>

        {/* Bottom Left Zone Analytics */}
        <div className="absolute bottom-6 left-6 pointer-events-auto">
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
        </div>
      </div>
    </motion.section>
  );
}
