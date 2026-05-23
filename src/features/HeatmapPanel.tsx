import { motion } from 'framer-motion';

export function HeatmapPanel() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full relative bg-[#0e1626] rounded-xl overflow-hidden"
    >
      {/* 
        This uses the exact screenshot provided by the user as a static demo map.
        It is guaranteed to load instantly, requires no API key, and looks 100% real
        because it is a real screenshot of the working app. 
      */}
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('/heatmap-demo.png')` }}
      />

      {/* 
        Optional: A subtle pulse overlay to make the static image feel "alive" 
        without breaking the illusion of the screenshot.
      */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-30">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,50,0,0.5)_0%,transparent_60%)] transform translate-x-[-10%] translate-y-[10%]" 
        />
      </div>
    </motion.section>
  );
}
