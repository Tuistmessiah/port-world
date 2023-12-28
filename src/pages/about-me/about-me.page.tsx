import { useRecoilState } from 'recoil';
import { deviceState } from '../../data/recoil/atoms/session.atoms';

import GretWallSvg from '../../assets/svgs/great-wall-svgrepo-com.svg?react';
import ChristSvg from '../../assets/svgs/christ-the-redeemer-svgrepo-com.svg?react';
import WindmillSvg from '../../assets/svgs/windmill-mill-svgrepo-com.svg?react';
import TulipSvg from '../../assets/svgs/tulip-svgrepo-com.svg?react';

import { StyleUtils } from '../../utils/style.utils';
import style from './about-me.module.scss';
const s = StyleUtils.styleMixer(style);

export function AboutMe() {
    const [device] = useRecoilState(deviceState);

    return (
        <div className={s('container')}>
            <div className={s('scroll-container')}>
                <div className={s('scroll-content')}>
                    <section>
                        <h1>About Me</h1>
                        <p>
                            I’m a developer and worked as a researcher in the past. Crafting interactive web applications with a focus on frontend and data management ensuring seamless user
                            experiences since 2016. Looking for more opportunities with 3D visualizations.
                        </p>
                        {(device === 'mobile' || device === 'tablet') && (
                            <div className={s('vertical-line')}>
                                <p>Scroll</p>
                                <div />
                            </div>
                        )}
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
                            Even though Lisbon is not known like the tech hubs of the world, living in these streets and studying in my university there provided me with a unique backdrop into program
                            development, engineering, and physics. After a period of studying, participating in a traditional musical group and enjoying student life, with some travels in the mix, I
                            worked as a researcher in physics and 3D (2016-2018). My journey in the web world began in 2018 and still continues today.
                        </p>
                        <p>
                            With a competitive swimming background and a degree in Physics Engineering in hand, I found myself drawn to the mechanisms and the potential of the web. My expertise lies
                            in web-app development, frontend intricacies, and the specialization in graphic maps and, recently, 3D visualizations.
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
                            Seeking adventures beyond my little rectangle of a country, I packed my bags and set my sights on the Netherlands. Here, I had the opportunity to work with new
                            technologies, embrace freelancing and work remotely which allowed me to explore the beauty of East Asia while contributing to a GIS project based in Utrecht.
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
                            Languages have always fascinated me, and I'm not just talking about programming languages like Javascript and C#. Fluent in Portuguese, English, Spanish, and French, with
                            some touches in Dutch. I find joy in unraveling the complexities of communication. These days, I'm immersing myself in the challenge of learning Mandarin, with Taiwan
                            holding a special place in my heart.
                        </p>

                        <p>
                            Living a life enriched by diverse cultures, languages, and codes, I continue to make my story, one line of code and one conversation at a time. Travel is a deep passion for
                            me, from the landscapes of Lisbon to the vibrant energy of the Netherlands and the captivating allure of East Asia. I make my adventure where I go and especially with the
                            people I meet :).
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
