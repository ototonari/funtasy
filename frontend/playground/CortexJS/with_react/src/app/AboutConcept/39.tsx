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
} from "@mui/material";
import { Base } from "./Base";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../ModalRouting";
import {
  CardBox,
  Border,
  ScrollBoxOnModal,
  Text,
  TextBr,
  Title,
  ab,
  Space,
  Point,
} from "./utils";
import { MI } from "../MathLive/MathInline";
import { Practice } from "../Question/Practice";
import { P39 } from "../database/questions/39";
import { unresolveConcepts } from "../ConceptMatcher";
import { icmState } from "../PersonalLearningStatus";

export const About39: React.FC = () => {
  const { icm } = useRecoilValue(icmState);

  const [{ currentConceptLevel }, setModalRoute] = useRecoilState(modalState);

  console.log(currentConceptLevel);

  return (
    <Base>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <ScrollBoxOnModal isNoOutline={true}>
              <Typography variant="h4" p={2}>
                2次方程式
              </Typography>
              <Text>2次方程式を解く方法は次の2つあります。</Text>
              <Text pl={2}>
                {ab(["1. 因数分解を使う", "2. 2次方程式の解の公式を使う"])}
              </Text>
              <Point>
                <Text>
                  {ab([
                    "ポイント",
                    "解の公式を使えば、因数分解できなくても解を求められますが、",
                    "因数分解できる式では、必ず因数分解する習慣をつけましょう。",
                  ])}
                </Text>
              </Point>
              <Space />
              {levelMatcher(currentConceptLevel)}
            </ScrollBoxOnModal>
          </Grid>
          <Grid item xs>
            <ScrollBoxOnModal isNoOutline={true}>
              {currentConceptLevel
                ? unresolveConcepts(icm, {
                    conceptId: currentConceptLevel[0],
                    level: currentConceptLevel[1],
                  })
                : unresolveConcepts(icm, {
                    conceptId: 39,
                    level: 2,
                  })}
            </ScrollBoxOnModal>
          </Grid>
        </Grid>
      </Box>
    </Base>
  );
};

const memoTmp = () => (
  <>
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

    <Title>例題:</Title>
    <Text>
      {ab([
        <>
          2次方程式 <MI f="3x^2-7x+1=0" /> を解く
        </>,
      ])}
    </Text>
    <Text pl={1}>
      {ab([
        <>
          解の公式より判別式 <MI f="D=b^2-4ac\ge0" /> に当てはめると、
        </>,
        <>
          <MI f="D=49-12\ge0" />
        </>,
        <>
          <MI f="D=37\ge0" /> となり、これは真なので、解の公式
        </>,
        <>
          <MI f="x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}" /> に当てはめると、
        </>,
        <>
          <MI f="x=\frac{-\left(-7\right)\pm\sqrt{\left(-7\right)^2-4\times3\times1}}{2\times3}=\frac{7\pm\sqrt{37}}{6}" />{" "}
          となる。
        </>,
      ])}
    </Text>
    <Border />
    <Title>練習</Title>
    {P39.level2.map((s, i) => (
      <Practice {...s} key={i} />
    ))}

    <Border />
    <Title>例題②</Title>
    <Text>
      {ab([
        <>
          2次方程式 <MI f="3x^2-7x+1=0" /> を解く
        </>,
      ])}
    </Text>
    <Text pl={1}>
      {ab([
        <>
          解の公式より判別式 <MI f="D=b^2-4ac\ge0" /> に当てはめると、
        </>,
        <>
          <MI f="D=49-12\ge0" />
        </>,
        <>
          <MI f="D=37\ge0" /> となり、これは真なので、解の公式
        </>,
        <>
          <MI f="x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}" /> に当てはめると、
        </>,
        <>
          <MI f="x=\frac{-\left(-7\right)\pm\sqrt{\left(-7\right)^2-4\times3\times1}}{2\times3}=\frac{7\pm\sqrt{37}}{6}" />{" "}
          となる。
        </>,
      ])}
    </Text>
  </>
);

