import style from './button-svg.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

export interface ButtonSvgProps {
    Svg: React.ReactElement;
    onClick?: () => void;
}

const defaultProps = {
    onClick: () => {},
} as Required<ButtonSvgProps>;

/**
 * Circular button with SVG
 */
export function ButtonSvg(props: ButtonSvgProps) {
    const { onClick, Svg } = { ...defaultProps, ...props };

    return (
        <button className={s('btn')} onClick={() => onClick()}>
            {Svg}
        </button>
    );
}
