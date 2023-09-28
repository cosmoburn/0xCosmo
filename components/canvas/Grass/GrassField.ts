import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
import createGrassMaterial, {
  GrassMaterialOptions,
} from '@/shaders/grass/GrassMaterial';

export interface GrassFieldOptions {
  textureWidth?: number;
  bladeCount?: number;
  bladeHeight?: number;
  bladeWidth?: number;
  samplers: MeshSurfaceSampler[];
  windSpeed?: number;
  windPower?: number;
}

export type GrassUpdateParams = {
  elapsedTime: number;
  lightPosition?: THREE.Vector3;
  lightIntensity?: number;
  windCenter?: THREE.Vector2;
  windArea?: number;
  windPower?: number;
  windSpeed?: number;
};

class GrassField extends THREE.Group {
  private instanceCount: number;
  private textureWidth: number;
  private baseBladeHeight: number;
  private bladeWidth: number;
  private samplers: MeshSurfaceSampler[];
  private grassGeo!: THREE.InstancedBufferGeometry;
  private grassParticles!: THREE.Mesh<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.ShaderMaterial
  >;

  constructor(options: GrassFieldOptions = { samplers: [] }) {
    const {
      textureWidth = 50,
      bladeCount = 100,
      bladeHeight = 1,
      bladeWidth = 0.8,
      samplers,
    } = options;

    super();
    this.instanceCount = bladeCount;
    this.textureWidth = textureWidth;
    this.baseBladeHeight = bladeHeight;
    this.bladeWidth = bladeWidth;
    this.samplers = samplers;

    this.createField();
  }

  private createField(): void {
    this.setupGrassBladeGeometry();
    this.sampleTerrainPositions();
    this.createInstancedGrass();
  }

  // setup the geometry for a single blade of grass
  private setupGrassBladeGeometry(): void {
    const vertices: number[] = [];
    vertices.push(this.bladeWidth / 2, 0.0, 0.0);
    vertices.push(-this.bladeWidth / 2, 0.0, 0.0);
    vertices.push(0.0, this.baseBladeHeight, 0.0);
    this.grassGeo = new THREE.InstancedBufferGeometry();
    this.grassGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
  }

  // for every sampler, sample random points on it's surface and push to the terrainPositions[]
  private sampleTerrainPositions(): void {
    const terrainPositions: number[] = [];
    const instancesPerSampler = this.instanceCount / this.samplers.length;
    this.samplers.forEach((sampler) => {
      for (let i = 0; i < instancesPerSampler; i++) {
        const posis = new THREE.Vector3();
        sampler.sample(posis);
        terrainPositions.push(posis.x, 0, posis.z);
      }
    });
    this.grassGeo.setAttribute(
      'terrainPosition',
      new THREE.InstancedBufferAttribute(new Float32Array(terrainPositions), 3)
    );
  }

  private createInstancedGrass(): void {
    // Create the instanced geometry
    this.grassGeo.instanceCount = this.instanceCount;

    // create the material with our custom shaders
    const grassMatOptions: GrassMaterialOptions = {
      textureArea: this.textureWidth,
    };
    const grassMat = createGrassMaterial(grassMatOptions);

    // finally create mesh and add it to the scene
    this.grassParticles = new THREE.Mesh(this.grassGeo, grassMat);
    this.grassParticles.frustumCulled = false;
    this.add(this.grassParticles);
  }

  // this gets called on every frame so we can update our grass uniforms for the shader
  public update(params: GrassUpdateParams): void {
    this.grassParticles.material.uniforms.uTime.value = params.elapsedTime;

    if (params.lightPosition) {
      const lightDirection = params.lightPosition.clone().normalize();
      this.grassParticles.material.uniforms.uLightDirection.value =
        lightDirection;
    }

    if (params.lightIntensity !== undefined) {
      this.grassParticles.material.uniforms.uLightIntensity.value =
        params.lightIntensity;
    }

    if (params.windCenter) {
      this.grassParticles.material.uniforms.uWindCenter.value =
        params.windCenter;
    }

    if (params.windArea !== undefined) {
      this.grassParticles.material.uniforms.uWindArea.value = params.windArea;
    }

    if (params.windPower !== undefined) {
      this.grassParticles.material.uniforms.uWindPower.value = params.windPower;
    }

    if (params.windSpeed !== undefined) {
      this.grassParticles.material.uniforms.uWindSpeed.value = params.windSpeed;
    }
  }
}

export default GrassField;