const memoTmp2 = () => (
  <>
    <Title>例題:</Title>
    <Text>
      {ab([
        <>
          2次方程式 <MI f="3x^2-7x+1=0" /> を解く
        </>,
      ])}
    </Text>
    <Text pl={1}>
      {ab([
        <>
          解の公式より判別式 <MI f="D=b^2-4ac\ge0" /> に当てはめると、
        </>,
        <>
          <MI f="D=49-12\ge0" />
        </>,
        <>
          <MI f="D=37\ge0" /> となり、これは真なので、解の公式
        </>,
        <>
          <MI f="x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}" /> に当てはめると、
        </>,
        <>
          <MI f="x=\frac{-\left(-7\right)\pm\sqrt{\left(-7\right)^2-4\times3\times1}}{2\times3}=\frac{7\pm\sqrt{37}}{6}" />{" "}
          となる。
        </>,
      ])}
    </Text>
    <Border />
    <Title>練習</Title>
    {P39.level2.map((s, i) => (
      <Practice {...s} key={i} />
    ))}
    <Border />
    <Title>例題②</Title>
    <Text>
      {ab([
        <>
          2次方程式 <MI f="3x^2-7x+1=0" /> を解く
        </>,
      ])}
    </Text>
    <Text pl={1}>
      {ab([
        <>
          解の公式より判別式 <MI f="D=b^2-4ac\ge0" /> に当てはめると、
        </>,
        <>
          <MI f="D=49-12\ge0" />
        </>,
        <>
          <MI f="D=37\ge0" /> となり、これは真なので、解の公式
        </>,
        <>
          <MI f="x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}" /> に当てはめると、
        </>,
        <>
          <MI f="x=\frac{-\left(-7\right)\pm\sqrt{\left(-7\right)^2-4\times3\times1}}{2\times3}=\frac{7\pm\sqrt{37}}{6}" />{" "}
          となる。
        </>,
      ])}
    </Text>
  </>
);

const Level1 = () => {
  return (
    <>
      <Title>因数分解を使う解き方</Title>
      <Text>まず、因数分解を使って2次方程式を解く方法について調べよう。</Text>

      <Paper variant={"outlined"} sx={{ padding: 1, margin: 1 }}>
        <Text>例題</Text>

        <Text>
          {ab([
            <>
              2次方程式 <MI f="x^2-2x-3=0" /> を解く
            </>,
          ])}
        </Text>
        <Text pl={1}>
          {ab([
            <>左辺を因数分解すると</>,
            <>
              <MI f="(x+1)(x-3)=0" />
            </>,
            <>
              よって、 <MI f="x+1=0" /> または <MI f="x-3=0" />
            </>,
            <>
              したがって、 解は <MI f="x=-1, 3" /> となる。
            </>,
          ])}
        </Text>
      </Paper>
      <Space />

      <Text>この解き方では、次が成り立つことを使っている。</Text>
      <Point>
        <Text>
          {ab([
            <>
              2つの実数 <MI f="A, B" /> について
            </>,
            <>
              <MI f="AB=0　" />
              　⇔　
              <MI f="A=0　または　B=0" />
            </>,
          ])}
        </Text>
      </Point>
      <Space />
      <Border />
      <Text>練習してみよう</Text>
      <div style={{ paddingLeft: 20 }}>
        {P39.level1.map((s, i) => (
          <Practice {...s} key={i} />
        ))}
      </div>
      <Border />
    </>
  );
};

