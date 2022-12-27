import React, { useEffect } from "react";
import { Base } from "./Base";
import { createMfeElement, createMfeWithoutKeyboardElement } from "./common";

type Props = {
  formula?: string;
  onChange?: (formula: string) => void
}

export const MathInput: React.FC<Props> = ({
  formula = "",
  onChange,
}) => {
  const elm = createMfeElement(formula);

  const onChangeHandler = (ev: Event) => {
    const event = ev as any;
    const value = event.target.value;
    onChange(value);
  };

  useEffect(() => {
    if (!!onChange) {
      elm.addEventListener("input", onChangeHandler);
    }

    // 勝手にremoveされるのでコメントアウトして対処
    // return () => {
    //   if (!!onChange) {
    //     console.log("remove")
    //     elm.removeEventListener("input", onChangeHandler);
    //   }
    // };
  });

  return <Base htmlElement={elm} />;
};
