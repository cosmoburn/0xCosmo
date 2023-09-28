'use client';
import { Suspense } from 'react';

import LoadingOverlay from '@/components/canvas/LoadingOverlay/LoadingOverlay';
import NavMenu from '@/components/NavMenu/NavMenu';
import MouseTracer from '@/components/MouseTracer/MouseTracer';
import DebugSettings from '@/components/canvas/_utils/DebugSettings';
import Scene from '@/components/canvas/Scene/Scene';

export default function Home() {
  return (
    <div className='flex h-full w-full'>
      <LoadingOverlay />
      <NavMenu />
      <MouseTracer />
      <DebugSettings />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
