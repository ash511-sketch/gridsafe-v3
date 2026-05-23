import { useTelemetryStore } from '../store/useTelemetryStore';
import { useSystemStore } from '../store/useSystemStore';

class MockSimulationService {
  private telemetryInterval: NodeJS.Timeout | null = null;
  private threatInterval: NodeJS.Timeout | null = null;

  start() {
    if (this.telemetryInterval) return;

    // Simulate ESP32 10Hz telemetry
    this.telemetryInterval = setInterval(() => {
      const store = useTelemetryStore.getState();
      if (store.device.status === 'ONLINE') {
        store.updateTelemetry({
          heartRate: 70 + Math.floor(Math.random() * 10),
          motionIntensity: Math.floor(Math.random() * 100),
          accel: {
            x: (Math.random() - 0.5) * 2,
            y: -9.8 + (Math.random() - 0.5),
            z: (Math.random() - 0.5) * 2
          }
        });
      }
    }, 500);

    // Simulate random threat events every 30-60 seconds
    this.threatInterval = setInterval(() => {
      const systemStore = useSystemStore.getState();
      if (Math.random() > 0.7) {
        systemStore.addNotification({
          type: 'WARNING',
          message: 'AI detected unusual crowd density near Route A.'
        });
        systemStore.setCitySafetyScore(Math.max(40, systemStore.citySafetyScore - 2));
      }
    }, 45000);
  }

  stop() {
    if (this.telemetryInterval) clearInterval(this.telemetryInterval);
    if (this.threatInterval) clearInterval(this.threatInterval);
    this.telemetryInterval = null;
    this.threatInterval = null;
  }
}

export const simulationService = new MockSimulationService();
