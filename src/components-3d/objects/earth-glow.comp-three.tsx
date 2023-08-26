import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import vertexShader from '../../shaders/vertex.glsl';
import fragmentShader from '../../shaders/fragment.glsl';
import atmosphereVertexShader from '../../shaders/atmosphere.vertex.glsl';
import atmosphereFragmentShader from '../../shaders/atmosphere.fragment.glsl';

import { useInit } from '../../hooks/use-init.hook';

interface LocalState {
    mesh: THREE.Mesh;
    atmosphere: THREE.Mesh;
}

export interface EarthGlowProps {}

const defaultProps = {} as Required<EarthGlowProps>;

/**
 * DESCRIPTION
 */
export function EarthGlow(props: EarthGlowProps) {
    const {} = { ...defaultProps, ...props };
    const rootState = useThree();

    const localState = useRef<LocalState>(initLocalState());

    useInit(() => {
        localState.current.atmosphere.scale.set(1.2, 1.2, 1.2);
        rootState.scene.add(localState.current.atmosphere);
        rootState.scene.add(localState.current.mesh);
    });

    useFrame((state, delta) => {});

    return null;
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
