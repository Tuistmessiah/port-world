import style from './landing.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export function Landing() {
    return (
        <div className={s('container')}>
            <section>
                <h1>Pedro Caetano</h1>
                <p>Software Engineer</p>
                <p>Welcome to my digital space. Dive in and explore!</p>
            </section>
        </div>
    );
}
