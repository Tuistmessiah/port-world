import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

import { Planet } from './components-3d/objects/planet.object';
import { MainCam } from './components-3d/main-cam.camera';
import { EarthGlow } from './components-3d/objects/earth-glow.comp-three';
import { StarSphere } from './components-3d/particles/star-sphere.particles';
import { Moon } from './components-3d/objects/moon.three';
// import { PlanetRings } from './components-3d/particles/planet-rings.particles';

export interface CompositionProps {}

const defaultProps = {} as Required<CompositionProps>;

export function Composition(props: CompositionProps) {
    const {} = { ...defaultProps, ...props };

    return (
        <>
            <Perf position="top-right" />
            <ambientLight />
            <directionalLight position={[1, 2, 3]} intensity={2} />
            <directionalLight position={[-1, -1, -1]} intensity={1} />
            {/* <pointLight position={[10, 10, 10]} /> */}
            {/* <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh> */}
            {/* <OrbitControls makeDefault /> */}
            <Planet />
            {/* <Moon /> */}
            <StarSphere />
            {/* <PlanetRings /> */}
            {/* <EarthGlow /> */}
            <MainCam />
        </>
    );
}
