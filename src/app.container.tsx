import { ReactElement, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { useSetRecoilState } from 'recoil';

import { threeState } from './data/recoil/atoms/scenes.atoms';
import { pageState } from './data/recoil/atoms/session.atoms';

import { Composition } from './composition.three';
import { AboutMe } from './pages/about-me/about-me.page';
import { Projects } from './pages/projects/projects.page';
import { Career } from './pages/career/career.page';
import { Media } from './pages/media/media.page';

import { PageSlider } from './components/page-slider/page-slider.component';

import style from './app.module.scss';
import { StyleUtils } from './utils/style.utils';
const s = StyleUtils.styleMixer(style);

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

    const setPage = useSetRecoilState(pageState);

    return (
        <div className={s('container')}>
            <nav>
                <button onClick={() => navigate('/')}>{'ICON'}</button>
                {endpoints().map(({ name, path }) => {
                    return (
                        <button
                            onClick={() => {
                                navigate(path);
                                setPage(path as any);
                            }}
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
                        position: [0, 0, -60],
                    }}
                >
                    <RecoilCanvas>
                        <Composition />
                    </RecoilCanvas>
                </Canvas>
            </div>

            {location.pathname === '/' ? <div className={s('landing-content')}>{props.children}</div> : <PageSlider>{props.children}</PageSlider>}

            <div className={s('page-bg')} />
        </div>
    );
}

export function endpoints(): { name: string; path: string; page: ReactElement }[] {
    return [
        { name: 'About', path: '/about', page: <AboutMe /> },
        { name: 'Projects', path: '/projects', page: <Projects /> },
        { name: 'Career', path: '/career', page: <Career /> },
        { name: 'Media', path: '/media', page: <Media /> },
    ];
}
