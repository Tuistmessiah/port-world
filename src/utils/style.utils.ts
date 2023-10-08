import cx from 'classnames';

export abstract class StyleUtils {
    /** className mixer ()
     * @example import style from './your.module.scss';
                import { StyleUtils } from '../../utils/style.utils';
                const s = StyleUtils.cx(style);
                ...
                <div className={s('container', { 'some-if': true })}>
     */
    static styleMixer(styles: Record<string, string>) {
        return (...args: (string | Record<string, boolean>)[]) => {
            return cx(
                ...args.map((arg) => {
                    if (typeof arg === 'string') {
                        return styles[arg];
                    }
                    if (typeof arg === 'object') {
                        const newObj: Record<string, boolean> = {};
                        for (const key in arg) {
                            newObj[styles[key]] = arg[key];
                        }
                        return newObj;
                    }
                    return arg;
                })
            );
        };
    }
}
