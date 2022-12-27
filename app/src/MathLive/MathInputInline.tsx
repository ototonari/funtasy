import { MathfieldElement } from "mathlive";
import React, { useEffect, useRef } from "react";

type Props = {
  onChange?: (formula: string) => void
}

export const MathInputInline: React.FC<Props> = ({
  onChange,
}) => {
  const ref = useRef(null);

  const onChangeHandler = (ev: Event) => {
    const event = ev as any;
    const value = event.target.value;
    onChange(value);
  };

  useEffect(() => {
    const mfe = new MathfieldElement();
    mfe.keypressSound = null;
    mfe.plonkSound = null;
    mfe.setAttribute("style", inlineStyle);
    mfe.addEventListener("input", onChangeHandler);
    mfe.value = "";
    ref.current.appendChild(mfe);
  }, []);

  return <div style={{display: "inline-block", width: "100%" }} ref={ref} />
};

const inlineStyle = `
border-radius: 4px;
border: 1px solid rgba(0, 0, 0, .3);
width: 100%;
padding-left: 10px;
`
