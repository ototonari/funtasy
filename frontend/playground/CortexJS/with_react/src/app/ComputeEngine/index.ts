import { BoxedExpression, ComputeEngine } from "@cortex-js/compute-engine";

export const ce = new ComputeEngine();

export const NewCE = () => new ComputeEngine();

export type Evaluator = (a: BoxedExpression, b: BoxedExpression) => boolean;

// 代数の等化性評価に用いる
const standardSubs = {
  x: ce.box(2),
  y: ce.box(3),
  z: ce.box(5),
  a: ce.box(7),
  b: ce.box(11),
  c: ce.box(13),
};

export const evaluationBySubs: Evaluator = (
  expect: BoxedExpression,
  actual: BoxedExpression
) => {
  const a = expect.subs(standardSubs);
  const b = actual.subs(standardSubs);
  return a.N().latex === b.N().latex;
};

export const isSimplify: Evaluator = (a: BoxedExpression, b: BoxedExpression): boolean => {
  return a.simplify().isSame(b);
};

export const isEqual: Evaluator = (a, b) => {
  return a.isEqual(b);
}