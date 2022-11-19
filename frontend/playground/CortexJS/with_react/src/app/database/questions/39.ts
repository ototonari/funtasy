import { QuestionType } from "../../Question/common";

export const p39 : QuestionType[] = [
  {
    conceptId:"39",
    expression: "x^2+4x-2=0",
    answers: ["-2\\sqrt{6}", "-2-\\sqrt{6}"],
    answerPlaceholder: "x=",
  },
  {
    conceptId:"39",
    expression: "x^4-5x^2+4=0",
    answers: ["1", "-1", "2", "-2"],
    answerPlaceholder: "x=",
  },
  {
    conceptId:"39",
    expression: "\\left(x^2-2x-4\\right)\\left(x^2-2x+3\\right)+6=0",
    answers: ["-1", "3"],
    answerPlaceholder: "x=",
  },
]

// 解の公式1 を適用する問題
export const step1: QuestionType[] = [
  {
    conceptId:"39",
    expression: "x^2+7x+4=0",
    answers: ["-7/2-\\sqrt{33}/2", "\\sqrt{33}/2-7/2"],
    answerPlaceholder: "x=",
  },
  {
    conceptId:"39",
    expression: "3x^2+4x-1=0",
    answers: ["-2/3-\\sqrt{7}/3", "\\sqrt{7}/3-2/3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId:"39",
    expression: "3x^2-8x-3=0",
    answers: ["3", "-1/3"],
    answerPlaceholder: "x=",
  },
  {
    conceptId:"39",
    expression: "4x^2+12x+9=0",
    answers: ["-3/2"],
    answerPlaceholder: "x=",
  },
]

// $$ -\frac{7}{2}-\frac{\sqrt{33}}{2} $$
// $$ \frac{\sqrt{33}}{2}-\frac{7}{2} $$