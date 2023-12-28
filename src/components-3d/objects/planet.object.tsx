import { useEffect, useState } from 'react';
import { RootState, useFrame, useThree } from '@react-three/fiber';
import { useRecoilState } from 'recoil';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import TWEEN from '@tweenjs/tween.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { useInit } from '../../hooks/use-init.hook';
import { pageState } from '../../data/recoil/atoms/session.atoms';

import vertexShader from '../../resources/shaders/vertex.glsl';
import fragmentShader from '../../resources/shaders/fragment.glsl';
import planetVertexShader from '../../resources/shaders/planet.vertex.glsl';
import planetFragmentShader from '../../resources/shaders/planet.fragment.glsl';
import edgeLightVertexShader from '../../resources/shaders/edge-light.vertex.glsl';
import edgeLightFragmentShader from '../../resources/shaders/edge-light.fragment.glsl';
import atmosphereVertexShader from '../../resources/shaders/atmosphere.vertex.glsl';
import atmosphereFragmentShader from '../../resources/shaders/atmosphere.fragment.glsl';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
// import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
// import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { useKeyPressToggle } from '../../hooks/use-key-press-toggle.hook';
import { useStateObject } from '../../hooks/use-state-object.hook';

import satellite0GlbPath from '../../assets/models/kenney-space-kit/pipe_ring.glb';
import satellite1GlbPath from '../../assets/models/kenney-space-kit/machine_barrel.glb';
import { MaterialUtils } from '../../utils/material.utils';

// TODO: Have threeJS components with no UI to be just functions

interface LocalState {
    mesh: THREE.Mesh;
    planet: THREE.Group | null;
    mixer?: THREE.AnimationMixer;
    ocean?: THREE.Object3D<THREE.Event>;
    ocean1?: THREE.Object3D<THREE.Event>;
    objects: {
        aboutMe: {
            tree1?: THREE.Object3D<THREE.Event>;
            tree2?: THREE.Object3D<THREE.Event>;
            tree3?: THREE.Object3D<THREE.Event>;
            tree4?: THREE.Object3D<THREE.Event>;
            tree5?: THREE.Object3D<THREE.Event>;
        };
        career: {
            main: {
                castle: {
                    wall?: THREE.Object3D<THREE.Event>;
                    wall1?: THREE.Object3D<THREE.Event>;
                    wall2?: THREE.Object3D<THREE.Event>;
                    wall3?: THREE.Object3D<THREE.Event>;
                    wall4?: THREE.Object3D<THREE.Event>;
                    wall5?: THREE.Object3D<THREE.Event>;
                    wallLong?: THREE.Object3D<THREE.Event>;
                    towerRound1?: THREE.Object3D<THREE.Event>;
                    towerRound2?: THREE.Object3D<THREE.Event>;
                    towerRound3?: THREE.Object3D<THREE.Event>;
                    towerRound4?: THREE.Object3D<THREE.Event>;
                    squareTower?: THREE.Object3D<THREE.Event>;
                    roofRound?: THREE.Object3D<THREE.Event>;
                    roofRound1?: THREE.Object3D<THREE.Event>;
                    flag?: THREE.Object3D<THREE.Event>;
                    flag1?: THREE.Object3D<THREE.Event>;
                    flagBanner?: THREE.Object3D<THREE.Event>;
                    flagBanner1?: THREE.Object3D<THREE.Event>;
                };
                pirates: {
                    tree1?: THREE.Object3D<THREE.Event>;
                    tree2?: THREE.Object3D<THREE.Event>;
                    shipWreck?: THREE.Object3D<THREE.Event>;
                    smallPirateBoat?: THREE.Object3D<THREE.Event>;
                };
                settlement: {
                    tree1?: THREE.Object3D<THREE.Event>;
                    tree2?: THREE.Object3D<THREE.Event>;
                    tree3?: THREE.Object3D<THREE.Event>;
                    tree4?: THREE.Object3D<THREE.Event>;
                    tree5?: THREE.Object3D<THREE.Event>;
                    tree6?: THREE.Object3D<THREE.Event>;
                    tree7?: THREE.Object3D<THREE.Event>;
                };
            };
            castle: {
                door?: THREE.Object3D<THREE.Event>;
                door1?: THREE.Object3D<THREE.Event>;
                bridge?: THREE.Object3D<THREE.Event>;
                bridge2?: THREE.Object3D<THREE.Event>;
                bridge3?: THREE.Object3D<THREE.Event>;
            };
        };
    };
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
        objects: {
            aboutMe: {},
            career: {
                main: { castle: {}, pirates: {}, settlement: {} },
                castle: {},
            },
        },
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
    // TODO: FODA SE. Do my own useGLTF where I can get it from inside the /src folder
    // TODO: have a useObject that uses a mutable useRef
    const localState = useStateObject<LocalState>(initLocalState(rootState));
    const [outlineEffect, setoutlineEffect] = useState(false);
    const [page] = useRecoilState(pageState);

