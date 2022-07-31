import React, { useState } from "react";
import { BoxedExpression, ComputeEngine } from "@cortex-js/compute-engine";
import { MathReadonly } from "./MathReadonly";
import { MathInput } from "./MathInput";
import { ce } from "../ComputeEngine";

type PracticeProps = {
  question: string;
};

const isSimplify = (a: BoxedExpression, b: BoxedExpression): boolean => {
  return a.simplify().isSame(b);
};

// Simplify な問題フォーム
export const Practice: React.FC<PracticeProps> = ({ question }) => {
  const qExpr = ce.parse(question);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(false);
  const exprAnswer = (formula: string) => {
    const expr = ce.parse(formula);
    setAnswer(formula);
    setResult(isSimplify(qExpr, expr));
  };

  return (
    <>
      <div>
        <label>問題</label>
        <MathReadonly formula={question} />
      </div>
      <div>
        <label>解答</label>
        <MathInput onChange={exprAnswer} />
      </div>
      <div>
        <label>Result</label>
        <br />
        {answer !== "" ? (result ? "✅" : "") : ""}
      </div>
    </>
  );
};
