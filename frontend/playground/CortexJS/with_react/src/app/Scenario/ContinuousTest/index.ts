import { atom } from "recoil";
import { QuestionType } from "../../Question/common";

export type TestStateType = "init" | "started" | "done";

type QuestionResult = {
  conceptId: number;
  level: number;
  result: boolean;
};

type State = {
  result: Map<number, QuestionResult[]>;
};

export const ContinuousTestState = atom<State>({
  key: "ContinuousTestState",
  default: {
    result: new Map(),
  },
});

export const questionsToState = (
  questionTypes: QuestionType[][]
): Map<number, QuestionResult[]> => {
  const result = new Map<number, QuestionResult[]>();

  questionTypes.forEach((questions) => {
    const qs: QuestionResult[] = questions.map((q) => ({
      conceptId: q.conceptId,
      level: q.level,
      result: false,
    }));
    result.set(questions[0].conceptId, qs);
  });

  return result;
};

export const questionsUpdater = (
  { result }: State,
  id: number,
  index: number
): State => {
  const currentQuestion = result.get(id);
  currentQuestion[index] = {
    ...currentQuestion[index],
    result: true,
  };
  return {
    result: result.set(id, currentQuestion),
  };
};

export const countResults = ({ result }: State): [number, number] => {
  let mother = 0;
  let son = 0;
  result.forEach((qs) =>
    qs.forEach((q) => {
      mother += 1;
      if (q.result) {
        son += 1;
      }
    })
  );

  return [son, mother];
};
