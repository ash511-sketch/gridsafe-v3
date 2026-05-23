import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'PANIC' | 'WARNING' | 'SYSTEM' | 'INFO';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface SystemState {
  activePanel: string;
  setActivePanel: (panelId: string) => void;
  
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  notifications: Notification[];
  addNotification: (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markRead: (id: string) => void;
  
  citySafetyScore: number;
  setCitySafetyScore: (score: number) => void;

  activeIncidentsCount: number;
  incrementIncidents: () => void;
  
  // Settings
  soundAlerts: boolean;
  toggleSoundAlerts: () => void;
  stealthMode: boolean;
  toggleStealthMode: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  activePanel: 'panel-command',
  setActivePanel: (panelId) => set({ activePanel: panelId }),
  
  isDarkMode: true, // Matches 'dark' class on HTML
  toggleDarkMode: () => set((state) => {
    const nextMode = !state.isDarkMode;
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: nextMode };
  }),

  notifications: [
    { id: '1', type: 'PANIC', message: 'Sector 7G: Disturbance reported.', timestamp: new Date(), read: false },
    { id: '2', type: 'WARNING', message: 'Unlit street detected on Route B.', timestamp: new Date(), read: false },
    { id: '3', type: 'SYSTEM', message: 'AI Model Retraining Complete (v3.2)', timestamp: new Date(), read: false }
  ],
  addNotification: (notif) => set((state) => ({
    notifications: [{ ...notif, id: Math.random().toString(), timestamp: new Date(), read: false }, ...state.notifications].slice(0, 50)
  })),
  markRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),

  citySafetyScore: 78,
  setCitySafetyScore: (score) => set({ citySafetyScore: score }),
  
  activeIncidentsCount: 3,
  incrementIncidents: () => set((state) => ({ activeIncidentsCount: state.activeIncidentsCount + 1 })),

  soundAlerts: true,
  toggleSoundAlerts: () => set((state) => ({ soundAlerts: !state.soundAlerts })),
  stealthMode: false,
  toggleStealthMode: () => set((state) => ({ stealthMode: !state.stealthMode })),
}));
