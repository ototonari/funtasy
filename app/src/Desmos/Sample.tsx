import React, { useEffect, useRef } from "react"
import { Base } from "./Base"


export const Sample = () => {
  const ref = useRef(null);


  useEffect(() => {
    const calculator = Desmos.GraphingCalculator(ref.current, {
      expressions: false
    });
    calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
  })

  return (
    <div ref={ref} style={{width: 500, height: 500}} />
  )
}