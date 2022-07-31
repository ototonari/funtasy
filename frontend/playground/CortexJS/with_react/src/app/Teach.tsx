import React from "react";
import { MathReadonly } from "./MathLive/MathReadonly";
import { StepByStep } from "./MathLive/StepByStep";

export const Teach: React.FC = () => {
  const formula = "a^2b * ab^3";
  const steps = ["= a^{2+1}b^{1+3}", "= a^3b^4"];
  return (
    <div>
      <h3>数と式</h3>
      <h4 style={{ marginLeft: 20 }}>指数の計算</h4>
      <div style={{ marginLeft: 40 }}>
        <label>問題</label>
        <div style={{ marginLeft: 20 }}>
          <MathReadonly formula={formula} />
        </div>
      </div>

      <div style={{marginTop: 20}}></div>

      <div style={{ marginLeft: 40 }}>
        <label>解答</label>

        <div style={{ marginLeft: 20 }}>
          <StepByStep steps={steps} />
        </div>
      </div>
    </div>
  );
};
