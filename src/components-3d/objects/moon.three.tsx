import { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStateObject } from '../../hooks/use-state-object.hook';
import { useMoveTo } from '../../hooks/use-move-to.hook';
import { EllipseAroundPointCurve } from '../../resources/curves';
import { useInit } from '../../hooks/use-init.hook';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { useGLTF } from '@react-three/drei';

import sphereGLBPath from '../../assets/models/sphere-outline/sphere-outline.glb';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

interface LocalState {
    mesh: THREE.Mesh;
    pointer: THREE.Vector2;
    raycaster: THREE.Raycaster;
    outlinePass: any;
    selectedObjects: any;
    composer: EffectComposer;
    effectFXAA: any;
}

export interface MoonProps {}
const defaultProps = {} as Required<MoonProps>;

/**
 * Moon orbiting center
 */
export function Moon(props: MoonProps) {
    const {} = { ...defaultProps, ...props };
    const { gl, scene, camera } = useThree();
    // const [global, setGlobal] = useRecoilState(someState);
    const [state, setState] = useState();
    const localState = useStateObject<LocalState>(initLocalState());
    const sphereGLTF = useGLTF('./models/sphere-outline/sphere-outline.gltf');
    const sphereGLB = useGLTF(sphereGLBPath);

    function initLocalState(): LocalState {
        const sphereGeometry = new THREE.SphereGeometry(3, 16, 16); // 0.05 is the radius
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x55ff00 });

        return {
            mesh: new THREE.Mesh(sphereGeometry, sphereMaterial),
            pointer: new THREE.Vector2(),
            raycaster: new THREE.Raycaster(),
            outlinePass: new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera),
            selectedObjects: [],
            composer: new EffectComposer(gl),
            effectFXAA: new ShaderPass(FXAAShader),
        };
    }

    const { start } = useMoveTo({
        CurveClass: EllipseAroundPointCurve,
        nPoints: 10,
        loopable: true,
    });

    useInit(() => {
        const renderPass = new RenderPass(scene, camera);
        localState.composer.addPass(renderPass);

        localState.composer.addPass(localState.outlinePass);
        localState.outlinePass.hiddenEdgeColor.set('#190a05');
        localState.outlinePass.visibleEdgeColor.set('#ffffff');

        // const textureLoader = new THREE.TextureLoader();
        // textureLoader.load('textures/tri_pattern.jpg', function (texture) {
        //     localState.outlinePass.patternTexture = texture;
        //     texture.wrapS = THREE.RepeatWrapping;
        //     texture.wrapT = THREE.RepeatWrapping;
        // });

        const outputPass = new OutputPass();
        localState.composer.addPass(outputPass);

        localState.effectFXAA = new ShaderPass(FXAAShader);
        localState.effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
        localState.composer.addPass(localState.effectFXAA);

        gl.domElement.addEventListener('pointermove', onPointerMove);

        sphereGLB.scene.position.set(0, 10, -10);
        scene.add(sphereGLB.scene);

        // sphereGLTF.scene.position.set(0, 10, 10);
        // scene.add(sphereGLTF.scene);

        animate();
    });

    useEffect(() => {
        localState.mesh.position.set(0, 10, 150);
        scene.add(localState.mesh);
        if (!localState.mesh) return;

        const initPos = localState.mesh.position.clone();
        start({ object: localState.mesh, start: initPos, end: new THREE.Vector3(0, -30, 0), duration: 80 });
    }, []);

    useFrame((state, delta) => {
        // localState.composer.render();
        // Ensure any pre-render logic in useFrame callbacks is executed
        // state.gl.render(scene, camera);
        // // Now, handle post-processing
        // localState.composer.render();
    });

    return null;

    function onPointerMove(event: any) {
        if (event.isPrimary === false) return;
        localState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        localState.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // checkIntersection();
    }

    function checkIntersection() {
        localState.raycaster.setFromCamera(localState.pointer, camera);
        const intersects = localState.raycaster.intersectObject(scene, true);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            // addSelectedObject(selectedObject);
            // localState.outlinePass.selectedObjects = localState.selectedObjects;
        } else {
            localState.outlinePass.selectedObjects = [];
        }
    }

    function addSelectedObject(object: any) {
        localState.selectedObjects = [];
        localState.selectedObjects.push(object);
    }

    function animate() {
        requestAnimationFrame(animate);
        localState.composer.render();
    }
}
