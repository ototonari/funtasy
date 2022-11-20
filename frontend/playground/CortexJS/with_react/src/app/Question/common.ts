
export type CommonProps = {
  expression: string; // mathのlatex
  setResult?: (s: boolean) => void;
  feedback?: boolean | null;
};

export type QuestionType = {
  conceptId: string;
  level: number;
  expression: string;
  answers: string[];
  answerPlaceholder?: string;
}