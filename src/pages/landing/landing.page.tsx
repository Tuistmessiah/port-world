// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './landing.module.scss';

export interface LandingProps {}

const defaultProps = {} as Required<LandingProps>;

/**
 * DESCRIPTION
 */
export function Landing(props: LandingProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return <div className={style['container']}>Landing</div>;
}
