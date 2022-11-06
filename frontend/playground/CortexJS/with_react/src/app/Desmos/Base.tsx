import React, { useEffect, useRef } from 'react';

export const Base: React.FC<{htmlElement?: HTMLElement}> = ({htmlElement}) => {
  const ref = useRef(null);

  useEffect(() => {
    // ref.current.appendChild(htmlElement);
    ref.current.innerText = "hoge"
  }, []);

  return <div id="calculator" style={{width: 600, height: 400}} ref={ref} />
}

