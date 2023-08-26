import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { useRecoilState } from 'recoil';

import { threeState } from './data/recoil/atoms/scenes.atoms';
import { pageState } from './data/recoil/atoms/session.atoms';

import { useMemoAsync } from './hooks/use-memo-async.hook';

import { MainComposition } from './main-composition.container';
import { AboutMe } from './pages/about-me/about-me.page';
import { Projects } from './pages/projects/projects.page';
import { Career } from './pages/career/career.page';
import { Media } from './pages/media/media.page';

import cx from 'classnames';
import s from './app.module.scss';

/** Connects Canvas to the Recoil */
function RecoilCanvas(props: any) {
    const [, setThreeState] = useRecoilState(threeState);

    const rootState = useThree();

    useEffect(() => {
        if (rootState) return;
        setThreeState(rootState);
    }, [rootState]);

    return props.children;
}

let timeoutRef: NodeJS.Timeout;

export function App(props: { children: ReactElement }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [, setPage] = useRecoilState(pageState);

    // TODO: Place this in a hook
    /* 
      const [isRendering, isTransitioning] = useTransition(location.pathname === '/', 1000);
    */
    const [isTransitioning, setIsTransitioning] = useState(false);
    const isLandingPage = useMemoAsync(() => {
        setPage(location.pathname as any);
        if (location.pathname === '/') {
            setIsTransitioning(true);
            return new Promise((resolve) => {
                timeoutRef = setTimeout(() => {
                    resolve(true);
                    setIsTransitioning(false);
                }, 1000);
            });
        } else {
            setIsTransitioning(false);
            clearTimeout(timeoutRef);
            return false;
        }
    }, [location.pathname]);

    return (
        <div className={s['container']}>
            <nav className={cx({ [s['move-right']]: !isLandingPage })}>
                {/* <button onClick={() => navigate('/')}>{'ladning'}</button> */}
                {endpoints().map(({ name, path }) => {
                    return (
                        <button
                            onClick={() => {
                                navigate(path);
                            }}
                        >
                            {name}
                        </button>
                    );
                })}
            </nav>
            <section>
                <h1>Pedro C.</h1>
                <p>Web Developer by day. Something by night.</p>
                <p>Portfolio webpage. Feel free to browse like a "normie" or take a change "hover" this planet. ツ</p>
                <button>Come on down!</button>
            </section>
            <div className={cx(s['canvas-wrapper'], { [s['move-right']]: !isLandingPage })}>
                <Canvas
                    camera={{
                        fov: 45,
                        near: 0.1,
                        far: 10000,
                        position: [0, 0, -60],
                    }}
                >
                    <RecoilCanvas>
                        <MainComposition />
                    </RecoilCanvas>
                </Canvas>
            </div>

            {!isLandingPage && <div className={cx(s['page-content'], { [s['remove-anim']]: isTransitioning })}>{props.children}</div>}
            <div className={s['page-bg']}></div>
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
