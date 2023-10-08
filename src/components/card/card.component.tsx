// import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import corgiImg from '../../assets/images/corgi-1.jpg';

// import { AppState } from '../../data/interfaces/redux/redux.interface';

import style from './card.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export interface CardProps {}

const defaultProps = {} as Required<CardProps>;

/**
 * DESCRIPTION
 */
export function Card(props: CardProps) {
    const {} = { ...defaultProps, ...props };

    // const [STATE, SETSTATE] = useRecoilState(somethingState);
    // const [STATE, SETSTATE] = useState();

    return (
        <div className={s('container')}>
            <div className={s('intro')}>
                <img src={corgiImg} alt={`corgi`} />
                <div className={s('content')}>
                    <h2>Project 1</h2>
                    <h3>Worked in ISTART bla bla bla</h3>
                    <p>Description of project 1. This is a personal project showcasing my skills and achievements.</p>
                    <a href={'value'} target="_blank">
                        A link to
                    </a>
                </div>
            </div>
            <div className={s('carrossel')}></div>
        </div>
    );
}
