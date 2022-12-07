import React from "react";
import {
  Typography,
  Box,
  Grid,
  Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Base } from "./Base";
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";
import { Text, TextBr, ab } from "./utils";
import { MathInline } from "../MathLive/MathInline";
import { useGotoConcept } from "../hooks/useGotoConcept";

const ConceptId = 101;

export const About101: React.FC = () => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);

  const goToNext = () => {
    const conceptIds = [...modalRoute.conceptIds, 49];
    setModalRoute({ conceptIds });
  };

  return (
    <Base>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <About39aDescription />
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs></Grid>
        </Grid>
      </Box>
      {/* <Button variant="outlined" onClick={goToNext}>Go To Next</Button> */}
    </Base>
  );
};

export const About39aDescription = () => {
  const [, goToNext, isSameConcept] = useGotoConcept();

  const isSame = isSameConcept(ConceptId)

  const seeDetailButton = () => {
    if (isSame === false) {
      return (
        <Button variant="outlined" disableElevation onClick={goToNext(ConceptId)}>
          もっと見てみる
        </Button>
        // <div style={{display: "inline-block"}} onClick={goToNext(ConceptId)} >もっと見てみる</div>

      );
    }
  };

  return (
    <>
      <Typography variant={isSame ? "h4" : "h6"} p={isSame ? 2 : 0}>2次方程式の解の公式</Typography>
      <Text>
        <MathInline formula="ax^2+bx+c=0\left(a\ne0\right)" /> の解は
      </Text>
      <Text pl={2}>
        {ab([
          <>
            <MathInline formula="D=b^2-4ac\ge0" /> のとき存在し、
          </>,
          <>
            <MathInline formula="x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}" />
          </>,
        ])}
      </Text>
      <Text>
        <MathInline formula="ax^2+2b^{\prime}x+c=0\left(a\ne0\right)" /> の解は
      </Text>
      <Text pl={2}>
        {ab([
          <>
            <MathInline formula="D^{\prime}=b^{\prime}^2-ac\ge0" />{" "}
            のとき存在し、
          </>,
          <>
            <MathInline formula="x=\frac{-b^{\prime}\pm \sqrt{b^{\prime}^2-4ac}}{2a}" />
          </>,
        ])}
      </Text>
      <Text>
        <MathInline formula="D" />、<MathInline formula="D^{\prime}" />{" "}
        を判別式といい、与えられた2次方程式は
      </Text>
      <Text pl={2}>
        {ab([
          <>
            <MathInline formula="D>0\left(D^{\prime}>0\right)" />{" "}
            のとき、異なる2つの解をもつ
          </>,
          <>
            <MathInline formula="D=0\left(D^{\prime}=0\right)" />{" "}
            のとき、重解をもつ
          </>,
          <>
            <MathInline formula="D<0\left(D^{\prime}<0\right)" />{" "}
            のとき、解をもたない
          </>,
        ])}
      </Text>
      {seeDetailButton()}
    </>
  );
};
