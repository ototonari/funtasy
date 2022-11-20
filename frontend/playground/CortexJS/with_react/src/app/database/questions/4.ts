import { QuestionType } from "../../Question/common";

// 因数分解
const ConceptId = "4";

enum Levels {
  "共通因数による因数分解",
  "公式1",
  "公式2",
  "公式3",
  "公式4",
  "応用",
}

export const p4:  QuestionType[] = [
  {
    conceptId: ConceptId,
    level: Levels.共通因数による因数分解,
    expression: "12x^3-8x^2y",
    answers: ["4x^2(3x-2y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Levels.共通因数による因数分解,
    expression: "(a-b)x+(b-a)y",
    answers: ["(a-b)(x-y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Levels.共通因数による因数分解,
    expression: "(a+b)c+d(a+b)",
    answers: ["(a+b)(c+d)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Levels.公式1,
    expression: "x^2+10x+25",
    answers: ["(x+5)^2"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Levels.公式2,
    expression: "x^2-9y^2",
    answers: ["(x+3y)(x-3y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Levels.公式3,
    expression: "x^2+8x+12",
    answers: ["(x+2)(x+6)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Levels.公式4,
    expression: "3x^2+7x+2",
    answers: ["(3x+1)(x+2)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Levels.応用,
    expression: "(x-y)^2-5(x-y)+6",
    answers: ["(x - y - 2) (x - y - 3)"],
    answerPlaceholder: "",
  },
];
