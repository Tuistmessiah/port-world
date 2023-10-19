// import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import corgiImg from '../../assets/images/corgi-1.jpg';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './card.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export interface CardProps {}

const defaultProps = {} as Required<CardProps>;

/**
 * DESCRIPTION
 */
export function Card({ project }: any) {
    return (
        <div className={s('project-card')}>
            <img src={project.image} alt={project.title} className={s('project-image')} />
            <h2 className={s('project-title')}>{project.title}</h2>
            <p className={s('project-date')}>{project.date}</p>
            <ul className={s('tech-pills')}>
                {project.techs.map((tech: any, index: any) => (
                    <li key={index} className={s('tech-pill')}>
                        {tech}
                    </li>
                ))}
            </ul>
            <a href="https://nano-project-2.vercel.app/">Link</a>
        </div>
    );
}
