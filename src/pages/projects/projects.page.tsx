// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './projects.module.scss';

export interface ProjectsProps {}

const defaultProps = {} as Required<ProjectsProps>;

/**
 * DESCRIPTION
 */
export function Projects(props: ProjectsProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return <div className={style['container']}>Projects</div>;
}
