'use client';
import { Suspense, lazy } from 'react';

import NavMenu from '@/components/NavMenu/NavMenu';
import MouseTracer from '@/components/MouseTracer/MouseTracer';
import DebugSettings from '@/components/canvas/_utils/DebugSettings';
import Scene from '@/components/canvas/Scene/Scene';
import LoadingOverlay from '@/components/canvas/LoadingOverlay/LoadingOverlay';

export default function Home() {
  console.log('__HOME PAGE__');
  return (
    <div className='flex h-full w-full'>
      <LoadingOverlay />
      <NavMenu />
      <DebugSettings />
      <MouseTracer />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
