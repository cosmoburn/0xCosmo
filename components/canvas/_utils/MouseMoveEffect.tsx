import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';

import { useStore } from '@/store/store';

// This component will move the camera based on the mouse movement
const MouseMoveEffect = () => {
  const { camera } = useThree();
  const { cam_x, cam_y, cam_z, menuOpen } = useStore((state) => ({
    cam_x: state.cam_x,
    cam_y: state.cam_y,
    cam_z: state.cam_z,
    menuOpen: state.menuOpen,
  }));

  const sensitivity = menuOpen ? 0.0002 : 0.0003; // how sensitive the mouse movement is
  const lerpFactor = 0.025; // how fast the camera moves to the new position

  // create two positions to lerp between
  const originalPosition = useRef(new Vector3(cam_x, cam_y, cam_z));
  const newPosition = useRef(new Vector3(cam_x, cam_y, cam_z));

  // reset the positions when menuOpen changes
  useEffect(() => {
    gsap.to(newPosition.current, {
      duration: 0.5,
      x: cam_x,
      y: cam_y,
      z: cam_z,
    });
    gsap.to(originalPosition.current, {
      duration: 0.5,
      x: cam_x,
      y: cam_y,
      z: cam_z,
    });
  }, [cam_x, cam_y, cam_z]);

  // setup an event listener to update the new position when the mouse moves
  // it will update the new position based on the original position and the mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;

      const offsetX = (clientX - halfWidth) * sensitivity;
      const offsetY = (halfHeight - clientY) * sensitivity;

      newPosition.current.set(
        originalPosition.current.x + offsetX,
        originalPosition.current.y + offsetY,
        originalPosition.current.z
      );
    };
    window.addEventListener('mousemove', handleMouseMove);

    // cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [originalPosition, sensitivity]);

  // finally, lerp the camera position to the new position
  useFrame(() => {
    camera.position.lerp(newPosition.current, lerpFactor);
  });

  // no need to return anything since this component doesn't render anything
  return null;
};

export default MouseMoveEffect;
