import React from "react";
import { BoxedExpression } from "@cortex-js/compute-engine";
import { MathReadonly } from "./MathReadonly";
import { MathInput } from "./MathInput";
import { ce } from "../ComputeEngine";
import { Grid } from "@mui/material";
import { Check, WarningAmber } from "@mui/icons-material";

type Props = {
  question: string;
  setResult: (s: boolean) => void;
  feedback: boolean | null;
};

const isSimplify = (a: BoxedExpression, b: BoxedExpression): boolean => {
  return a.simplify().isSame(b);
};

const viewResult = (feedback?: boolean) =>
  feedback === null ? null : feedback ? (
    <Check fontSize="large" color="success" />
  ) : (
    <WarningAmber fontSize="large" color="warning" />
  );

// Simplify な問題フォーム
export const Question: React.FC<Props> = ({
  question,
  setResult,
  feedback,
}) => {
  const qExpr = ce.parse(question);
  const exprAnswer = (formula: string) => {
    const expr = ce.parse(formula);
    setResult(isSimplify(qExpr, expr));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <MathReadonly formula={question} />
      </Grid>
      <Grid item xs={4}>
        <MathInput onChange={exprAnswer} />
      </Grid>
      <Grid item xs={2}>
        {viewResult(feedback)}
      </Grid>
    </Grid>
  );
};