    const planetGltf = useGLTF('./models/my-world/my-world-1.gltf');
    const cubeGltf = useGLTF('./models/test/test-cube.gltf');
    const satellite0Gltf = useGLTF(satellite0GlbPath);
    const satellite1Gltf = useGLTF(satellite1GlbPath);
    const [startTime] = useState(Date.now());

    useInit(() => {
        // TODO: add bloom pass
        // addBloomPass(rootState, planetGltf.scene, localState);
        // setupAtmosphere(rootState);
        setupPlanetModel(planetGltf, rootState);
        setupSatellites(satellite0Gltf.scene, satellite1Gltf.scene);

        // Test
        // const sceneCube = cubeGltf.scene;
        // rootState.scene.add(cubeGltf.scene);

        window.addEventListener('pointermove', onPointerMove);
    });

    // Spawn Objects on page change
    useEffect(() => {
        if (page.endpoint === '/about') {
            // if (!localState.objects.aboutMe.tree1 || !localState.objects.aboutMe.tree2 || !localState.objects.aboutMe.tree3 || !localState.objects.aboutMe.tree4 || !localState.objects.aboutMe.tree5)
            //     return;

            const tween3 = spawnObject(localState.objects.aboutMe.tree3!, 4500, 5000);
            const tween4 = spawnObject(localState.objects.aboutMe.tree4!, 5000, 2000);
            const tween1 = spawnObject(localState.objects.aboutMe.tree1!, 5000, 4000);
            const tween2 = spawnObject(localState.objects.aboutMe.tree2!, 5500, 3000);
            const tween5 = spawnObject(localState.objects.aboutMe.tree5!, 6500, 2000);
            tween1.start();
            tween2.start();
            tween3.start();
            tween4.start();
            tween5.start();

            return () => {
                tween1.stop();
                tween2.stop();
                tween3.stop();
                tween4.stop();
                tween5.stop();
            };
        } else if (page.endpoint === '/career') {
            const castleDelay = 4500;
            const piratesDelay = 3000;
            const settlementDelay = 6000;
            const animationTime = 3000;
            // * Castle
            // Towers
            const tweenCastle1 = spawnObject(localState.objects.career.main.castle.towerRound4!, castleDelay + 0, animationTime);
            const tweenCastle4 = spawnObject(localState.objects.career.main.castle.squareTower!, castleDelay + 200, animationTime);
            const tweenCastle7 = spawnObject(localState.objects.career.main.castle.towerRound3!, castleDelay + 400, animationTime - 100);
            const tweenCastle8 = spawnObject(localState.objects.career.main.castle.towerRound2!, castleDelay + 500, animationTime - 200);
            const tweenCastle9 = spawnObject(localState.objects.career.main.castle.towerRound1!, castleDelay + 600, animationTime - 300);
            // Walls
            const tweenCastle2 = spawnObject(localState.objects.career.main.castle.wall5!, castleDelay + 500, animationTime);
            const tweenCastle3 = spawnObject(localState.objects.career.main.castle.wall4!, castleDelay + 600, animationTime);
            const tweenCastle5 = spawnObject(localState.objects.career.main.castle.wall3!, castleDelay + 700, animationTime);
            const tweenCastle6 = spawnObject(localState.objects.career.main.castle.wall2!, castleDelay + 800, animationTime);
            const tweenCastle10 = spawnObject(localState.objects.career.main.castle.wall1!, castleDelay + 900, animationTime);
            const tweenCastle16 = spawnObject(localState.objects.career.main.castle.wall!, castleDelay + 1000, animationTime);
            const tweenCastle11 = spawnObject(localState.objects.career.main.castle.wallLong!, castleDelay - 2000, animationTime + 2000, true);
            // Roofs and Flags
            const tweenCastle12 = spawnObject(localState.objects.career.main.castle.roofRound1!, castleDelay + 1200, animationTime - 1000);
            const tweenCastle13 = spawnObject(localState.objects.career.main.castle.roofRound!, castleDelay + 1200, animationTime - 1000);
            const tweenCastle14 = spawnObject(localState.objects.career.main.castle.flag1!, castleDelay + 1200, animationTime - 1000);
            const tweenCastle15 = spawnObject(localState.objects.career.main.castle.flag!, castleDelay + 1200, animationTime - 1000);
            // * Pirates
            const tweenPirates1 = spawnObject(localState.objects.career.main.pirates.tree1!, piratesDelay, animationTime + 6000);
            const tweenPirates2 = spawnObject(localState.objects.career.main.pirates.tree2!, piratesDelay + 500, animationTime + 2000);
            // * Settlement
            const tweenSettlement1 = spawnObject(localState.objects.career.main.settlement.tree1!, settlementDelay, animationTime);
            const tweenSettlement2 = spawnObject(localState.objects.career.main.settlement.tree2!, settlementDelay + 300, animationTime);
            const tweenSettlement3 = spawnObject(localState.objects.career.main.settlement.tree3!, settlementDelay + 600, animationTime);
            const tweenSettlement4 = spawnObject(localState.objects.career.main.settlement.tree4!, settlementDelay + 900, animationTime);
            const tweenSettlement5 = spawnObject(localState.objects.career.main.settlement.tree5!, settlementDelay + 1200, animationTime);

            tweenCastle1.start();
            tweenCastle2.start();
            tweenCastle3.start();
            tweenCastle4.start();
            tweenCastle5.start();
            tweenCastle6.start();
            tweenCastle7.start();
            tweenCastle8.start();
            tweenCastle9.start();
            tweenCastle10.start();
            tweenCastle11.start();
            tweenCastle12.start();
            tweenCastle13.start();
            tweenCastle14.start();
            tweenCastle15.start();
            tweenCastle16.start();
            tweenPirates1.start();
            tweenPirates2.start();
            tweenSettlement1.start();
            tweenSettlement2.start();
            tweenSettlement3.start();
            tweenSettlement4.start();
            tweenSettlement5.start();

            return () => {
                tweenCastle1.stop();
                tweenCastle2.stop();
                tweenCastle3.stop();
                tweenCastle4.stop();
                tweenCastle5.stop();
                tweenCastle6.stop();
                tweenCastle7.stop();
                tweenCastle8.stop();
                tweenCastle9.stop();
                tweenCastle10.stop();
                tweenCastle11.stop();
                tweenCastle12.stop();
                tweenCastle13.stop();
                tweenCastle14.stop();
                tweenCastle15.stop();
                tweenCastle16.stop();
                tweenPirates1.stop();
                tweenPirates2.stop();
                tweenSettlement1.stop();
                tweenSettlement2.stop();
                tweenSettlement3.stop();
                tweenSettlement4.stop();
                tweenSettlement5.stop();
            };
        }
    }, [page.endpoint]);

