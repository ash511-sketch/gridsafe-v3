import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CornerUpRight } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const center: [number, number] = [40.7550, -73.9850]; // Manhattan

export function HeatmapPanel() {
  const heatmapData = useMemo(() => {
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const points = [];
    
    // Core intense points
    for (let i = 0; i < 300; i++) {
        points.push({
            lat: 40.7550 + (random() - 0.5) * 0.02,
            lng: -73.9850 + (random() - 0.5) * 0.02,
            intensity: random()
        });
    }

    return points;
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full relative bg-[#0e1626]"
    >
      {/* 
        Fully functional interactive map powered by Leaflet.
        Zero API keys required. Free CartoDB Dark Matter tile layer.
      */}
      <div className="absolute inset-0 z-0 bg-[#0e1626]">
        <MapContainer 
            center={center} 
            zoom={14} 
            style={{ height: '100%', width: '100%', background: '#0e1626' }} 
            zoomControl={false}
            attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {heatmapData.map((point, i) => (
            <CircleMarker
              key={i}
              center={[point.lat, point.lng]}
              radius={10 + point.intensity * 20}
              pathOptions={{
                color: point.intensity > 0.8 ? '#ff0000' : '#ff4500',
                fillColor: point.intensity > 0.8 ? '#ff0000' : '#ff4500',
                fillOpacity: 0.1 + (point.intensity * 0.2),
                weight: 0
              }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="absolute inset-0 pointer-events-none p-6 z-10">
        {/* Top Left Google Maps Info Card Replica */}
        <div className="bg-[#111111]/90 backdrop-blur-sm border border-white/5 rounded shadow-2xl p-4 w-80 pointer-events-auto">
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
           <div className="bg-[#050e1d]/90 backdrop-blur-md border border-[#00f0ff]/20 rounded-xl p-5 w-80 shadow-[0_0_30px_rgba(0,240,255,0.05)] text-white">
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
