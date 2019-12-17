import {useRef, useState, useLayoutEffect, useCallback} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface ElementSize {
  width: number;
  height: number;
}

export const useSize = <T extends HTMLElement>() => {
  const [{width, height}, setSize] = useState<ElementSize>({width: 0, height: 0});
  const ref = useRef<T | null>(null);

  const onResize = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const {offsetWidth: newWidth, offsetHeight: newHeight} = ref.current;

    if (newWidth !== width || newHeight !== height) {
      setSize({width: newWidth, height: newHeight});
    }
  }, [width, height]);

  useLayoutEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const observer = new ResizeObserver(onResize);
    if (ref && ref.current) {
      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [ref, onResize]);

  return {ref, size: {width, height}};
};
