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

const camPoints = {
    landing: {
        main: [-9.12, 18.16, -2.19],
        lookAt: [-4.66, 2.11, -10.13],
    },
    about: {
        main: [10, -5, -20],
    },
    career: {
        main: [-20, 0, -12],
        academia: [-13.5, 9.8, -2.4],
        novabase: [-11.6, 7, 2],
        aruki: [-17, 2, 6.3],
        elanza: [-10.2, 2.01, -11.78],
        thepeoplegroup: [-1.75, 13.96, -14.55],
    },
};

const UIPoints = {
    about: {
        main: [5.2, 0.42, -13.85],
    },
    career: {
        main: [-12.64, 2.55, -7.87],
        academia: [-6.5, 8.7, 0.57],
        novabase: [-8.5, 6.9, 0.64],
        aruki: [-10.78, 3.55, -1.93],
        elanza: [-6.64, 5.22, -7.22],
        thepeoplegroup: [-7.0, 6.61, -4.56],
    },
};

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

        rootState.camera.position.set(...(camPoints.landing.main as [number, number, number]));
        rootState.camera.lookAt(new THREE.Vector3(...camPoints.landing.lookAt));
    });

    const [sphere, setSphere] = useState<THREE.Mesh>();
    useEffect(() => {
        if (!sphere) return;
        const initPos = rootState.camera.position.clone();

        const distance = initPos.distanceTo(rootState.camera.position);
        const duration = distance < 20 ? 3 : 5;

        switch (page.endpoint) {
            case '/':
                moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.landing.main), new THREE.Vector3(...camPoints.landing.lookAt), 3000);
                break;
            case '/about':
                // y > 0 is the 'projects' position
                if (rootState.camera.position.y > 0) {
                    moveToTarget(rootState.camera, new THREE.Vector3(19, 0, 12), new THREE.Vector3(...camPoints.about.main), 2000);
                    setTimeout(() => {
                        moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.about.main), new THREE.Vector3(-10, 10, 0), 2000);
                    }, 2000);
                } else {
                    moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.about.main), new THREE.Vector3(-10, 10, 0), 3000);
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
                    moveToTarget(rootState.camera, new THREE.Vector3(0, 15, 25), new THREE.Vector3(5, 0, 0), 3000);
                }
                break;
            case '/career':
                // x > 0 && z> 0 is on the 'other side' of 'career' position
                if (rootState.camera.position.x > 0 && rootState.camera.position.z > 0) {
                    moveToTarget(rootState.camera, new THREE.Vector3(10, 23, -11), new THREE.Vector3(-19, 0, -12), 2000);
                    setTimeout(() => {
                        goToCareerSections();
                    }, 2000);
                } else {
                    goToCareerSections();
                }
                break;
            default:
                break;
        }
    }, [page]);

    function goToCareerSections() {
        switch (page.section) {
            case 'academia':
                moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.career.academia), new THREE.Vector3(-6, 8, 3), 2000);
                break;
            case 'novabase':
                moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.career.novabase), new THREE.Vector3(5, 3, -7), 2000);
                break;
            case 'aruki':
                moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.career.aruki), new THREE.Vector3(0, 5, 1), 2000);
                break;
            case 'elanza':
                moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.career.elanza), new THREE.Vector3(-2, 10, 10), 2000);
                break;
            case 'thepeoplegroup':
                moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.career.thepeoplegroup), new THREE.Vector3(-12, -2, 10), 2000);
                break;
            default:
                moveToTarget(rootState.camera, new THREE.Vector3(...camPoints.career.main), new THREE.Vector3(-6, 3.5, 3), 2000);
        }
    }

    useFrame(() => {
        TWEEN.update();
        // console.log(rootState.camera.position);
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
            {page.endpoint !== '/about' && !page.section && (
                <mesh position={UIPoints.about.main as [number, number, number]}>
                    (
                    <Html style={{ pointerEvents: 'all' }}>
                        <button
                            className={s('page-tag')}
                            onClick={() => {
                                navigate('/about');
                                setPage({ endpoint: '/about', section: undefined });
                            }}
                        >
                            {'About'}
                        </button>
                    </Html>
                    )
                </mesh>
            )}
            {page.endpoint !== '/career' && (
                <mesh position={UIPoints.career.main as [number, number, number]}>
                    (
                    <Html style={{ pointerEvents: 'all' }}>
                        <button
                            className={s('page-tag')}
                            onClick={() => {
                                navigate('/career');
                                setPage({ endpoint: '/career', section: undefined });
                            }}
                        >
                            {'Career'}
                        </button>
                    </Html>
                    )
                </mesh>
            )}
            {/* Sections Tags: Academia */}
            <mesh position={UIPoints.career.academia as [number, number, number]}>
                {page.endpoint === '/career' && page.section !== 'academia' && (
                    <Html>
                        <button
                            className={s('content')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'academia' });
                            }}
                        >
                            {'Academia'}
                        </button>
                    </Html>
                )}
            </mesh>
            {/* Sections Tags: Novabase */}
            <mesh position={UIPoints.career.novabase as [number, number, number]}>
                {page.endpoint === '/career' && page.section !== 'novabase' && (
                    <Html>
                        <button
                            className={s('content')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'novabase' });
                            }}
                        >
                            {'Novabase'}
                        </button>
                    </Html>
                )}
            </mesh>
            {/* Sections Tags: Aruki */}
            <mesh position={UIPoints.career.aruki as [number, number, number]}>
                {page.endpoint === '/career' && page.section !== 'aruki' && (
                    <Html>
                        <button
                            className={s('content')}
                            id={s('aruki')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'aruki' });
                            }}
                        >
                            {'Aruki'}
                        </button>
                    </Html>
                )}
            </mesh>
            {/* Sections Tags: Elanza */}
            <mesh position={UIPoints.career.elanza as [number, number, number]}>
                {page.endpoint === '/career' && page.section !== 'elanza' && (
                    <Html>
                        <div
                            className={s('content')}
                            id={s('elanza')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'elanza' });
                            }}
                        >
                            {'Elanza'}
                        </div>
                    </Html>
                )}
            </mesh>
            // TODO: Place in corect place UI
            {/* Sections Tags: The People Group */}
            <mesh position={UIPoints.career.thepeoplegroup as [number, number, number]}>
                {page.endpoint === '/career' && page.section !== 'thepeoplegroup' && (
                    <Html>
                        <button
                            className={s('content')}
                            id={s('thepeoplegroup')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'thepeoplegroup' });
                            }}
                        >
                            {'GIS Specialists'}
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
