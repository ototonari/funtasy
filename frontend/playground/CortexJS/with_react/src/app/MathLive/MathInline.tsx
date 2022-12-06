import React, { CSSProperties, useEffect, useRef } from "react";
import { createReadonlyInlineMfeElement } from "./common";

export const MathInline: React.FC<{ formula?: string }> = ({
  formula = "",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const mfe = createReadonlyInlineMfeElement(formula);
    ref.current.appendChild(mfe);
  }, []);

  return <div style={style} ref={ref} />;
};

const style: CSSProperties = {
  display: "inline-block",
};
