import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';

import { deviceState, pageState } from '../../data/recoil/atoms/session.atoms';

import { useInit } from '../../hooks/use-init.hook';
import { useGLTF } from '@react-three/drei';
import { useStateObject } from '../../hooks/use-state-object.hook';
import { MaterialUtils } from '../../utils/material.utils';

import planetVertexShader from '../../resources/shaders/planet.vertex.glsl';
import planetFragmentShader from '../../resources/shaders/planet.fragment.glsl';

// TODO: Make asteroids rotate around moon
// TODO: Position Moon Asterouid so it appears either/both in Landing/AboutMe/Career page (give it a Phi angle for positioning)
// TODO: Add same asteroids around planet
// TODO: Add transparent UI with clickable function so that user goes to asteroid moon (just give it a small UI somewhere with a Easter Egg message)

interface LocalState {
    moon: THREE.Group | null;
    angle: number;
    distance: number;
    speed: number;
    mixer?: THREE.AnimationMixer;
    sphere?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
    sphere1?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
}

export function MoonAsteroids() {
    const rootState = useThree();

    const [device] = useRecoilState(deviceState);
    const [page] = useRecoilState(pageState);
    const localState = useStateObject<LocalState>(initLocalState());

    const moonGltf = useGLTF('./models/my-moon-asteroids/my-moon-1.gltf');

    useInit(() => {
        localState.moon = moonGltf.scene;
        const animations = moonGltf.animations;

        const position = [30, 30, 30];
        const scale = 2;
        localState.moon.position.copy(new THREE.Vector3(...position));
        localState.moon.scale.copy(new THREE.Vector3(scale, scale, scale));
        // Apply Shader
        localState.moon.traverse((child) => {
            MaterialUtils.applyShader(child, planetVertexShader, planetFragmentShader);
        });
        // Animations
        localState.mixer = new THREE.AnimationMixer(localState.moon);
        animations.forEach((clip) => {
            localState.mixer!.clipAction(clip).play();
        });

        rootState.scene.add(localState.moon);

        // Test
        // const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        // const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // localState.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // localState.sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // rootState.scene.add(localState.sphere);
        // rootState.scene.add(localState.sphere1);
    });

    useFrame((state, delta) => {
        // Satellite coords
        if (localState.moon) {
            localState.angle += delta * localState.speed;
            const x = localState.distance * Math.cos(localState.angle);
            const z = localState.distance * Math.sin(localState.angle);
            localState.moon.position.set(x, 0, z);
            localState.moon.lookAt(new THREE.Vector3(0, 0, 0));
        }

        // Animation
        if (localState.mixer) localState.mixer.update(-delta);

        // Camera Follow (when in /attr page)
        if (page.endpoint === '/attr' && localState.moon) {
            const vectorB = localState.moon.position.clone();
            const up = new THREE.Vector3(0, 1, 0);
            const vectorA = up.clone().cross(vectorB).normalize();

            const cameraTargetPosition = localState.moon.position.clone().multiplyScalar(1.3).add(vectorA.multiplyScalar(deviceValues().deviation));
            cameraTargetPosition.y = deviceValues().camY;
            const cameraLookAt = vectorB.multiplyScalar(deviceValues().lookAtDistance);

            const distance = state.camera.position.distanceTo(cameraTargetPosition);

            // Translation Lerp
            // TODO: Make it more readable and correct
            if (distance > 20) {
                state.camera.position.lerp(cameraTargetPosition, 0.01);
                const cameraDirection = new THREE.Vector3(0, 0, -10);
                cameraDirection.applyQuaternion(rootState.camera.quaternion);
                const lookAtPoint = rootState.camera.position.clone().add(cameraDirection);
                // TODO: Lerp here to position between planet and moon
                lookAtPoint.lerp(localState.moon.position.clone(), 0.02);
                state.camera.lookAt(lookAtPoint);
            } else if (distance > 8) {
                state.camera.position.lerp(cameraTargetPosition, 0.01);
                const cameraDirection = new THREE.Vector3(0, 0, -10);
                cameraDirection.applyQuaternion(rootState.camera.quaternion);
                const lookAtPoint = rootState.camera.position.clone().add(cameraDirection);
                lookAtPoint.lerp(cameraLookAt, 0.02);
                state.camera.lookAt(lookAtPoint);
            } else if (distance > 0.01) {
                state.camera.position.lerp(cameraTargetPosition, 0.01);
                const cameraDirection = new THREE.Vector3(0, 0, -10);
                cameraDirection.applyQuaternion(rootState.camera.quaternion);
                const lookAtPoint = rootState.camera.position.clone().add(cameraDirection);
                lookAtPoint.lerp(cameraLookAt, 0.02);
                state.camera.lookAt(lookAtPoint);
            } else {
                state.camera.position.copy(cameraTargetPosition);
                state.camera.lookAt(cameraLookAt);
            }
        }
    });

    return <></>;

    function deviceValues() {
        if (device === 'mobile') {
            return {
                deviation: -14,
                lookAtDistance: 0.8,
                camY: 6,
            };
        } else {
            return {
                deviation: 20,
                lookAtDistance: 0.6,
                camY: 15,
            };
        }
    }
}

function initLocalState(): LocalState {
    return {
        moon: null,
        angle: 0,
        distance: 70,
        speed: 0.05,
    };
}
