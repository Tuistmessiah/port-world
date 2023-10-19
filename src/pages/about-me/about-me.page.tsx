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
        <div className={s('container')}>
            <section>
                <div className={s('background')} />
                <div className={s('photo')} />
                <h2 className={s('name')}>Pedro Caetano</h2>
            </section>
            <section className={s('text')}>
                <p>
                    Hello! I'm a free-spirited extrovert hailing from the enchanting city of Lisbon, Portugal. Although my adventure began with Physics Engineering at [University Name], it's
                    transcended into a kaleidoscopic journey through React and full-stack development in the vibrant world of tech. My science and math backdrop sharpens my edge, allowing me to weave
                    through complex coding conundrums with a distinctive perspective.
                </p>
                <p>
                    Beyond the screen, my easy-going nature propels me across the globe, eagerly soaking up new languages and cultures, each adventure fueling the next. Whether decrypting
                    languages—coding or spoken—or unwinding with video games and physical pursuits, I’m always on the hunt for the next exhilarating challenge. Let's embark on a journey through the
                    boundless realms of code and creativity together!
                </p>
            </section>
        </div>
    );
}
