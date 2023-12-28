import { useRecoilState } from 'recoil';
import Tippy from '@tippyjs/react';

import { PageState, pageState } from '../../data/recoil/atoms/session.atoms';

import LinkedInSvg from '../../assets/svgs/linkedin-161-svgrepo-com.svg?react';
import GithubSvg from '../../assets/svgs/github-svgrepo-com.svg?react';
import GmailSvg from '../../assets/svgs/email-1-svgrepo-com.svg?react';
import CCSvg from '../../assets/svgs/cc-svgrepo-com.svg?react';

import style from './footer.module.scss';
import { StyleUtils } from '../../utils/style.utils';
import { useLocation } from 'react-router-dom';
const s = StyleUtils.styleMixer(style);

export function Footer() {
    const location = useLocation();
    const [page, setPage] = useRecoilState(pageState);

    return (
        <div className={s('container', { bottom: location.pathname === '/attr' || location.pathname === '/' })}>
            <ul>
                <Tippy content={'LinkedIn'} theme={'dark'} arrow={false}>
                    <li>
                        <a id={s('linkedin')} href="https://www.linkedin.com/in/pedro-mpl-caetano/" target="_blank">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <LinkedInSvg />
                        </a>
                    </li>
                </Tippy>
                <Tippy content={'Github'} theme={'dark'} arrow={false}>
                    <li>
                        <a id={s('github')} href="https://github.com/Tuistmessiah" target="_blank">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <GithubSvg />
                        </a>
                    </li>
                </Tippy>
                <Tippy content={'Gmail'} theme={'dark'} arrow={false}>
                    <li>
                        <a id={s('gmail')} href="mailto:pedro.mpl.caetano@gmail.com">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <GmailSvg />
                        </a>
                    </li>
                </Tippy>
                <Tippy content={'Asset Attribution'} theme={'dark'} arrow={false}>
                    <li
                        className={s('asset-attr')}
                        onClick={() => {
                            setPage({ endpoint: '/attr', section: undefined } as PageState);
                        }}
                    >
                        <div className={s('svg')}>
                            <CCSvg />
                        </div>
                    </li>
                </Tippy>
            </ul>
        </div>
    );
}
