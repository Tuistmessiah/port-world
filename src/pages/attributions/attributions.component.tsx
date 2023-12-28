import CCSvg from '../../assets/svgs/cc-svgrepo-com.svg?react';
import CC0Svg from '../../assets/svgs/cc-zero-svgrepo-com.svg?react';
import CCBySvg from '../../assets/svgs/cc-by-svgrepo-com.svg?react';
import LicenseSvg from '../../assets/svgs/license-svgrepo-com.svg?react';

import kenneyLogo from '../../assets/images/kenney-logo.PNG';
import sketchfabLogo from '../../assets/images/sketchfab-logo.JPG';

import style from './attributions.module.scss';
import { StyleUtils } from '../../utils/style.utils';
const s = StyleUtils.styleMixer(style);

interface AttributionInfo {
    license: {
        link: string;
        description: string;
        isCC?: boolean;
        svgStr?: string;
    };
    website: {
        link: string;
        description: string;
    };
    imgSrc?: string;
    assets: { link: string; description: string }[];
}

/**
 * Page with listing of attributions
 */
export function Attributions() {
    return (
        <div className={s('container')}>
            <div className={s('models')}>
                {modelAttributions.map((attr) => (
                    <AttributionCard {...attr} />
                ))}
            </div>
            <div className={s('multimedia')}>
                {multimediaAttributions.map((attr) => (
                    <AttributionCard {...attr} />
                ))}
            </div>
        </div>
    );
}

function AttributionCard(attr: AttributionInfo) {
    return (
        <div className={s('attribution')}>
            <div className={s('host')}>
                <div className={s('license')}>
                    {attr.license.isCC && <CCSvg />}
                    {attr.license.svgStr && <attr.license.svgStr />}
                    <div>
                        <a href={attr.website.link} target="_blank">
                            {attr.website.description}
                        </a>
                    </div>
                </div>
                <div className={s('website')}>
                    <a href={attr.license.link} target="_blank">
                        {attr.license.description}
                    </a>
                    {attr.imgSrc && <img src={attr.imgSrc} />}
                </div>
            </div>
            {attr.assets.length !== 0 && (
                <div className={s('asset')}>
                    {attr.assets.map((asset) => (
                        <a href={asset.link} target="_blank">
                            {asset.description}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

const modelAttributions: AttributionInfo[] = [
    {
        license: {
            link: 'https://creativecommons.org/publicdomain/zero/1.0/',
            description: 'CC0 1.0 DEED (Universal)',
            isCC: true,
            svgStr: CC0Svg,
        },
        website: {
            link: 'https://kenney.nl/assets',
            description: 'Main models by kenney.nl/assets',
        },
        imgSrc: kenneyLogo,
        assets: [],
    },
    {
        license: {
            link: 'https://creativecommons.org/licenses/by/4.0/',
            description: 'CC BY 4.0 DEED (International)',
            isCC: true,
            svgStr: CCBySvg,
        },
        website: {
            link: 'https://sketchfab.com/',
            description: 'Some models from sketchfab.com:',
        },
        imgSrc: sketchfabLogo,
        assets: [
            {
                link: 'https://sketchfab.com/3d-models/flying-bird-eb843194e06d429ebef7dd4aa7e265c1',
                description: 'Flying Bird',
            },
            {
                link: 'https://sketchfab.com/3d-models/space-exploration-wlp-series-8-91964c1ce1a34c3985b6257441efa500',
                description: 'Moon Rocket',
            },
        ],
    },
];

const multimediaAttributions: AttributionInfo[] = [
    {
        license: {
            link: 'https://www.zapsplat.com/license-type/standard-license/',
            description: 'Standard License',
            svgStr: LicenseSvg,
        },
        website: {
            link: 'https://www.zapsplat.com/',
            description: 'Music from https://www.zapsplat.com',
        },
        assets: [],
    },
    {
        license: {
            link: 'https://www.svgrepo.com/page/licensing/',
            description: 'Multiple Licenses',
            svgStr: LicenseSvg,
        },
        website: {
            link: 'https://www.svgrepo.com',
            description: 'SVG Repo',
        },
        assets: [],
    },
];
