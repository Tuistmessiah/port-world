uniform vec3 objectColor;
uniform vec2 resolution;

varying vec2 vUv;

varying vec3 vColor;
varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize(normalMatrix * normal);
    vColor = objectColor;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}