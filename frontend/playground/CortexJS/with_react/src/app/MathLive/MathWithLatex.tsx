import React, { useEffect, useRef, useState } from "react";
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
          onChange={(e) => {
            setFormula(e.target.value);
          }}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
      <div>
        <label>Result</label>
        <br />
        <textarea />
      </div>
    </>
  );
};
