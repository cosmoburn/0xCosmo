'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  vec3,
} from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import WizModel from './WizModel';
// import { Controls } from './Canvas/KeyboardController';
import { Group, Euler, Quaternion, Vector3 } from 'three';
import { Action } from './WizModel';
import { useControls } from 'leva';

const JUMP_FORCE = 1.2;
const MOVE_SPEED = 0.15;
const RUN_SPEED = 0.2;
const MAX_VEL = 1;
const MAX_RUN_VEL = 3;

const Wizard = () => {
  console.log('WIZARD');
  // const forward = useKeyboardControls((state) => state[Controls.forward]);
  // const back = useKeyboardControls((state) => state[Controls.back]);
  // const left = useKeyboardControls((state) => state[Controls.left]);
  // const right = useKeyboardControls((state) => state[Controls.right]);
  // const run = useKeyboardControls((state) => state[Controls.run]);
  // const jump = useKeyboardControls((state) => state[Controls.jump]);
  // const cast = useKeyboardControls((state) => state[Controls.cast]);

  // const [action, setAction] = useState<keyof Action>('sit');

  // const [isJumping, setIsJumping] = useState(false);
  // const [jumpInitiated, setJumpInitiated] = useState(false);

  // useEffect(() => {
  // if (typeof window === 'undefined') return;
  // const handleKeyUp = (e: KeyboardEvent) => {
  // if (e.code === 'Space' || e.key === ' ') {
  // setJumpInitiated(false); // Reset the jump state when spacebar is released
  // }
  // };

  // window.addEventListener('keyup', handleKeyUp);

  // return () => {
  // window.removeEventListener('keyup', handleKeyUp);
  // };
  // }, []);

  // const [isCasting, setIsCasting] = useState(false);

  // const updateActions = () => {
  // if (isJumping) return;
  // if (cast) {
  //   setAction('spell_area');
  //   setIsCasting(true);
  //   setTimeout(() => setIsCasting(false), 2500);
  // } else if (jump && !jumpInitiated) {
  //   setAction('jump');
  // } else if (forward || back || left || right) {
  //   setAction(run ? 'run' : 'walk');
  // } else {
  //   setAction('idle');
  // }
  // };

  const rigidBody = useRef<RapierRigidBody>(null!);
  const wizRef = useRef<Group>(null!);

  // useFrame((state) => {
  // if (isCasting) return;
  // const linvel = vec3(rigidBody.current.linvel());
  // const velocityThreshold = 0.1;
  // const impulse = new Vector3();
  // const currentMoveSpeed = run ? RUN_SPEED : MOVE_SPEED;
  // const currentMaxVel = run ? MAX_RUN_VEL : MAX_VEL;

  // const isMoving = forward || back || left || right;

  // if (jump && !jumpInitiated && !isJumping) {
  //   impulse.y += JUMP_FORCE;
  //   setIsJumping(true);
  //   setJumpInitiated(true);
  // }

  // if (right && linvel.x < currentMaxVel) impulse.x += currentMoveSpeed;
  // if (left && linvel.x > -currentMaxVel) impulse.x -= currentMoveSpeed;
  // if (forward && linvel.z > -currentMaxVel) impulse.z -= currentMoveSpeed;
  // if (back && linvel.z < currentMaxVel) impulse.z += currentMoveSpeed;

  // rigidBody.current.applyImpulse(impulse, true);

  // Rotate the wizard to face the direction of movement.
  // if (isMoving && linvel.length() > velocityThreshold) {
  //   const angle = Math.atan2(linvel.x, linvel.z);
  //   const newRotation = new Euler(0, angle, 0);
  //   const q1 = new Quaternion().setFromEuler(wizRef.current.rotation);
  //   const q2 = new Quaternion().setFromEuler(newRotation);
  //   const result = q1.slerp(q2, 0.35);
  //   wizRef.current.rotation.setFromQuaternion(result);
  // }

  // Camera follow
  // const wizWorldPosition = wizRef.current.getWorldPosition(new Vector3());
  // wizWorldPosition.y += 1;
  // wizWorldPosition.x -= 5;
  // state.camera.position.x = wizWorldPosition.x;
  // state.camera.position.y = wizWorldPosition.y;
  // state.camera.position.z = wizWorldPosition.z + 2.5;
  // state.camera.lookAt(wizWorldPosition);

  // updateActions();
  // });

  const { wiz_x, wiz_y, wiz_z } = useControls(
    'Wiz Position',
    {
      wiz_x: { value: 0.15, min: -50, max: 50, step: 0.1 },
      wiz_y: { value: 0.1, min: -50, max: 50, step: 0.1 },
      wiz_z: { value: -0.2, min: -50, max: 50, step: 0.1 },
    },
    { color: 'green' }
  );

  return (
    <RigidBody
      position={[wiz_x, wiz_y, wiz_z]}
      // position={[0, 1, 0]}
      rotation={[0, -Math.PI / 5, 0]}
      ref={rigidBody}
      colliders={false}
      scale={[1, 1, 1]}
      enabledRotations={[false, true, false]}
      // onCollisionEnter={() => {
      //   setIsJumping(false);
      // }}
    >
      <CapsuleCollider args={[0.6, 0.4]} position={[0, 1, 0]} />
      <group ref={wizRef}>
        <Suspense fallback={null}>
          <WizModel action='sit' />
        </Suspense>
      </group>
    </RigidBody>
  );
};

export default Wizard;
