// Fragment Shader
uniform sampler2D objectTexture;
uniform bool useTexture;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vertexNormal;

void main () {
  // Hardcoded light direction (45 degrees from east in the xz plane)
  vec3 lightDirection = normalize(vec3(-1.0, 1.0, 1.0));
  
  // Hardcoded ambient light intensity
  vec3 ambientLight = vec3(0.5, 0.5, 0.5);

  vec3 baseColor = useTexture ? texture2D(objectTexture, vUv).rgb : vColor;
  float diffuse = max(dot(vertexNormal, lightDirection), 0.0);
  vec3 diffuseColor = baseColor * diffuse;
  vec3 ambientColor = ambientLight * baseColor;
  vec3 finalColor = diffuseColor + ambientColor;

  gl_FragColor = vec4(finalColor, 1.0);
}