import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useRecoilState } from 'recoil';
import * as THREE from 'three';

import { useInit } from '../../hooks/use-init.hook';

import waterVertexShader from '../../resources/shaders/water.vertex.glsl';
import waterFragmentShader from '../../resources/shaders/water.fragment.glsl';

// import { someState } from '../data/recoil/atoms/session.atoms';

interface LocalState {
    sphere: any;
}

export interface WaterShaderProps {}
const defaultProps = {} as Required<WaterShaderProps>;

/**
 * DESCRIPTION
 */
export function WaterShader(props: WaterShaderProps) {
    const {} = { ...defaultProps, ...props };
    // const { scene, gl, camera } = useThree();
    const rootState = useThree();
    // const [global, setGlobal] = useRecoilState(someState);
    const [state, setState] = useState();
    const localState = useRef<LocalState>(initLocalState());

    useInit(() => {
        const params = {
            foamColor: 0x6174ff,
            waterColor: 0x144bff, // #73ef2 - #6174ff
            threshold: 0.4,
        };
        const dudvMap = new THREE.TextureLoader().load('/textures/foam-pattern.png');
        dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

        const sphereGeometry = new THREE.SphereGeometry(10.1, 32, 32);

        const pixelRatio = rootState.gl.getPixelRatio();
        const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
        renderTarget.texture.minFilter = THREE.NearestFilter;
        renderTarget.texture.magFilter = THREE.NearestFilter;
        renderTarget.texture.generateMipmaps = false;
        renderTarget.stencilBuffer = false;
        // rootState.gl.setRenderTarget(renderTarget);

        const shaderMaterial = new THREE.ShaderMaterial({
            defines: {
                DEPTH_PACKING: 1,
                ORTHOGRAPHIC_CAMERA: 0,
            },
            vertexShader: waterVertexShader,
            fragmentShader: waterFragmentShader,
            transparent: true,
            uniforms: {
                tDepth: { value: renderTarget.depthTexture },
                tDudv: { value: dudvMap },
                waterColor: { value: new THREE.Color(params.foamColor) },
                foamColor: { value: new THREE.Color(params.waterColor) },
                cameraNear: { value: rootState.camera.near },
                cameraFar: { value: rootState.camera.far },
                time: { value: 0 },
                threshold: { value: params.threshold },
                foamIntensity: { value: 0.1 },
                resolution: { value: new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio) },
            },
        });

        localState.current.sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);
        localState.current.sphere.position.x = 0;
        rootState.scene.add(localState.current.sphere);

        // Update uniforms for the sphere
        localState.current.sphere.material.uniforms.threshold.value = params.threshold;
        localState.current.sphere.material.uniforms.foamColor.value.set(params.waterColor);
        localState.current.sphere.material.uniforms.waterColor.value.set(params.foamColor);
        localState.current.sphere.material.uniforms.foamIntensity.value = 0.1;

        // box middle
        const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xea4d10 });
        let box6 = new THREE.Mesh(new THREE.BoxGeometry(), boxMaterial);
        box6.position.x = -15;
        box6.rotation.y = Math.PI * 0.1;
        box6.rotation.x = Math.PI * 0.05;
        rootState.scene.add(box6);
    });

    useFrame((state, delta) => {
        if (localState.current.sphere) {
            localState.current.sphere.rotation.y += delta * 0.001;
            localState.current.sphere.material.uniforms.time.value += delta * 0.1;
        }
    });

    return null;
}

function initLocalState(): LocalState {
    return {
        sphere: null,
    };
}
