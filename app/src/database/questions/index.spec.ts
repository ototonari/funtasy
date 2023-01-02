import { getRandomQuestionFromQsByLevel } from "."
import { P39 } from "./39";
import { P4 } from "./4"


describe("ランダムな問題の選出", () => {
  test("P4, level1 から3問選出", () => {
    const level = 1;
    const random = getRandomQuestionFromQsByLevel(P4.level1, level, 3);

    expect(random.length).toBe(3);
    expect(random.every((r) => r.level === level)).toBeTruthy()
    expect(random.every((r) => P4.level1.some((q) => q.expression === r.expression))).toBeTruthy()
  })

  test("P4, level2 から3問選出", () => {
    const level = 2;
    const random = getRandomQuestionFromQsByLevel(P4.level2, level, 3);

    expect(random.length).toBe(3);
    expect(random.every((r) => r.level === level)).toBeTruthy()
    expect(random.every((r) => P4.level2.some((q) => q.expression === r.expression))).toBeTruthy()
  })

  test("P4, level3 から3問選出", () => {
    const level = 3;
    const random = getRandomQuestionFromQsByLevel(P4.level3, level, 3);

    expect(random.length).toBe(3);
    expect(random.every((r) => r.level === level)).toBeTruthy()
    expect(random.every((r) => P4.level3.some((q) => q.expression === r.expression))).toBeTruthy()
  })

  test("P4, level4 から3問選出", () => {
    const level = 4;
    const random = getRandomQuestionFromQsByLevel(P4.level4, level, 3);

    expect(random.length).toBe(3);
    expect(random.every((r) => r.level === level)).toBeTruthy()
    expect(random.every((r) => P4.level4.some((q) => q.expression === r.expression))).toBeTruthy()
  })

  test("P39, level1 から3問選出", () => {
    const level = 1;
    const random = getRandomQuestionFromQsByLevel(P39.level1, level, 3);

    expect(random.length).toBe(3);
    expect(random.every((r) => r.level === level)).toBeTruthy()
    expect(random.every((r) => P39.level1.some((q) => q.expression === r.expression))).toBeTruthy()
  })

  test("P39, level2 から3問選出", () => {
    const level = 2;
    const random = getRandomQuestionFromQsByLevel(P39.level2, level, 3);

    expect(random.length).toBe(3);
    expect(random.every((r) => r.level === level)).toBeTruthy()
    expect(random.every((r) => P39.level2.some((q) => q.expression === r.expression))).toBeTruthy()
  })

  test("P39, level3 から3問選出", () => {
    const level = 3;
    const random = getRandomQuestionFromQsByLevel(P39.level3, level, 2);

    expect(random.length).toBe(2);
    expect(random.every((r) => r.level === level)).toBeTruthy()
    expect(random.every((r) => P39.level3.some((q) => q.expression === r.expression))).toBeTruthy()
  })
})