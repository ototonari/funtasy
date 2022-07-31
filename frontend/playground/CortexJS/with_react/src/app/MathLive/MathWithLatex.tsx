import React, { useEffect, useRef, useState } from "react";
import { createMfeElement } from "./common";

export const MathWithLatex: React.FC<{ initFormula?: string }> = ({
  initFormula = "",
}) => {
  const ref = useRef(null);
  const [formula, setFormula] = useState(initFormula);
  const elm = createMfeElement(formula);

  useEffect(() => {
    elm.addEventListener("input", (ev) => {
      setFormula(elm.value);
    });
    ref.current.appendChild(elm);
  }, []);

  return (
    <>
      <div>
        <label>Mathfield</label>
        <div ref={ref} />
      </div>
      <div>
        <label>Latex</label>
        <br />
        <textarea
          style={{width: 300}}
          value={formula}
          onChange={(e) => {
            setFormula(e.target.value);
          }}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
    </>
  );
};
