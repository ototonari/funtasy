import React, { useState } from "react";
import { MathReadonly } from "../MathLive/MathReadonly";
import { ce, Evaluator, isEqual } from "../ComputeEngine";
import { Grid } from "@mui/material";
import { Check, WarningAmber, Info } from "@mui/icons-material";
import { QuestionType } from "./common";
import { MathInputInline } from "../MathLive/MathInputInline";


type Props = QuestionType & {
  evaluator?: Evaluator
};

export const Practice: React.FC<Props> = ({
  expression,
  answers,
  answerPlaceholder,
  conceptId,
  evaluator
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
        
        // 評価式が与えられている場合はそちらを用いる
        if (!!evaluator) {
          return evaluator(expect, actual);
        } else {
          return isEqual(expect, actual);
        }
      })
    }
    console.log("results", results);
    setResults(results);
    setOK(results.every((r) => r));
  }

  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <Grid item xs={5} >
        <MathReadonly formula={expression} />
      </Grid>
      {answers.map((_, i) => (
        <Grid item xs key={i} sx={{ textAlign: 'center' }}>
          <MathInputInline onChange={setUserAnswer(i)} />
          {/* { (answers.length -1 ) === i ? null : ", "} */}
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
