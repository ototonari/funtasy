import React, { CSSProperties, useEffect, useRef } from "react";
import { createReadonlyInlineMfeElement } from "./common";

type Props = {
  f?: string
}

const MathInline: React.FC<Props> = ({
  f: formula = "",
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

export const MI = React.memo(MathInline);