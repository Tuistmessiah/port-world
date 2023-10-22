import { ReactElement } from 'react';

import style from './page-slider.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

// TODO: Have HOC to give components a custom amount of time to de-render

/**
 * Wrapper to render pages in a slider coming from the right
 */
export function PageSlider(props: { children: ReactElement }) {
    return <div className={s('container')}>{props.children}</div>;
}
