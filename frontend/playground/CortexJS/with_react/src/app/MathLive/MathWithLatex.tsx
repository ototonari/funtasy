import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { createMfeElement } from "./common";
import { MathInput } from "./MathInput";

export const MathWithLatex: React.FC = () => {
  const ref1 = useRef(null);
  const [formula, setFormula] = useState("");
  const [formula2, setFormula2] = useState("");
  const elm = createMfeElement(formula);
  const getElm2 = (formula: string) => (<MathInput formula={formula} />)
  const elm2 = getElm2(formula2);

  const handleInput = (ev: any) => {
    const str = ev.target.value as string;
    setFormula(str);
  };
  const handleInput2 = (ev: any) => {
    const str = ev.target.value as string;
    setFormula2(str);
  };
  // const box = ce.parse(formula);
  useEffect(() => {
    elm.addEventListener("input", handleInput);
    ref1.current.appendChild(elm);
    return () => {
      elm.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <div>
      <Grid container >
        <Grid xs={2} >
          <label>Mathfield</label>
          <div ref={ref1} />
        </Grid>
        <Grid xs={4} >
          <label>Latex</label>
          <br />
          <textarea
            style={{ width: 300 }}
            value={formula}
            // onChange={handleInput}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </Grid>
        <Grid xs ></Grid>
      </Grid>

        {/* <div>
        <label>BoxedExpression</label>
        <br />
        <textarea
          style={{ width: 400, height: 100 }}
          value={JSON.stringify(box.json)}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div> */}
    </div>
  );
};
