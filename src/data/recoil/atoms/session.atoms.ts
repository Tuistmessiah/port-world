import { RootState } from '@react-three/fiber';
import { atom } from 'recoil';

interface ControlState {
    isListeningToKey: boolean;
    isListeningToMouse: boolean;
    isListeningToScroll: boolean;
}

export interface PageState {
    endpoint: '/' | '/about' | '/projects' | '/career';
    section?: 'academia' | 'novabase' | 'aruki' | 'elanza' | 'thepeoplegroup';
    moving?: boolean;
    orbitControls?: boolean;
}

export const controlState = atom<ControlState>({
    key: 'controlState',
    default: {
        isListeningToKey: true,
        isListeningToMouse: true,
        isListeningToScroll: true,
    },
});

export const pageState = atom<PageState>({
    key: 'pageState',
    default: { endpoint: '/', section: undefined, moving: undefined },
});

export const threeState = atom<RootState | undefined>({
    key: 'threeState',
    default: undefined,
});

export const deviceState = atom<'mobile' | 'tablet' | 'laptop' | 'desktop' | 'large' | undefined>({
    key: 'deviceState',
    default: undefined,
});
