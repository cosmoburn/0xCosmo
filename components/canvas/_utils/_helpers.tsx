import { useMemo } from 'react';
import * as THREE from 'three';
import path from 'path';

export function makeOutlineMesh(
  mesh: THREE.Mesh,
  stroke: number = 0.01,
  colorInput: string | number = 0x000000 // Default color is black
): THREE.Mesh {
  const geo = mesh.geometry;

  // Convert colorInput to a THREE.Color instance
  const color = new THREE.Color(colorInput);

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      outlineColor: { value: color },
    },
    vertexShader: /* glsl */ `
      void main() {
        vec3 newPosition = position + normal * ${stroke.toFixed(10)};
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 outlineColor;

      void main() {
        gl_FragColor = vec4(outlineColor, 1.0);
      }`,
    side: THREE.BackSide,
  });

  return new THREE.Mesh(geo, mat);
}

export function useToonMaterial(
  color: number,
  texturePath: string
): THREE.MeshToonMaterial {
  // Load the gradient map
  const gradientMapTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texturePath);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
  }, [texturePath]);

  // Create the toon material with the gradient map
  const toonMat = new THREE.MeshToonMaterial({
    gradientMap: gradientMapTexture,
    color: color,
    emissive: color,
    emissiveMap: gradientMapTexture,
  });

  return toonMat;
}

export function useMemoizedTexture(path: string) {
  return useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(path);
  }, [path]);
}
