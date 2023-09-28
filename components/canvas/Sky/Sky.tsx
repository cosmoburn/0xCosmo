import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const Sky = () => {
  const skybox = useTexture('/textures/sky.jpg');
  return (
    <>
      {/* SKYBOX */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI * 0.9, 0]}>
        <sphereGeometry args={[64, 64, 64]} />
        <meshStandardMaterial map={skybox} side={THREE.BackSide} />
      </mesh>
    </>
  );
};

export default Sky;

useTexture.preload('/textures/sky.jpg');
