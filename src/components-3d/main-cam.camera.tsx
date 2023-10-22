import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';
import TWEEN from '@tweenjs/tween.js';
import { useNavigate } from 'react-router-dom';

import { pageState } from '../data/recoil/atoms/session.atoms';

import { useKeyPressToggle } from '../hooks/use-key-press-toggle.hook';
import { useMoveTo } from '../hooks/use-move-to.hook';
import { useInit } from '../hooks/use-init.hook';

import { CircularSegmentCurve } from '../resources/curves';
import { Html, OrbitControls } from '@react-three/drei';

import { StyleUtils } from '../utils/style.utils';
import style from './main-cam.module.scss';
const s = StyleUtils.styleMixer(style);

/**
 * Main Camera
 */
export function MainCam() {
    const [page, setPage] = useRecoilState(pageState);
    const navigate = useNavigate();

    const rootState = useThree();

    useInit(() => {
        const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16); // 0.05 is the radius
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(30, 30, 0);
        rootState.scene.add(sphere);
        setSphere(sphere);

        rootState.camera.position.set(40, 40, 40);
        rootState.camera.lookAt(new THREE.Vector3(7, 0, 0));
    });

    const [sphere, setSphere] = useState<THREE.Mesh>();
    useEffect(() => {
        if (!sphere) return;
        const initPos = rootState.camera.position.clone();

        const distance = initPos.distanceTo(rootState.camera.position);
        const duration = distance < 20 ? 3 : 5;

        switch (page.endpoint) {
            case '/':
                moveToTarget(rootState.camera, new THREE.Vector3(40, 40, -40), new THREE.Vector3(0, 0, 0), 1000);
                // TODO: Make it so user cannot control orbit while moving to landing page
                break;
            case '/about':
                // y > 0 is the 'projects' position
                if (rootState.camera.position.y > 0) {
                    moveToTarget(rootState.camera, new THREE.Vector3(19, 0, 12), new THREE.Vector3(10, -5, -20), 2000);
                    setTimeout(() => {
                        moveToTarget(rootState.camera, new THREE.Vector3(10, -5, -20), new THREE.Vector3(-10, 10, 0), 2000);
                    }, 2000);
                } else {
                    moveToTarget(rootState.camera, new THREE.Vector3(10, -5, -20), new THREE.Vector3(-10, 10, 0), 2000);
                }
                break;
            case '/projects':
                // y < 0 is the 'about' position
                if (rootState.camera.position.y < 0) {
                    moveToTarget(rootState.camera, new THREE.Vector3(19, 0, 12), new THREE.Vector3(0, 5, 5), 2000);
                    setTimeout(() => {
                        moveToTarget(rootState.camera, new THREE.Vector3(0, 15, 25), new THREE.Vector3(5, 0, 0), 2000);
                    }, 2000);
                } else {
                    moveToTarget(rootState.camera, new THREE.Vector3(0, 15, 25), new THREE.Vector3(5, 0, 0), 2000);
                }
                break;
            case '/career':
                // x > 0 && z> 0 is on the 'other side' of 'career' position
                if (rootState.camera.position.x > 0 && rootState.camera.position.z > 0) {
                    moveToTarget(rootState.camera, new THREE.Vector3(10, 23, -11), new THREE.Vector3(-19, 0, -12), 2000);
                    setTimeout(() => {
                        // TODO: Put switch in separate function
                        switch (page.section) {
                            case 'academia':
                                moveToTarget(rootState.camera, new THREE.Vector3(-13.5, 9.8, -2.4), new THREE.Vector3(-6, 8, 3), 2000);
                                break;
                            case 'novabase':
                                moveToTarget(rootState.camera, new THREE.Vector3(-11.6, 7, 2), new THREE.Vector3(5, 3, -7), 2000);
                                break;
                            default:
                                moveToTarget(rootState.camera, new THREE.Vector3(-19, 0, -12), new THREE.Vector3(-6, 2.5, 1), 2000);
                        }
                    }, 2000);
                } else {
                    switch (page.section) {
                        case 'academia':
                            moveToTarget(rootState.camera, new THREE.Vector3(-13.5, 9.8, -2.4), new THREE.Vector3(-6, 8, 3), 2000);
                            break;
                        case 'novabase':
                            moveToTarget(rootState.camera, new THREE.Vector3(-11.6, 7, 2), new THREE.Vector3(5, 3, -7), 2000);
                            break;
                        default:
                            moveToTarget(rootState.camera, new THREE.Vector3(-19, 0, -12), new THREE.Vector3(-6, 2.5, 1), 2000);
                    }
                }

                break;
            default:
                break;
        }
    }, [page]);

    useFrame(() => {
        TWEEN.update();
        console.log(rootState.camera.position);
    });

    const { start, stop } = useMoveTo({
        CurveClass: CircularSegmentCurve,
        nPoints: 10,
    });

    useKeyPressToggle('q', () => {
        if (!sphere) return;
        const initPos = sphere.position.clone();
        start({ object: sphere, start: initPos, end: new THREE.Vector3(0, 0, 30), duration: 5 });
    });

    useKeyPressToggle('w', () => {
        stop();
        if (!sphere) return;
        const initPos = sphere.position.clone();
        start({ object: sphere, start: initPos, end: new THREE.Vector3(0, -30, 0), duration: 5 });
    });

    useKeyPressToggle('e', () => {
        stop();
        if (!sphere) return;
        const initPos = sphere.position.clone();
        start({ object: sphere, start: initPos, end: new THREE.Vector3(0, 30, -10), duration: 5 });
    });

    return (
        <>
            {/* Page Tags */}
            {page.endpoint !== '/career' && (
                <mesh position={[-12, 6.5, -7]}>
                    (
                    <Html distanceFactor={60} style={{ pointerEvents: 'all' }}>
                        <button
                            className={s('page-tag')}
                            onClick={() => {
                                navigate('/career');
                                setPage({ endpoint: '/career', section: undefined });
                            }}
                        >
                            {'Career Nation'}
                        </button>
                    </Html>
                    )
                </mesh>
            )}
            {/* Sections Tags: Career */}
            <mesh position={[-6.5, 8.7, 0.57]}>
                {page.endpoint === '/career' && page.section !== 'academia' && (
                    <Html distanceFactor={10}>
                        <button
                            className={s('content')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'academia' });
                            }}
                        >
                            {'Academia Castle'}
                        </button>
                    </Html>
                )}
            </mesh>
            <mesh position={[-8.5, 5.9, -0.64]}>
                {page.endpoint === '/career' && page.section !== 'novabase' && (
                    <Html distanceFactor={10}>
                        <button
                            className={s('content')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'novabase' });
                            }}
                        >
                            {'Novabase Automations'}
                        </button>
                    </Html>
                )}
            </mesh>
        </>
    );
}

function moveToTarget(camera: THREE.Camera, targetPosition: THREE.Vector3, lookAtPosition: THREE.Vector3, duration: number = 2000) {
    const startPosition = camera.position.clone();
    const startLookAt = camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(50)); // Use some scalar to get a point in the direction camera is facing.

    // Position tween
    const positionTweenObj = {
        x: startPosition.x,
        y: startPosition.y,
        z: startPosition.z,
    };

    new TWEEN.Tween(positionTweenObj)
        .to(
            {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
            },
            duration
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            camera.position.set(positionTweenObj.x, positionTweenObj.y, positionTweenObj.z);
        })
        .start();

    // LookAt tween
    const lookAtTweenObj = {
        x: startLookAt.x,
        y: startLookAt.y,
        z: startLookAt.z,
    };

    new TWEEN.Tween(lookAtTweenObj)
        .to(
            {
                x: lookAtPosition.x,
                y: lookAtPosition.y,
                z: lookAtPosition.z,
            },
            duration
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            camera.lookAt(lookAtTweenObj.x, lookAtTweenObj.y, lookAtTweenObj.z);
        })
        .start();
}
