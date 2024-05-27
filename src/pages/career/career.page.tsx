import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { deviceState, pageState } from '../../data/recoil/atoms/session.atoms';
import Tippy from '@tippyjs/react';

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
import LinkSvg from '../../assets/svgs/link-alt-svgrepo-com.svg?react';
import ArrowLeft from '../../assets/svgs/arrow-sm-left-svgrepo-com.svg?react';

import { StyleUtils } from '../../utils/style.utils';
import style from './career.module.scss';
import { ButtonSvg } from '../../components/button-svg/button-svg.component';
const s = StyleUtils.styleMixer(style);

export function Career() {
  const [page, setPage] = useRecoilState(pageState);
  const [device] = useRecoilState(deviceState);

  const [shined, setShined] = useState<{ [key in string]: boolean }>({});
  const academiaRef = useRef(null);
  const novabaseRef = useRef(null);
  const arukiRef = useRef(null);
  const elanzaRef = useRef(null);
  const thepeoplegroupRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    goToCareerSections();
  }, [page.section]);

  function goToCareerSections() {
    if (page.endpoint !== '/career') return;

    switch (page.section) {
      case 'academia':
        scrollToComponent(academiaRef, scrollRef);
        break;
      case 'novabase':
        scrollToComponent(novabaseRef, scrollRef);
        break;
      case 'aruki':
        scrollToComponent(arukiRef, scrollRef);
        break;
      case 'elanza':
        scrollToComponent(elanzaRef, scrollRef);
        break;
      case 'thepeoplegroup':
        scrollToComponent(thepeoplegroupRef, scrollRef);
        break;
      default:
        scrollToComponent(academiaRef, scrollRef);
    }
  }

  // TODO: Place sections inside a single component class with parameters

  return (
    <div className={s('container')}>
      <Tippy content={'Back to Career View'} theme={'dark'} arrow={false} delay={[700, null]}>
        <div className={s('career-btn')}>
          {!!page.section && (
            <ButtonSvg
              Svg={<ArrowLeft />}
              onClick={() => {
                setPage({ ...page, section: undefined });
              }}
            />
          )}
        </div>
      </Tippy>

      <div className={s('scroll-container')} ref={scrollRef}>
        <div className={s('timeline')}>
          <div className={s('timeline-container')} ref={academiaRef}>
            <FadeInSection>
              <Tippy content={'Go to Academica Castle 🏰'} theme={'dark'} arrow={false}>
                <div
                  className={s('timeline-icon', 'subscribe-button')}
                  onClick={() => {
                    setPage({ endpoint: '/career', section: 'academia' });
                  }}
                >
                  <BookSvg />
                </div>
              </Tippy>
              <div
                className={s('timeline-body', 'shine-effect', { shined: shined.academia })}
                onMouseOver={() => setShined((shined) => ({ ...shined, academia: true }))}
                onClick={() => {
                  setPage({ endpoint: '/career', section: 'academia' });
                }}
              >
                <h4 className={s('timeline-title')}>
                  <a href="https://tecnico.ulisboa.pt/en/" target="_blank">
                    Academia
                    <LinkSvg />
                  </a>
                  <Tippy content={'Living in Portugal'} theme={'dark'} arrow={false}>
                    <div>
                      <PTSvg />
                    </div>
                  </Tippy>
                </h4>
                <p>Physics Engineering - Graduation & Post Graduation</p>
                <p>Computer Science Subjects on C. Graphics</p>
                <p>Research Scholarship at ISTAR-ISCTE (Lisbon)</p>
                <ul className={s('tech-pills')}>
                  <Tippy content={'Theoretical & Applied Physics'} theme={'dark'} arrow={false}>
                    <div>
                      <PhysicsSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'OpenGL'} theme={'dark'} arrow={false}>
                    <div>
                      <OpenGlSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Researcher'} theme={'dark'} arrow={false}>
                    <div>
                      <ScientistSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Wolfram Mathematica'} theme={'dark'} arrow={false}>
                    <div>
                      <WolframSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Algebra Math'} theme={'dark'} arrow={false}>
                    <div>
                      <MatrixSvg />
                    </div>
                  </Tippy>
                </ul>

                <p className={s('timeline-subtitle')}>{'< 2018 (researcher 2y)'}</p>
              </div>
            </FadeInSection>
          </div>
          <div className={s('timeline-container')} ref={novabaseRef}>
            <FadeInSection>
              <Tippy content={'Go to Novabase Automations 🛠️'} theme={'dark'} arrow={false}>
                <div
                  className={s('timeline-icon')}
                  onClick={() => {
                    setPage({ endpoint: '/career', section: 'novabase' });
                  }}
                >
                  <AngularSvg />
                </div>
              </Tippy>
              <div
                className={s('timeline-body', 'shine-effect', { shined: shined.novabase })}
                onMouseOver={() => setShined((shined) => ({ ...shined, novabase: true }))}
                onClick={() => {
                  setPage({ endpoint: '/career', section: 'novabase' });
                }}
              >
                <h4 className={s('timeline-title')}>
                  <a href="https://www.novabase.com/en/" target="_blank">
                    Novabase Lisbon
                    <LinkSvg />
                  </a>
                </h4>
                <p className={s('abstract')}>Developed backoffice service from scratch to manage data and workflow from different departments. Fullstack.</p>
                <p>
                  As a <strong className={s('underline')}>Web Consultant</strong> for a prominent advertisement firm, GroupM, I played a pivotal role in the conception and
                  realization of their sophisticated internal back-office system. This initiative was critical to managing their multiple departments, each intertwined with
                  intricate data streams and dependencies. My expertise was instrumental in untangling and streamlining this complex web of information, ensuring data cohesion and
                  seamless inter-departmental interactions. By integrating advanced full-stack technologies, I engineered an intuitive and efficient user interface that
                  significantly enhanced the company's workflow.
                </p>
                <p>
                  Collaboration was at the heart of this project, demanding extensive business analysis to capture every nuance of the firm's requirements. I closely partnered with
                  a cross-functional team, which encompassed the CEO, departmental managers, and the development squad. Through these synergies, we achieved a holistic
                  understanding of the organization's needs and objectives. This collaborative endeavor not only produced a system that met the company's strategic goals but also
                  established a benchmark for organizational efficiency and user-centric design.
                </p>
                <ul className={s('tech-pills')}>
                  <Tippy content={'Angular'} theme={'dark'} arrow={false}>
                    <div>
                      <AngularSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Typescript'} theme={'dark'} arrow={false}>
                    <div>
                      <TypescriptSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'MySql'} theme={'dark'} arrow={false}>
                    <div>
                      <MySqlSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Software Consultant'} theme={'dark'} arrow={false}>
                    <li className={s('tech-pill')}>{'Consultant'}</li>
                  </Tippy>
                  <li className={s('tech-pill')}>{'Junior'}</li>
                </ul>
                <p className={s('timeline-subtitle')}>{'2019'}</p>
              </div>
            </FadeInSection>
          </div>
          <div className={s('timeline-container')} ref={arukiRef}>
            <FadeInSection>
              <Tippy content={'Go to Aruki Sushi Island 🥢'} theme={'dark'} arrow={false}>
                <div
                  className={s('timeline-icon')}
                  onClick={() => {
                    setPage({ endpoint: '/career', section: 'aruki' });
                  }}
                >
                  <SushiSvg />
                </div>
              </Tippy>
              <div
                className={s('timeline-body', 'shine-effect', { shined: shined.aruki })}
                onMouseOver={() => setShined((shined) => ({ ...shined, aruki: true }))}
                onClick={() => {
                  setPage({ endpoint: '/career', section: 'aruki' });
                }}
              >
                <h4 className={s('timeline-title')}>
                  <a href="https://www.aruki.pt/" target="_blank">
                    Aruki Sushi Delivery
                    <LinkSvg />
                  </a>
                </h4>
                <p className={s('abstract')}>
                  Worked with a sushi restaurant to develop a backoffice system to manage their workforce and streamline backend processes for ordering. React FE. Freelanced also
                  other small projects.
                </p>
                <p>
                  During my freelancing tenure, I spearheaded a digital transformation project for a renowned sushi restaurant aiming to optimize their internal operations.
                  Recognizing the need for a centralized system to manage their workforce and streamline backend processes, I designed and implemented a comprehensive back-office
                  solution tailored to their specific needs. Key features of this system included a bespoke internal cart functionality, robust product editing capabilities, and a
                  secure authentication mechanism.
                </p>
                <p>
                  Leveraging the power and flexibility of React, I ensured the system was both responsive and user-friendly. To further enhance the user experience and expedite the
                  development timeline, I integrated a CSS template, ensuring a consistent and aesthetically pleasing interface. This project, characterized by its sophistication
                  and functional design, greatly augmented the restaurant's operational efficiency and set a new standard for backend systems in the hospitality sector.
                </p>
                <p>During this time I worked has a freelancer, for the restaurant and other small projects that appeared.</p>
                <ul className={s('tech-pills')}>
                  <Tippy content={'React'} theme={'dark'} arrow={false}>
                    <div>
                      <ReactSvg />
                    </div>
                  </Tippy>
                </ul>
                <p className={s('timeline-subtitle')}>{'2020'}</p>
              </div>
            </FadeInSection>
          </div>
          <div className={s('timeline-container')} ref={elanzaRef}>
            <FadeInSection>
              <Tippy content={'Go to Elanza Care Park 🩺'} theme={'dark'} arrow={false}>
                <div
                  className={s('timeline-icon')}
                  onClick={() => {
                    setPage({ endpoint: '/career', section: 'elanza' });
                  }}
                >
                  <WheelChairSvg />
                </div>
              </Tippy>
              <div
                className={s('timeline-body', 'shine-effect', { shined: shined.elanza })}
                onMouseOver={() => setShined((shined) => ({ ...shined, elanza: true }))}
                onClick={() => {
                  setPage({ endpoint: '/career', section: 'elanza' });
                }}
              >
                <h4 className={s('timeline-title')}>
                  <a href="https://elanza.nl/" target="_blank">
                    Elanza Utrecht
                    <LinkSvg />
                  </a>
                  <Tippy content={'Moved to The Netherlands'} theme={'dark'} arrow={false}>
                    <div>
                      <NLSvg />
                    </div>
                  </Tippy>
                </h4>
                <p className={s('abstract')}>
                  Helped a startup with a platform for NL healthcare workers with authentication, invoicing, email generation, UI and stack migration. React FE, Node BE.
                </p>
                <p>
                  In an ambitious startup focused on streamlining the engagement of freelancing professionals within the Dutch healthcare system, I took on a significant role as a
                  Fullstack Developer. The startup's vision was to revolutionize the way healthcare professionals connected and collaborated, and their existing React application
                  was pivotal to this mission. Recognizing the evolving needs of the platform and the advantages of modern technologies, I spearheaded a comprehensive overhaul of
                  the app, transitioning from React to TypeScript coupled with Hooks. This move was instrumental in enhancing the app's maintainability, scalability, and
                  performance.
                </p>
                <p>
                  Beyond the frontend, there were substantial shifts in the backend architecture. I managed the migration from Firebase to a more robust and flexible combination of
                  GraphQL and a PostgreSQL database, ensuring data integrity, security, and optimization. My role was not limited to just frontend refinements; I played an integral
                  part in developing an internal invoicing system that streamlined the startup's financial processes. Additionally, I designed and implemented an email generating
                  service, automating key communications and enhancing stakeholder engagement. Through these multifaceted contributions, I substantially contributed to the
                  startup's goal of reshaping the Dutch healthcare freelancing landscape.
                </p>
                <ul className={s('tech-pills')}>
                  <Tippy content={'PostgreSql'} theme={'dark'} arrow={false}>
                    <div>
                      <PostgreSqlSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Node'} theme={'dark'} arrow={false}>
                    <div>
                      <NodeSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Redux'} theme={'dark'} arrow={false}>
                    <div>
                      <ReduxSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Firebase'} theme={'dark'} arrow={false}>
                    <div>
                      <FirebaseSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'GraphQL'} theme={'dark'} arrow={false}>
                    <div>
                      <GraphQLSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Docker'} theme={'dark'} arrow={false}>
                    <div>
                      <DockerSvg />
                    </div>
                  </Tippy>
                  <li className={s('tech-pill')}>{'Medior'}</li>
                </ul>
                <p className={s('timeline-subtitle')}>{'2021'}</p>
              </div>
            </FadeInSection>
          </div>
          <div className={s('timeline-container')} ref={thepeoplegroupRef}>
            <FadeInSection>
              <Tippy content={'Go to GIS Map town 🗺️'} theme={'dark'} arrow={false}>
                <div
                  className={s('timeline-icon')}
                  onClick={() => {
                    setPage({ endpoint: '/career', section: 'thepeoplegroup' });
                  }}
                >
                  <MapSvg />
                </div>
              </Tippy>
              <div
                className={s('timeline-body', 'shine-effect', { shined: shined.gis })}
                onMouseOver={() => setShined((shined) => ({ ...shined, gis: true }))}
                onClick={() => {
                  setPage({ endpoint: '/career', section: 'thepeoplegroup' });
                }}
              >
                <h4 className={s('timeline-title')}>
                  <a href="https://www.thepeoplegroup.nl/" target="_blank">
                    The People Group (GIS Specialisten)
                    <LinkSvg />
                  </a>
                </h4>
                <p className={s('abstract')}>Lead frontend developer for a web map application. Multiple FE frameworks. Nest BE. API Integrations.</p>
                <p>
                  In my current role, I've had the privilege of pioneering the development of a cutting-edge web map application, architected from the ground up. This application
                  leverages the capabilities of a third-party GIS software, seamlessly integrated into a robust frontend framework composed of React, TypeScript, Redux, and
                  LeafletJS. The technological diversity didn't end there; I also acquired hands-on experience with Angular, VueJS, and NestJS, broadening the application's reach
                  and capability.
                </p>
                <p>
                  Starting with an agile team of two, we've since doubled in size, reflecting the project's growth and the increasing complexities it presented. As the team
                  expanded, I naturally gravitated towards a leadership role, particularly concerning frontend responsibilities. I've passionately mentored and guided more junior
                  developers, ensuring best practices, knowledge transfer, and the consistent delivery of high-quality code. While my primary focus remained on frontend
                  development, I embraced the opportunity to delve into threejs during our endeavors with a backoffice application, further diversifying my skill set and
                  contributing to the project's multifaceted nature.
                </p>
                <ul className={s('tech-pills')}>
                  <Tippy content={'Leaflet'} theme={'dark'} arrow={false}>
                    <div>
                      <LeafletSvg />
                    </div>
                  </Tippy>
                  <Tippy content={'Vue'} theme={'dark'} arrow={false}>
                    <div>
                      <VueSvg />
                    </div>
                  </Tippy>
                  <li className={s('tech-pill')}>{'Lead Frontend'}</li>
                  <li className={s('tech-pill')}>{'Senior React'}</li>
                  <li className={s('tech-pill')}>{'API Integrations'}</li>
                </ul>
                <p className={s('timeline-subtitle')}>{'2024'}</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );

  function scrollToComponent(ref: React.MutableRefObject<any>, containerRef: React.MutableRefObject<any>) {
    if (device === 'mobile') return;
    if (ref.current && containerRef.current) {
      const offsetTop = ref.current.getBoundingClientRect().top + containerRef.current.scrollTop - 40;
      containerRef.current.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }
}

function FadeInSection(props: any) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
          }, 300);
        }
      },
      { root: document.getElementById('scroll-container') }
    );
    if (ref.current as any) {
      observer.observe(ref.current as any);
    }
    return () => {
      if (ref.current as any) {
        observer.unobserve(ref.current as any);
      }
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div ref={ref} className={s('fade-in-section', { visible: isVisible })}>
      {props.children}
    </div>
  );
}
