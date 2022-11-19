import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import { Question } from "../MathLive/Question";
import { ComputeEngine } from "@cortex-js/compute-engine";
import { Simplify } from "../Question/Simplify";
import { QuadraticEquation } from "../Question/QuadraticEquation";
import { QuestionWithAnswers } from "../Question/QuestionWithAnswers";
import { QuestionType } from "../Question/common";
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";

type Props = {
  questions: QuestionType[];
};

export const Check: React.FC<Props> = ({ questions }) => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);

  const [isFeedback, setFeedback] = useState(false);
  const [results, setResults] = useState(questions.map(() => false));

  const doFeedback = () => {
    setFeedback(true);
  }

  const setResult = (index: number) => (result: boolean) => {
    results[index] = result;
    setResults(results);
    setFeedback(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 700,
          height: 500,
        },
      }}
    >
      <Paper elevation={3}>
        <div style={{ marginLeft: 20 }}>
          <p>理解度テスト</p>
          {questions.map((q, i) => (
            <QuestionWithAnswers
              key={i}
              {...q}
              setResult={setResult(i)}
              feedback={isFeedback}
            />
          ))}
          <Button variant="contained" onClick={doFeedback}>
            できた
          </Button>
        </div>
      </Paper>
    </Box>
  );
};