    // Spawn objects on section change
    useEffect(() => {
        // TODO: Despawn section here, too remove section spawned objects when moving away from section or even page
        // DEv: Removed temporarily. Need to fix them being removed on section leave AND add more models
        // if (!page.section) return;
        // if (page.endpoint === '/career') {
        //     if (page.section === 'academia') {
        //         const tween1 = spawnObject(localState.objects.career.castle.door!, 2000, 5000);
        //         const tween2 = spawnObject(localState.objects.career.castle.door1!, 2200, 5000);
        //         const tween3 = spawnObject(localState.objects.career.castle.bridge!, 2000, 5000);
        //         const tween4 = spawnObject(localState.objects.career.castle.bridge2!, 2200, 4500);
        //         const tween5 = spawnObject(localState.objects.career.castle.bridge3!, 2400, 4000);
        //         tween1.start();
        //         tween2.start();
        //         tween3.start();
        //         tween4.start();
        //         tween5.start();
        //         return () => {
        //             tween1.stop();
        //             tween2.stop();
        //             tween3.stop();
        //             tween4.stop();
        //             tween5.stop();
        //         };
        //     } else if (page.section === 'aruki') {
        //     } else if (page.section === 'elanza') {
        //     } else if (page.section === 'novabase') {
        //     } else if (page.section === 'thepeoplegroup') {
        //     }
        // }
    }, [page.section]);

