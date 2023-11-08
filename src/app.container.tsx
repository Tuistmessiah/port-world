import { ReactElement, Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { threeState } from './data/recoil/atoms/scenes.atoms';
import { PageState, deviceState, pageState } from './data/recoil/atoms/session.atoms';

import { UiuxUtils } from './styles/uiux.utils';
import { useInit } from './hooks/use-init.hook';

// import { Composition } from './composition.three';
import { AboutMe } from './pages/about-me/about-me.page';
// import { Projects } from './pages/projects/projects.page';
import { Career } from './pages/career/career.page';
import { PageSlider } from './components/page-slider/page-slider.component';
import { Footer } from './components/footer/footer.component';

import EarthSvg from './assets/svgs/earth-svgrepo-com.svg?react';

import style from './app.module.scss';
import { StyleUtils } from './utils/style.utils';
const s = StyleUtils.styleMixer(style);

const Composition = lazy(() => import('./composition.three'));

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

    const [navigating, setNavigating] = useState(false);

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
        }, 2000);
    }, [page.endpoint]);

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
                    {endpoints().map(({ name, path }) => {
                        return (
                            <button
                                onClick={() => {
                                    setPage({ endpoint: path, section: undefined } as PageState);
                                    // setTimeout(() => {
                                    //     navigate(path);
                                    // }, 1000);
                                }}
                                key={name}
                                className={s({ active: location.pathname === path })}
                            >
                                {name}
                            </button>
                        );
                    })}
                </nav>

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

                {location.pathname === '/' ? <div className={s('landing-content')}>{props.children}</div> : <PageSlider isOpen={!navigating}>{props.children}</PageSlider>}

                {location.pathname === '/' && <Footer />}
            </>
            <div className={s('page-bg')} />
        </div>
    );

    function handleWindowSizeChange() {
        // Set type of device by size ('mobile' | 'tablet' | 'desktop' | 'large')
        setDevice(UiuxUtils.getDeviceType());
    }
}

export function endpoints(): { name: string; path: string; page: ReactElement }[] {
    return [
        { name: 'About', path: '/about', page: <AboutMe /> },
        // { name: 'P.Projects', path: '/projects', page: <Projects /> },
        { name: 'Career', path: '/career', page: <Career /> },
    ];
}
