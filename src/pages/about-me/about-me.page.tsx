// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

import { StyleUtils } from '../../utils/style.utils';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import GretWallSvg from '../../assets/svgs/great-wall-svgrepo-com.svg?react';
import ChristSvg from '../../assets/svgs/christ-the-redeemer-svgrepo-com.svg?react';
import WindmillSvg from '../../assets/svgs/windmill-mill-svgrepo-com.svg?react';
import TulipSvg from '../../assets/svgs/tulip-svgrepo-com.svg?react';

import style from './about-me.module.scss';
const s = StyleUtils.styleMixer(style);

export interface AboutMeProps {}

const defaultProps = {} as Required<AboutMeProps>;

export function AboutMe(props: AboutMeProps) {
    const {} = { ...defaultProps, ...props };

    // const SOMETHING = useSelector((state: AppState) => state.session.SOMETHING);

    // const [STATE, SETSTATE] = useState();

    return (
        <div className={s('container')}>
            <div className={s('scroll-container')}>
                <div className={s('scroll-content')}>
                    <section>
                        <h1>About Me</h1>
                        <p>
                            I’m a developer and physicist, crafting interactive web applications with a focus on frontend, data management, and 3D visualizations since 2018, ensuring seamless user
                            experiences
                        </p>

                        <div className={s('vertical-line')}>
                            <p>Scroll</p>
                            <div />
                        </div>
                    </section>
                    <section>
                        <div className={s('svg-spot')}>
                            <div id={s('christ-svg')}>
                                <ChristSvg />
                            </div>
                            <div id={s('great-wall-svg')}>
                                <GretWallSvg />
                            </div>
                        </div>
                        <p>
                            While the bustling streets of Lisbon, Portugal, may not be synonymous with the tech hubs of the world, they provided me with a unique backdrop to dive into the realms of
                            development, engineering, and physics. My journey in the digital world began in 2018, amidst the charm of historic facades and the rhythm of traditional music that echoed
                            through my involvement in a special university music group.
                        </p>
                        <p>
                            With a competitive swimming background and a degree in Physics Engineering in hand, I found myself drawn to the intricate dance of code and the boundless potential of the
                            web. My expertise lies in web-app development, frontend intricacies, and the specialization in graphic maps and 3D visualizations.
                        </p>

                        <div className={s('svg-spot')}>
                            <div id={s('windmill-svg')}>
                                <WindmillSvg />
                            </div>
                            <div id={s('tulip-svg')}>
                                <TulipSvg />
                                <TulipSvg />
                                <TulipSvg />
                            </div>
                        </div>

                        <p>
                            Seeking adventures beyond the scenic views of Lisbon, I packed my bags and set my sights on the Netherlands. Here, I embraced freelancing, which allowed me the freedom to
                            explore the depths of East Asia while contributing to a GIS project based in Utrecht.
                        </p>
                    </section>
                    <section>
                        <h2>Coaching</h2>
                        <p>
                            Coaching and Mentoring Passing on knowledge is a passion of mine. From my days as a private tutor to my recent ventures into coaching, I find fulfillment in guiding others
                            through their journey in frontend development. Whether it's mastering the basics or delving into advanced concepts in Javascript or C, I'm here to lend a helping hand.
                        </p>
                        <h2>Love of Languages</h2>
                        <p>
                            Languages have always fascinated me, and I'm not just talking about programming languages like Javascript and C#. Fluent in Portuguese, English, Spanish, and French, I find
                            joy in unraveling the complexities of communication. These days, I'm immersing myself in the challenge of learning Mandarin, with Taiwan holding a special place in my heart
                            as my second home.
                        </p>

                        <p>
                            Living a life enriched by diverse cultures, languages, and codes, I continue to weave my story, one line of code and one conversation at a time, from the picturesque
                            landscapes of Lisbon to the vibrant energy of the Netherlands and the captivating allure of East Asia.
                        </p>
                        {/* <p>
                    Hello! I'm a free-spirited extrovert hailing from the enchanting city of Lisbon, Portugal. Although my adventure began with Physics Engineering at [University Name], it's
                    transcended into a kaleidoscopic journey through React and full-stack development in the vibrant world of tech. My science and math backdrop sharpens my edge, allowing me to weave
                    through complex coding conundrums with a distinctive perspective.
                </p>
                <p>
                    Beyond the screen, my easy-going nature propels me across the globe, eagerly soaking up new languages and cultures, each adventure fueling the next. Whether decrypting
                    languages—coding or spoken—or unwinding with video games and physical pursuits, I’m always on the hunt for the next exhilarating challenge. Let's embark on a journey through the
                    boundless realms of code and creativity together!
                </p> */}
                    </section>
                </div>
            </div>
        </div>
    );
}
