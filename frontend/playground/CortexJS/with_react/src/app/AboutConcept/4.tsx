import React from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { Base } from "./Base";
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";
import { Text, TextBr, ab, Title, ScrollBoxOnModal, Border, CardBox } from "./utils";
import { MathInline } from "../MathLive/MathInline";
import { useGotoConcept } from "../hooks/useGotoConcept";
import { p4 } from "../database/questions/4";
import { Practice } from "../Question/Practice";
import { evaluationBySubs } from "../ComputeEngine";

const ConceptId = "4";

export const About4: React.FC = () => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);

  const goToNext = () => {
    const conceptIds = [...modalRoute.conceptIds, "49"];
    setModalRoute({ conceptIds });
  };

  return (
    <Base>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h4" p={2}>
              因数分解
            </Typography>
            <Text>
              {ab([
                "多項式の各項に共通の因数があれば、その共通因数をかっこの外に括り出して、式を因数分解することができる。",
                <><MathInline formula="AB+AC=A(B+C)" /></>,
              ])}
            </Text>
            <Text>
              {ab([
                "因数分解にはいくつか公式がありますが、それだけでは対応できないのが普通です。",
                "そのときは公式を使う前に、共通因数を見つけてくくりだす作業が必要になります。",
                "そのためには次の2つがポイントになります。",
                "1. ある式全体をひとまとめにして式を見やすくする",
                "2. 文字が2種類以上あるときは、次数の一番低い文字について整理する",
              ])}
            </Text>
          </Grid>

          <Grid item xs={4}>
          <ScrollBoxOnModal >
            <Title>
              例題: 共通因数による因数分解
            </Title>
            <Text>
            {ab([
                <>{"(1) "} <MathInline formula="2ax^2+6axy" /></>
              ])}
            </Text>
            <Text pl={1}>
            {ab([
                <>共通因数 <MathInline formula="2ax"/> があるから、<MathInline formula="2ax^2+6axy = 2ax(x+3y)" /></>,
              ])}
            </Text>
            <Text>
            {ab([
                <>{"(2) "} <MathInline formula="2x^3-x^2-18x+9" /></>
              ])}
            </Text>
            <Text pl={1}>
            {ab([
                <><MathInline formula="=x^2(2x-1)-9(2x-1)" /></>,
                <><MathInline formula="=(x^2-9)(2x-1)" /> まだ因数分解できるので、</>,
                <><MathInline formula="=(x+3)(x-3)(2x-1)" /></>,
              ])}
            </Text>
            <Text>
            {ab([
                <>{"(3) "} <MathInline formula="(a-b)x+(b-a)y" /></>
              ])}
            </Text>
            <Text pl={1}>
            {ab([
                <><MathInline formula="=(a-b)x-(a-b)y" /></>,
                <><MathInline formula="=(a-b)(x-y)" /></>,
              ])}
            </Text>
            <Border />
            <Title>練習</Title>
            { p4.filter(s => s.level === 0).map((s, i) => (<Practice {...s} evaluator={evaluationBySubs} key={i} />))}

            <Border />
            <Title>
              例題: 因数分解の公式①, ②を利用
            </Title>
            <Text>
            {ab([
                <>{"(1) "} <MathInline formula="x^2+8x+16" /></>
              ])}
            </Text>
            <Text pl={1}>
            {ab([
                <><MathInline formula="=x^2+2\times x\times 4+4^2"/></>,
                <><MathInline formula="=(x+4)^2"/></>,
              ])}
            </Text>
            <Text>
            {ab([
                <>{"(2) "} <MathInline formula="9x^2-6xy+y^2" /></>
              ])}
            </Text>
            <Text pl={1}>
            {ab([
                <><MathInline formula="=(3x)^2-2\times 3x\times y+y^2" /></>,
                <><MathInline formula="=(3x-y)^2" /></>,
              ])}
            </Text>
            <Text>
            {ab([
                <>{"(3) "} <MathInline formula="4x^2-9y^2" /></>
              ])}
            </Text>
            <Text pl={1}>
            {ab([
                <><MathInline formula="=(2x)^2-(3y)^2" /></>,
                <><MathInline formula="=(2x+3y)(2x-3y)" /></>,
              ])}
            </Text>
            <Border />
            <Title>練習</Title>
            { p4.filter(s => s.level === 1 || s.level === 2 ).map((s, i) => (<Practice {...s} evaluator={evaluationBySubs} key={i} />))}

            </ScrollBoxOnModal>

          </Grid>

          <Grid item xs>
            <CardBox >
              <About4Description />
            </CardBox>
          </Grid>
        </Grid>
      </Box>
      {/* <Button variant="outlined" onClick={goToNext}>Go To Next</Button> */}
    </Base>
  );
};

export const About4Description = () => {
  const [, goToNext, isSameConcept] = useGotoConcept();

  const isSame = isSameConcept(ConceptId)

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
      <Title>因数分解の公式</Title>
      <Text pl={2}>
        {ab([
          <>
            ① <MathInline formula="a^2+2ab+b^2=(a+b)^2" />, <MathInline formula="a^2-2ab+b^2=(a-b)^2" />
          </>,
          <>
            ② <MathInline formula="a^2-b^2=(a+b)(a-b)" />
          </>,
          <>
            ③ <MathInline formula="x^2+(a+b)x+ab=(x+a)(x+b)" />
          </>,
          <>
            ④ <MathInline formula="acx^2+(ad+bc)x+bd=(ax+b)(cx+d)" />
          </>,
        ])}
      </Text>

      {seeDetailButton()}
    </>
  );
};

{/* <ScrollBoxOnModal isNoOutline={true}>
<CardBox >
  <About4Description />
</CardBox>
<CardBox >
  <About39aDescription />
</CardBox>
</ScrollBoxOnModal> */}
