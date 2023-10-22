import LinkedInSvg from '../../assets/svgs/linkedin-161-svgrepo-com.svg?react';
import GithubSvg from '../../assets/svgs/github-svgrepo-com.svg?react';
import GmailSvg from '../../assets/svgs/email-1-svgrepo-com.svg?react';

import style from './footer.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export function Footer() {
    return (
        <div className={s('container')}>
            <ul>
                <li>
                    <a className={s('linkedin')} href="https://www.linkedin.com/in/pedro-mpl-caetano/" target="_blank">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <LinkedInSvg />
                    </a>
                </li>
                <li>
                    <a className={s('github')} href="https://github.com/Tuistmessiah" target="_blank">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <GithubSvg />
                    </a>
                </li>
                <li>
                    <a className={s('gmail')} href="mailto:pedro.mpl.caetano@gmail.com">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <GmailSvg />
                    </a>
                </li>
            </ul>
        </div>
    );
}
