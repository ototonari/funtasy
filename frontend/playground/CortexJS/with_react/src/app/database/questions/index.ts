import { QuestionType } from "../../Question/common";


export const presets : QuestionType[] = [
  // {
  //   conceptId:"49",
  //   expression: "x^2-2\\left|x\\right|-3\\le0",
  //   answers: ["-3\\le x\\le3"],
  //   answerPlaceholder: " ",
  // },
  // {
  //   conceptId:"49",
  //   expression: "\\left|x^2+6x+8\\right|<4x+11",
  //   answers: ["-5+\\sqrt{6}<x<1"],
  //   answerPlaceholder: " ",
  // },
  // {
  //   conceptId:"48",
  //   expression: "x^2-2\\left|x\\right|-3=0",
  //   answers: ["3", "-3"],
  //   answerPlaceholder: "x=",
  // },
  // {
  //   conceptId:"48",
  //   expression: "\\left|x^2-2x-8\\right|=2x+4",
  //   answers: ["-2", "2", "6"],
  //   answerPlaceholder: "x=",
  // },
  {
    conceptId: 43,
    level: 0,
    expression: "x^2-4x+3<0",
    answers: ["1<x<3"],
    answerPlaceholder: " ",
  },
  {
    conceptId:39,
    level: 0,
    expression: "x^2+4x-2=0",
    answers: ["-2\\sqrt{6}", "-2-\\sqrt{6}"],
    answerPlaceholder: "x=",
  },
  {
    conceptId:39,
    level: 0,
    expression: "x^4-5x^2+4=0",
    answers: ["1", "-1", "2", "-2"],
    answerPlaceholder: "x=",
  },
  {
    conceptId:39,
    level: 0,
    expression: "\\left(x^2-2x-4\\right)\\left(x^2-2x+3\\right)+6=0",
    answers: ["-1", "3"],
    answerPlaceholder: "x=",
  },
]