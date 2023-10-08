import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStateObject } from '../../hooks/use-state-object.hook';
import { useMoveTo } from '../../hooks/use-move-to.hook';
import { EllipseAroundPointCurve } from '../../resources/curves';

interface LocalState {
    mesh: THREE.Mesh;
}

export interface MoonProps {}
const defaultProps = {} as Required<MoonProps>;

/**
 * Moon orbiting center
 */
export function Moon(props: MoonProps) {
    const {} = { ...defaultProps, ...props };
    const rootState = useThree();
    // const [global, setGlobal] = useRecoilState(someState);
    const [state, setState] = useState();
    const localState = useStateObject<LocalState>(initLocalState());

    const { start } = useMoveTo({
        CurveClass: EllipseAroundPointCurve,
        nPoints: 10,
        loopable: true,
    });

    useEffect(() => {
        localState.mesh.position.set(0, 10, 150);
        rootState.scene.add(localState.mesh);
        if (!localState.mesh) return;

        const initPos = localState.mesh.position.clone();
        console.log(localState.mesh, start);

        start({ object: localState.mesh, start: initPos, end: new THREE.Vector3(0, -30, 0), duration: 80 });
    }, []);

    return null;
}

function initLocalState(): LocalState {
    const sphereGeometry = new THREE.SphereGeometry(3, 16, 16); // 0.05 is the radius
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x55ff00 });

    return {
        mesh: new THREE.Mesh(sphereGeometry, sphereMaterial),
    };
}