const Level2 = () => {
  return (
    <>
      <Title>2次方程式の解の公式を使う解き方</Title>
      <Point>
        <Text>
          {ab([
            <Typography variant="h6">2次方程式の解の公式</Typography>,
            <>
              2次方程式 <MI f="ax^2+bx+c=0" /> は、 <MI f="b^2-4ac>=0" />{" "}
              のとき解をもち、
            </>,
            <>
              その解は　　
              <MI f="x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}" />
            </>,
          ])}
        </Text>
      </Point>
      <Text>
        {ab([
          <>{"< 注意 >"}</>,
          <>
            <MI f="b^2-4ac=0" /> のとき、2次方程式 <MI f="ax^2+bx+c=0" /> の解は{" "}
            <MI f="x=-\frac{b}{2a}" /> である。
          </>,
          <>
            また、負の数の平方根は実数の範囲には存在しないから、
            <MI f="b^2-4ac<0" /> のときは実数の解をもたない。
          </>,
        ])}
      </Text>

      <Paper variant={"outlined"} sx={{ padding: 1, margin: 1 }}>
        <Text>例題</Text>
        <Text>
          {ab([
            <>
              2次方程式 <MI f="3x^2-7x+1=0" /> を解く
            </>,
          ])}
        </Text>
        <Text pl={1}>
          {ab([
            <>
              <MI f="b^2-4ac>=0" /> に当てはめると <MI f="37>=0" />{" "}
              なので実数の解をもつ。
            </>,
            <>
              なので、{" "}
              <MI f="x=\frac{-(-7)\pm\sqrt{(-7)^2-4\cdot3\cdot1}}{2\cdot3} = \frac{7\pm\sqrt{37}}{6}" />
            </>,
          ])}
        </Text>
      </Paper>
      <Space />

      <Border />
      <Text>練習してみよう</Text>
      <div style={{ paddingLeft: 20 }}>
        {P39.level2.map((s, i) => (
          <Practice {...s} key={i} />
        ))}
      </div>
      <Border />
      <Space />
      <Text>
        {ab([
          <>
            解の公式において、 <MI f="b=2b'" /> とおくと
          </>,
          <>
            <MI f="x=\frac{-2b'\pm\sqrt{(2b')^2-4ac}}{2a} = \frac{-2b'\pm\sqrt{4(b'^2-ac)}}{2a} = \frac{-2b'\pm2\sqrt{b'^2-ac}}{2a} = \frac{-b'\pm\sqrt{b'^2-ac}}{a}" />
          </>,
          <>よって、次の公式が得られる。</>,
        ])}
      </Text>
      <Point>
        <Text>
          {ab([
            <>
              2次方程式 <MI f="ax^2+bx+c=0" /> は、 <MI f="b'^2-ac>=0" />{" "}
              のとき解をもち、
            </>,
            <>
              その解は　　
              <MI f="x=\frac{-b'\pm\sqrt{b'^2-ac}}{a}" />
            </>,
          ])}
        </Text>
      </Point>

      <Paper variant={"outlined"} sx={{ padding: 1, margin: 1 }}>
        <Text>例題</Text>
        <Text>
          {ab([
            <>
              2次方程式 <MI f="5x^2+2x-1=0" /> を解く
            </>,
          ])}
        </Text>
        <Text pl={1}>
          {ab([
            <>
              <MI f="b=2b'より、b'=1" /> なので <MI f="b'^2-ac>=0" />{" "}
              に当てはめると <MI f="6>=0" /> を満たすので実数の解をもつ。
            </>,
            <>
              <MI f="x=\frac{-1\pm\sqrt{1^2-5\cdot(-1)}}{5} = \frac{-1\pm\sqrt{6}}{5}" />
            </>,
          ])}
        </Text>
      </Paper>
      <Space />
      <Border />
      <Text>練習してみよう</Text>
      <div style={{ paddingLeft: 20 }}>
        {P39.level3.map((s, i) => (
          <Practice {...s} key={i} />
        ))}
      </div>
      <Border />
      <Space />
    </>
  );
};

const levelMatcher = (currentConceptLevel: [number, number] | undefined) => {
  if (!currentConceptLevel || currentConceptLevel[0] !== 39)
    return (
      <>
        <Level1 />
        <Level2 />
      </>
    );

  const [id, level] = currentConceptLevel;
  switch (level) {
    case 1:
      return <Level1 />;
    case 2:
      return <Level2 />;
    default:
      return (
        <>
          <Level1 />
          <Level2 />
        </>
      );
  }
};
