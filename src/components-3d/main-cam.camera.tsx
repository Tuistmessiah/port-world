import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';
import TWEEN from '@tweenjs/tween.js';
import { useNavigate } from 'react-router-dom';

import { deviceState, pageState } from '../data/recoil/atoms/session.atoms';

import { useKeyPressToggle } from '../hooks/use-key-press-toggle.hook';
import { useMoveTo } from '../hooks/use-move-to.hook';
import { useInit } from '../hooks/use-init.hook';

import { CircularSegmentCurve } from '../resources/curves';
import { Html, OrbitControls } from '@react-three/drei';

import { StyleUtils } from '../utils/style.utils';
import style from './main-cam.module.scss';
const s = StyleUtils.styleMixer(style);

function camPoints(device: 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'large' | undefined) {
  if (device === 'laptop' || device === 'desktop' || device === 'large') return camPointsLaptop;
  else return camPointsMobile;
}

const camPointsMobile = {
  loading: {
    main: [-100, 100, -130],
    lookAt: [0, 0, -130],
    main2: [-100, 100, -50],
    lookAt2: [0, 0, -50],
  },
  landing: {
    main: [-9.12, 18.16, -2.19],
    lookAt: [-4.66, 2.11, -10.13],
  },
  about: {
    main: [12.7059, -11.3815, -16.891],
    lookAt: [6.6856, -5.6673, -11.3139],
  },
  career: {
    main: [-30.7971, -4.0185, -11.8539],
    lookAt: [-21.6502, -2.9036, -7.9692],
    academia: { position: [-15.0775, 10.9875, -3.5535], lookAt: [-7.2935, 6.0186, 0.2832] },
    novabase: { position: [-15.9308, 3.8565, -0.7146], lookAt: [-6.0118, 3.1732, -1.786] },
    aruki: { position: [-21.1128, -0.1075, 4.1713], lookAt: [-11.3024, -0.1088, 2.233] },
    elanza: { position: [-14.6444, 2.7514, -6.5183], lookAt: [-4.6911, 1.8355, -6.824] },
    thepeoplegroup: {
      position: [-3.9871, 13.8684, -11.179],
      lookAt: [-4.2687, 5.6513, -5.4869],
    },
  },
};
const camPointsLaptop = {
  loading: {
    main: [-100, 100, -130],
    lookAt: [0, 0, -130],
    main2: [-100, 100, -50],
    lookAt2: [0, 0, -50],
  },
  landing: {
    main: [-9.12, 18.16, -2.19],
    lookAt: [-4.66, 2.11, -10.13],
  },
  about: {
    main: [10, -5, -20],
    lookAt: [-10, 10, 0],
  },
  career: {
    main: [-23.05077, 11.73147343242901, -0.37797778893543743],
    lookAt: [-13.975761561839711, 7.931036296136116, 1.4111030447784507],
    academia: { position: [-13.5, 9.8, -2.4], lookAt: [-6, 8, 3] },
    novabase: { position: [-9.7452, 5.7994, 0.9904], lookAt: [-1.114, 7.297, -3.833] },
    aruki: { position: [-17, 2, 6.3], lookAt: [0, 5, 1] },
    elanza: { position: [-10.2, 2.01, -11.78], lookAt: [-2, 10, 10] },
    thepeoplegroup: {
      position: [-4.7678, 10.1009, -9.1904],
      lookAt: [-5.7976, 5.8005, -0.221],
    },
  },
};

const UIPoints = {
  about: {
    main: [5.2, 0.42, -13.85],
  },
  career: {
    main: [-12.64, 2.55, -7.87],
    academia: [-6.5, 8.7, 0.57],
    novabase: [-8.5, 6.9, 0.64],
    aruki: [-10.78, 3.55, -1.93],
    elanza: [-6.64, 5.22, -7.22],
    thepeoplegroup: [-7.0, 6.61, -4.56],
  },
};

/**
 * Main Camera
 */
