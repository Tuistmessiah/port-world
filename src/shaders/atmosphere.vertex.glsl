varying vec3 vertexNormal;

void main () {
  vertexNormal = normalize(normalMatrix  * normal);
  vec4 vViewPosition = modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * vViewPosition ;
}