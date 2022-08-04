import React from "react";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { Practice } from "./MathLive/Practice";
import { Teach } from "./Teach";

const App: React.FC = (props) => {
  return (
    <div>
      {/* <MathWithLatex initFormula={"x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}"} /> */}
      <Teach />
      <Practice question="a^2b * ab^3"  />
    </div>
  );
};

export default App;
