import React, { useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { simulationService } from './services/MockSimulationService';
import { useSystemStore } from './store/useSystemStore';
import { CommandCenter } from './features/CommandCenter';
import { HeatmapPanel } from './features/HeatmapPanel';
import { SafeRoutePanel } from './features/SafeRoutePanel';
import { IoTTerminal } from './features/IoTTerminal';
import { EmergencySOS } from './features/EmergencySOS';
import { IncidentReport } from './features/IncidentReport';
import { PredictiveAnalytics } from './features/PredictiveAnalytics';
import { TransportSafety } from './features/TransportSafety';
import { AIThreatDetection } from './features/AIThreatDetection';
import { SystemIntegrity } from './features/SystemIntegrity';
import { LiveTracking } from './features/LiveTracking';
import { UrbanPlanner } from './features/UrbanPlanner';
import { ThreatFeed } from './features/ThreatFeed';
import { AIAssistant } from './features/AIAssistant';
import { TacticalAnalytics } from './features/TacticalAnalytics';
import { Geofencing } from './features/Geofencing';
import { Notifications } from './features/Notifications';
import { SelfLearningAI } from './features/SelfLearningAI';
import { IOTConfig } from './features/IOTConfig';

const LIBRARIES = ['visualization', 'places', 'geometry'];

function App() {
  const { isDarkMode, activePanel } = useSystemStore();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBm0fsmZqqwy9ZkBhjP9lubSlOlQA9MW0Q',
    libraries: LIBRARIES
  });

  useEffect(() => {
    simulationService.start();
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return () => simulationService.stop();
  }, [isDarkMode]);

  const renderPanel = () => {
    switch (activePanel) {
      case 'panel-command': return <CommandCenter />;
      case 'panel-heatmap': return <HeatmapPanel />;
      case 'panel-route': return <SafeRoutePanel />;
      case 'panel-shoe': return <IoTTerminal />;
      case 'panel-sos': return <EmergencySOS />;
      case 'panel-report': return <IncidentReport />;
      case 'panel-predictive': return <PredictiveAnalytics />;
      case 'panel-transport': return <TransportSafety />;
      case 'panel-threat': return <AIThreatDetection />;
      case 'panel-integrity': return <SystemIntegrity />;
      case 'panel-tracking': return <LiveTracking />;
      case 'panel-planner': return <UrbanPlanner />;
      case 'panel-feed': return <ThreatFeed />;
      case 'panel-assistant': return <AIAssistant />;
      case 'panel-tactical': return <TacticalAnalytics />;
      case 'panel-geofencing': return <Geofencing />;
      case 'panel-notifications': return <Notifications />;
      case 'panel-learning': return <SelfLearningAI />;
      case 'panel-iot': return <IOTConfig />;
      default: return <div className="p-8"><h2 className="text-xl">Panel In Development</h2><p>The {activePanel} feature is currently being rebuilt in React.</p></div>;
    }
  };

  return (
    <div className="bg-gs-bglight text-gs-dark dark:bg-gs-bgdark dark:text-white font-sans antialiased transition-colors duration-500 h-screen w-screen overflow-hidden flex selection:bg-gs-crimson selection:text-white relative">
      <div id="global-map" className="fixed inset-0 z-0 opacity-50" />
      <div className="fixed inset-0 z-0 bg-black/20 dark:bg-black/60 pointer-events-none transition-colors duration-500" />
      
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <Header />
        <div className="flex-1 overflow-hidden relative p-4 md:p-8">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}

export default App;
