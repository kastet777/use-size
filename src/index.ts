import { useRef, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface ElementSize {
  width: number;
  height: number;
}

export const useSize = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [{width, height}, setSize] = useState<ElementSize>({width: 0, height: 0})

  const observer = new ResizeObserver((entries) => {
    const {width: newWidth, height: newHeight} = entries[0].contentRect;

    if (newWidth !== width || newHeight !== height) {
      setSize({width: newWidth, height: newHeight});
    }
  })

  useEffect(() => {
    if (ref && ref.current) {
      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      }
    }
  }, [width, height]);

  return {ref, size: {width, height}};
}
