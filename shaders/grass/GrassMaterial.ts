'use client';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import grass_fs from './fragment.glsl';
import grass_vs from './vertex.glsl';

// Default Constants
const DEFAULT_LIGHT_POSITION = new THREE.Vector3(0, 2, 0).normalize();
const DEFAULT_LIGHT_INTENSITY = 1;
const DEFAULT_WIND_DIRECTION = new THREE.Vector2(1.0, 0.0).normalize();
const DEFAULT_WIND_CENTER = new THREE.Vector2(0.0, 0.0);
const DEFAULT_WIND_AREA = 7.0;
const DEFAULT_WIND_SPEED = 3.5;
const DEFAULT_WIND_POWER = 0.075;

let GRASS_GRADIENT_TEXTURE: THREE.Texture | undefined;
let NOISE_TEXTURE: THREE.Texture | undefined;

if (typeof document !== 'undefined') {
  GRASS_GRADIENT_TEXTURE = new THREE.TextureLoader().load(
    '/textures/grass.png'
  );
  NOISE_TEXTURE = new THREE.TextureLoader().load('/textures/perlin.png');
}

export type GrassMaterialOptions = {
  textureArea?: number;
  lightPosition?: THREE.Vector3;
  lightIntensity?: number;
  windCenter?: THREE.Vector2;
  windPower?: number;
  windArea?: number;
  windSpeed?: number;
};

const createGrassMaterial = (
  options: GrassMaterialOptions = {}
): THREE.ShaderMaterial => {
  const {
    textureArea = 50,
    lightPosition = DEFAULT_LIGHT_POSITION,
    lightIntensity = DEFAULT_LIGHT_INTENSITY,
    windCenter = DEFAULT_WIND_CENTER,
    windArea = DEFAULT_WIND_AREA,
    windPower = DEFAULT_WIND_POWER,
    windSpeed = DEFAULT_WIND_SPEED,
  } = options;

  const lightDirection = lightPosition.normalize();

  const grassMaterial = shaderMaterial(
    {
      uTime: 0,
      uGridSize: textureArea,
      uLightDirection: lightDirection,
      uLightIntensity: lightIntensity,
      uGrassGradient: GRASS_GRADIENT_TEXTURE ?? new THREE.Texture(),
      uNoiseTexture: NOISE_TEXTURE ?? new THREE.Texture(),
      uWindDirection: DEFAULT_WIND_DIRECTION,
      uWindCenter: windCenter,
      uWindArea: windArea,
      uWindPower: windPower,
      uWindSpeed: windSpeed,
      side: THREE.DoubleSide,
    },
    grass_vs,
    grass_fs
  );

  return new grassMaterial();
};

export default createGrassMaterial;
