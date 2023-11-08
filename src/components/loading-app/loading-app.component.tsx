import style from './loading-app.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export function LoadingApp() {
    return (
        <div className={s('container')}>
            <span>Loading</span>
        </div>
    );
}
