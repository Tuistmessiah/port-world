import { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

export interface PlanetRingsProps {}

const defaultProps = {} as Required<PlanetRingsProps>;

export function PlanetRings(props: PlanetRingsProps) {
    const {} = { ...defaultProps, ...props };
    const { scene } = useThree();

    const parameters: any = {};
    parameters.count = 10000;
    parameters.size = 0.1;
    parameters.radius = 50;
    parameters.branches = 3;
    parameters.spin = 1;
    parameters.randomness = 0.2;
    parameters.randomnessPower = 3;
    parameters.insideColor = '#ffffff';
    parameters.outsideColor = '#1b3984';

    let geometry: any = null;
    let material: any = null;
    let points: any = null;

    useEffect(() => {
        generatePoints(points, geometry, material, scene, parameters);
    }, []);

    return <></>;
}

function generatePoints(points: any, geometry: any, material: any, scene: any, parameters: any) {
    // Destroy old points
    if (points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(parameters.insideColor);

    for (let i = 0; i < parameters.count; i++) {
        // Position
        const i3 = i * 3;

        // const spinAngle = radius * parameters.spin;
        // const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const insideRadius = 15;

        const height = 1;
        const radius = insideRadius + Math.random() * (parameters.radius - insideRadius);
        const theta = Math.random() * 2 * Math.PI;

        positions[i3] = radius * Math.cos(theta);
        positions[i3 + 1] = Math.random() * height - height / 2;
        positions[i3 + 2] = radius * Math.sin(theta);

        // Color
        const mixedColor = colorInside.clone();

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });

    /**
     * Points
     */
    points = new THREE.Points(geometry, material);
    scene.add(points);
}
