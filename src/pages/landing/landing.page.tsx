import style from './landing.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export function Landing() {
    return (
        <div className={s('container')}>
            <section>
                <h1>Pedro C.</h1>
                <p>Web Developer by day. 3D enthusiast by night.</p>
                <p>Welcome to my digital space. Dive in and explore!</p>
            </section>
        </div>
    );
}
