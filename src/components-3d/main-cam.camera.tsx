import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';

import { pageState } from '../data/recoil/atoms/session.atoms';

// import { GrannyKnot } from 'three/examples/jsm/curves/CurveExtras.js';
// import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries.js';

import { useKeyPressToggle } from '../hooks/use-key-press-toggle.hook';
import { useMoveTo } from '../hooks/use-move-to.hook';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { useInit } from '../hooks/use-init.hook';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export interface MainCamProps {}

const defaultProps = {} as Required<MainCamProps>;

let composer: EffectComposer;

const params = {
    threshold: 0,
    strength: 1,
    radius: 0,
    exposure: 1,
};

/**
 * Main Camera
 */
export function MainCam(props: MainCamProps) {
    const {} = { ...defaultProps, ...props };
    const [page] = useRecoilState(pageState);

    const rootState = useThree();

    useInit(() => {
        const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16); // 0.05 is the radius
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(30, 30, 0);
        rootState.scene.add(sphere);
        setSphere(sphere);

        rootState.camera.position.set(80, 80, 80);
        rootState.camera.lookAt(new THREE.Vector3(0, 0, 0));

        const renderScene = new RenderPass(rootState.scene, rootState.camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = params.threshold;
        bloomPass.strength = params.strength;
        bloomPass.radius = params.radius;
        const outputPass = new OutputPass();

        composer = new EffectComposer(rootState.gl);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composer.addPass(outputPass);
    });

    const [sphere, setSphere] = useState<THREE.Mesh>();
    useEffect(() => {
        if (!sphere) return;
        const initPos = rootState.camera.position.clone();

        switch (page) {
            case '/':
                break;
            case '/about':
                start({ object: rootState.camera, start: initPos, end: new THREE.Vector3(7, 3, -19), duration: 5 });
                break;
            case '/projects':
                start({ object: rootState.camera, start: initPos, end: new THREE.Vector3(-20, 13, -16), duration: 5 });
                break;
            case '/career':
                start({ object: rootState.camera, start: initPos, end: new THREE.Vector3(2, 7, 29), duration: 5 });
                break;
            case '/media':
                start({ object: rootState.camera, start: initPos, end: new THREE.Vector3(16, -24, 0.5), duration: 5 });
                break;
            default:
                break;
        }
    }, [page]);

    useFrame(() => {
        // composer.render();
    });

    const { start, stop } = useMoveTo({
        CurveClass: CircularSegmentCurve,
        // curve: new CircularSegmentCurve(new THREE.Vector3(30, 0, 0), new THREE.Vector3(0, 30, 0)),
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

    return null;
}

class CircularSegmentCurve extends THREE.Curve<THREE.Vector3> {
    start = new THREE.Vector3();
    end = new THREE.Vector3();

    constructor(start: THREE.Vector3, end: THREE.Vector3) {
        super();
        this.start = start;
        this.end = end;
    }

    // getPoint(t: number) {
    //     const angle = this.start.angleTo(this.end) * t;
    //     const axis = new THREE.Vector3().crossVectors(this.start, this.end).normalize();
    //     const rotationMatrix = new THREE.Matrix4().makeRotationAxis(axis, angle);

    //     return this.start.clone().applyMatrix4(rotationMatrix);
    // }

    getPoint(t: number): THREE.Vector3 {
        return new THREE.Vector3().lerpVectors(this.start, this.end, t);
    }
}
