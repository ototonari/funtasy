import React from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  Paper,
  Divider
} from "@mui/material";
import { Base } from "./Base";
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";
import { CardBox, ScrollBoxOnModal, Text, TextBr, Title } from "./utils";
import { MathInline } from "../MathLive/MathInline";
import { About39aDescription } from "./39a";
import { border } from "@mui/system";
import { Practice } from "../Question/Practice";
import { step1 } from "../database/questions/39";

const ab = (texts: string[] | React.ReactNode[]) =>
  texts.map((t) => (
    <>
      {t}
      <br />
    </>
  ));

export const About39: React.FC = () => {
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
              2次方程式の解とその判別
            </Typography>
            <Text>
              {ab([
                "2次方程式を解く方法は次の2つです。",
                "① (因数分解した式)=0",
                "② 解の公式を使う",
              ])}
            </Text>
            <Text>
              {ab([
                "②を使えば、因数分解できなくても解を求められますが、",
                "因数分解できる式では、必ず因数分解する習慣をつけましょう。",
              ])}
            </Text>
            <Text>
              {ab([
                "2次方程式を解くと、その解は次の3つのどれかになります。",
                "① 異なる2つの解",
                "② 重解",
                "③ 解はない",
              ])}
              この3つのどれになるかを判断することを2次方程式の解を判別するといいます。
              このとき、判別式といわれる式を利用します。
            </Text>
          </Grid>

          <Grid item xs={4}>
            <ScrollBoxOnModal >
            <Title>
              例題①
            </Title>
            <Text>
            {ab([
                <>2次方程式 <MathInline formula="3x^2-7x+1=0" /> を解く</>
              ])}
            </Text>
            <Text pl={1}>
            {ab([
                <>解の公式より判別式 <MathInline formula="D=b^2-4ac\ge0"/> に当てはめると、</>,
                <><MathInline formula="D=49-12\ge0" /></>,
                <><MathInline formula="D=37\ge0" /> となり、これは真なので、解の公式</>,
                <><MathInline formula="x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}" /> に当てはめると、</>,
                <><MathInline formula="x=\frac{-\left(-7\right)\pm\sqrt{\left(-7\right)^2-4\times3\times1}}{2\times3}=\frac{7\pm\sqrt{37}}{6}" /> となる。</>,
              ])}
            </Text>
            <div style={{ marginTop: 10, marginBottom: 10}} >
              <Divider />
            </div>
            <Title>練習</Title>
            { step1.map((s, i) => (<Practice {...s} key={i} />))}
            <div style={{ marginTop: 10, marginBottom: 10}} >
              <Divider />
            </div>
            <Title>
              例題②
            </Title>
            <Text>
            {ab([
                <>2次方程式 <MathInline formula="3x^2-7x+1=0" /> を解く</>
              ])}
            </Text>
            <Text pl={1}>
            {ab([
                <>解の公式より判別式 <MathInline formula="D=b^2-4ac\ge0"/> に当てはめると、</>,
                <><MathInline formula="D=49-12\ge0" /></>,
                <><MathInline formula="D=37\ge0" /> となり、これは真なので、解の公式</>,
                <><MathInline formula="x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}" /> に当てはめると、</>,
                <><MathInline formula="x=\frac{-\left(-7\right)\pm\sqrt{\left(-7\right)^2-4\times3\times1}}{2\times3}=\frac{7\pm\sqrt{37}}{6}" /> となる。</>,
              ])}
            </Text>
            </ScrollBoxOnModal>
          </Grid>
          <Grid item xs>
          <ScrollBoxOnModal isNoOutline={true}>
            <CardBox >
              <About39aDescription />
            </CardBox>
            <CardBox >
              <About39aDescription />
            </CardBox>
          </ScrollBoxOnModal>
          </Grid>
        </Grid>
      </Box>
      {/* <Button variant="outlined" onClick={goToNext}>Go To Next</Button> */}
    </Base>
  );
};