    useFrame((state, delta) => {
        const currentTime = Date.now();
        const timeSinceStart = currentTime - startTime;
        // TODO: Find a way to make earth rotate but always move to the correct spot and lock cam position to it
        // planetGltf.scene.rotation.y += delta * 0.03;

        // Satellite coords
        if (localState.satellite.refs.length !== 0) {
            localState.satellite.angle += delta * 0.1;
            const x0 = 14 * Math.cos(localState.satellite.angle);
            const z0 = 14 * Math.sin(localState.satellite.angle);
            localState.satellite.refs[0].position.set(x0, 0, z0);
            localState.satellite.refs[0].lookAt(new THREE.Vector3(0, 0, 0));
            localState.satellite.refs[1].position.set(-x0, x0, -z0);
            localState.satellite.refs[1].lookAt(new THREE.Vector3(0, 0, 0));
            // if (outlineEffect) localState.composer.render();
        }

        // Ocean movement
        const tParam = timeSinceStart / 2000;
        const ocean1Scale = 1.00759;
        const scaleValue = Math.sin(tParam * 4) * 0.0;
        (localState.ocean?.rotation as any).z = Math.sin(tParam * 0.1) * 0.35;
        (localState.ocean?.rotation as any).y = Math.cos(tParam * 0.01) * 0.12;
        (localState.ocean?.rotation as any).x = Math.cos(tParam * 0.5) * 0.08;
        (localState.ocean as any).scale.set(ocean1Scale - scaleValue, ocean1Scale - scaleValue, ocean1Scale - scaleValue);
        (localState.ocean1?.rotation as any).z = Math.cos(tParam * 0.1) * 0.35;
        (localState.ocean1?.rotation as any).y = Math.sin(tParam * 0.01) * 0.12;
        (localState.ocean1?.rotation as any).x = Math.sin(tParam * 0.5) * 0.08;
        (localState.ocean1 as any).scale.set(ocean1Scale + scaleValue, ocean1Scale + scaleValue, ocean1Scale + scaleValue);

        // // Picking Ray
        // localState.raycaster.setFromCamera(localState.pointer, rootState.camera);
        // const intersects = localState.raycaster.intersectObjects(satellite0Gltf.scene.children);
        // for (let i = 0; i < intersects.length; i++) {
        //     if (intersects) (intersects[i].object as any).material.color.set(0xff0000);
        //     // (intersects[i].object as any)?.material.color.set(0xff0000);
        // }

        if (localState.mixer) {
            localState.mixer.update(delta);
        }
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

        localState.satellite.refs[0].traverse((child) => {
            MaterialUtils.applyShader(child, planetVertexShader, planetFragmentShader);
        });

        localState.satellite.refs[1].traverse((child) => {
            MaterialUtils.applyShader(child, planetVertexShader, planetFragmentShader);
        });
    }

    function setupPlanetModel(planetGltf: GLTF, rootState: RootState) {
        const planet = planetGltf.scene;
        const animations = planetGltf.animations;

        // Apply reflection on border shader
        planet.traverse((child) => {
            if (child.name === 'Ocean' || child.name === 'Ocean001') {
                MaterialUtils.applyShader(child, edgeLightVertexShader, edgeLightFragmentShader);
            } else if (child instanceof THREE.Mesh) {
                MaterialUtils.applyShader(child, planetVertexShader, planetFragmentShader);
            }
        });

        // Animations
        localState.mixer = new THREE.AnimationMixer(planet);
        const shipWhite = planet.children.find((child) => child.name === 'shipWhite');
        animations.forEach((clip) => {
            localState.mixer!.clipAction(clip).play();
        });

        const allNames = planet.children.map((child) => child.name);
        // console.log({ planet, shipWhite, allNames });

        localState.planet = planet;
        localState.ocean = localState.planet.children.find((child) => child.name === 'Ocean');
        localState.ocean1 = localState.planet.children.find((child) => child.name === 'Ocean001');

        // * About Me Page
        localState.objects.aboutMe.tree1 = localState.planet.children.find((child) => child.name === 'PalmTree001');
        localState.objects.aboutMe.tree2 = localState.planet.children.find((child) => child.name === 'PalmTree002');
        localState.objects.aboutMe.tree3 = localState.planet.children.find((child) => child.name === 'PalmTree003');
        localState.objects.aboutMe.tree4 = localState.planet.children.find((child) => child.name === 'PalmTree004');
        localState.objects.aboutMe.tree5 = localState.planet.children.find((child) => child.name === 'PalmTree005');
        // * Career Page
        // Career page - Castle
        localState.objects.career.main.castle.wall = localState.planet.children.find((child) => child.name === 'Wall');
        localState.objects.career.main.castle.wall1 = localState.planet.children.find((child) => child.name === 'Wall001');
        localState.objects.career.main.castle.wall2 = localState.planet.children.find((child) => child.name === 'Wall002');
        localState.objects.career.main.castle.wall3 = localState.planet.children.find((child) => child.name === 'Wall003');
        localState.objects.career.main.castle.wall4 = localState.planet.children.find((child) => child.name === 'Wall004');
        localState.objects.career.main.castle.wall5 = localState.planet.children.find((child) => child.name === 'Wall005');
        localState.objects.career.main.castle.wallLong = localState.planet.children.find((child) => child.name === 'WallLong');
        localState.objects.career.main.castle.towerRound1 = localState.planet.children.find((child) => child.name === 'TowerRound001');
        localState.objects.career.main.castle.towerRound2 = localState.planet.children.find((child) => child.name === 'TowerRound002');
        localState.objects.career.main.castle.towerRound3 = localState.planet.children.find((child) => child.name === 'TowerRound003');
        localState.objects.career.main.castle.towerRound4 = localState.planet.children.find((child) => child.name === 'TowerRound004');
        localState.objects.career.main.castle.squareTower = localState.planet.children.find((child) => child.name === 'SquareTower');
        localState.objects.career.main.castle.roofRound = localState.planet.children.find((child) => child.name === 'RoofRound');
        localState.objects.career.main.castle.roofRound1 = localState.planet.children.find((child) => child.name === 'RoofRound001');
        localState.objects.career.main.castle.flag = localState.planet.children.find((child) => child.name === 'Flag');
        localState.objects.career.main.castle.flag1 = localState.planet.children.find((child) => child.name === 'Flag001');
        localState.objects.career.main.castle.flagBanner = localState.planet.children.find((child) => child.name === 'FlagBanner');
        localState.objects.career.main.castle.flagBanner1 = localState.planet.children.find((child) => child.name === 'FlagBanner1');
        // Career Page - Pirates
        localState.objects.career.main.pirates.tree1 = localState.planet.children.find((child) => child.name === 'PalmTree006');
        localState.objects.career.main.pirates.tree2 = localState.planet.children.find((child) => child.name === 'PalmTree007');
        localState.objects.career.main.pirates.shipWreck = localState.planet.children.find((child) => child.name === 'ShipWreck');
        localState.objects.career.main.pirates.smallPirateBoat = localState.planet.children.find((child) => child.name === 'SmallPirateBoat');
        // Career Section - Settlement
        localState.objects.career.main.settlement.tree1 = localState.planet.children.find((child) => child.name === 'elanzaTree001');
        localState.objects.career.main.settlement.tree2 = localState.planet.children.find((child) => child.name === 'elanzaTreeHighCrooked003');
        localState.objects.career.main.settlement.tree3 = localState.planet.children.find((child) => child.name === 'elanzaTreeHighCrooked004');
        localState.objects.career.main.settlement.tree4 = localState.planet.children.find((child) => child.name === 'elanzaTreeHighCrooked010');
        localState.objects.career.main.settlement.tree5 = localState.planet.children.find((child) => child.name === 'elanzaTreeHighCrooked011');

        // Career Section - Castle
        // localState.objects.career.castle.door = localState.planet.children.find((child) => child.name === 'DoorCastle');
        // localState.objects.career.castle.door1 = localState.planet.children.find((child) => child.name === 'DoorCastle001');
        // localState.objects.career.castle.bridge = localState.planet.children.find((child) => child.name === 'BridgeCastle');
        // localState.objects.career.castle.bridge2 = localState.planet.children.find((child) => child.name === 'BridgeCastle002');
        // localState.objects.career.castle.bridge3 = localState.planet.children.find((child) => child.name === 'BridgeCastle003');

        // // * Initial configuring
        // (localState.objects.career.castle.door as any).visible = false;
        // (localState.objects.career.castle.door1 as any).visible = false;
        // (localState.objects.career.castle.bridge as any).visible = false;
        // (localState.objects.career.castle.bridge2 as any).visible = false;
        // (localState.objects.career.castle.bridge3 as any).visible = false;

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

function spawnObject(object: THREE.Object3D<THREE.Event>, delay: number, time: number, fromGround?: boolean) {
    object.visible = true;
    if (fromGround) {
        const finalPosition = object.position.clone();

        const initialPosition = new THREE.Vector3(0, -4, 0);
        object.position.copy(initialPosition);

        const positionTween = new TWEEN.Tween(object.position)
            .to(finalPosition, time)
            .delay(delay)
            .easing(TWEEN.Easing.Exponential.Out)
            .onUpdate(() => {
                object.position.copy(object.position);
            });

        return positionTween;
    } else {
        const targetScale = object.scale.clone();
        object.scale.copy(new THREE.Vector3(0.001, 0.001, 0.001));
        const scaleTween = new TWEEN.Tween(object.scale)
            .to(targetScale, time)
            .delay(delay)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(() => object.scale.copy(object.scale));

        return scaleTween;
    }
}
