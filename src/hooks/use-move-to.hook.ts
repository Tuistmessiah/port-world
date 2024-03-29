import { Camera, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStateObject } from './use-state-object.hook';

interface MoveToProps {
    // TODO:
    CurveClass: new (start: THREE.Vector3, end: THREE.Vector3) => THREE.Curve<THREE.Vector3>;
    nPoints?: number;
    loopable?: boolean;
}

interface LocalState {
    // CurveClass: new (start: THREE.Vector3, end: THREE.Vector3) => PointCurve;
    curveInstance: THREE.Curve<THREE.Vector3>;
    object: THREE.Object3D | Camera;
    interval: [THREE.Vector3, THREE.Vector3];
    startTime: number;
    accumulatedTime: number;
    duration: number;
}

// let localState: LocalState | undefined;

/** Move object according to a curve */
export function useMoveTo(props: MoveToProps) {
    const rootState = useThree();
    // TODO: Change this component to use useRef instead of localState outside
    // const localState1 = useRef<LocalState | undefined>(undefined);
    let localState = useStateObject<LocalState | undefined>(undefined);

    useFrame((_state, delta) => {
        if (!localState) return;

        localState.accumulatedTime += delta;
        let t = localState.accumulatedTime / localState.duration;

        if (t > 1) {
            if (props.loopable) {
                localState.accumulatedTime = 0;
                t = 0;
            } else {
                stop();
                return;
            }
        }

        const pos = localState.curveInstance.getPoint(t);
        localState.object.position.copy(pos);

        // TODO: Check if arrived at location by proximity
        // state.camera.lookAt(pos2);
        // state.camera.lookAt(0, 0, 0);
    });

    /** Setup new curve and activate movement */
    function start(config: { object: THREE.Object3D | Camera; start: THREE.Vector3; end: THREE.Vector3; duration: number }) {
        if (localState) stop();

        const curveInstance = new props.CurveClass(config.start, config.end);

        // DEv: Debug curve
        // const points = curveInstance.getPoints(props.nPoints ?? 10);
        // const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        // const line = new THREE.Line(geometry, material);
        // rootState.scene.add(line);

        // const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16); // 0.05 is the radius
        // const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // // TODO: Remove older sphere from scene
        // rootState.scene.add(sphere);

        localState = {
            object: config.object,
            interval: [config.start, config.end],
            curveInstance,
            startTime: rootState.clock.getElapsedTime(),
            accumulatedTime: 0,
            duration: config.duration,
        };
    }

    function stop() {
        localState = undefined;
    }

    return {
        start,
        stop,
    };
}
