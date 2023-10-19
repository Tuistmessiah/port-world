import { ReactNode, useState } from 'react';
import { Card, CardProps } from '../../components/card/card.component';

import BlenderSvg from '../../assets/svgs/blender-svgrepo-com.svg?react';
import OpenGlSvg from '../../assets/svgs/opengl-svgrepo-com.svg?react';
import ArrowDownSvg from '../../assets/svgs/arrow-sm-down-svgrepo-com.svg?react';
import ArrowUpSvg from '../../assets/svgs/arrow-sm-up-svgrepo-com.svg?react';
import dungeonBuilderImg from '../../assets/images/dungeon-builder.jpg';
import foodShowcaseImg from '../../assets/images/food-showcase.jpg';

import style from './projects.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

interface Project {
    card: CardProps;
    content: ReactNode;
}

const projects: Project[] = [
    {
        card: {
            imageSrc: dungeonBuilderImg,
            title: 'Dungeon Builder',
            techs: ['ThreeJS', <OpenGlSvg />, <BlenderSvg />],
            date: 'March 2023',
            link: { href: 'https://nano-project-2.vercel.app/', displayName: 'Dungeon Builder Demo' },
        },
        content: (
            <p>
                This project serves as a foray into the world of 3D web graphics using Three.js, showcasing the capabilities and vast potential of the library. The highlight of this endeavor is a
                captivating simulator that allows users to design their own 3x3 dungeon, offering an interactive and immersive experience. To further elevate the authenticity and uniqueness of the
                virtual environment, custom assets have been meticulously crafted in Blender. This not only accentuates the depth and realism of the simulator but also highlights the seamless
                integration potential between Blender and Three.js. Through this project, the intricacies of 3D modeling, scene creation, and user interaction have been explored, making it a
                comprehensive learning and showcase piece..
            </p>
        ),
    },
    {
        card: {
            imageSrc: foodShowcaseImg,
            title: 'Food Showcase',
            techs: ['ThreeJS', <OpenGlSvg />, <BlenderSvg />],
            date: 'August 2023',
            link: { href: 'https://3-nano-project-food-show.vercel.app/', displayName: 'Portuguese Delicacies Demo' },
        },
        content: (
            <p>
                Embarking on a delightful gastronomic journey, this project showcases four quintessential Portuguese delicacies that epitomize the rich culinary heritage of Portugal. Through an
                intricately designed platform, users are introduced to these emblematic dishes, each carrying its own unique story and flavor profile. More than just a display, this project
                encapsulates the heart and soul of Portuguese cuisine, presenting each delicacy in its full splendor and capturing the essence of what makes it so beloved. Whether you're a connoisseur
                of world cuisines or someone looking for a taste of Portugal's finest, this curated selection promises to be a feast for the senses.
            </p>
        ),
    },
];

/**
 * DESCRIPTION
 */
export function Projects() {
    const [slideNumber, setSlideNumber] = useState(0);

    return (
        <div className={s('container')}>
            <div className={s('project-display')}>
                {projects.map((project) => (
                    <div className={s('slide')} style={{ transform: `translateY(${-92 * slideNumber}vh)` }}>
                        <Card {...project.card}>{project.content}</Card>
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
