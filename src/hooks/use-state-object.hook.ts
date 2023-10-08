import { useRef } from 'react';

/**
 * Works as a mutable state object
 * @returns state object
 */
export function useStateObject<T>(initLocalState: T): T {
    const localStateRef = useRef<T>(initLocalState);
    return localStateRef.current;
}
