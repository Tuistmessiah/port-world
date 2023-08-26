// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useGLTF } from '@react-three/drei';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

// import s from './FILE.module.scss';
import { useFrame } from '@react-three/fiber';

export interface PlanetProps {}

const defaultProps = {} as Required<PlanetProps>;

/**
 * DESCRIPTION
 */
export function Planet(props: PlanetProps) {
    const {} = { ...defaultProps, ...props };
    const planet = useGLTF('./models/my-world/my-world-1.gltf') as any;

    useFrame((_state, delta) => {
        // planet.scene.rotation.y += delta * 0.03;
    });

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return <primitive object={planet.scene} />;
}
