import { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';
import { useGLTF } from '@react-three/drei';
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
import vertexShader from '../../shaders/vertex.glsl';
import fragmentShader from '../../shaders/fragment.glsl';

import { useInit } from '../../hooks/use-init.hook';
console.log('vertexShader', vertexShader);
console.log('fragmentShader', fragmentShader);
// import { someState } from '../data/recoil/atoms/session.atoms';

interface LocalState {
    mesh: THREE.Mesh;
}

export interface EarthGlowProps {}

const defaultProps = {} as Required<EarthGlowProps>;

/**
 * DESCRIPTION
 */
export function EarthGlow(props: EarthGlowProps) {
    const {} = { ...defaultProps, ...props };
    const rootState = useThree();
    const planet = useGLTF('./models/my-world/my-world-1.gltf') as any;
    // const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')

    const localState = useRef<LocalState>({
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
            // new THREE.MeshBasicMaterial({
            //     // color: 0x00ff00,
            //     map: new THREE.TextureLoader().load('/textures/earth-uv-map.jpg'),
            // })
        ),
    });

    useInit(() => {
        rootState.scene.add(localState.current.mesh);
    });
    useFrame((state, delta) => {});

    // const [global, setGlobal] = useRecoilState(someState);
    const [state, setState] = useState();

    return null;
}
