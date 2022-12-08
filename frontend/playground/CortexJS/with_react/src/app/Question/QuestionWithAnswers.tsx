import React, { useState } from "react";
import { BoxedExpression } from "@cortex-js/compute-engine";
import { MathReadonly } from "../MathLive/MathReadonly";
import { MathInput } from "../MathLive/MathInput";
import { ce } from "../ComputeEngine";
import { Grid } from "@mui/material";
import { Check, WarningAmber, Info } from "@mui/icons-material";
import { QuestionType } from "./common";
import IconButton from '@mui/material/IconButton';
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";
import { icmState } from "../PersonalLearningStatus";


type Props = QuestionType & {
  setResult?: (s: boolean) => void;
  feedback: boolean;
};


export const QuestionWithAnswers: React.FC<Props> = ({
  expression,
  setResult,
  feedback,
  answers,
  answerPlaceholder,
  conceptId,
  level
}) => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);
  const aboutConcept = () => {
    const conceptIds = [...modalRoute.conceptIds, conceptId]
    console.log(conceptId, level);
    setModalRoute({
      conceptIds,
      currentConceptLevel: [conceptId, level]
    })
  }
  const [results, setResults] = useState(answers.map(() => false));
  const [userAnswers, setUserAnswers] = useState(answers.map(() => ""));

  const setUserAnswer = (index: number) => (formula: string) => {
    userAnswers[index] = formula;
    setUserAnswers(userAnswers);

    for (let i = 0; i < answers.length; i++) {
      const expect = ce.parse(answers[i]);
      results[i] = userAnswers.some((ans) => {
        const actual = ce.parse(ans);
        return expect.isEqual(actual);
      })
    }
    console.log("results", results);
    setResults(results);

    // 親コンポーネントに全ての回答が正解か否かを伝達する
    setResult(results.every((r) => r === true));
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <MathReadonly formula={expression} />
      </Grid>
      {answerPlaceholder ? (
        <Grid item xs={1}>
          {answerPlaceholder}
        </Grid>
      ) : null}
      {answers.map((_, i) => (
        <Grid item xs key={i}>
          <MathInput onChange={setUserAnswer(i)} />
        </Grid>
      ))}
      <Grid item xs={1}>
        {
          feedback ? (
            results.every((r) => r) ? (
              <Check fontSize="large" color="success" />
            ) : (
              <IconButton onClick={aboutConcept} >
                <Info fontSize="medium" color="primary" />
              </IconButton>
            )
          ) : null
        }
      </Grid>
    </Grid>
  );
};
