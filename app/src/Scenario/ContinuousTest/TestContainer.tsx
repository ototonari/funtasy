import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Lightbulb } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ContinuousTestState, continuousTestStateToScore, questionsToState, questionsUpdater, TestStateType } from ".";
import { P39 } from "../../database/questions/39";
import { P4 } from "../../database/questions/4";
import { authState } from "../../firebase/auth";
import { UserScore } from "../../firebase/database/user_score";
import { icmState } from "../../PersonalLearningStatus";
import { QuestionType } from "../../Question/common";
import { QuestionWithAnswers } from "../../Question/QuestionWithAnswers";
import { BorderLine, Space } from "./utils";

type Props = {
  state: TestStateType;
};

export function TestContainer({ state }: Props) {
  const [continuousTestState, setContinuousTestState] =
    useRecoilState(ContinuousTestState);
  const { uid, state: authnState } = useRecoilValue(authState);
  const [questions, setQuestions] = useState([P4.randomFunc(), P39.randomFunc()]);
  const [p4, p39] = questions;
  const isFeedback = state === "done" ? true : false;
  // console.log("result: ", continuousTestState.result);
  
  useEffect(() => {
    if (state === "started") {
      setQuestions([P4.randomFunc(), P39.randomFunc()]);
      setContinuousTestState({
        result: questionsToState(questions),
      });
    }

    if (state === "done") {
      if (authnState === "updated") {
        // Firebaseに結果を保存する
        UserScore.appendScore(uid, continuousTestStateToScore(continuousTestState));
      }
    }
  }, [state]);

  if (state === "init") {
    return <Description />;
  } else {
    return (
      <div>
        <DoneDescription state={state} />
        <Test
          testLabel={`次の式を因数分解せよ。`}
          questions={p4}
          isFeedback={isFeedback}
        />
        <Space />
        <BorderLine />
        <Space />
        <Test
          testLabel={`次の二次方程式を解け。`}
          questions={p39}
          isFeedback={isFeedback}
        />
      </div>
    );
  }
}

type TestProps = {
  testLabel: string;
  questions: QuestionType[];
  isFeedback: boolean;
};

export function Test({ testLabel, questions, isFeedback }: TestProps) {
  const [, setContinuousTestState] =
    useRecoilState(ContinuousTestState);

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

          setContinuousTestState((state) => questionsUpdater(state, question.conceptId, i))
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
}

const Description: React.FC = () => (
  <Typography variant="subtitle1" >
    高校数学1の因数分解と2次方程式の理解度を確認してみましょう。
  </Typography>
)

const DoneDescription: React.FC<Props> = ({state}) => {
  if (state === "done") {
    return (
      <div style={{ padding: 10, backgroundColor: "rgb(235 235 235)", borderRadius: 5, display: "flex" }} >
        <Lightbulb fontSize="small" color="primary" />
        <Typography variant="body2" >
        ボタンから振り返ってみましょう。
      </Typography>
      </div>
    )
  } else return null;
}
