// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

import { StyleUtils } from '../../utils/style.utils';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './about-me.module.scss';
const s = StyleUtils.styleMixer(style);

export interface AboutMeProps {}

const defaultProps = {} as Required<AboutMeProps>;

export function AboutMe(props: AboutMeProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return (
        <div className={s('container', { 'some-if': true })}>
            <section>
                <h1>🌍 My Origins</h1>
                <p>
                    Greetings from [Your Continent/Island Name on the 3D planet]! My name is [Your Name], and this digital realm you've landed upon reflects the universe inside my
                    mind—a fusion of creativity, technical prowess, and passion.
                </p>
            </section>
            <section>
                <h1>🚀 Launching My Journey</h1>
                <p>
                    I embarked on my tech voyage [X years] ago. From tinkering with my first [your first notable tech experience, e.g., "coding project" or "computer game"], I
                    realized the vast expanse of opportunities that technology offered. Each coding challenge and digital venture pushed me further into this vast universe, and I
                    haven't looked back since.
                </p>
            </section>
            <section>
                <h1>🌌 Navigating My World</h1>
                <p>
                    I thrive on [one or two personal qualities, e.g., "innovation and persistent problem-solving"]. My mission is to merge aesthetics with functionality, creating
                    immersive experiences that not only look spectacular but also serve a purpose. While my expertise lies in frontend development, I have ventured into the various
                    orbits of the tech cosmos, always eager to expand my horizons.
                </p>
            </section>
            <section>
                <h1>🌠 Beyond the Screen</h1>
                <p>
                    When I'm not immersed in code or exploring new tech galaxies, you'll find me [one or two personal hobbies/activities, e.g., "stargazing, immersed in a sci-fi
                    novel, or hiking up the trails"]. I believe in drawing inspiration from the world around me, both real and imagined. It's this balance between the tangible and
                    the fantastical that fuels my creative endeavors.
                </p>
            </section>
            <section>
                <h1>🔭 Join Me in Exploration</h1>
                <p>
                    I invite you to journey through my world. Discover my projects, delve into my career chronicles, or enjoy the media that has marked my path. Together, let's
                    explore the digital constellations of my universe.
                </p>
            </section>
        </div>
    );
}
