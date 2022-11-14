import React, { useState } from "react";
import { AutoGrid } from "./Container";
import { Debug, GuideStatus } from "./database/concepts/LocalStorage";
import { numbersAndExpressions } from "./database/concepts/numbers_and_expressions";
import { presets } from "./database/questions";
import { DesmosContainer } from "./Desmos/DesmosContainer";
import { Graph } from "./Desmos/Graph";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { Practice } from "./MathLive/Practice";
import { Check } from "./Scenario/Check";
import { Guide } from "./Scenario/Guide";
import { TeachProps, Teach } from "./Teach";

const guideOrStart = (guideStatus: boolean, setter: (s: boolean) => void) => !guideStatus ? <Guide setter={setter} /> : <Check questions={presets} />

export const App = () => {
  Debug.showStatus();

  const [guideStatus, setGuideStatus] = useState(GuideStatus.get());

  return (
    <div>
      <MathWithLatex initFormula={"x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}"} />
      {guideOrStart(guideStatus, setGuideStatus)}
    </div>
  );
};
