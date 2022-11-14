
export type CommonProps = {
  expression: string; // mathのlatex
  setResult?: (s: boolean) => void;
  feedback?: boolean | null;
};

export type QuestionType = {
  conceptId: string;
  expression: string;
  answers: string[];
  answerPlaceholder?: string;
}