// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './landing.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export interface LandingProps {}

const defaultProps = {} as Required<LandingProps>;

/**
 * DESCRIPTION
 */
export function Landing(props: LandingProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return (
        <div className={s('container')}>
            <section>
                <h1>Pedro C.</h1>
                <p>Web Developer by day. Something by night.</p>
                <p>Portfolio webpage. Feel free to browse like a "normie" or take a change "hover" this planet. ツ</p>
                <button>Come on down!</button>
            </section>
        </div>
    );
}
