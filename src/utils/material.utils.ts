import * as THREE from 'three';

export abstract class MaterialUtils {
    static applyShader(object3D: THREE.Object3D<THREE.Event>, vertexShader: string, fragmentShader: string) {
        const originalMaterial = (object3D as any).material;
        const shaderMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                objectColor: { value: new THREE.Color(1, 1, 1) },
                objectTexture: { value: null },
                useTexture: { value: false },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            },
        });

        if (originalMaterial && originalMaterial.color) {
            shaderMaterial.uniforms.objectColor.value = originalMaterial.color;
        }

        if (originalMaterial && originalMaterial.map) {
            originalMaterial.map.wrapS = THREE.ClampToEdgeWrapping;
            originalMaterial.map.wrapT = THREE.ClampToEdgeWrapping;
            shaderMaterial.uniforms.objectTexture.value = originalMaterial.map;
            shaderMaterial.uniforms.useTexture.value = true;
        }

        (object3D as any).material = shaderMaterial;

        window.addEventListener('resize', () => {
            shaderMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
        });
    }
}
