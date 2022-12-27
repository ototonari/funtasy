import React from "react";
import { Button } from "@mui/material";
import { useGotoConcept } from "../hooks/useGotoConcept";
import { MI } from "../MathLive/MathInline";
import {
  Text,
  ab,
  Title,
} from "./utils";

const ConceptId = 3;

export const About3Description = () => {
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
      <Title>展開の公式</Title>
      <Text pl={2}>
        {ab([
          <>
            ① <MI f="(a+b)^2 = a^2+2ab+b^2" /> ,　<MI f="(a-b)^2 = a^2-2ab+b^2" />
          </>,
          <>
            ② <MI f="(a+b)(a-b) = a^2-b^2" />
          </>,
          <>
            ③ <MI f="(x+a)(x+b) = x^2+(a+b)x+ab" />
          </>,
          <>
            ④ <MI f="(ax+b)(cx+d) = acx^2+(ad+bc)x+bd" />
          </>,
        ])}
      </Text>

      {/* {seeDetailButton()} */}
    </>
  );
};
