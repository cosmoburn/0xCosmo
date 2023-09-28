'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const MouseTracer = () => {
  const circleRef = useRef(null);
  const largeCircleRef = useRef(null); // New ref for the larger circle
  const [mouseMoved, setMouseMoved] = useState(false);

  useEffect(() => {
    // Pulsating effect for the original circle
    gsap.to(circleRef.current, {
      scale: 1.2,
      opacity: 0.7,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'power1.inOut',
    });

    // Pulsating effect for the larger circle
    gsap.to(largeCircleRef.current, {
      scale: 1.5, // Different scale for a varied pulsing effect
      opacity: 0.3, // Lower opacity
      repeat: -1,
      yoyo: true,
      duration: 0.7, // Different duration for a varied pulsing effect
      ease: 'power1.inOut',
    });

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseMoved) {
        setMouseMoved(true);
      }

      if (circleRef.current && largeCircleRef.current) {
        gsap.to([circleRef.current, largeCircleRef.current], {
          x: event.clientX,
          y: event.clientY,
          duration: 0.5,
          ease: 'power1.out',
        });
      }
    };

    if (circleRef.current && largeCircleRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseMoved]);

  return (
    <div>
      {/* Larger Circle */}
      <div
        ref={largeCircleRef}
        className={`fixed w-4 h-4 bg-purple rounded-full z-40 pointer-events-none ${
          mouseMoved ? 'visible' : 'invisible'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* Original Circle */}
      <div
        ref={circleRef}
        className={`fixed w-3 h-3 bg-purple rounded-full z-50 pointer-events-none ${
          mouseMoved ? 'visible' : 'invisible'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

export default MouseTracer;
