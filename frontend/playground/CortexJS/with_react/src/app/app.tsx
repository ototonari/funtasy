import React from "react";
import { Demo } from "./ComputeEngine/demo";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { Teach } from "./Teach";

const App: React.FC = (props) => {
  Demo();
  return (
    <div>
      <MathWithLatex initFormula={"x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}"} />
      <Teach />
    </div>
  );
};

export default App;
