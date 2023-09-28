import { shaderMaterial, useTexture } from '@react-three/drei';
import { useMemo } from 'react';
import { DoubleSide, ShaderMaterial } from 'three';

export function useCloudMaterial(cloudStep: 1 | 2 | 3) {
  const noiseTexture = useTexture(`/textures/clouds_${cloudStep}.jpg`);

  const cloudShader = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uNoiseTexture: { value: noiseTexture },
        uZoom: { value: 1.0 },
        uOpacity: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uNoiseTexture;
        uniform float uZoom;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          vec2 zoomedUV = vUv / uZoom + (1.0 - 1.0/uZoom) * 0.5;
          float noise = texture2D(uNoiseTexture, zoomedUV).r;
          gl_FragColor = vec4(vec3(1.0), noise * uOpacity);
        }
      `,
      transparent: true,
      side: DoubleSide,
      depthTest: false,
    });
  }, [noiseTexture]);

  return cloudShader;
}

useTexture.preload('/textures/clouds_1.jpg');
useTexture.preload('/textures/clouds_2.jpg');
useTexture.preload('/textures/clouds_3.jpg');
