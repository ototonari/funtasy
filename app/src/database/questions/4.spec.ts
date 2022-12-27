import { evaluationBySubs, NewCE } from "../../ComputeEngine"
import { P4 } from "./4"

describe("数式の評価", () => {
  const ce = NewCE();
  P4.all.forEach((q) => {
    test(q.expression, () => {
      const a = ce.parse(q.expression);
      const b = ce.parse(q.answers[0])
      expect(evaluationBySubs(a, b)).toBeTruthy();
    })
  })
})