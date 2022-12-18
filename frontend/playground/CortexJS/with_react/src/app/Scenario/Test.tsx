import { Box, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { QuestionWithAnswers } from "../Question/QuestionWithAnswers";
import { QuestionType } from "../Question/common";
import { useRecoilState } from "recoil";
import { icmState } from "../PersonalLearningStatus";
import { P39 } from "../database/questions/39";
import { P4 } from "../database/questions/4";

type Props = {
  testLabel: string;
  questions: QuestionType[];
};

export const TestContainer: React.FC<{}> = ({}) => {
  return (
    <div>
      <Test testLabel={`次の式を因数分解せよ。`} questions={P4.random} />
      <Test testLabel={`次の二次方程式を解け。`} questions={P39.random} />
    </div>
  );
};

const Test: React.FC<Props> = ({ testLabel, questions }) => {
  const [_icmState, setIcmState] = useRecoilState(icmState);
  const [isFeedback, setFeedback] = useState(false);
  const [results, setResults] = useState(questions.map(() => false));
  const doFeedback = () => {
    setFeedback(true);
  };

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
      setIcmState({ icm: icm });
    }
  }, [isFeedback]);

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
          <p>{testLabel}</p>
          <div style={{ marginLeft: 20 }}>
            {questions.map((q, i) => (
              <QuestionWithAnswers
                key={i}
                {...q}
                setResult={setResult(i)}
                feedback={isFeedback}
              />
            ))}
          </div>
          <Button variant="outlined" onClick={doFeedback}>
            確認してみる
          </Button>
        </div>
      </Paper>
    </Box>
  );
};
