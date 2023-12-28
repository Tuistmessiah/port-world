uniform sampler2D objectTexture;
uniform bool useTexture;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vertexNormal;

void main () {
  // * Dir + Ambient Colors
  // Hardcoded light direction (45 degrees from east in the xz plane)
  vec3 lightDirection = normalize(vec3(-1.0, 1.0, 1.0));
  vec3 ambientLight = vec3(0.5, 0.5, 0.5);
  vec3 baseColor = useTexture ? texture2D(objectTexture, vUv).rgb : vColor;
  float diffuse = max(dot(vertexNormal, lightDirection), 0.0);
  vec3 diffuseColor = baseColor * diffuse;
  vec3 ambientColor = ambientLight * baseColor;
  vec3 finalColor1 = diffuseColor + ambientColor;

  // Edge light
    vec3 edgeBaseColor = useTexture ? texture2D(objectTexture, vUv).rgb : finalColor1;
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    vec3 finalColor = mix(edgeBaseColor, edgeBaseColor + atmosphere, intensity);
    gl_FragColor = vec4(finalColor, 1.0);
}

// Simple edge
// uniform sampler2D objectTexture;
// uniform bool useTexture;
// uniform vec2 resolution;

// varying vec2 vUv;
// varying vec3 vColor;
// varying vec3 vertexNormal;

// void main () {
//     vec3 baseColor = useTexture ? texture2D(objectTexture, vUv).rgb : vColor;
//     float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
//     vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

//     vec3 finalColor = mix(baseColor, baseColor + atmosphere, intensity);
//     gl_FragColor = vec4(finalColor, 1.0);
// }