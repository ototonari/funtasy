import React from "react";
import { Button } from "@mui/material";
import { useGotoConcept } from "../hooks/useGotoConcept";
import { MI } from "../MathLive/MathInline";
import {
  Text,
  ab,
  Title,
} from "./utils";

const ConceptId = 1;

export const About1Description = () => {
  const [, goToNext, isSameConcept] = useGotoConcept();

  const isSame = isSameConcept(ConceptId);

  const seeDetailButton = () => {
    if (isSame === false) {
      return (
        <Button variant="outlined" onClick={goToNext(ConceptId)}>
          もっと見てみる
        </Button>
      );
    }
  };

  return (
    <>
      <Title>指数法則</Title>
      <Text pl={2}>
        {ab([
          <>
            <MI f="m,　n" /> は正の整数とする。
          </>,
          <>
            ① <MI f="a^m a^n = a^{m+n}" />
          </>,
          <>
            ② <MI f="(a^m)^n = a^{mn}" />
          </>,
          <>
            ③ <MI f="(ab)^n = a^nb^n" />
          </>,
        ])}
      </Text>

      {/* {seeDetailButton()} */}
    </>
  );
};
