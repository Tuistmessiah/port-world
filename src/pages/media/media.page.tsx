// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './media.module.scss';

export interface MediaProps {}

const defaultProps = {} as Required<MediaProps>;

/**
 * DESCRIPTION
 */
export function Media(props: MediaProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return <div className={style['container']}>Media</div>;
}
