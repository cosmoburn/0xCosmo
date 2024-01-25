import * as THREE from 'three';
import { useGLTF, SpriteAnimator } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

import {
  makeOutlineMesh,
  useToonMaterial,
} from '@/components/canvas/_utils/_helpers';
import { useThree } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    rocks: THREE.Mesh;
  };
};

export function Campfire(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/models/campfire.glb') as GLTFResult;

  // Create the toon material with the gradient map
  const toonMat = useToonMaterial(0x74736d, '/textures/fiveTone.jpg');

  // Create the outline mesh
  // const outline = makeOutlineMesh(nodes.rocks, 0.0025, '#5d5c56');
  // outline.position.set(-1.02, 0.02, 0.7);
  // outline.rotation.set(0, Math.PI / 3, 0);

  // add outline mesh to scene
  // const scene = useThree((state) => state.scene);
  // scene.add(outline);

  return (
    <group
      {...props}
      position={[-1.02, 0.02, 0.7]}
      rotation={[0, Math.PI / 3, 0]}
      dispose={null}
    >
      <mesh geometry={nodes.rocks.geometry} material={toonMat} />
      <SpriteAnimator
        scale={[1.05, 1.05, 1.05]}
        position={[0, 0.9, 0]}
        startFrame={0}
        fps={26}
        autoPlay={true}
        loop={true}
        textureDataURL={'/data/fire_spritesheet.json'}
        textureImageURL={'/textures/fire_spritesheet.png'}
        alphaTest={0.01}
      />
      <pointLight
        intensity={1}
        position={[0, 0.15, 0]}
        castShadow
        color='orange'
        shadow-bias={-0.0001}
      />
    </group>
  );
}

export default Campfire;

useGLTF.preload('/models/campfire.glb');
