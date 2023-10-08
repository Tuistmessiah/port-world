// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './projects.module.scss';
import { StyleUtils } from '../../utils/style.utils';
import { Card } from '../../components/card/card.component';
const s = StyleUtils.styleMixer(style);

export interface ProjectsProps {}

const defaultProps = {} as Required<ProjectsProps>;

/**
 * DESCRIPTION
 */
export function Projects(props: ProjectsProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return (
        <div className={s('container')}>
            {/* {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className={s('project')}>
                    <h2>Project {index + 1}</h2>
                    <p>Description of project {index + 1}. This is a personal project showcasing my skills and achievements.</p>
                    <div className={s('carousel')}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <img key={index} src={corgiImg} alt={`Project ${index + 1} Image ${index + 1}`} />
                        ))}
                    </div>
                </div>
            ))} */}

            <div className={s('card-wrapper')}>
                <Card />
            </div>
            <div className={s('card-wrapper')}>
                <Card />
            </div>
            <div className={s('card-wrapper')}>
                <Card />
            </div>

            <div className={s('arrow')}>A</div>
        </div>
    );
}
