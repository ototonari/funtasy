import { QuestionType } from "../../Question/common";
import { P39, p39 } from "./39";
import { P4 } from "./4";


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
  // {
  //   conceptId: 43,
  //   level: 0,
  //   expression: "x^2-4x+3<0",
  //   answers: ["1<x<3"],
  //   answerPlaceholder: " ",
  // },
  {
    conceptId:39,
    level: 1,
    expression: "x^2+4x-2=0",
    answers: ["-2\\sqrt{6}", "-2-\\sqrt{6}"],
    answerPlaceholder: "x=",
  },
  p39[4],
  // {
  //   conceptId:39,
  //   level: 0,
  //   expression: "x^4-5x^2+4=0",
  //   answers: ["1", "-1", "2", "-2"],
  //   answerPlaceholder: "x=",
  // },
  // {
  //   conceptId:39,
  //   level: 0,
  //   expression: "\\left(x^2-2x-4\\right)\\left(x^2-2x+3\\right)+6=0",
  //   answers: ["-1", "3"],
  //   answerPlaceholder: "x=",
  // },
]

const all = (id: number): QuestionType[] => {
  switch (id) {
    case 4:
      return P4.all
    case 39:
      return P39.all
    default:
      return []
  }
}

const specificLevel = (id: number, level: number): QuestionType[] => {
  switch ([id, level]) {
    case [4, 1]:
      return P4.level1
    case [4, 2]:
      return P4.level2
    case [4, 3]:
      return P4.level3
    case [4, 4]:
      return P4.level4
    case [39, 1]:
      return P39.level1
    case [39, 2]:
      return P39.level2
    case [39, 3]:
      return P39.level3
  }
}

const random = (id: number): QuestionType[] => {
  const rNum = (max: number) => Math.floor(Math.random() * max);
  const qs = all(id);
  const count = 6; // 十分にランダムなレベルを選出するため
  const max = qs.length;
  const selectSet = new Set<number>();
  const selection: QuestionType[] = []

  while (selectSet.size < count) {
    selectSet.add(rNum(max));
  }

  console.log(selectSet);
  
  selectSet.forEach((i) => selection.push(qs[i]));

  return selection.sort((a, b) => a.level > b.level ? 1 : -1);
}

// 出題時に特定のコンセプト別にするので、ここでは特定コンセプトの選択の仕方を与える。
export const QuestionPicker = {
  all,
  specificLevel,
  random,
}