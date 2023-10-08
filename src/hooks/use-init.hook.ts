import { useEffect } from 'react';

/**
 * Works as a convencional "useEffect" hook but only for the first render (dependencies = [])
 * @param fn callback for useEffect
 */
// TODO: TO be removed and replaced with useLifeCycle hook
export function useInit(fn: () => void): void {
    useEffect(() => {
        fn();
    }, []);
}
