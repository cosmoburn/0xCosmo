import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { use, useEffect, useRef, useState } from 'react';
import { AnimationAction, Group, Mesh } from 'three';

import { applyToonCustomMaterial } from '@/shaders/toon/ToonCusomMaterial';

export type Action = {
  sit: AnimationAction;
  idle: AnimationAction;
  walk: AnimationAction;
  run: AnimationAction;
  jump: AnimationAction;
  spell_area: AnimationAction;
};

interface WizardProps {
  action: keyof Action;
}

const Wizard = ({ action = 'sit' }: WizardProps) => {
  const { scene, animations } = useGLTF('/models/wiz.glb');

  // manually add shadows to all meshes in the model
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useEffect(() => {
    applyToonCustomMaterial(scene);
  }, [scene]);

  const wizRef = useRef<Group>(null!);
  const { actions }: any = useAnimations(animations, wizRef);

  useEffect(() => {
    actions[action]?.reset().fadeIn(0.5).play();
    return () => {
      actions[action]?.fadeOut(0.5);
    };
  }, [action, actions]);

  return (
    <group castShadow ref={wizRef} dispose={null}>
      <primitive caststShadow object={scene} />
    </group>
  );
};

export default React.memo(Wizard);

useGLTF.preload('/models/wiz.glb');
