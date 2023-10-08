uniform sampler2D objectTexture;
uniform bool useTexture;
uniform vec2 resolution;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vertexNormal;

void main () {
  if (useTexture) {
    vec3 baseColor = texture2D(objectTexture, vUv).rgb;
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    vec3 finalColor = mix(baseColor, baseColor + atmosphere, intensity);
    gl_FragColor = vec4(finalColor, 1.0);

  } else {
    vec3 baseColor = vColor;
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    vec3 finalColor = mix(vColor, vColor + atmosphere, intensity);
    gl_FragColor = vec4(finalColor, 1.0);
  }
}