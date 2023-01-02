import React, { useState } from "react";
import { MathReadonly } from "../MathLive/MathReadonly";
import { MathInput } from "../MathLive/MathInput";
import { ce } from "../ComputeEngine";
import { Grid, IconButton } from "@mui/material";
import { Check, Lightbulb } from "@mui/icons-material";
import { QuestionType } from "./common";
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";
import { MI } from "../MathLive/MathInline";

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
    <Grid container spacing={0.5}>
      <Grid item xs={4}>
        <MathReadonly formula={expression} />
      </Grid>
      <Grid item xs={0.5} style={{display: "flex", justifyContent: "flex-end" }} >
        {answerPlaceholder ? (
          <MI f={answerPlaceholder} />
        ) : null}
      </Grid>
      {answers.map((a, i) => (
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
                <Lightbulb fontSize="medium" color="primary" />
              </IconButton>
            )
          ) : null
        }
      </Grid>
    </Grid>
  );
};
