import React, { useEffect, useRef, useState } from "react";
import { ce } from "../ComputeEngine";
import { createMfeElement } from "./common";

export const MathWithLatex: React.FC<{ initFormula?: string }> = ({
  initFormula = "",
}) => {
  const ref = useRef(null);
  const [formula, setFormula] = useState(initFormula);
  const elm = createMfeElement(formula);
  const handleInput = () => {
    setFormula(elm.value);
  };
  const box = ce.parse(formula);

  useEffect(() => {
    elm.addEventListener("input", handleInput);
    ref.current.appendChild(elm);

    return () => {
      elm.removeEventListener("input", handleInput);
    };
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
          style={{ width: 300 }}
          value={formula}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
      <div>
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
      </div>
    </>
  );
};
