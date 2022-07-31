import React, { useEffect, useRef } from 'react';

export const Base: React.FC<{htmlElement: HTMLElement}> = ({htmlElement}) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.appendChild(htmlElement);
  }, []);

  return <div ref={ref} />
}

