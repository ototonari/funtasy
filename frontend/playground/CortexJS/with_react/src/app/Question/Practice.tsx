import React, { useState } from "react";
import { BoxedExpression } from "@cortex-js/compute-engine";
import { MathReadonly } from "../MathLive/MathReadonly";
import { MathInput } from "../MathLive/MathInput";
import { ce, NewCE } from "../ComputeEngine";
import { Grid } from "@mui/material";
import { Check, WarningAmber, Info } from "@mui/icons-material";
import { QuestionType } from "./common";
import IconButton from '@mui/material/IconButton';
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";
import { MathInputInline } from "../MathLive/MathInputInline";
import { MathInline } from "../MathLive/MathInline";


type Props = QuestionType & {
  
};

// 数と式 問題フォーム
export const Practice: React.FC<Props> = ({
  expression,
  answers,
  answerPlaceholder,
  conceptId
}) => {
  const [results, setResults] = useState(answers.map(() => false));
  const [userAnswers, setUserAnswers] = useState(answers.map(() => ""));
  const [isOK, setOK] = useState(false);

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
    setOK(results.every((r) => r));
  }

  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <Grid item xs={4} >
        <MathReadonly formula={expression} />
      </Grid>
      {answers.map((_, i) => (
        <Grid item xs key={i} sx={{ textAlign: 'center' }}>
          <MathInputInline onChange={setUserAnswer(i)} />
          { (answers.length -1 ) === i ? null : ", "}
        </Grid>
      ))}
      <Grid item xs={1}>
        {
          isOK ? (
            <Check fontSize="large" color="success" />
          ) : (
            null
          )
        }
      </Grid>
    </Grid>
  );
};
