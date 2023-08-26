import { useEffect } from 'react';

/**
 * Works as a convencional "useEffect" hook but doesn't trigger with at least one falsy dependency
 * @param fn callback for useEffect
 * @param triggers Depedencies for useEffect
 */
export function useEffectIf(fn: () => void, triggers: any[]): void {
    useEffect(() => {
        if (hasAnyFalsy(triggers)) return;
        fn();
    }, triggers);

    function hasAnyFalsy(triggers: any[]): boolean {
        for (const trigger of triggers) {
            if (!trigger) return true;
        }
        return false;
    }
}
