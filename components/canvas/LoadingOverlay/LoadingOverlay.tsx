import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import IntroLogo from '@/components/IntroLogo/IntroLogo';

const LoadingOverlay = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    THREE.DefaultLoadingManager.onProgress = (
      _url,
      itemsLoaded,
      itemsTotal
    ) => {
      setProgress(itemsLoaded / itemsTotal);
    };
  }, []);

  const overlayRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!loading) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 3, // Set the duration to your desired speed
        ease: 'power2.out',
        onComplete: () => {
          // Optionally do something when the animation is complete
          if (overlayRef.current) overlayRef.current.remove();
        },
      });
    }
  }, [loading]);

  return (
    <div
      ref={overlayRef}
      className='absolute w-full h-full bg-paper z-max flex items-center justify-center flex-col pointer-events-none'
    >
      {loading && (
        <div className='relative w-52 h-52 flex'>
          <IntroLogo progress={progress} />
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;
