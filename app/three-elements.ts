import GrassField from '@/components/canvas/Grass/GrassField';
import { Object3DNode } from '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    grassField: Object3DNode<GrassField, typeof GrassField>;
  }
}
