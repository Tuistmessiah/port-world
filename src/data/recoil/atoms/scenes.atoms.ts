import { RootState } from '@react-three/fiber';
import { atom } from 'recoil';

export const threeState = atom<RootState | undefined>({
    key: 'rootState',
    default: undefined,
});
