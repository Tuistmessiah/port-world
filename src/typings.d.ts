declare module 'r3f-perf' {
    const Perf: any;
    export { Perf };
}

declare module 'three/examples/jsm/curves/CurvesExtras.js' {
    const GrannyKnot: any;
    export { GrannyKnot };
}

declare module '*.glsl' {
    const value: string;
    export default value;
}

declare module '*.glb' {
    const value: string;
    export default value;
}

declare module '*.gltf' {
    const value: string;
    export default value;
}

declare module '*.svg?react' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
