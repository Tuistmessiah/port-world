import { useRecoilState } from 'recoil';
import { pageState } from '../../data/recoil/atoms/session.atoms';

import AngularSvg from '../../assets/svgs/angular-svgrepo-com.svg?react';
import MySqlSvg from '../../assets/svgs/mysql-svgrepo-com.svg?react';
import SushiSvg from '../../assets/svgs/sushi-svgrepo-com.svg?react';
import WheelChairSvg from '../../assets/svgs/wheelchair-svgrepo-com.svg?react';
import MapSvg from '../../assets/svgs/map-svgrepo-com.svg?react';
import ReactSvg from '../../assets/svgs/react-svgrepo-com.svg?react';
import PostgreSqlSvg from '../../assets/svgs/postgresql-svgrepo-com.svg?react';
import TypescriptSvg from '../../assets/svgs/typescript-icon-svgrepo-com.svg?react';
import LeafletSvg from '../../assets/svgs/leaflet-svgrepo-com.svg?react';
import NodeSvg from '../../assets/svgs/node-js-svgrepo-com.svg?react';
import FirebaseSvg from '../../assets/svgs/firebase-svgrepo-com.svg?react';
import ReduxSvg from '../../assets/svgs/redux-svgrepo-com.svg?react';
import VueSvg from '../../assets/svgs/vue-9-logo-svgrepo-com.svg?react';
import BookSvg from '../../assets/svgs/book-education-learning-puzzle-school-study-svgrepo-com.svg?react';
import OpenGlSvg from '../../assets/svgs/opengl-svgrepo-com.svg?react';
import PhysicsSvg from '../../assets/svgs/physics-svgrepo-com.svg?react';
import ScientistSvg from '../../assets/svgs/scientist-svgrepo-com.svg?react';
import WolframSvg from '../../assets/svgs/wolfram-svgrepo-com.svg?react';
import MatrixSvg from '../../assets/svgs/matrix-svgrepo-com.svg?react';
import GraphQLSvg from '../../assets/svgs/graphql-svgrepo-com.svg?react';
import NLSvg from '../../assets/svgs/netherlands-holland-svgrepo-com.svg?react';
import DockerSvg from '../../assets/svgs/docker-svgrepo-com.svg?react';
import PTSvg from '../../assets/svgs/flag-for-portugal-svgrepo-com.svg?react';

import { StyleUtils } from '../../utils/style.utils';
import style from './career.module.scss';
const s = StyleUtils.styleMixer(style);

