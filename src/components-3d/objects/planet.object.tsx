import { useRef, useEffect, useState } from 'react';
import { RootState, useFrame, useThree } from '@react-three/fiber';
import { useRecoilState } from 'recoil';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import { useInit } from '../../hooks/use-init.hook';

import vertexShader from '../../resources/shaders/vertex.glsl';
import fragmentShader from '../../resources/shaders/fragment.glsl';
import planetVertexShader from '../../resources/shaders/planet.vertex.glsl';
import planetFragmentShader from '../../resources/shaders/planet.fragment.glsl';
import atmosphereVertexShader from '../../resources/shaders/atmosphere.vertex.glsl';
import atmosphereFragmentShader from '../../resources/shaders/atmosphere.fragment.glsl';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { useKeyPressToggle } from '../../hooks/use-key-press-toggle.hook';
import { useStateObject } from '../../hooks/use-state-object.hook';

import satellite0GlbPath from '../../assets/models/kenney-space-kit/pipe_ring.glb';
import satellite1GlbPath from '../../assets/models/kenney-space-kit/machine_barrel.glb';

// TODO: Have threeJS components with no UI to be just functions

interface LocalState {
    mesh: THREE.Mesh;
    planet: THREE.Group | null;
    ocean?: THREE.Object3D<THREE.Event>;
    atmosphere: THREE.Mesh;
    composer: EffectComposer;
    satellite: {
        refs: THREE.Group[];
        angle: number;
    };
    raycaster: THREE.Raycaster;
    pointer: THREE.Vector2;
}

function initLocalState(rootState: RootState): LocalState {
    return {
        mesh: new THREE.Mesh(
            new THREE.SphereGeometry(5, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    globeTexture: {
                        value: new THREE.TextureLoader().load('/textures/earth-uv-map.jpg'),
                    },
                },
            })
        ),
        planet: null,
        atmosphere: new THREE.Mesh(
            new THREE.SphereGeometry(5, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide,
            })
        ),
        composer: new EffectComposer(rootState.gl),
        satellite: {
            refs: [],
            angle: 0,
        },
        raycaster: new THREE.Raycaster(),
        pointer: new THREE.Vector2(),
    };
}

export interface PlanetProps {}
const defaultProps = {} as Required<PlanetProps>;

export function Planet(props: PlanetProps) {
    const {} = { ...defaultProps, ...props };
    const rootState = useThree();
    // const [global, setGlobal] = useRecoilState(someState);
    // TODO: have a useObject that uses a mutable useRef
    const localState = useStateObject<LocalState>(initLocalState(rootState));
    const [outlineEffect, setoutlineEffect] = useState(false);

    // TODO: FODA SE. Do my own useGLTF where I can get it from inside the /src folder
    const planetGltf = useGLTF('./models/my-world/my-world-1.gltf');
    const satellite0Gltf = useGLTF(satellite0GlbPath);
    const satellite1Gltf = useGLTF(satellite1GlbPath);

    useInit(() => {
        // TODO: add bloom pass
        // setupAtmosphere(rootState);
        setupPlanetModel(planetGltf.scene, rootState);
        setupSatellites(satellite0Gltf.scene, satellite1Gltf.scene);
        // addBloomPass(rootState, planetGltf.scene, localState);

        window.addEventListener('pointermove', onPointerMove);
    });

    useFrame((state, delta) => {
        // TODO: Find a way to make earth rotate but always move to the correct spot and lock cam position to it
        // planetGltf.scene.rotation.y += delta * 0.03;

        // Satellite coords
        if (localState.satellite.refs.length === 0) return;
        localState.satellite.angle += delta * 0.1;
        const x0 = 14 * Math.cos(localState.satellite.angle);
        const z0 = 14 * Math.sin(localState.satellite.angle);
        localState.satellite.refs[0].position.set(x0, 0, z0);
        localState.satellite.refs[0].lookAt(new THREE.Vector3(0, 0, 0));
        localState.satellite.refs[1].position.set(-x0, x0, -z0);
        localState.satellite.refs[1].lookAt(new THREE.Vector3(0, 0, 0));
        // if (outlineEffect) localState.composer.render();

        if (localState.ocean?.rotation.z) (localState.ocean?.rotation as any).z += 0.0005;
        // update the picking ray with the camera and pointer position
        // localState.raycaster.setFromCamera(localState.pointer, rootState.camera);

        // // calculate objects intersecting the picking ray
        // const intersects = localState.raycaster.intersectObjects(satellite0Gltf.scene.children);

        // for (let i = 0; i < intersects.length; i++) {
        //     if (intersects) (intersects[i].object as any).material.color.set(0xff0000);
        //     // (intersects[i].object as any)?.material.color.set(0xff0000);
        // }
    });

    useKeyPressToggle('w', () => {
        setoutlineEffect((prevstate) => !prevstate);
    });

    return null;

    function onPointerMove(event: any) {
        localState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        localState.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function setupSatellites(satellite0: THREE.Group, satellite1: THREE.Group) {
        rootState.scene.add(satellite0);
        rootState.scene.add(satellite1);
        localState.satellite.refs[0] = satellite0;
        localState.satellite.refs[1] = satellite1;
        localState.satellite.refs[0].position.set(0, 0, 0);
        localState.satellite.refs[1].position.set(0, 0, 0);
    }

    function setupPlanetModel(planet: THREE.Group, rootState: RootState) {
        console.log({ planet });
        planet.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const originalMaterial = child.material;
                const shaderMaterial = new THREE.ShaderMaterial({
                    vertexShader: planetVertexShader,
                    fragmentShader: planetFragmentShader,
                    uniforms: {
                        objectColor: { value: new THREE.Color(1, 1, 1) },
                        objectTexture: { value: null },
                        useTexture: { value: false },
                        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    },
                });

                if (originalMaterial && originalMaterial.color) {
                    shaderMaterial.uniforms.objectColor.value = originalMaterial.color;
                }

                if (originalMaterial && originalMaterial.map) {
                    originalMaterial.map.wrapS = THREE.ClampToEdgeWrapping;
                    originalMaterial.map.wrapT = THREE.ClampToEdgeWrapping;
                    shaderMaterial.uniforms.objectTexture.value = originalMaterial.map;
                    shaderMaterial.uniforms.useTexture.value = true;
                }

                child.material = shaderMaterial;

                window.addEventListener('resize', () => {
                    shaderMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
                });
            }
        });
        localState.planet = planet;
        localState.ocean = localState.planet.children.find((child) => child.name === 'Ocean');
        rootState.scene.add(planet);
    }
}

function addBloomPass(rootState: RootState, object: THREE.Object3D, localState: LocalState) {
    // localState.composer.addPass(new RenderPass(rootState.scene, rootState.camera));
    // const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), rootState.scene, rootState.camera);
    // outlinePass.selectedObjects = [object]; // Replace 'yourObject' with the object you want to highlight.
    // localState.composer.addPass(outlinePass);
    // outlinePass.edgeStrength = 3.0; // Strength of the edges
    // outlinePass.edgeGlow = 0.7; // Amount of glow effect
    // outlinePass.edgeThickness = 2.0; // Thickness of the edge
    // outlinePass.pulsePeriod = 2; // Pulse period for the glow, 0 means no pulse
    // outlinePass.visibleEdgeColor.set('#ffffff'); // Color of the visible edges
    // outlinePass.hiddenEdgeColor.set('#190a05'); // Color of the hidden edge
}

function setupAtmosphere(rootState: RootState) {
    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(13, 50, 50),
        new THREE.ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
        })
    );
    rootState.scene.add(atmosphere);
}
