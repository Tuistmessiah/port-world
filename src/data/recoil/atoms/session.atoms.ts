import { RootState } from '@react-three/fiber';
import { atom } from 'recoil';

interface ControlState {
    isListeningToKey: boolean;
    isListeningToMouse: boolean;
    isListeningToScroll: boolean;
}

export type Endpoints = '/' | '/about' | '/projects' | '/career' | '/attr';
export type Sections = 'academia' | 'novabase' | 'aruki' | 'elanza' | 'thepeoplegroup';

export interface PageState {
    endpoint: Endpoints;
    section?: Sections;
    moving?: boolean;
    orbitControls?: boolean;
}

export const initialLoadState = atom<boolean>({
    key: 'initialLoadState',
    default: false,
});

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
