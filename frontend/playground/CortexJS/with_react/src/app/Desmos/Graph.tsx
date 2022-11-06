import React, { useEffect, useRef } from "react"

type Props = {
  formula?: string;
}

export const Graph:React.FC<Props> = ({formula}) => {
  const ref = useRef(null);


  useEffect(() => {
    const calculator = Desmos.GraphingCalculator(ref.current, {
      expressions: false
    });
    calculator.setExpression({ id: 'graph1', latex: formula });
  })

  return (
    <div ref={ref} style={{width: 500, height: 500}} />
  )
}