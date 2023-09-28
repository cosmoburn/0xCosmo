import { Instance, InstanceProps, Instances, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Color, Euler, Group, Vector3 } from 'three';
import { GLTF } from 'three-stdlib';

import { createInstancedGhibliMaterial } from '@/shaders/ghibli/GhibliMaterial';
import { useStore } from '@/store/store';

type GLTFResult = GLTF & {
  nodes: {
    Foliage: THREE.Mesh;
  };
};

export const BushInstance = (props: InstanceProps) => {
  return <Instance {...props} />;
};

export const Bushes = () => {
  const { nodes } = useGLTF('/models/bush.glb') as GLTFResult;
  const light_x = useStore((state) => state.light_x);
  const light_y = useStore((state) => state.light_y);
  const light_z = useStore((state) => state.light_z);

  const refMesh = useRef<THREE.InstancedMesh>(null!);

  useFrame(() => {
    if (refMesh.current && refMesh.current.material) {
      const material = refMesh.current.material as THREE.ShaderMaterial;
      material.uniforms.lightPosition.value.set(light_x, light_y, light_z);
    }
  });

  const ghibliMaterial = createInstancedGhibliMaterial();

  return (
    <Instances
      // @ts-ignore
      ref={refMesh}
      geometry={nodes.Foliage.geometry}
      material={ghibliMaterial}
      castShadow
      receiveShadow
    >
      {BUSHES.map((tree, index) => (
        <BushInstance
          key={index}
          position={new Vector3(...tree.position)}
          scale={new Vector3(...tree.scale)}
          rotation={new Euler(...tree.rotation)}
        />
      ))}
    </Instances>
  );
};

const BUSHES = [
  {
    position: [-1, -0.1, -2.5],
    scale: [0.45, 0.45, 0.45],
    rotation: [0, 0, 0],
  },
  {
    position: [1.1, -0.3, -2.4],
    scale: [0.6, 0.6, 0.6],
    rotation: [0, 0, 0],
  },
  {
    position: [1.7, 0.3, -1],
    scale: [0.2, 0.2, 0.2],
    rotation: [0, 0, 0],
  },
  {
    position: [1.8, 0.3, 2.2],
    scale: [0.15, 0.15, 0.15],
    rotation: [0, 0, 0],
  },
  {
    position: [-0.7, -0.3, -2],
    scale: [0.15, 0.15, 0.15],
    rotation: [0, 0, 0],
  },
];

useGLTF.preload('/models/bush.glb');
