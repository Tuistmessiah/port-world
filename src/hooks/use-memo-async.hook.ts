import { useState, useEffect, useRef } from 'react';

/**
 * DEV: comment what does this do
 * @param asyncCallback
 * @param dependencies
 * @returns
 */
export function useMemoAsync(asyncCallback: () => any, dependencies: React.DependencyList | undefined): any {
    const [state, setState] = useState(null);
    const isMounted = useRef(true); // To prevent state updates on unmounted components

    useEffect(() => {
        isMounted.current = true;

        async function fetchData() {
            const result = await asyncCallback();
            if (isMounted.current) {
                setState(result);
            }
        }

        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, dependencies);

    return state;
}
