import React, { useEffect, useRef } from 'react';
import functionPlot from 'function-plot'
import { FunctionPlotOptions } from 'function-plot/dist/types';

type Props = {
  width: number,
  height: number,
  // showTick?: boolean,
  fn?: string
}

export const Graph: React.FC<Props> = ({ width, height, fn }) => {
  const ref = useRef(null);  

  useEffect(() => {
    const option: FunctionPlotOptions = {
      target: ref.current,
      width: width,
      height: height,
      tip: {
        xLine: true,
        yLine: false,
      },
      data: [{
        fn: fn
      }],
    }  

    try {
      functionPlot({...option });
    } catch (e) {
      console.error("function-plot.error\n", e);
    }
  }, []);

  return <div style={{width: width, height: height}} ref={ref} />
}

