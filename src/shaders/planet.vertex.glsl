uniform vec3 objectColor;
varying vec3 vColor;
varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize(normalMatrix * normal);
    vColor = objectColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}