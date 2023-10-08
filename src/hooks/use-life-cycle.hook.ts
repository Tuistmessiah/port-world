import { useState, useEffect, useRef, DependencyList } from 'react';

type AsyncFunction = () => Promise<void>;

interface UseLifecycleReturn {
    isConstructed: boolean;
    isInit: boolean;
    useAfter: (effect: React.EffectCallback, deps?: DependencyList) => void;
}

/** To divide a component behaviour into 3 phases (life cycles) and run effects in each phase, asynchronously.
 * @example 
      const { isConstructed, isInit, useAfter } = useLifecycle(constructorCb, initCb);
      useAfter(() => console.log('This effect runs after init'), []);
      if (!isConstructed) return null;
 *  @usage 
      following the example implementation, the component will render null until the constructorCb is finished (phase 1), 
      then it will render the component and call initCb (phase 2) and finally it will run the useAfter effects (phase 3)
 */
export function useLifeCycle(constructorCb: AsyncFunction, initCb: AsyncFunction): UseLifecycleReturn {
    const [isConstructed, setIsConstructed] = useState<boolean>(false);
    const [isInit, setIsInit] = useState<boolean>(false);
    const afterEffects = useRef<React.EffectCallback[]>([]);

    useEffect(() => {
        (async () => {
            await constructorCb();
            setIsConstructed(true);
            await initCb();
            setIsInit(true);

            // Run all the effects registered with useAfter
            for (const effect of afterEffects.current) {
                effect();
            }
        })();
    }, [constructorCb, initCb]);

    const useAfter = (effect: React.EffectCallback, deps?: DependencyList) => {
        if (isInit) {
            useEffect(effect, deps);
        } else {
            afterEffects.current.push(() => useEffect(effect, deps));
        }
    };

    return {
        isConstructed,
        isInit,
        useAfter,
    };
}
