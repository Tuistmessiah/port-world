import * as THREE from 'three';
import { Line, OrbitControls, OrbitControlsProps } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { pageState } from './data/recoil/atoms/session.atoms';

import { Planet } from './components-3d/objects/planet.object';
import { MainCam } from './components-3d/main-cam.camera';
import { StarSphere } from './components-3d/particles/star-sphere.particles';
import { MoonAsteroids } from './components-3d/objects/moon-asteroids.three';
import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils';

export default function Composition() {
    const [page] = useRecoilState(pageState);

    // const orbitControlsEnabled = !page.orbitControls && page.endpoint === '/' && !page.moving;
    const orbitControlsEnabled = !page.orbitControls && !page.moving;

    const orbitControlsRef = useRef<any>();

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
            {/* ----- Lighting ----- */}

            {/* <Perf position="top-right" /> */}
            <ambientLight intensity={0.5} />
            {/* <directionalLight position={[1, 2, 3]} intensity={2} />
            <directionalLight position={[-1, -1, -1]} intensity={1} /> */}
            {/* <pointLight position={[10, 10, 10]} /> */}
            {/* <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh> */}

            {/* ----- Objects ----- */}

            <Planet />
            {/* <WaterShader /> */}
            {/* <Moon /> */}
            <MoonAsteroids />
            <StarSphere />
            {/* <PlanetRings /> */}
            {/* <EarthGlow /> */}

            {/* ----- Cam & Controls ----- */}

            <MainCam />
            {/* <OrbitControls
                ref={orbitControlsRef}
                // enableRotate={orbitControlsEnabled}
                // enabled={orbitControlsEnabled}
                // minDistance={15}
                // maxDistance={80}
                zoomSpeed={0.5}
                listenToKeyEvents={(e) => {}}
            /> */}

            {/* ----- Testing ----- */}

            {/* <axesHelper args={[5]} />
            <group>
                {points.map((p, i) => (
                    <Line key={i} points={[new THREE.Vector3(p[0], p[1], p[2]), new THREE.Vector3(p[3], p[4], p[5])]} color={colors[i]} lineWidth={2} />
                ))}
            </group> */}

            {/* Balls for positions */}
            {/* <mesh position={[30, 30, 30]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color={0xff0000} />
            </mesh> */}
            {/* <mesh position={[-5.1865, 7.4251, -11.0316]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color={0x00ff00} />
            </mesh>
            <mesh position={[-2.4725, 10.2404, -6.2274]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color={0x0000ff} />
            </mesh> */}
        </>
    );
}

// Variables
/*
  Logo se ve:
  Career UI position for tablet: [-2.4042, 15.3193, -3.1088]
*/

// Axis config
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
