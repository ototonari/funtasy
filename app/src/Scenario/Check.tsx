import { Box, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { QuestionWithAnswers } from "../Question/QuestionWithAnswers";
import { QuestionType } from "../Question/common";
import { useRecoilState } from "recoil";
import { icmState } from "../PersonalLearningStatus";

type Props = {
  questions: QuestionType[];
};

export const Check: React.FC<Props> = ({ questions }) => {
  const [_icmState, setIcmState] = useRecoilState(icmState);
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

  // ICMで判断するタイミングは、ユーザーによる診断ボタンの押下
  useEffect(() => {
    if (isFeedback) {
      const { icm } = _icmState;
      // results と questions は同じ並び順であることを利用する
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const result = results[i];

        if (result === true) {
          icm.registerStatus(question.conceptId, question.level);
        }
      }

      // ICMRepository.save(icm);
      setIcmState({icm: icm});
    }
  }, [isFeedback])

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 800,
        },
      }}
    >
      <Paper elevation={3}>
        <div style={{ margin: 20 }}>
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
