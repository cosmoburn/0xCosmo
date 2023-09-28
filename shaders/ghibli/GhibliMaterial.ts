import { Color, Vector3 } from 'three';
import { shaderMaterial } from '@react-three/drei';

import ghibli_vs from './vertex.glsl';
import ghibli_fs from './fragment.glsl';
import ghibli_instanced_vs from './instanced.vertex.glsl';

const DEFAULT_COLORS = [
  new Color('#427062').convertLinearToSRGB(),
  new Color('#33594e').convertLinearToSRGB(),
  new Color('#234549').convertLinearToSRGB(),
  new Color('#1e363f').convertLinearToSRGB(),
];
const DEFAULT_BRIGHTNESS_THRESHOLDS = [0.9, 0.45, 0.001];
const DEFAULT_LIGHT_POSITION = new Vector3(0, 2, 2);

export interface GhibliShaderOptions {
  colorMap?: Color[];
  brightnessThresholds?: number[];
  lightPosition?: Vector3;
}

export const createGhibliMaterial = (options: GhibliShaderOptions = {}) => {
  const {
    colorMap = DEFAULT_COLORS,
    brightnessThresholds = DEFAULT_BRIGHTNESS_THRESHOLDS,
    lightPosition = DEFAULT_LIGHT_POSITION,
  } = options;

  const ghibliShader = shaderMaterial(
    {
      colorMap,
      brightnessThresholds,
      lightPosition,
    },
    ghibli_vs,
    ghibli_fs
  );

  return new ghibliShader();
};

export const createInstancedGhibliMaterial = () => {
  const ghibliShader = shaderMaterial(
    {
      colorMap: DEFAULT_COLORS,
      brightnessThresholds: DEFAULT_BRIGHTNESS_THRESHOLDS,
      lightPosition: new Vector3(2, 10, 1),
    },
    ghibli_instanced_vs,
    ghibli_fs
  );

  return new ghibliShader();
};
