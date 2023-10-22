export const breakpoints = {
    mobile: 768,
    mobileTablet: 915,
    tablet: 1280,
    tabletLaptop: 1440,
    laptop: 1920,
    desktop: 2500,
    large: Infinity,
};

/** Every utility method related with UI/UX display */
export abstract class UiuxUtils {
    static isAppleDevice() {
        return window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPhone/i);
    }
    static isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /** Device width breakpoint by type
     * @param minmax - min (all width bigger and including device type), max (all width smaller and including device type)
     * @obs mobile: 700px, tablet: 1300px, laptop: 1920px, desktop: 2500px.
     * @obs calling breakpoint(mobile, min) OR breakpoint(large, max) will include all devices (same values as in /styles/breakpoints.scss)
     */
    static breakpoint(type: 'mobile' | 'mobile-tablet' | 'tablet' | 'tablet-laptop' | 'laptop' | 'desktop' | 'large', minMax: 'min' | 'max' = 'min'): boolean {
        const innerWidth = window.innerWidth;
        switch (type) {
            case 'mobile':
                return minMax === 'max' ? innerWidth <= breakpoints.mobile : innerWidth > 0; // max: width <= 768px, min: width > 0px
            case 'mobile-tablet':
                return minMax === 'max' ? innerWidth <= breakpoints.mobileTablet : innerWidth > breakpoints.mobile; // max: width <= 915px, min: width > 768px
            case 'tablet':
                return minMax === 'max' ? innerWidth <= breakpoints.tablet : innerWidth > breakpoints.mobileTablet; // max: width <= 1280px, min: width > 915px
            case 'tablet-laptop':
                return minMax === 'max' ? innerWidth <= breakpoints.tabletLaptop : innerWidth > breakpoints.tablet; // max: width <= 1440px, min: width > 1280px
            case 'laptop':
                return minMax === 'max' ? innerWidth <= breakpoints.laptop : innerWidth > breakpoints.tabletLaptop; // max: width <= 1920px, min: width > 1440px
            case 'desktop':
                return minMax === 'max' ? innerWidth <= breakpoints.desktop : innerWidth > breakpoints.laptop; // max: width <= 2500px, min: width > 1920px
            case 'large':
                return minMax === 'max' ? innerWidth <= breakpoints.large : innerWidth > breakpoints.desktop; // max: width <= Infinity, min: width > 2500px
        }
    }

    static getDeviceType(): 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'large' {
        let type: 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'large';
        if (window.innerWidth <= breakpoints.mobile) {
            type = 'mobile';
        } else if (window.innerWidth <= breakpoints.tablet) {
            type = 'tablet';
        } else if (window.innerWidth <= breakpoints.laptop) {
            type = 'laptop';
        } else if (window.innerWidth <= breakpoints.desktop) {
            type = 'desktop';
        } else {
            type = 'large';
        }
        return type;
    }
}
