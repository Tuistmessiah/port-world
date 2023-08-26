import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react';

/**
 * Works as a convencional "useState" hook but can be used inside Event Listeners
 * @usage Use 'getState' inside event listeners to get current value of state ref
 * @param initialState initial state
 * @returns tuple with state value
 */
// TODO: Being able to have optional initialState
export function useStateRef<T>(initialState: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(initialState);
    const stateRef: MutableRefObject<T> = useRef(state);

    function setStateRef(stateInput: any | T) {
        // Check if setState argument is a callback or data
        let newState = stateInput;
        if (typeof newState === 'function') newState = stateInput(stateRef.current);

        stateRef.current = newState;
        setState(newState);
    }

    return [stateRef.current, setStateRef];
}
