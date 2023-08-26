varying vec3 vColor;
varying vec3 vertexNormal;

void main () {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    // Blend the original color with the atmospheric glow based on intensity
    vec3 finalColor = mix(vColor, vColor + atmosphere, intensity);

    gl_FragColor = vec4(finalColor, 1.0);
}