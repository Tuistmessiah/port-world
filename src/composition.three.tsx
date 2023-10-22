import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

import { Planet } from './components-3d/objects/planet.object';
import { MainCam } from './components-3d/main-cam.camera';
import { EarthGlow } from './components-3d/objects/earth-glow.comp-three';
import { StarSphere } from './components-3d/particles/star-sphere.particles';
import { Moon } from './components-3d/objects/moon.three';
import { useRecoilState } from 'recoil';
import { pageState } from './data/recoil/atoms/session.atoms';
// import { PlanetRings } from './components-3d/particles/planet-rings.particles';

export function Composition() {
    const [page] = useRecoilState(pageState);

    const orbitControlsEnabled = !page.orbitControls && page.endpoint === '/' && !page.moving;

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
            <Planet />
            {/* <Moon /> */}
            <StarSphere />
            {/* <PlanetRings /> */}
            {/* <EarthGlow /> */}
            <MainCam />
            <OrbitControls
                enableRotate={orbitControlsEnabled}
                enabled={orbitControlsEnabled}
                minDistance={15}
                maxDistance={80}
                // domElement={document.body}
                zoomSpeed={0.5}
                listenToKeyEvents={(e) => {
                    console.log(e);
                }}
            />
        </>
    );
}
