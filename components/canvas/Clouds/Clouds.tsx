import React, { useRef, useEffect, useState } from 'react';
import { useCloudMaterial } from './CloudMaterial';
import { useFrame } from '@react-three/fiber';

const Clouds = () => {
  const cloudMat1 = useCloudMaterial(1);
  const cloudMat2 = useCloudMaterial(2);
  const cloudMat3 = useCloudMaterial(3);

  const meshRef1 = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);
  const meshRef3 = useRef<THREE.Mesh>(null!);

  const [startAnimation1, setStartAnimation1] = useState(false);
  const [startAnimation2, setStartAnimation2] = useState(false);
  const [startAnimation3, setStartAnimation3] = useState(false);

  // Delay the animation of the second set of clouds
  useEffect(() => {
    const cloudDelay = 800;
    const secondCloudDelay = 1000;
    const thirdCloudDelay = 1500;
    const timer = setTimeout(() => setStartAnimation1(true), cloudDelay);
    const timer2 = setTimeout(() => setStartAnimation2(true), secondCloudDelay);
    const timer3 = setTimeout(() => setStartAnimation3(true), thirdCloudDelay);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useFrame(() => {
    if (startAnimation1 && meshRef1.current) {
      const mat1 = meshRef1.current.material as THREE.ShaderMaterial;
      mat1.uniforms.uZoom.value += 0.005;
      mat1.uniforms.uOpacity.value -= 0.01;
    }

    if (startAnimation2 && meshRef2.current) {
      const mat2 = meshRef2.current.material as THREE.ShaderMaterial;
      mat2.uniforms.uZoom.value += 0.005;
      mat2.uniforms.uOpacity.value -= 0.01;
    }

    if (startAnimation3 && meshRef3.current) {
      const mat3 = meshRef3.current.material as THREE.ShaderMaterial;
      mat3.uniforms.uZoom.value += 0.0075;
      mat3.uniforms.uOpacity.value -= 0.009;
    }
  });

  return (
    <group>
      <mesh ref={meshRef1} material={cloudMat1}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      <mesh ref={meshRef2} material={cloudMat2} position={[0, 0, -5]}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      <mesh ref={meshRef3} material={cloudMat3} position={[0, 0, -5]}>
        <planeGeometry args={[2, 2]} />
      </mesh>
    </group>
  );
};

export default Clouds;
