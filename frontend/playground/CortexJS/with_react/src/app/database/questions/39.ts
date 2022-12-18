import { QuestionType } from "../../Question/common";

const ConceptId = 39

export enum P39Levels {
  "因数分解を使う解き方" = 1,
  "解の公式1",
  "解の公式2",
}

export const p39 : QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P39Levels.因数分解を使う解き方,
    expression: "x^2+4x-2=0",
    answers: ["-2\\sqrt{6}", "-2-\\sqrt{6}"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.因数分解を使う解き方,
    expression: "x^4-5x^2+4=0",
    answers: ["1", "-1", "2", "-2"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.因数分解を使う解き方,
    expression: "\\left(x^2-2x-4\\right)\\left(x^2-2x+3\\right)+6=0",
    answers: ["-1", "3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式1,
    expression: "x^2+7x+4=0",
    answers: ["-7/2-\\sqrt{33}/2", "\\sqrt{33}/2-7/2"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式1,
    expression: "3x^2+4x-1=0",
    answers: ["-2/3-\\sqrt{7}/3", "\\sqrt{7}/3-2/3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式1,
    expression: "3x^2-8x-3=0",
    answers: ["3", "-1/3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式1,
    expression: "4x^2+12x+9=0",
    answers: ["-3/2"],
    answerPlaceholder: "x=",
  },
]

const level1: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P39Levels.因数分解を使う解き方,
    expression: "x(x+4)=0",
    answers: ["-4", "0"],
    answerPlaceholder: "x="
  },
  {
    conceptId: ConceptId,
    level: P39Levels.因数分解を使う解き方,
    expression: "x^2-5x+6=0",
    answers: ["3", "2"],
    answerPlaceholder: "x="
  },
  {
    conceptId: ConceptId,
    level: P39Levels.因数分解を使う解き方,
    expression: "2x^2+3x+1=0",
    answers: ["-1", "-\\frac{1}{2}"],
    answerPlaceholder: "x="
  },
  {
    conceptId: ConceptId,
    level: P39Levels.因数分解を使う解き方,
    expression: "3x^2-4x-4=0",
    answers: ["2", "-\\frac{2}{3}"],
    answerPlaceholder: "x="
  },
]

// 解の公式1 を適用する問題
const level2: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式1,
    expression: "x^2+7x+4=0",
    answers: ["-7/2-\\sqrt{33}/2", "\\sqrt{33}/2-7/2"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式1,
    expression: "3x^2+4x-1=0",
    answers: ["-2/3-\\sqrt{7}/3", "\\sqrt{7}/3-2/3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式1,
    expression: "3x^2-8x-3=0",
    answers: ["3", "-1/3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式1,
    expression: "4x^2+12x+9=0",
    answers: ["-3/2"],
    answerPlaceholder: "x=",
  },
]

const level3: QuestionType[] = [
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式2,
    expression: "x^2+2x-2=0",
    answers: ["2", "-2/3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式2,
    expression: "3x^2-4x-2=0",
    answers: ["2/3-\\sqrt{10}/3", "2/3+\\sqrt{10}/3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式2,
    expression: "x^2+2\\sqrt{3}x+3=0",
    answers: ["-\\sqrt{3}"],
    answerPlaceholder: "x=",
  },
  {
    conceptId: ConceptId,
    level: P39Levels.解の公式2,
    expression: "x^2-2\\sqrt{3}x+2=0",
    answers: ["\\sqrt{3}-1", "1+\\sqrt{3}"],
    answerPlaceholder: "x=",
  },
]

const all: QuestionType[] = [
  ...level1,
  ...level2,
  ...level3,
]

const random = (): QuestionType[] => {
  const rNum = (max: number) => Math.floor(Math.random() * max);
  const _l1 = rNum(level1.length - 1);
  const _l2 = rNum(level2.length - 1);
  const _l3 = rNum(level3.length - 1);
  const selection: QuestionType[] = [
    level1[_l1],
    level1[_l1+1],
    level2[_l2],
    level2[_l2+1],
    level3[_l3],
    level3[_l3+1],
  ];

  return selection;
}

export const P39 = {
  levels: P39Levels,
  level1,
  level2,
  level3,
  all,
  random: random(),
  randomFunc: random,
}

// $$ -\frac{7}{2}-\frac{\sqrt{33}}{2} $$
// $$ \frac{\sqrt{33}}{2}-\frac{7}{2} $$