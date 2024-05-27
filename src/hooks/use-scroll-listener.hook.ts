import { useEffect } from 'react';

/**
 * Custom hook to listen for wheel events on a specific element with options for direction and threshold.
 * @param callback - The callback function to be executed on wheel.
 * @param ref - The ref of the element to listen for wheel events on.
 * @param options - Options for direction ('down' or 'up')
 */
export function useWheelListener(callback: (direction: 'down' | 'up' | undefined) => void, ref: React.RefObject<HTMLElement>, options?: { direction: 'down' | 'up' }) {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!ref.current || !ref.current.contains(event.target as Node)) return;

      const isScrollingDown = event.deltaY > 0;

      if (options) {
        const { direction } = options;
        if ((direction === 'down' && isScrollingDown) || (direction === 'up' && !isScrollingDown) || !direction) {
          callback(direction);
        }
      } else {
        callback(isScrollingDown ? 'down' : 'up');
      }
    };

    const element = ref.current;
    element?.addEventListener('wheel', handleWheel);

    return () => {
      element?.removeEventListener('wheel', handleWheel);
    };
  }, [callback, options?.direction, ref]);
}
