import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Debug } from "./database/concepts/LocalStorage";
import { Graph } from "./FunctionProt/Graph";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { ModalRouting, modalState } from "./ModalRouting";

import { Routing } from "./Routing";

export const App = () => {
  Debug.showStatus();
  
  return (
    <div>
      <Routing />
      <ModalRouting />
      <Graph width={300} height={300} fn={"x^2"} />
      <MathWithLatex />
    </div>
  );
};
