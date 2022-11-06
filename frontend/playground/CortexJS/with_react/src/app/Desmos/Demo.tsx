import {Expression, GraphingCalculator, useHelperExpression} from "desmos-react";
import React from "react";

export function Demo() {
  return (
    <GraphingCalculator
      attributes={{className: "calculator"}}
      fontSize={18} keypad projectorMode
    >
      {/* <Expression id="slider" latex="a=3" />
      <Point /> */}
    </GraphingCalculator>
  );
}

/* useHelperExpression() can only be used inside <GraphingCalculator/>,
which is why this couldn't go in <Demo/> */
function Point() {
  const a = useHelperExpression({latex: "a"});

  let label;
  if (a > 0)
    label = "positive x-axis"
  else if (a < 0)
    label = "negative x-axis"
  else
    label = "origin";

  return (
    <Expression id="point" latex="(a,0)" label={label} showLabel />
  );
}