import { Object3D, MeshToonMaterial, TextureLoader } from 'three';

const loader = new TextureLoader();
let gradientMapTexture: THREE.Texture | null = null;

// Load the gradient map texture if we're in the browser
if (typeof document !== 'undefined') {
  loader.load('/textures/gradient_map.png', function (texture: THREE.Texture) {
    gradientMapTexture = texture;
  });
}

// Load the shader chunks
import toon_fs from './fragment.glsl';
import toon_vs from './vertex.glsl';

// Apply the material to the object
// This basically just replaces the default material with a toon material but keeps
// original textureMap and adds a custom gradientMap
export function applyToonCustomMaterial(object: Object3D): void {
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const srcMaterial = (child as THREE.Mesh)
        .material as THREE.MeshStandardMaterial;

      const newMaterial = new MeshToonMaterial({
        map: srcMaterial.map,
        gradientMap: gradientMapTexture,
      });

      newMaterial.onBeforeCompile = (shader) => {
        shader.vertexShader = toon_vs;
        shader.fragmentShader = toon_fs;
        shader.uniforms['v_POLY_texture_textureMap'] = {
          value: srcMaterial.map,
        };
      };

      (child as THREE.Mesh).material = newMaterial;
    }
  });
}
