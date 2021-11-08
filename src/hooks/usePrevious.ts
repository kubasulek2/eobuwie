import {useEffect, useRef} from 'react';

/**
 * Hook stores previous value of any argument passed to it
 */
export const usePrevious = <T = any> (value: T) => {
  const ref = useRef<T | undefined>();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};