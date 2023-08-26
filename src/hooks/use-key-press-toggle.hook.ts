import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { controlState } from '../data/recoil/atoms/session.atoms';

import { useStateRef } from './use-state-ref.hook';

/**
  Key Press, stores a listener for "keydown" event
	@param targetKey Key string to listen to.
	@param onAction Action to run when key pressed. "isKeybindActive" gives the state for the keybind to be on/off.
    @param isKeybindActive Toggles true/false on each press. Use if tracking on/off switch.
    @usage To access local state within 'onAction', use useStateRef and access the 3rd parameter like this 'nameVarRef.current'.
**/
export function useKeyPressToggle(targetKey: string, onAction?: (isKeybindActive: boolean) => void) {
    const [isKeyPressed, setKeyPressed] = useStateRef<boolean>(false);
    const isListeningToKey = useRecoilState(controlState);

    function downHandler({ key }: any) {
        if (isListeningToKey && key === targetKey) {
            const isKeybindActive = !isKeyPressed;

            setKeyPressed(isKeybindActive);
            if (onAction) {
                onAction(isKeybindActive);
            }
        }
    }

    useEffect(() => {
        window.removeEventListener('keydown', downHandler);

        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListeningToKey]);

    return isKeyPressed;
}
