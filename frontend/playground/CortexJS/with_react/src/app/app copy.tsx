import React from "react";
import { DesmosContainer } from "./Desmos/DesmosContainer";
import { Graph } from "./Desmos/Graph";
import { Sample } from "./Desmos/Sample";
import { Practice } from "./MathLive/Practice";
import { Teach, TeachProps } from "./Teach";

const App: React.FC = (props) => {
  const teachProps: TeachProps = {
    concept: "数と式",
    articles: [
      {
        title: "指数の計算",
        description: "",
        example: 
          {
            formula: "a^2b * ab^3",
            steps: ["= a^{2+1}b^{1+3}", "= a^3b^4"]
          }
        
      }
    ]
  }
  return (
    <div>
      {/* <MathWithLatex initFormula={"x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}"} /> */}
      <Teach {...teachProps} />
      <Practice question="a^2b * ab^3"  />
      <DesmosContainer >
        <Graph />
      </DesmosContainer>
    </div>
  );
};

export default App;
