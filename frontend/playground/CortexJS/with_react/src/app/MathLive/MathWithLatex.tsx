import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { createMfeElement } from "./common";

export const MathWithLatex: React.FC = () => {
  const ref1 = useRef(null);
  const [formula, setFormula] = useState("");

  const handleInput = (ev: any) => {
    const str = ev.target.value as string;
    setFormula(str);
  };
  useEffect(() => {
    const elm = createMfeElement(formula);
    elm.addEventListener("input", handleInput);
    ref1.current.appendChild(elm);
    return () => {
      elm.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <div>
      <Grid container >
        <Grid item xs={2} >
          <label>Mathfield</label>
          <div ref={ref1} />
        </Grid>
        <Grid item xs={4} >
          <label>Latex</label>
          <br />
          <textarea
            style={{ width: 300 }}
            value={formula}
            onChange={handleInput}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};
