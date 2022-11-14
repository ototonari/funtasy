import { Alert, Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import { Question } from "../MathLive/Question";
import { ComputeEngine } from '@cortex-js/compute-engine';
import { Simplify } from "../Question/Simplify";
import { QuadraticEquation } from "../Question/QuadraticEquation";
import { QuestionWithAnswers } from "../Question/QuestionWithAnswers";
import { QuestionType } from "../Question/common";

type Props = {
  questions: QuestionType[];
}

export const Check: React.FC<Props> = ({ questions }) => {
  const [isFeedback, setFeedback] = useState(false);
  const [results, setResults] = useState(questions.map(() => false));

  const doFeedback = () => setFeedback(true);

  const setResult = (index: number) => (result: boolean) => {
    results[index] = result;
    setResults(results);
    setFeedback(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 700,
          height: 500,
        },
      }}
    >
      <Paper elevation={3}>
        <p>理解度テスト</p>
        {questions.map((q, i) => (
          <QuestionWithAnswers
            key={i}
            {...q}
            setResult={setResult(i)} 
            feedback={isFeedback} 
          />
        ))}
        {/* <Simplify expression="a^2b * ab^3" setResult={setResult} feedback={isFeedback} />
        <Question question="x^2-2\left|x\right|-3=0" setResult={setResult} feedback={isFeedback} />
        <QuadraticEquation expression="x^2-2\left|x\right|-3" setResult={setResult} feedback={isFeedback} />
        <QuestionWithAnswers 
          conceptId=""
          expression="x^2-2\left|x\right|-3"
          answerPlaceholder="x="
          answers={["3", "-3"]}
          setResult={setResult} 
          feedback={isFeedback} 
        /> */}
        {/* <QuadraticEquation expression="x^2+4x-2" setResult={setResult} feedback={feedback} /> */}
        <Button variant="contained" onClick={doFeedback} >できた</Button>
      </Paper>
    </Box>
  );
};
