import { useMemo, useRef } from 'react';

export function useMemoIf<T>(factory: () => T, deps: any[]): T | undefined {
  const prevValueRef = useRef<T | undefined>();

  const memoizedValue = useMemo(() => {
    const newValue = factory();
    if (newValue) {
      prevValueRef.current = newValue;
    }
    return prevValueRef.current;
  }, deps);

  return memoizedValue;
}
