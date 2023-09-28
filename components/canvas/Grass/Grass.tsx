import { useMemo, useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import GrassField, { GrassFieldOptions } from './GrassField';

extend({ GrassField });

const Grass = () => {
  const { scene } = useGLTF('/models/grass_pad.glb');

  const mesh = scene.children[0] as THREE.Mesh;
  const sampler = useMemo(() => new MeshSurfaceSampler(mesh).build(), [mesh]);

  const options: GrassFieldOptions = useMemo(
    () => ({
      textureWidth: 10,
      bladeCount: 20000,
      bladeHeight: 0.03,
      bladeWidth: 0.05,
      samplers: [sampler],
    }),
    [sampler]
  );

  const grassRef = useRef<GrassField>(null!);
  useFrame((state, delta) => {
    if (grassRef.current) {
      grassRef.current.update({ elapsedTime: state.clock.getElapsedTime() });
    }
  });

  return <grassField ref={grassRef} args={[options]} />;
};

export default Grass;

useGLTF.preload('/models/grass_pad.glb');
