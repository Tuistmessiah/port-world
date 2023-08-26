// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './career.module.scss';

export interface CareerProps {}

const defaultProps = {} as Required<CareerProps>;

/**
 * DESCRIPTION
 */
export function Career(props: CareerProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return <div className={style['container']}>Career</div>;
}
