import React, { useState } from "react";
import { MathReadonly } from "../MathLive/MathReadonly";
import { ce, Evaluator, isEqual } from "../ComputeEngine";
import { Grid, IconButton, Popover, Typography } from "@mui/material";
import { Check, Lightbulb, HelpOutline } from "@mui/icons-material";
import { QuestionType } from "./common";
import { MathInputInline } from "../MathLive/MathInputInline";
import { MI } from "../MathLive/MathInline";

type Props = QuestionType & {
  evaluator?: Evaluator;
};

export const Practice: React.FC<Props> = ({
  expression,
  answers,
  answerPlaceholder,
  conceptId,
  evaluator,
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
      });
    }
    console.log("results", results);
    setResults(results);
    setOK(results.every((r) => r));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5}>
        <MathReadonly formula={expression} />
      </Grid>
      <Grid item xs={1}>
        {answerPlaceholder ? answerPlaceholder : null}
      </Grid>
      {answers.map((_, i) => (
        <Grid item xs key={i} sx={{ textAlign: "center" }}>
          <MathInputInline onChange={setUserAnswer(i)} />
        </Grid>
      ))}
      <Grid item xs={1}>
        {isOK ? (
          <Check fontSize="large" color="success" />
        ) : (
          <HelpButton answers={answers} />
        )}
      </Grid>
    </Grid>
  );
};

const HelpButton: React.FC<{ answers: string[] }> = ({ answers }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick} aria-describedby={id}>
        <HelpOutline fontSize="medium" color="action" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div style={{padding: 10, display: 'flex', paddingLeft: 15, paddingRight: 15 }}>
          {answers.map((ans, i) => (
            <div key={i}>
              <MI f={ans} />
              {i === answers.length - 1 ? null : " ,　"}
            </div>
          ))}
        </div>
      </Popover>
    </>
  );
};