export function Career() {
    const [, setPage] = useRecoilState(pageState);
    return (
        <div className={s('container')}>
            <div className={s('scroll-container')}>
                <div className={s('timeline')}>
                    <div className={s('timeline-container')}>
                        <div className={s('timeline-icon')}>
                            <BookSvg />
                        </div>
                        <div
                            className={s('timeline-body')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'academia' });
                            }}
                        >
                            <h4 className={s('timeline-title')}>
                                <a href="https://tecnico.ulisboa.pt/en/" target="_blank">
                                    Academia
                                </a>
                                <PTSvg />
                            </h4>
                            <p>Physics Engineering - Graduation & Post Graduation</p>
                            <p>Computer Science Subjects on C. Graphics</p>
                            <p>Research Scholarship at ISTAR-ISCTE (Lisbon)</p>
                            <ul className={s('tech-pills')}>
                                <PhysicsSvg />
                                <OpenGlSvg />
                                <ScientistSvg />
                                <WolframSvg />
                                <MatrixSvg />
                                <li className={s('tech-pill')}>{'Consultant'}</li>
                            </ul>
                            <p className={s('timeline-subtitle')}>{'< 2018'}</p>
                        </div>
                    </div>
                    <div className={s('timeline-container')}>
                        <div className={s('timeline-icon')}>
                            <AngularSvg />
                        </div>
                        <div
                            className={s('timeline-body')}
                            onClick={() => {
                                setPage({ endpoint: '/career', section: 'novabase' });
                            }}
                        >
                            <h4 className={s('timeline-title')}>
                                <a href="https://www.novabase.com/en/" target="_blank">
                                    Novabase Lisbon
                                </a>
                            </h4>
                            <p>
                                <strong>TLDR</strong>: Developed backoffice service from scratch to manage data and workflow from different departments. Fullstack.
                            </p>
                            <p>
                                As a <strong className={s('underline')}>Web Consultant</strong> for a prominent advertisement firm, GroupM, I played a pivotal role in the conception and realization of
                                their sophisticated internal back-office system. This initiative was critical to managing their multiple departments, each intertwined with intricate data streams and
                                dependencies. My expertise was instrumental in untangling and streamlining this complex web of information, ensuring data cohesion and seamless inter-departmental
                                interactions. By integrating advanced full-stack technologies, I engineered an intuitive and efficient user interface that significantly enhanced the company's
                                workflow.
                            </p>
                            <p>
                                Collaboration was at the heart of this project, demanding extensive business analysis to capture every nuance of the firm's requirements. I closely partnered with a
                                cross-functional team, which encompassed the CEO, departmental managers, and the development squad. Through these synergies, we achieved a holistic understanding of the
                                organization's needs and objectives. This collaborative endeavor not only produced a system that met the company's strategic goals but also established a benchmark for
                                organizational efficiency and user-centric design.
                            </p>
                            <ul className={s('tech-pills')}>
                                <AngularSvg />
                                <TypescriptSvg />
                                <MySqlSvg />
                                <li className={s('tech-pill')}>{'Consultant'}</li>
                                <li className={s('tech-pill')}>{'Junior'}</li>
                            </ul>
                            <p className={s('timeline-subtitle')}>{'2019'}</p>
                        </div>
                    </div>
                    <div className={s('timeline-container')}>
                        <div className={s('timeline-icon')}>
                            <SushiSvg />
                        </div>
                        <div className={s('timeline-body')}>
                            <h4 className={s('timeline-title')}>
                                <a href="https://www.aruki.pt/" target="_blank">
                                    Aruki Sushi Delivery
                                </a>
                            </h4>
                            <p>
                                <strong>TLDR</strong>: Worked with a sushi restaurant to develop a backoffice system to manage their workforce and streamline backend processes for ordering. React FE.
                            </p>
                            <p>
                                During my freelancing tenure, I spearheaded a digital transformation project for a renowned sushi restaurant aiming to optimize their internal operations. Recognizing
                                the need for a centralized system to manage their workforce and streamline backend processes, I designed and implemented a comprehensive back-office solution tailored
                                to their specific needs. Key features of this system included a bespoke internal cart functionality, robust product editing capabilities, and a secure authentication
                                mechanism.
                            </p>
                            <p>
                                Leveraging the power and flexibility of React, I ensured the system was both responsive and user-friendly. To further enhance the user experience and expedite the
                                development timeline, I integrated a CSS template, ensuring a consistent and aesthetically pleasing interface. This project, characterized by its sophistication and
                                functional design, greatly augmented the restaurant's operational efficiency and set a new standard for backend systems in the hospitality sector.
                            </p>
                            <ul className={s('tech-pills')}>
                                <ReactSvg />
                            </ul>
                            <p className={s('timeline-subtitle')}>{'2020'}</p>
                        </div>
                    </div>
                    <div className={s('timeline-container')}>
                        <div className={s('timeline-icon')}>
                            <WheelChairSvg />
                        </div>
                        <div className={s('timeline-body')}>
                            <h4 className={s('timeline-title')}>
                                <a href="https://elanza.nl/" target="_blank">
                                    Elanza Utrecht
                                </a>
                                <NLSvg />
                            </h4>
                            <p>
                                <strong>TLDR</strong>: Helped a startup with a platform for NL healthcare workers with authentication, invoicing, email generation, UI and stack migration. React FE,
                                Node BE.
                            </p>
                            <p>
                                In an ambitious startup focused on streamlining the engagement of freelancing professionals within the Dutch healthcare system, I took on a significant role as a
                                Fullstack Developer. The startup's vision was to revolutionize the way healthcare professionals connected and collaborated, and their existing React application was
                                pivotal to this mission. Recognizing the evolving needs of the platform and the advantages of modern technologies, I spearheaded a comprehensive overhaul of the app,
                                transitioning from React to TypeScript coupled with Hooks. This move was instrumental in enhancing the app's maintainability, scalability, and performance.
                            </p>
                            <p>
                                Beyond the frontend, there were substantial shifts in the backend architecture. I managed the migration from Firebase to a more robust and flexible combination of
                                GraphQL and a PostgreSQL database, ensuring data integrity, security, and optimization. My role was not limited to just frontend refinements; I played an integral part
                                in developing an internal invoicing system that streamlined the startup's financial processes. Additionally, I designed and implemented an email generating service,
                                automating key communications and enhancing stakeholder engagement. Through these multifaceted contributions, I substantially contributed to the startup's goal of
                                reshaping the Dutch healthcare freelancing landscape.
                            </p>
                            <ul className={s('tech-pills')}>
                                <PostgreSqlSvg />
                                <NodeSvg />
                                <ReduxSvg />
                                <FirebaseSvg />
                                <GraphQLSvg />
                                <DockerSvg />
                                <li className={s('tech-pill')}>{'Medior'}</li>
                            </ul>
                            <p className={s('timeline-subtitle')}>{'2021'}</p>
                        </div>
                    </div>
                    <div className={s('timeline-container')}>
                        <div className={s('timeline-icon')}>
                            <MapSvg />
                        </div>
                        <div className={s('timeline-body')}>
                            <h4 className={s('timeline-title')}>
                                <a href="https://www.thepeoplegroup.nl/" target="_blank">
                                    The People Group (GIS Specialisten)
                                </a>
                            </h4>
                            <p>
                                <strong>TLDR</strong>: Lead frontend developer for a web map application. Multiple FE frameworks. Nest BE. API Integrations.
                            </p>
                            <p>
                                In my current role, I've had the privilege of pioneering the development of a cutting-edge web map application, architected from the ground up. This application
                                leverages the capabilities of a third-party GIS software, seamlessly integrated into a robust frontend framework composed of React, TypeScript, Redux, and LeafletJS.
                                The technological diversity didn't end there; I also acquired hands-on experience with Angular, VueJS, and NestJS, broadening the application's reach and capability.
                            </p>
                            <p>
                                Starting with an agile team of two, we've since doubled in size, reflecting the project's growth and the increasing complexities it presented. As the team expanded, I
                                naturally gravitated towards a leadership role, particularly concerning frontend responsibilities. I've passionately mentored and guided more junior developers,
                                ensuring best practices, knowledge transfer, and the consistent delivery of high-quality code. While my primary focus remained on frontend development, I embraced the
                                opportunity to delve into threejs during our endeavors with a backoffice application, further diversifying my skill set and contributing to the project's multifaceted
                                nature.
                            </p>
                            <ul className={s('tech-pills')}>
                                <LeafletSvg />
                                <VueSvg />
                                <li className={s('tech-pill')}>{'Lead Frontend'}</li>
                                <li className={s('tech-pill')}>{'API Integrations'}</li>
                            </ul>
                            <p className={s('timeline-subtitle')}>{'2024'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
