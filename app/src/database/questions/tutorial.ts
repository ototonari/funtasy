import { QuestionType } from "../../Question/common";

const ConceptId = 0;
const Level = 0;

const level1:  QuestionType[] = [
  {
    conceptId: ConceptId,
    level: Level,
    expression: "5",
    answers: ["5"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Level,
    expression: "a \\cdot b",
    answers: ["ab"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Level,
    expression: "\\frac{a}{b}",
    answers: ["a / b"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Level,
    expression: "x^2",
    answers: ["x^2"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Level,
    expression: "x < 0",
    answers: ["x < 0"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Level,
    expression: "x \\ge 0",
    answers: ["x \\ge 0"],
    answerPlaceholder: "",
  },
  {
    conceptId: ConceptId,
    level: Level,
    expression: "\\sqrt{5}",
    answers: ["\\sqrt{5}"],
    answerPlaceholder: "",
  },
];

export const TutorialQuestions = {
  level1,
}