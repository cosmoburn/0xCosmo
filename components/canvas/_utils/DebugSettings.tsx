'use client';
import { useStore } from '@/store/store';
import { Leva, useControls } from 'leva';
import { useEffect } from 'react';

import { LIGHT, CAMERA } from './_default_values';

let debugMode = false;

if (typeof window !== 'undefined') {
  debugMode = window.location.hash === '#debug';
}

const DebugSettings = () => {
  // LIGHTING
  const setLightX = useStore((state) => state.setLightX);
  const setLightY = useStore((state) => state.setLightY);
  const setLightZ = useStore((state) => state.setLightZ);
  const setLightIntensity = useStore((state) => state.setLightIntensity);

  const { light_x, light_y, light_z, intensity } = useControls(
    'Light',
    {
      light_x: { value: LIGHT.x, min: -20, max: 20, step: 0.1 },
      light_y: { value: LIGHT.y, min: -20, max: 20, step: 0.1 },
      light_z: { value: LIGHT.z, min: -20, max: 20, step: 0.1 },
      intensity: { value: LIGHT.intensity, min: 0, max: 10, step: 0.1 },
    },
    { color: 'yellow' }
  );

  // CAMERA
  const setCamX = useStore((state) => state.setCamX);
  const setCamY = useStore((state) => state.setCamY);
  const setCamZ = useStore((state) => state.setCamZ);

  const { cam_x, cam_y, cam_z } = useControls(
    'Camera',
    {
      cam_x: { value: CAMERA.x, min: -20, max: 20, step: 0.1 },
      cam_y: { value: CAMERA.y, min: -20, max: 20, step: 0.1 },
      cam_z: { value: CAMERA.z, min: -20, max: 20, step: 0.1 },
    },
    { color: 'blue' }
  );

  useEffect(() => {
    setLightX(light_x);
    setLightY(light_y);
    setLightZ(light_z);
    setLightIntensity(intensity);
    setCamX(cam_x);
    setCamY(cam_y);
    setCamZ(cam_z);
  }, [
    light_x,
    light_y,
    light_z,
    intensity,
    setLightX,
    setLightY,
    setLightZ,
    setLightIntensity,
    cam_x,
    cam_y,
    cam_z,
    setCamX,
    setCamY,
    setCamZ,
  ]);

  return <Leva hidden={!debugMode} collapsed />;
};

export default DebugSettings;
