// this is the same as the vertex shader but with the addition of the instanceMatrix
// which is used to position each instance of the geometry
// instanceMatrix exists by default when using InstancedMesh

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalMatrix *  normal;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0)
}