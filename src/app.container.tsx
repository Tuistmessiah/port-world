import { ReactElement, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Tippy from '@tippyjs/react';

import { threeState } from './data/recoil/atoms/scenes.atoms';
import { Endpoints, PageState, deviceState, pageState } from './data/recoil/atoms/session.atoms';

import { UiuxUtils } from './styles/uiux.utils';
import { useInit } from './hooks/use-init.hook';
import { useStateObject } from './hooks/use-state-object.hook';

import { AboutMe } from './pages/about-me/about-me.page';
// import { Projects } from './pages/projects/projects.page';
import { Career } from './pages/career/career.page';
import { Attributions } from './pages/attributions/attributions.component';
import { PageSlider } from './components/page-slider/page-slider.component';
import { Footer } from './components/footer/footer.component';
import { ButtonSvg } from './components/button-svg/button-svg.component';

import EarthSvg from './assets/svgs/earth-svgrepo-com.svg?react';
import SoundOnSvg from './assets/svgs/sound-volume-1-svgrepo-com.svg?react';
import SoundOffSvg from './assets/svgs/sound-off-svgrepo-com.svg?react';
import ControlSvg from './assets/svgs/control-svgrepo-com.svg?react';
import MovieRecSvg from './assets/svgs/movie-recorder-svgrepo-com.svg?react';
import MouseCompSvg from './assets/svgs/computing-mouse-svgrepo-com.svg?react';

import style from './app.module.scss';
import { StyleUtils } from './utils/style.utils';
const s = StyleUtils.styleMixer(style);

const Composition = lazy(() => import('./composition.three'));
const musicMp3 = new Audio('/sounds/music_kulluh_Guadeloupe_001.mp3');
musicMp3.currentTime = 0;
musicMp3.volume = 0.1;

/** Connects Canvas to the Recoil */
function RecoilCanvas(props: any) {
    const setThreeState = useSetRecoilState(threeState);

    const rootState = useThree();

    useEffect(() => {
        if (rootState) return;
        setThreeState(rootState);
    }, [rootState]);

    return props.children;
}

export function App(props: { children: ReactElement }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [page, setPage] = useRecoilState(pageState);
    const [, setDevice] = useRecoilState(deviceState);
    // let soundStarted = useStateObject<boolean>(false);

    const [navigating, setNavigating] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [freeMove, setFreeMove] = useState(false);

    const [isVisible, setIsVisible] = useState(true);

    // Overlay instructions
    useEffect(() => {
        if (!page.orbitControls) return;
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [page.orbitControls]);

    useInit(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    });

    useEffect(() => {
        setNavigating(true);
        setTimeout(() => {
            setNavigating(false);
            navigate(page.endpoint);
            // TODO: Runs once to activate sound on beginning
            // if (!soundStarted) {
            //     document.onmousedown = () => {
            //         if (soundEnabled) musicMp3.play();
            //     };
            //     soundStarted = true;
            // }
        }, 2000);
    }, [page.endpoint]);

    // Dev: Make instructions
    // TODO: 1) Make p tags absolute and in same positioned, centered
    // TODO: 2) Center svg and make, in beginning, all whitish transparent
    // TODO: 3) Make animation times (3 seconds each) for a) rotate b) zoom c) pan and disappear in the end
    // TODO: 4) Use local variables to make it only appear once (the first time)
    // TODO: 5) Give it glow OR ghost effect
    // TODO: 6) Make svg pan left and right to show the drag

    return (
        <div className={s('container')}>
            <>
                <nav>
                    <button
                        onClick={() => {
                            navigate('/');
                            setPage({ endpoint: '/' });
                        }}
                    >
                        <EarthSvg />
                    </button>
                    {endpoints()
                        .filter(({ name }) => name !== 'Attributions')
                        .map(({ name, path }) => {
                            return (
                                <button
                                    onClick={() => {
                                        setPage({ endpoint: path, section: undefined } as PageState);
                                    }}
                                    key={name}
                                    className={s({ active: location.pathname === path })}
                                >
                                    {name}
                                </button>
                            );
                        })}
                    <Tippy content={'Sound on/off'} theme={'dark'} arrow={false}>
                        <div className={s('btn-toggle')}>
                            {soundEnabled ? (
                                <ButtonSvg
                                    Svg={<SoundOnSvg />}
                                    onClick={() => {
                                        setSoundEnabled(false);
                                        musicMp3.pause();
                                    }}
                                />
                            ) : (
                                <ButtonSvg
                                    Svg={<SoundOffSvg />}
                                    onClick={() => {
                                        setSoundEnabled(true);
                                        musicMp3.play();
                                    }}
                                />
                            )}
                        </div>
                    </Tippy>
                    <Tippy content={'Free/cinematic move'} theme={'dark'} arrow={false}>
                        <div className={s('btn-toggle')}>
                            {page.orbitControls ? (
                                <ButtonSvg
                                    Svg={<ControlSvg />}
                                    onClick={() => {
                                        setFreeMove(false);
                                        setPage({ ...page, orbitControls: false });
                                    }}
                                />
                            ) : (
                                <ButtonSvg
                                    Svg={<MovieRecSvg />}
                                    onClick={() => {
                                        setFreeMove(true);
                                        setPage({ ...page, orbitControls: true });
                                    }}
                                />
                            )}
                        </div>
                    </Tippy>
                </nav>

                {/* Instructions on free move */}
                {/* <div className={s('ui-display', { hidden: !isVisible || !freeMove })}>
                    <p>Zoom with mouse wheel</p>
                    <p>Orbit with left click and drag</p>
                    <p>Pan with right click and drag</p>
                    <div>
                        <MouseCompSvg />
                    </div>
                </div> */}

                <div className={s('canvas-wrapper')}>
                    <Canvas
                        camera={{
                            fov: 45,
                            near: 0.1,
                            far: 10000,
                            position: [0, 0, -20],
                        }}
                    >
                        <RecoilCanvas>
                            <Composition />
                        </RecoilCanvas>
                    </Canvas>
                </div>

                {location.pathname === '/' && <div className={s('landing-content')}>{props.children}</div>}
                {(location.pathname === '/about' || location.pathname === '/career') && <PageSlider isOpen={!navigating}>{props.children}</PageSlider>}
                {location.pathname === '/attr' && <Attributions />}

                {<Footer />}

                {/* Copyright */}
                <div className={s('copyright')}>Pedro Caetano 2023</div>
            </>
            <div className={s('page-bg')} />
        </div>
    );

    function handleWindowSizeChange() {
        // Set type of device by size ('mobile' | 'tablet' | 'desktop' | 'large')
        setDevice(UiuxUtils.getDeviceType());
    }
}

export function endpoints(): { name: string; path: Endpoints; page: ReactElement }[] {
    return [
        { name: 'About', path: '/about', page: <AboutMe /> },
        // { name: 'P.Projects', path: '/projects', page: <Projects /> },
        { name: 'Career', path: '/career', page: <Career /> },
        // * Other
        { name: 'Attributions', path: '/attr', page: <></> },
    ];
}
