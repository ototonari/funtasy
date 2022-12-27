import React from "react";
import { MathReadonly } from "./MathReadonly";

export const StepByStep: React.FC<{ steps: string[] }> = ({ steps }) => {
  return (
    <>
      {steps.map((formula, i) => (
        <MathReadonly formula={formula} key={i} />
      ))}
    </>
  );
};
