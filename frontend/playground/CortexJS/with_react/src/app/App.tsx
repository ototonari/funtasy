import React from "react";
import { useInitialize } from "./hooks/useInitialize";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { ModalRouting } from "./ModalRouting";
import { Routing } from "./Routing";

export const App = () => {
  useInitialize();

  return (
    <div>
      <Routing />
      <ModalRouting />
      {/* <MathWithLatex /> */}
    </div>
  );
};
