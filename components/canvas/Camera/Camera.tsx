import { useState, useEffect, useRef } from 'react';
import { Object3D } from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';

import { useStore } from '@/store/store';

const Camera = () => {
  const { cam_x, cam_y, cam_z, menuOpen } = useStore((state) => ({
    cam_x: state.cam_x,
    cam_y: state.cam_y,
    cam_z: state.cam_z,
    menuOpen: state.menuOpen,
  }));

  const camera = useThree((state) => state.camera);
  const firstLoad = useRef(true);

  // Create a dummy object to aim the camera at
  const dummy = useRef(new Object3D()).current;
  useEffect(() => {
    // Set the dummy object's position to the desired initial target
    dummy.position.set(-1.5, 1.3, 6.3);
  }, [dummy]);

  useEffect(() => {
    gsap.to(camera.position, {
      x: cam_x,
      y: cam_y,
      z: cam_z,
      duration: firstLoad.current ? 4 : 1,
      ease: 'power1.inOut',
    });

    firstLoad.current = false;

    if (menuOpen) {
      // If the menu is open animate the dummy object to new position we want to look at
      gsap.to(dummy.position, {
        x: 0,
        y: 1,
        z: 0,
        duration: 1,
        ease: 'power1.inOut',
      });
    } else {
      gsap.to(dummy.position, {
        x: -3,
        y: 1,
        z: 0,
        duration: 1,
        ease: 'power1.inOut',
      });
    }
  }, [
    cam_x,
    cam_y,
    cam_z,
    menuOpen,
    camera.position,
    dummy.position,
    firstLoad,
  ]);

  useFrame(() => {
    camera.lookAt(dummy.position);
  });

  return null;
};

export default Camera;
