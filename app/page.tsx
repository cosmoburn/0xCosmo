'use client';
import { Suspense } from 'react';

import LoadingOverlay from '@/components/canvas/LoadingOverlay/LoadingOverlay';
import NavMenu from '@/components/NavMenu/NavMenu';
import MouseTracer from '@/components/MouseTracer/MouseTracer';
import DebugSettings from '@/components/canvas/_utils/DebugSettings';
import Scene from '@/components/canvas/Scene/Scene';
import Interface from '@/components/Interface/Interface';
import SocialMenu from '@/components/SocialMenu/SocialMenu';

export default function Home() {
  return (
    // <div className='flex h-full w-full'>
    <>
      <LoadingOverlay />
      <NavMenu />
      <MouseTracer />
      <DebugSettings />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Interface />
      <div className='absolute bottom-8 flex w-full justify-center md:justify-end px-8'>
        <SocialMenu />
      </div>
    </>
    // </div>
  );
}
