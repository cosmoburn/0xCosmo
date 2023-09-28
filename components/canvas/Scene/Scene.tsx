'use client';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

import { useStore } from '@/store/store';
import MouseMoveEffect from '@/components/canvas/_utils/MouseMoveEffect';
import Cliffs from '@/components/canvas/Cliffs/Cliffs';
import Campfire from '@/components/canvas/Campfire/Campfire';
import Wizard from '@/components/canvas/Wizard/Wizard';
import Sky from '@/components/canvas/Sky/Sky';
import Camera from '@/components/canvas/Camera/Camera';
import { Bushes } from '@/components/canvas/Bushes/Bushes';

import Interface from '@/components/Interface/Interface';

import Clouds from '../Clouds/Clouds';

import { CAMERA } from '../_utils/_default_values';

const Scene = () => {
  const { light_x, light_y, light_z, light_intensity } = useStore((state) => ({
    light_x: state.light_x,
    light_y: state.light_y,
    light_z: state.light_z,
    light_intensity: state.light_intensity,
  }));

  return (
    <Canvas
      camera={{ position: [CAMERA.start.x, CAMERA.start.y, CAMERA.start.z] }}
    >
      <Camera />

      {/* UTILITIES */}
      {/* <MouseMoveEffect /> */}

      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[light_x, light_y, light_z]}
        intensity={light_intensity}
      />
      <fog attach='fog' color={'#fff'} near={20} far={100} />

      <Physics>
        {/* intro clouds */}
        <Clouds />
        {/* skybox */}
        <Sky />
        {/* Models */}
        <Cliffs />
        <Campfire />
        <Bushes />
        <Wizard />
      </Physics>

      {/* <Interface /> */}
    </Canvas>
  );
};

export default Scene;
