'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const MouseTracer = () => {
  const circleRef = useRef(null);
  const outerCircleRef = useRef(null);
  const [mouseMoved, setMouseMoved] = useState(false);

  useEffect(() => {
    // Pulsing effect for the inner circle
    gsap.to(circleRef.current, {
      scale: 1.2,
      opacity: 0.7,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'power1.inOut',
    });

    // Pulsing effect for the outer circle
    gsap.to(outerCircleRef.current, {
      scale: 1.5, // Different scale for a varied pulsing effect
      opacity: 0.3, // Lower opacity
      repeat: -1,
      yoyo: true,
      duration: 0.7, // Different duration for a varied pulsing effect
      ease: 'power1.inOut',
    });
    
    // Set up a listener for mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseMoved) {
        setMouseMoved(true);
      }
      
      //animate circles to the mouse position with a small delay
      if (circleRef.current && outerCircleRef.current) {
        gsap.to([circleRef.current, outerCircleRef.current], {
          x: event.clientX,
          y: event.clientY,
          duration: 0.5,
          ease: 'power1.out',
        });
      }
    };

    if (circleRef.current && outerCircleRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseMoved]);

  return (
    <div className='hidden md:block'>
      {/* Outer Circle */}
      <div
        ref={outerCircleRef}
        className={`fixed w-4 h-4 bg-purple rounded-full z-40 pointer-events-none ${
          mouseMoved ? 'visible' : 'invisible'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* Inner Circle */}
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
