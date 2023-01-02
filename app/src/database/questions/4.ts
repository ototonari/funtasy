import { getRandomQuestionFromQsByLevel } from ".";
import { QuestionType } from "../../Question/common";

// 因数分解
const ConceptId = 4;

export enum P4Levels {
  "共通因数による因数分解" = 1,
  "因数分解の公式1",
  "因数分解の公式2",
  "応用",
}

const p4:  QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P4Levels.共通因数による因数分解,
    expression: "12x^3-8x^2y",
    answers: ["4x^2(3x-2y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.共通因数による因数分解,
    expression: "(a-b)x+(b-a)y",
    answers: ["(a-b)(x-y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.共通因数による因数分解,
    expression: "(a+b)c+d(a+b)",
    answers: ["(a+b)(c+d)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2+10x+25",
    answers: ["(x+5)^2"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2-9y^2",
    answers: ["(x+3y)(x-3y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2+8x+12",
    answers: ["(x+2)(x+6)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "3x^2+7x+2",
    answers: ["(3x+1)(x+2)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "(x-y)^2-5(x-y)+6",
    answers: ["(x - y - 2) (x - y - 3)"],
    answerPlaceholder: "",
  },
];

const ex16: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P4Levels.共通因数による因数分解,
    expression: "12x^3-8x^2y",
    answers: ["4x^2(3x-2y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.共通因数による因数分解,
    expression: "3a^2x+6ax^2+ax",
    answers: ["ax(3a+6x+1)"],
    answerPlaceholder: "",
  },
]

const ex17: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P4Levels.共通因数による因数分解,
    expression: "(a+b)c+d(a+b)",
    answers: ["(a+b)(c+d)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.共通因数による因数分解,
    expression: "(x-2y)a+(2y-x)b",
    answers: ["(a-b)(x-2y)"],
    answerPlaceholder: "",
  },
]

const ex18: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2+10x+25",
    answers: ["(x+5)^2"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2-12x+36",
    answers: ["(x-6)^2"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2+6xy+9y^2",
    answers: ["(x+3y)^2"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "4a^2-4ab+b^2",
    answers: ["(2a-b)^2"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2-9y^2",
    answers: ["(x-3y)(x+3y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "16a^2-25b^2",
    answers: ["(4a-5b)(4a+5b)"],
    answerPlaceholder: "",
  },
]

const ex19: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2+8x+12",
    answers: ["(x+6)(x+2)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2-13x+36",
    answers: ["(x-4)(x-9)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "a^2+a-20",
    answers: ["(a+5)(a-4)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2+5xy+6y^2",
    answers: ["(x + 3 y) (x + 2 y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "a^2-8ab+15b^2",
    answers: ["(a - 3 b) (a - 5 b)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式1,
    expression: "x^2-ax-12a^2",
    answers: ["(x + 3 a) (x - 4 a)"],
    answerPlaceholder: "",
  },
]

const ex20: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式2,
    expression: "2x^2-5x+3",
    answers: ["(-1 + x) (-3 + 2 x)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式2,
    expression: "4x^2-8xy-5y^2",
    answers: ["(2 x + y) (2 x - 5 y)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式2,
    expression: "3x^2+7x+2",
    answers: ["(1 + 3 x) (2 + x)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式2,
    expression: "2x^2+9x+10",
    answers: ["(2 + x) (5 + 2 x)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式2,
    expression: "2x^2-13x+6",
    answers: ["(-1 + 2 x) (-6 + x)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.因数分解の公式2,
    expression: "4y^2+5y-21",
    answers: ["(-7 + 4 y) (3 + y)"],
    answerPlaceholder: "",
  },
]

const ex21: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P4Levels.応用,
    expression: "(x-y)^2-5(x-y)+6",
    answers: ["(x - y - 2) (x - y - 3)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.応用,
    expression: "2(x+3y)^2-(x+3y)-1",
    answers: ["(2 x + 6 y + 1) (x + 3 y - 1)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.応用,
    expression: "(x+y)^2-9",
    answers: ["(x + y - 3) (x + y + 3)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.応用,
    expression: "x^2-(y-1)^2",
    answers: ["(x - y + 1) (x + y - 1)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.応用,
    expression: "x^4-8x^2-9",
    answers: ["(x - 3) (x + 3) (x^2 + 1)"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: P4Levels.応用,
    expression: "x^4-16",
    answers: ["(x - 2) (x + 2) (x^2 + 4)"],
    answerPlaceholder: "",
  },
]

const all: QuestionType[] = [
  ...ex16,
  ...ex17,
  ...ex18,
  ...ex19,
  ...ex20,
  ...ex21,
]

const level1 = all.filter((p) => p.level === P4Levels.共通因数による因数分解);
const level2 = all.filter((p) => p.level === P4Levels.因数分解の公式1);
const level3 = all.filter((p) => p.level === P4Levels.因数分解の公式2);
const level4 = all.filter((p) => p.level === P4Levels.応用);

const random = (): QuestionType[] => {
  return [
    ...getRandomQuestionFromQsByLevel(level1, 1, 2),
    ...getRandomQuestionFromQsByLevel(level2, 2, 1),
    ...getRandomQuestionFromQsByLevel(level3, 3, 1),
    ...getRandomQuestionFromQsByLevel(level4, 4, 1),
  ]
}

export const P4 = {
  levels: P4Levels,
  level1,
  level2,
  level3,
  level4,
  ex16,
  ex17,
  ex18,
  ex19,
  ex20,
  ex21,
  all,
  // random: random(),
  randomFunc: random,
}
