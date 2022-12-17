import React from "react";
import { Graph } from "./FunctionProt/Graph";
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
      {/* <Graph width={300} height={300} fn={"x^2"} /> */}
      <MathWithLatex />
    </div>
  );
};
