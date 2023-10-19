import { useState } from 'react';
import { Card } from '../../components/card/card.component';

import ArrowDownSvg from '../../assets/svgs/arrow-sm-down-svgrepo-com.svg?react';
import ArrowUpSvg from '../../assets/svgs/arrow-sm-up-svgrepo-com.svg?react';
import corgiImg from '../../assets/images/corgi-1.jpg';

import style from './projects.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

const projects = [
    {
        title: 'Project One',
        date: 'March 2023',
        image: corgiImg,
        techs: ['React', 'Node.js', 'MongoDB'],
    },
    {
        title: 'Project Two',
        date: 'June 2023',
        image: 'path-to-your-image2.jpg',
        techs: ['Angular', 'Firebase'],
    },
    // ... more projects
];

/**
 * DESCRIPTION
 */
export function Projects() {
    const [slideNumber, setSlideNumber] = useState(0);

    return (
        <div className={s('container')}>
            <h1>My Projects</h1>
            <div className={s('project-display')}>
                {projects.map((project: any, index: any) => (
                    <div className={s('slide')} style={{ transform: `translateY(${-92 * slideNumber}vh)` }}>
                        <Card key={index} project={project} />
                        <div className={s('arrow-group')}>
                            <button
                                className={s('arrows')}
                                onClick={() => {
                                    console.log('clicked');
                                    setSlideNumber((slideNumber) => slideNumber - 1);
                                }}
                                style={{ visibility: slideNumber === 0 ? 'hidden' : 'visible' }}
                            >
                                <ArrowUpSvg />
                            </button>
                            <button
                                className={s('arrow')}
                                onClick={() => {
                                    console.log('clicked');
                                    setSlideNumber((slideNumber) => slideNumber + 1);
                                }}
                                style={{ visibility: slideNumber === projects.length - 1 ? 'hidden' : 'visible' }}
                            >
                                <ArrowDownSvg />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className={s('arrow')}
                onClick={() => {
                    console.log('clicked');
                    setSlideNumber((slideNumber) => slideNumber++);
                }}
            ></div>
        </div>
    );
}
