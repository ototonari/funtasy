import React from "react";
import { BoxedExpression } from "@cortex-js/compute-engine";
import { MathReadonly } from "../MathLive/MathReadonly";
import { MathInput } from "../MathLive/MathInput";
import { ce } from "../ComputeEngine";
import { Grid } from "@mui/material";
import { Check, WarningAmber } from "@mui/icons-material";
import { CommonProps } from "./common";

const isSimplify = (a: BoxedExpression, b: BoxedExpression): boolean => {
  return a.simplify().isSame(b);
};

const viewResult = (feedback?: boolean) =>
  feedback === null ? null : feedback ? (
    <Check fontSize="large" color="success" />
  ) : (
    <WarningAmber fontSize="large" color="warning" />
  );

// 数と式 問題フォーム
export const Simplify: React.FC<CommonProps> = ({
  expression,
  setResult,
  feedback,
}) => {
  const qExpr = ce.parse(expression);
  const exprAnswer = (formula: string) => {
    const expr = ce.parse(formula);
    setResult(isSimplify(qExpr, expr));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <MathReadonly formula={expression} />
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
