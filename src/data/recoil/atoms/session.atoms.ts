import { RootState } from '@react-three/fiber';
import { atom } from 'recoil';

interface ControlState {
    isListeningToKey: boolean;
    isListeningToMouse: boolean;
    isListeningToScroll: boolean;
}

export const controlState = atom<ControlState>({
    key: 'controlState',
    default: {
        isListeningToKey: true,
        isListeningToMouse: true,
        isListeningToScroll: true,
    },
});

export const pageState = atom<'/' | '/about' | '/projects' | '/career' | '/media'>({
    key: 'pageState',
    default: '/',
});

export const threeState = atom<RootState | undefined>({
    key: 'threeState',
    default: undefined,
});
