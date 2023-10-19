import { ReactNode } from 'react';

import style from './card.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export interface CardProps {
    imageSrc: string;
    title: string;
    techs: Array<string | ReactNode>;
    date: string;
    link: { href: string; displayName: string };
    children?: ReactNode;
}

export function Card({ imageSrc, title, techs, date, link, children }: CardProps) {
    return (
        <div className={s('project-card')}>
            <img src={imageSrc} alt={title} className={s('project-image')} />
            <div className={s('header')}>
                <div className={s('left')}>
                    <h2 className={s('project-title')}>{title}</h2>
                    <h3 className={s('project-date')}>{date}</h3>
                </div>
                <div className={s('right')}>
                    <ul className={s('tech-pills')}>
                        {techs.map((tech, index) =>
                            typeof tech === 'string' ? (
                                <li key={index} className={s('tech-pill')}>
                                    {tech}
                                </li>
                            ) : (
                                tech
                            )
                        )}
                    </ul>
                    <a href={link.href}>{link.displayName}</a>
                </div>
            </div>
            {children && <div className={s('content')}>{children}</div>}
        </div>
    );
}
