import style from './loading-scene.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export function LoadingScene() {
    return (
        <div className={s('container')}>
            <div className={s('rocket-loader')}>
                <div className={s('rocket')}>
                    <div className={s('rocket-extras')}></div>
                    <div className={s('jet')}>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
