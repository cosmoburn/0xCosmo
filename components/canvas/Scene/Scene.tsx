'use client';

import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { ScrollControls, Scroll, Html } from '@react-three/drei';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useStore } from '@/store/store';
import MouseMoveEffect from '@/components/canvas/_utils/MouseMoveEffect';
import Cliffs from '@/components/canvas/Cliffs/Cliffs';
import Campfire from '@/components/canvas/Campfire/Campfire';
import Wizard from '@/components/canvas/Wizard/Wizard';
import Sky from '@/components/canvas/Sky/Sky';
import Camera from '@/components/canvas/Camera/Camera';
import { Bushes } from '@/components/canvas/Bushes/Bushes';
import Clouds from '../Clouds/Clouds';
import { CAMERA } from '../_utils/_default_values';

import Interface from '@/components/Interface/Interface';

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  const { light_x, light_y, light_z, light_intensity } = useStore((state) => ({
    light_x: state.light_x,
    light_y: state.light_y,
    light_z: state.light_z,
    light_intensity: state.light_intensity,
  }));

  return (
    <Canvas
      className='canvas'
      camera={{ position: [CAMERA.start.x, CAMERA.start.y, CAMERA.start.z] }}
    >
      {/* <ScrollControls pages={2} damping={0.1}> */}
      <Camera />

      {/* UTILITIES */}
      <MouseMoveEffect />

      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[light_x, light_y, light_z]}
        intensity={light_intensity}
      />
      <fog attach='fog' color={'#fff'} near={25} far={100} />

      <Physics>
        <Clouds />
        {/* <Scroll> */}
        <Sky />
        <Cliffs />
        <Campfire />
        <Bushes />
        <Wizard />
        {/* </Scroll> */}
      </Physics>

      {/* <Scroll html> */}
      {/* <Scroll html> */}

      {/* </Scroll> */}
      {/* </Scroll> */}
      {/* </ScrollControls> */}
    </Canvas>
  );
};

export default Scene;
