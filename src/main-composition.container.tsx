import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

import { Planet } from './components-3d/objects/planet.object';
import { MainCam } from './components-3d/main-cam.camera';
import { EarthGlow } from './components-3d/objects/earth-glow.comp-three';
// import { StarSphere } from './components-3d/particles/star-sphere.particles';
// import { PlanetRings } from './components-3d/particles/planet-rings.particles';

export interface MainCompositionProps {}

const defaultProps = {} as Required<MainCompositionProps>;

export function MainComposition(props: MainCompositionProps) {
    const {} = { ...defaultProps, ...props };

    return (
        <>
            <Perf position="top-right" />
            <ambientLight />
            <directionalLight position={[1, 2, 3]} intensity={0.5} />
            <directionalLight position={[-1, -1, -1]} intensity={0.5} />

            {/* <pointLight position={[10, 10, 10]} /> */}
            {/* <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh> */}
            <OrbitControls makeDefault />
            <Planet />
            {/* <StarSphere /> */}
            {/* <PlanetRings /> */}
            {/* <EarthGlow /> */}
            <MainCam />
        </>
    );
}
