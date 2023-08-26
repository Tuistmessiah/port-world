import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useRecoilState } from 'recoil';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import { useInit } from '../../hooks/use-init.hook';

import vertexShader from '../../shaders/vertex.glsl';
import fragmentShader from '../../shaders/fragment.glsl';
import planetVertexShader from '../../shaders/planet.vertex.glsl';
import planetFragmentShader from '../../shaders/planet.fragment.glsl';
import atmosphereVertexShader from '../../shaders/atmosphere.vertex.glsl';
import atmosphereFragmentShader from '../../shaders/atmosphere.fragment.glsl';

// import { someState } from '../data/recoil/atoms/session.atoms';

interface LocalState {
    mesh: THREE.Mesh;
    atmosphere: THREE.Mesh;
}

export interface PlanetProps {}
const defaultProps = {} as Required<PlanetProps>;

/**
 * DESCRIPTION
 */
export function Planet(props: PlanetProps) {
    const {} = { ...defaultProps, ...props };
    const rootState = useThree();
    // const [global, setGlobal] = useRecoilState(someState);
    const [state, setState] = useState();
    const localState = useRef<LocalState | undefined>(initLocalState());

    const planetGltf = useGLTF('./models/my-world/my-world-1.gltf');

    useInit(() => {
        const planet = planetGltf.scene;
        const shaderMaterial = new THREE.ShaderMaterial({
            vertexShader: planetVertexShader,
            fragmentShader: planetFragmentShader,
            uniforms: {
                objectColor: { value: new THREE.Color(1, 1, 1) }, // Replace with your object's color
            },
        });

        // planet.traverse((child) => {
        //     if (child instanceof THREE.Mesh) {
        //         child.material = shaderMaterial;
        //     }
        // });

        planet.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                console.log(child);

                const originalMaterial = child.material;
                const shaderMaterial = new THREE.ShaderMaterial({
                    vertexShader: planetVertexShader,
                    fragmentShader: planetFragmentShader,
                    uniforms: {
                        objectColor: { value: new THREE.Color(1, 1, 1) }, // Default value
                        objectTexture: { value: null }, // Default value
                    },
                    // blending: THREE.AdditiveBlending,
                    // side: THREE.BackSide,
                });
                // If the original material has a color, pass it to the shader
                if (originalMaterial && originalMaterial.color) {
                    shaderMaterial.uniforms.objectColor.value = originalMaterial.color;
                }

                // If the original material has a texture, pass it to the shader
                if (originalMaterial && originalMaterial.map) {
                    shaderMaterial.uniforms.objectTexture.value = originalMaterial.map;
                }

                child.material = shaderMaterial;
            }
        });

        rootState.scene.add(planet);
    });

    useFrame((state, delta) => {
        // planet.scene.rotation.y += delta * 0.03;
    });

    return null;
    // return (
    //     <primitive object={planet.scene}>
    //         <shaderMaterial
    //             attach="material"
    //             vertexShader={vertexShader}
    //             fragmentShader={fragmentShader}
    //             uniforms={{
    //                 globeTexture: {
    //                     value: new THREE.TextureLoader().load('/textures/earth-uv-map.jpg'),
    //                 },
    //             }}
    //         />
    //     </primitive>
    // );
}

function initLocalState(): LocalState {
    return {
        mesh: new THREE.Mesh(
            new THREE.SphereGeometry(5, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    globeTexture: {
                        value: new THREE.TextureLoader().load('/textures/earth-uv-map.jpg'),
                    },
                },
            })
        ),
        atmosphere: new THREE.Mesh(
            new THREE.SphereGeometry(5, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide,
            })
        ),
    };
}
