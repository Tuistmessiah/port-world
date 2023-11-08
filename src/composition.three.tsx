import { OrbitControls, Line } from '@react-three/drei';
import { Perf } from 'r3f-perf';

import { Planet } from './components-3d/objects/planet.object';
import { MainCam } from './components-3d/main-cam.camera';
import { EarthGlow } from './components-3d/objects/earth-glow.comp-three';
import { StarSphere } from './components-3d/particles/star-sphere.particles';
import { Moon } from './components-3d/objects/moon.three';
import { useRecoilState } from 'recoil';
import { pageState } from './data/recoil/atoms/session.atoms';
// import { PlanetRings } from './components-3d/particles/planet-rings.particles';
import * as THREE from 'three';
import { Suspense, useEffect } from 'react';
import { useInit } from './hooks/use-init.hook';
import { WaterShader } from './components-3d/objects/water-shader.three';

export default function Composition() {
    const [page] = useRecoilState(pageState);

    const orbitControlsEnabled = !page.orbitControls && page.endpoint === '/' && !page.moving;

    useEffect(() => {
        // In index.html
        const loader = document.getElementById('initial-loader');
        if (loader) {
            loader.style.opacity = '1';
            loader.style.animation = 'unset';

            setTimeout(() => {
                loader.style.opacity = '0';
            }, 20);
            setTimeout(() => {
                loader.remove();
            }, 2020); // This should match the duration of your CSS transition
        }
    }, []);

    return (
        <>
            {/* <Perf position="top-right" /> */}
            <ambientLight />
            <directionalLight position={[1, 2, 3]} intensity={2} />
            <directionalLight position={[-1, -1, -1]} intensity={1} />
            {/* <pointLight position={[10, 10, 10]} /> */}
            {/* <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh> */}
            {/* <Suspense
                fallback={
                    <div>
                        <span>{'bleh'}</span>
                    </div>
                }
            > */}
            <Planet />
            {/* <WaterShader /> */}
            {/* <Moon /> */}
            <StarSphere />
            {/* <PlanetRings /> */}
            {/* <EarthGlow /> */}
            <MainCam />
            <OrbitControls
                enableRotate={orbitControlsEnabled}
                enabled={orbitControlsEnabled}
                // minDistance={15}
                // maxDistance={80}
                zoomSpeed={0.5}
                listenToKeyEvents={(e) => {
                    console.log(e);
                }}
            />

            {/* Axis Helper */}
            {/* <axesHelper args={[5]} />
            <group>
                {points.map((p, i) => (
                    <Line key={i} points={[new THREE.Vector3(p[0], p[1], p[2]), new THREE.Vector3(p[3], p[4], p[5])]} color={colors[i]} lineWidth={2} />
                ))}
            </group> */}

            {/* UI Aruki */}
            {/* <mesh position={[-14.8, 1.43, 5.5]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color={[0, 0, 1]} />
            </mesh> */}
        </>
    );
}

const points = [
    [0, 0, 0, 100, 0, 0], // Red Line (X-axis)
    [0, 0, 0, 0, 100, 0], // Green Line (Y-axis)
    [0, 0, 0, 0, 0, 100], // Blue Line (Z-axis)
];

const colors = [
    'hotpink', // X-axis
    'limegreen', // Y-axis
    'dodgerblue', // Z-axis
];
