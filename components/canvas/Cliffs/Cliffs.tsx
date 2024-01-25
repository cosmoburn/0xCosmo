import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

import Grass from '@/components/canvas/Grass/Grass';
import {
  makeOutlineMesh,
  useToonMaterial,
} from '@/components/canvas/_utils/_helpers';

type GLTFResult = GLTF & {
  nodes: {
    cliffs: THREE.Mesh;
    ground: THREE.Mesh;
  };
  materials: {};
};

const Cliffs = (props: JSX.IntrinsicElements['group']) => {
  const { nodes } = useGLTF('/models/cliffs.glb') as GLTFResult;

  // Create the toon material with the gradient map
  const cliffMat = useToonMaterial(0xaa935e, '/textures/fourTone.jpg');
  const grounMat = useToonMaterial(0x86a369, '/textures/fourTone.jpg');

  // const outlineMesh = useMemo(
  //   () => makeOutlineMesh(nodes.cliffs, 0.01, 0xa38b51),
  //   [nodes.cliffs]
  // );

  // const scene = useThree((state) => state.scene);
  // scene.add(outlineMesh);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.cliffs.geometry} material={cliffMat} />
      <RigidBody type='fixed'>
        <mesh geometry={nodes.ground.geometry} material={grounMat} />
      </RigidBody>
      <Grass />
    </group>
  );
};

export default Cliffs;

useGLTF.preload('/models/cliffs.glb');
