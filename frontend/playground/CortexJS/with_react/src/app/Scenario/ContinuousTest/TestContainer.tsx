import { Paper, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { TestStateType } from ".";
import { P39 } from "../../database/questions/39";
import { P4 } from "../../database/questions/4";
import { icmState } from "../../PersonalLearningStatus";
import { QuestionType } from "../../Question/common";
import { QuestionWithAnswers } from "../../Question/QuestionWithAnswers";
import { BorderLine, Space } from "./utils";

type Props = {
  state: TestStateType;
};

export function TestContainer({ state }: Props) {
  const [questions, setQuestions] = useState([P4.random, P39.random]);
  const [p4, p39] = questions;
  const isFeedback = state === 'done' ? true : false;

  useEffect(() => {
    if (state === 'started') {
      setQuestions([P4.randomFunc(), P39.randomFunc()])
    }
  }, [state])

  if (state === 'init') {
    return (
      <Space />
    )
  } else {
    return (
      <div>
        <Test testLabel={`次の式を因数分解せよ。`} questions={p4} isFeedback={isFeedback} />
        <Space />
        <BorderLine />
        <Space />
        <Test testLabel={`次の二次方程式を解け。`} questions={p39} isFeedback={isFeedback} />
      </div>
    );  
  }
};

type TestProps = {
  testLabel: string;
  questions: QuestionType[];
  isFeedback: boolean;
};

export function Test ({ testLabel, questions, isFeedback }: TestProps) {
  const [_icmState, setIcmState] = useRecoilState(icmState);
  const [results, setResults] = useState(questions.map(() => false));

  const setResult = (index: number) => (result: boolean) => {
    results[index] = result;
    setResults(results);
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
          width: "100%",
        },
      }}
    >
      <Typography variant="subtitle1">{testLabel}</Typography>
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
    </Box>
  );
};
