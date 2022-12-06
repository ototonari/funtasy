import { ComputeEngine } from "@cortex-js/compute-engine";
import { evaluationBySubs, isSimplify, NewCE } from ".";

describe("compute engine", () => {
  describe("次数の整理 (isSimplify)", () => {
    const ce = NewCE();

    test("a^2bab^3 は a^3b^4 になる", () => {
      const a = ce.parse("a^2bab^3");
      const b = ce.parse("a^3b^4");
      expect(isSimplify(a, b)).toBeTruthy();
    });
  });

  describe("代数の計算 (evaluationBySubs)", () => {
    const ce = NewCE();

    test("1+1=2である", () => {
      const a = ce.parse("1+1");
      const b = ce.parse("2");
      expect(evaluationBySubs(a, b)).toBeTruthy();
    });

    test("代数が数値であるとき, (a-b)(x-y) , (x-y)(a-b) はそれぞれ等化である", () => {
      const a = ce.parse("(a-b)(x-y)");
      const b = ce.parse("(x-y)(a-b)");

      expect(evaluationBySubs(a, b)).toBeTruthy();
    });
  });

  describe("式の等化性の評価", () => {
    const ce = NewCE();

    test("1+1 , 2 は同じ数学的対象である", () => {
      const a = ce.parse("1+1");
      const b = ce.parse("2");
      expect(a.isEqual(b)).toBeTruthy();
    });

    test("1+1 , 2 は異なる構造的等式である", () => {
      const a = ce.parse("1+1");
      const b = ce.parse("2");
      expect(a.isSame(b)).toBeFalsy();
    });

    test("a^2bab^3 と a^3b^4 は同じ数学的対象である", () => {
      const a = ce.parse("a^2bab^3");
      const b = ce.parse("a^3b^4");
      expect(a.isEqual(b)).toBeTruthy();
    });

    test("a^2bab^3 と a^3b^4 は異なる構造的等式である", () => {
      const a = ce.parse("a^2bab^3");
      const b = ce.parse("a^3b^4");
      expect(a.isSame(b)).toBeFalsy();
    });

    test("(a-b)(x-y) , (x-y)(a-b) は異なる数学的対象である", () => {
      const a = ce.parse("\\left(a-b\\right)\\left(x-y\\right)");
      const b = ce.parse("\\left(x-y\\right)\\left(a-b\\right)");
      expect(a.isEqual(b)).toBeFalsy();
    });

    test("12x^3-8x^2y , 4x^2(3x-2y) は異なる構造的等式である", () => {
      const a = ce.parse("\\left(a-b\\right)\\left(x-y\\right)");
      const b = ce.parse("\\left(x-y\\right)\\left(a-b\\right)");
      expect(a.isSame(b)).toBeFalsy();
    });
  });
});