export function MainCam() {
  const navigate = useNavigate();

  const [device] = useRecoilState(deviceState);
  const [page, setPage] = useRecoilState(pageState);
  const rootState = useThree();

  const [booted, setBooted] = useState(false);

  useInit(() => {
    // const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16); // 0.05 is the radius
    // const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // sphere.position.set(30, 30, 0);
    // rootState.scene.add(sphere);
    // setSphere(sphere);

    rootState.camera.position.set(...(camPoints(device).loading.main as [number, number, number]));
    rootState.camera.lookAt(new THREE.Vector3(...camPoints(device).loading.lookAt));

    const moveLoading2 = setTimeout(() => {
      moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).loading.main2), new THREE.Vector3(...camPoints(device).loading.lookAt2), 1200);
    }, 200);

    const moveToLanding = setTimeout(() => {
      moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).landing.main), new THREE.Vector3(...camPoints(device).landing.lookAt), 1000);
      setBooted(true);
    }, 1400);

    return () => {
      clearTimeout(moveLoading2);
      clearTimeout(moveToLanding);
    };
  });

  useEffect(() => {
    if (!booted || page.orbitControls) return;
    const initPos = rootState.camera.position.clone();

    const distance = initPos.distanceTo(rootState.camera.position);
    const duration = distance < 20 ? 3 : 5;

    switch (page.endpoint) {
      case '/':
        moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).landing.main), new THREE.Vector3(...camPoints(device).landing.lookAt), 3000);
        break;
      case '/about':
        // y > 0 is the 'projects' position
        // if (rootState.camera.position.y > 0) {
        //     moveToTarget(rootState.camera, new THREE.Vector3(19, 0, 12), new THREE.Vector3(...camPoints(device).about.main), 2000);
        //     setTimeout(() => {
        //         moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).about.main), new THREE.Vector3(-10, 10, 0), 2000);
        //     }, 2000);
        // } else {
        moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).about.main), new THREE.Vector3(...camPoints(device).about.lookAt), 3000);
        // }
        break;
      case '/projects':
        // TODO: This page is deactivated. To add.
        // y < 0 is the 'about' position
        // if (rootState.camera.position.y < 0) {
        //     moveToTarget(rootState.camera, new THREE.Vector3(19, 0, 12), new THREE.Vector3(0, 5, 5), 2000);
        //     setTimeout(() => {
        //         moveToTarget(rootState.camera, new THREE.Vector3(0, 15, 25), new THREE.Vector3(5, 0, 0), 2000);
        //     }, 2000);
        // } else {
        moveToTarget(rootState.camera, new THREE.Vector3(0, 15, 25), new THREE.Vector3(5, 0, 0), 3000);
        // }
        break;
      case '/career':
        // x > 0 && z> 0 is on the 'other side' of 'career' position
        // if (rootState.camera.position.x > 0 && rootState.camera.position.z > 0) {
        //     // Mid point if far
        //     moveToTarget(rootState.camera, new THREE.Vector3(10, 23, -11), new THREE.Vector3(-19, 0, -12), 2000);
        //     setTimeout(() => {
        //         goToCareerSections();
        //     }, 2000);
        // } else {
        goToCareerSections();
        // }
        break;
      default:
        break;
    }
  }, [page]);

  function goToCareerSections() {
    switch (page.section) {
      case 'academia':
        moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).career.academia.position), new THREE.Vector3(...camPoints(device).career.academia.lookAt), 2000);
        break;
      case 'novabase':
        moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).career.novabase.position), new THREE.Vector3(...camPoints(device).career.novabase.lookAt), 2000);
        break;
      case 'aruki':
        moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).career.aruki.position), new THREE.Vector3(...camPoints(device).career.aruki.lookAt), 2000);
        break;
      case 'elanza':
        moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).career.elanza.position), new THREE.Vector3(...camPoints(device).career.elanza.lookAt), 2000);
        break;
      case 'thepeoplegroup':
        moveToTarget(
          rootState.camera,
          new THREE.Vector3(...camPoints(device).career.thepeoplegroup.position),
          new THREE.Vector3(...camPoints(device).career.thepeoplegroup.lookAt),
          2000
        );
        break;
      default:
        moveToTarget(rootState.camera, new THREE.Vector3(...camPoints(device).career.main), new THREE.Vector3(...camPoints(device).career.lookAt), 2000);
    }
  }

  useFrame(() => {
    TWEEN.update();
  });

  const { start, stop } = useMoveTo({
    CurveClass: CircularSegmentCurve,
    nPoints: 10,
  });

  // Print
  useKeyPressToggle('p', () => {
    const cameraPosition = rootState.camera.position.clone();
    const cameraDirection = new THREE.Vector3(0, 0, -10);
    cameraDirection.applyQuaternion(rootState.camera.quaternion);
    const lookAtPoint = cameraPosition.clone().add(cameraDirection);

    const position = `[${Number(cameraPosition.x.toFixed(4))}, ${Number(cameraPosition.y.toFixed(4))}, ${Number(cameraPosition.z.toFixed(4))}]`;
    const lookAt = `[${Number(lookAtPoint.x.toFixed(4))}, ${Number(lookAtPoint.y.toFixed(4))}, ${Number(lookAtPoint.z.toFixed(4))}]`;
    console.info({ A_position: position, B_lookAt: lookAt });
  });

  const pageTagAboutPos = page.endpoint === '/career' ? [-2.6407, 9.8, -6.8371] : UIPoints.about.main;
  const pageTagCareerPos = page.endpoint === '/about' ? [-3.9228, 9.0, -6.8496] : UIPoints.career.main;

  const orbitControlsRef = useRef<any>();

  const UIenabled = !page.orbitControls;

  return (
    <>
      {/* Orbit Free Control */}
      {page.orbitControls && (
        <OrbitControls
          ref={orbitControlsRef}
          // enableRotate={page.orbitControls}
          // enabled={page.orbitControls}
          minDistance={15}
          maxDistance={150}
          zoomSpeed={0.5}
          camera={rootState.camera}
          // target={new THREE.Vector3(0, 0, 0)}
          listenToKeyEvents={(e) => {}}
        />
      )}
      {/* Page Tags */}
      {UIenabled && page.endpoint !== '/about' && !page.section && booted && (
        <mesh position={pageTagAboutPos as [number, number, number]}>
          (
          <Html style={{ pointerEvents: 'all' }}>
            <button
              className={s('page-tag')}
              onClick={() => {
                setPage({ endpoint: '/about', section: undefined });
              }}
            >
              {'About'}
            </button>
          </Html>
          )
        </mesh>
      )}
      {UIenabled && page.endpoint !== '/career' && booted && (
        <mesh position={pageTagCareerPos as [number, number, number]}>
          (
          <Html style={{ pointerEvents: 'all' }}>
            <button
              className={s('page-tag')}
              onClick={() => {
                setPage({ endpoint: '/career', section: undefined });
              }}
            >
              {'Career'}
            </button>
          </Html>
          )
        </mesh>
      )}
      {/* Sections Tags: Academia */}
      <mesh position={UIPoints.career.academia as [number, number, number]}>
        {UIenabled && page.endpoint === '/career' && page.section !== 'academia' && (
          <Html>
            <button
              className={s('section-tag')}
              onClick={() => {
                setPage({ endpoint: '/career', section: 'academia' });
              }}
            >
              {'Academia'}
            </button>
          </Html>
        )}
      </mesh>
      {/* Sections Tags: Novabase */}
      <mesh position={UIPoints.career.novabase as [number, number, number]}>
        {UIenabled && page.endpoint === '/career' && page.section !== 'novabase' && (
          <Html>
            <button
              className={s('section-tag')}
              onClick={() => {
                setPage({ endpoint: '/career', section: 'novabase' });
              }}
            >
              {'Novabase'}
            </button>
          </Html>
        )}
      </mesh>
      {/* Sections Tags: Aruki */}
      <mesh position={UIPoints.career.aruki as [number, number, number]}>
        {UIenabled && page.endpoint === '/career' && page.section !== 'aruki' && (
          <Html>
            <button
              className={s('section-tag')}
              id={s('aruki')}
              onClick={() => {
                setPage({ endpoint: '/career', section: 'aruki' });
              }}
            >
              {'Aruki'}
            </button>
          </Html>
        )}
      </mesh>
      {/* Sections Tags: Elanza */}
      <mesh position={UIPoints.career.elanza as [number, number, number]}>
        {UIenabled && page.endpoint === '/career' && page.section !== 'elanza' && (
          <Html>
            <div
              className={s('section-tag')}
              id={s('elanza')}
              onClick={() => {
                setPage({ endpoint: '/career', section: 'elanza' });
              }}
            >
              {'Elanza'}
            </div>
          </Html>
        )}
      </mesh>
      // TODO: Place in corect place UI
      {/* Sections Tags: The People Group */}
      <mesh position={UIPoints.career.thepeoplegroup as [number, number, number]}>
        {UIenabled && page.endpoint === '/career' && page.section !== 'thepeoplegroup' && (
          <Html>
            <button
              className={s('section-tag')}
              id={s('thepeoplegroup')}
              onClick={() => {
                setPage({ endpoint: '/career', section: 'thepeoplegroup' });
              }}
            >
              {'GIS Specialists'}
            </button>
          </Html>
        )}
      </mesh>
    </>
  );

  function moveToTarget(camera: THREE.Camera, targetPosition: THREE.Vector3, lookAtPosition: THREE.Vector3, duration: number = 2000) {
    const startPosition = camera.position.clone();
    const startLookAt = camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(50)); // Use some scalar to get a point in the direction camera is facing.

    // Position tween
    const positionTweenObj = {
      x: startPosition.x,
      y: startPosition.y,
      z: startPosition.z,
    };

    new TWEEN.Tween(positionTweenObj)
      .to(
        {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
        },
        duration
      )
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(() => {
        camera.position.set(positionTweenObj.x, positionTweenObj.y, positionTweenObj.z);
      })
      // .onComplete(() => {
      //     if (orbitControlsRef.current) {
      //         // Temporarily disable orbit controls to set the new camera position
      //         orbitControlsRef.current.enabled = false;
      //         camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
      //         orbitControlsRef.current.enabled = true;
      //         orbitControlsRef.current.target.set(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);
      //         orbitControlsRef.current.update();
      //     }
      // })
      .start();

    // LookAt tween
    const lookAtTweenObj = {
      x: startLookAt.x,
      y: startLookAt.y,
      z: startLookAt.z,
    };

    new TWEEN.Tween(lookAtTweenObj)
      .to(
        {
          x: lookAtPosition.x,
          y: lookAtPosition.y,
          z: lookAtPosition.z,
        },
        duration
      )
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(() => {
        camera.lookAt(lookAtTweenObj.x, lookAtTweenObj.y, lookAtTweenObj.z);
      })
      .start();
  }
}
