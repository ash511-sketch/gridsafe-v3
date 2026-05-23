import { create } from 'zustand';

export interface IoTDevice {
  id: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'SYNCING';
  battery: number;
  lastPing: Date;
  sensorData: {
    accel: { x: number, y: number, z: number };
    gyro: { x: number, y: number, z: number };
    heartRate: number;
    motionIntensity: number;
    fallDetected: boolean;
  };
}

interface TelemetryState {
  device: IoTDevice;
  isPairing: boolean;
  startPairing: () => void;
  updateTelemetry: (data: Partial<IoTDevice['sensorData']>) => void;
  triggerFall: () => void;
  clearFall: () => void;
  disconnectDevice: () => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
  device: {
    id: 'ESP32-CORE-001',
    name: 'Smart Shoe L',
    status: 'ONLINE',
    battery: 84,
    lastPing: new Date(),
    sensorData: {
      accel: { x: 0, y: -9.8, z: 0 },
      gyro: { x: 0, y: 0, z: 0 },
      heartRate: 72,
      motionIntensity: 12,
      fallDetected: false,
    }
  },
  isPairing: false,
  startPairing: () => set({ isPairing: true }),
  updateTelemetry: (data) => set((state) => ({
    device: {
      ...state.device,
      lastPing: new Date(),
      sensorData: { ...state.device.sensorData, ...data }
    }
  })),
  triggerFall: () => set((state) => ({
    device: { ...state.device, sensorData: { ...state.device.sensorData, fallDetected: true } }
  })),
  clearFall: () => set((state) => ({
    device: { ...state.device, sensorData: { ...state.device.sensorData, fallDetected: false } }
  })),
  disconnectDevice: () => set((state) => ({
    device: { ...state.device, status: 'OFFLINE' }
  }))
}));
