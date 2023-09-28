import { create } from 'zustand';
import { LIGHT, CAMERA } from '@/components/canvas/_utils/_default_values';

type State = {
  cam_x: number;
  cam_y: number;
  cam_z: number;
  light_x: number;
  light_y: number;
  light_z: number;
  light_intensity: number;
  section: number;
  menuOpen: boolean;
  setSection: (section: number) => void;
  setMenuOpen: (menuOpen: boolean) => void;
  toggleMenuOpen: () => void;
  setCamX: (cam_x: number) => void;
  setCamY: (cam_y: number) => void;
  setCamZ: (cam_z: number) => void;
  setLightX: (light_x: number) => void;
  setLightY: (light_y: number) => void;
  setLightZ: (light_z: number) => void;
  setLightIntensity: (light_intensity: number) => void;
};

export const useStore = create<State>((set) => ({
  cam_x: CAMERA.x,
  cam_y: CAMERA.y,
  cam_z: CAMERA.z,
  light_x: LIGHT.x,
  light_y: LIGHT.y,
  light_z: LIGHT.z,
  light_intensity: LIGHT.intensity,
  section: 0,
  menuOpen: false,
  setSection: (section: number) => set({ section }),
  setMenuOpen: (menuOpen: boolean) => set({ menuOpen }),
  toggleMenuOpen: () => set((state) => ({ menuOpen: !state.menuOpen })),
  setCamX: (cam_x: number) => set({ cam_x }),
  setCamY: (cam_y: number) => set({ cam_y }),
  setCamZ: (cam_z: number) => set({ cam_z }),
  setLightX: (light_x: number) => set({ light_x }),
  setLightY: (light_y: number) => set({ light_y }),
  setLightZ: (light_z: number) => set({ light_z }),
  setLightIntensity: (light_intensity: number) => set({ light_intensity }),
}));
