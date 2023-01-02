import React from "react";
import { Typography, Button, Box, Grid, Paper } from "@mui/material";
import { Base } from "./Base";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../ModalRouting";
import {
  Text,
  TextBr,
  ab,
  Title,
  ScrollBoxOnModal,
  Border,
  CardBox,
  Point,
  Space,
} from "./utils";
import { MI } from "../MathLive/MathInline";
import { useGotoConcept } from "../hooks/useGotoConcept";
import { P4 } from "../database/questions/4";
import { Practice } from "../Question/Practice";
import { evaluationBySubs } from "../ComputeEngine";
import { Concept } from "../PersonalLearningStatus/InstructionalCurriculumMap";
import { prerequisiteConcepts, unresolveConcepts } from "../ConceptMatcher";
import { icmState } from "../PersonalLearningStatus";
import cross_wall_calc_img from "../assets/cross_wall_calc.png"
import ex_cross_wall_calc_1_img from "../assets/ex_cross_wall_calc_1.png"
import ex_cross_wall_calc_2_img from "../assets/ex_cross_wall_calc_2.png"
import { VirtualKeyboardSpace } from "../MathLive/utils";

const ConceptId = 4;

export const About4: React.FC = () => {
  const { icm } = useRecoilValue(icmState);

  const [{ conceptIds, currentConceptLevel }, setModalRoute] =
    useRecoilState(modalState);

  return (
    <Base>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <ScrollBoxOnModal isNoOutline={true}>
              <Typography variant="h4" p={2}>
                因数分解
              </Typography>

              {/* <Level1 /> */}

              {/* <Level2 /> */}

              {/* <Level3 /> */}

              {levelMatcher(currentConceptLevel)}
              <VirtualKeyboardSpace height={200} />
            </ScrollBoxOnModal>
          </Grid>

          {/* <Grid item xs={0}>
            <ScrollBoxOnModal>
              <Title>例題: 共通因数による因数分解</Title>
              <Text>
                {ab([
                  <>
                    {"(1) "} <MI f="2ax^2+6axy" />
                  </>,
                ])}
              </Text>
              <Text pl={1}>
                {ab([
                  <>
                    共通因数 <MI f="2ax" /> があるから、
                    <MI f="2ax^2+6axy = 2ax(x+3y)" />
                  </>,
                ])}
              </Text>
              <Text>
                {ab([
                  <>
                    {"(2) "} <MI f="2x^3-x^2-18x+9" />
                  </>,
                ])}
              </Text>
              <Text pl={1}>
                {ab([
                  <>
                    <MI f="=x^2(2x-1)-9(2x-1)" />
                  </>,
                  <>
                    <MI f="=(x^2-9)(2x-1)" /> まだ因数分解できるので、
                  </>,
                  <>
                    <MI f="=(x+3)(x-3)(2x-1)" />
                  </>,
                ])}
              </Text>
              <Text>
                {ab([
                  <>
                    {"(3) "} <MI f="(a-b)x+(b-a)y" />
                  </>,
                ])}
              </Text>
              <Text pl={1}>
                {ab([
                  <>
                    <MI f="=(a-b)x-(a-b)y" />
                  </>,
                  <>
                    <MI f="=(a-b)(x-y)" />
                  </>,
                ])}
              </Text>
              <Border />
              <Title>練習</Title>
              {p4
                .filter((s) => s.level === 0)
                .map((s, i) => (
                  <Practice {...s} evaluator={evaluationBySubs} key={i} />
                ))}

              <Border />
              <Title>例題: 因数分解の公式①, ②を利用</Title>
              <Text>
                {ab([
                  <>
                    {"(1) "} <MI f="x^2+8x+16" />
                  </>,
                ])}
              </Text>
              <Text pl={1}>
                {ab([
                  <>
                    <MI f="=x^2+2\times x\times 4+4^2" />
                  </>,
                  <>
                    <MI f="=(x+4)^2" />
                  </>,
                ])}
              </Text>
              <Text>
                {ab([
                  <>
                    {"(2) "} <MI f="9x^2-6xy+y^2" />
                  </>,
                ])}
              </Text>
              <Text pl={1}>
                {ab([
                  <>
                    <MI f="=(3x)^2-2\times 3x\times y+y^2" />
                  </>,
                  <>
                    <MI f="=(3x-y)^2" />
                  </>,
                ])}
              </Text>
              <Text>
                {ab([
                  <>
                    {"(3) "} <MI f="4x^2-9y^2" />
                  </>,
                ])}
              </Text>
              <Text pl={1}>
                {ab([
                  <>
                    <MI f="=(2x)^2-(3y)^2" />
                  </>,
                  <>
                    <MI f="=(2x+3y)(2x-3y)" />
                  </>,
                ])}
              </Text>
              <Border />
              <Title>練習</Title>
              {p4
                .filter((s) => s.level === 1 || s.level === 2)
                .map((s, i) => (
                  <Practice {...s} evaluator={evaluationBySubs} key={i} />
                ))}
            </ScrollBoxOnModal>
          </Grid> */}

          <Grid item xs={4}>
            {/* {currentConceptLevel
              ? unresolveConcepts(icm, {
                  conceptId: currentConceptLevel[0],
                  level: currentConceptLevel[1],
                })
              : unresolveConcepts(icm, {
                conceptId: 4,
                level: 0,
              })} */}
              {prerequisiteConcepts(icm, {
                conceptId: 4,
                level: 0
              })}
          </Grid>
        </Grid>
      </Box>
      {/* <Button variant="outlined" onClick={goToNext}>Go To Next</Button> */}
    </Base>
  );
};

const memoTmp = () => (
  <>
    <Text>
      {ab([
        <>
          {"(2) "} <MI f="2x^3-x^2-18x+9" />
        </>,
      ])}
    </Text>
    <Text pl={1}>
      {ab([
        <>
          <MI f="=x^2(2x-1)-9(2x-1)" />
        </>,
        <>
          <MI f="=(x^2-9)(2x-1)" /> まだ因数分解できるので、
        </>,
        <>
          <MI f="=(x+3)(x-3)(2x-1)" />
        </>,
      ])}
    </Text>
    <Text>
      {ab([
        <>
          {"(3) "} <MI f="(a-b)x+(b-a)y" />
        </>,
      ])}
    </Text>
    <Text pl={1}>
      {ab([
        <>
          <MI f="=(a-b)x-(a-b)y" />
        </>,
        <>
          <MI f="=(a-b)(x-y)" />
        </>,
      ])}
    </Text>
  </>
);

const Level1 = () => (
  <>
    <Title>共通因数による因数分解</Title>
    <Text>
      {ab([
        "多項式の各項に共通の因数があれば、その共通因数をかっこの外に括り出して、式を因数分解することができる。",
      ])}
    </Text>
    <Point>
      <Text>
        {ab([
          <>
            <MI f="AB+AC=A(B+C)" />
          </>,
        ])}
      </Text>
    </Point>
    <Text>
      {ab([
        "因数分解にはいくつか公式がありますが、それだけでは対応できないのが普通です。",
        "そのときは公式を使う前に、共通因数を見つけてくくりだす作業が必要になります。",
        "そのためには次の2つがポイントになります。",
      ])}
    </Text>
    <Point>
      <Text>
        {ab([
          "1. ある式全体をひとまとめにして式を見やすくする",
          "2. 文字が2種類以上あるときは、次数の一番低い文字について整理する",
        ])}
      </Text>
    </Point>

    <Space />

    <Paper variant={"outlined"} sx={{ padding: 1, margin: 1 }}>
      <Text>例題</Text>

      <Text>
        {ab([
          <>
            <MI f="2ax^2+6axy" /> の因数分解
          </>,
        ])}
      </Text>
      <Text pl={1}>
        {ab([
          <>
            共通因数 <MI f="2ax" /> があるから、
          </>,
          <>
            <MI f="2ax^2+6axy = 2ax(x+3y)" />
          </>,
        ])}
      </Text>
    </Paper>
    <Space />

    <Text>練習してみよう</Text>
    <div style={{ paddingLeft: 20 }}>
      {P4.ex16.map((s, i) => (
        <Practice evaluator={evaluationBySubs} {...s} key={i} />
      ))}
    </div>
    <Border />

    <Paper variant={"outlined"} sx={{ padding: 1, margin: 1 }}>
      <Text>例題</Text>

      <Text>
        {ab([
          "次の式を因数分解せよ。",
          <>
            <MI f="(a-b)x+(b-a)y" />
          </>,
        ])}
      </Text>
      <Text pl={1}>
        {ab([
          <>
            <MI f="(a-b)x+(b-a)y = (a-b)x-(a-b)y = (a-b)(x-y)" />
          </>,
        ])}
      </Text>
    </Paper>
    <Space />

    <Text>練習してみよう</Text>
    <div style={{ paddingLeft: 20 }}>
      {P4.ex17.map((s, i) => (
        <Practice evaluator={evaluationBySubs} {...s} key={i} />
      ))}
    </div>
    <Border />
  </>
);

const Level2 = () => (
  <>
    <Title>解の公式を利用した因数分解</Title>
    <Text>
      {ab([
        "展開の公式を逆に利用すると、因数分解の公式が得られる。",
      ])}
    </Text>
    <Point>
      <Text>
        {ab([
          "因数分解の公式",
          <>
            1. <MI f="a^2+2ab+b^2=(a+b)^2" />,　<MI f="a^2-2ab+b^2=(a-b)^2" />
          </>,
          <>
            2. <MI f="a^2-b^2=(a+b)(a-b)" />
          </>,
          <>
            3. <MI f="x^2+(a+b)x+ab=(x+a)(x+b)" />
          </>,
        ])}
      </Text>
    </Point>
    <Text>
      {ab([
        "因数分解の公式 1️, 2 を利用する因数分解の例を示す。",
      ])}
    </Text>
    <Point>
      <Text>例題</Text>
      <Text>
        {ab([
          <><MI f="(1) x^2+8x+16 = x^2+2\cdot x\cdot4+4^2 = (x+4)^2" /></>,
          <><MI f="= x^2+2\cdot x\cdot4+4^2 = (x+4)^2" /></>,
          <><MI f="(2) 9x^2-6xy+y^2 = (3x)^2 -2\cdot3x\cdot y + y^2 = (3x-y)^2" /></>,
          <><MI f="= (3x)^2 -2\cdot3x\cdot y + y^2 = (3x-y)^2" /></>,
          <><MI f="(3) 4x^2-9y^2 = (2x)^2 - (3y)^2 = (2x+3y)(2x-3y)" /></>,
          <><MI f="= (2x)^2 - (3y)^2 = (2x+3y)(2x-3y)" /></>,
        ])}
      </Text>
    </Point>
    <Space />

    <Text>練習してみよう</Text>
    <div style={{ paddingLeft: 20 }}>
      {P4.ex18.map((s, i) => (
        <Practice evaluator={evaluationBySubs} {...s} key={i} />
      ))}
    </div>

    <Space />
    <Border />

    <Text>
      {ab([
        "因数分解の公式 3 を利用する因数分解の例を示す。",
      ])}
    </Text>
    <Point>
      <Text>例題</Text>
      <Text>
        {ab([
          <><MI f="(1) x^2+6x+8" /></>,
          <><MI f="= x^2+(2+4)x+2\cdot4 = (x+2)(x+4)" /></>,
          <><MI f="(2) x^2+2xy-8y^2" /></>,
          <><MI f="= x^2+(-2y+4y)x+(-2y)\cdot4y = (x-2y)(x+4y)" /></>,
        ])}
      </Text>
    </Point>
    <Space />

    <Text>練習してみよう</Text>
    <div style={{ paddingLeft: 20 }}>
      {P4.ex19.map((s, i) => (
        <Practice evaluator={evaluationBySubs} {...s} key={i} />
      ))}
    </div>
    <Border />
    <Space />


    <Text>
      {ab([
        "展開の公式 4 を逆に利用する因数分解は次のようになる。",
      ])}
    </Text>
    <Point>
      <Text>
        {ab([
          "因数分解の公式",
          <>
            4. <MI f="acx^2+(ad+bc)x+bd=(ax+b)(cx+d)" />
          </>,
        ])}
      </Text>
    </Point>
    <Text>
      {ab([
        "因数分解の公式 4 を利用する例を示す。"
      ])}
    </Text>
    <Point>
      <Text>
        {ab([
          <><MI f="3x^2+14x+8" /> の因数分解</>
        ])}
      </Text>
      <Text pl={2}>
        {ab([
          "因数分解の公式 4 において",
          <><MI f="ac=3,　ad+bc=14,　bd=8" /></>,
          <>となる <MI f="a,　b,　c,　d" /> をみつければよい。</>,
          "そこで以下の図式を用いて計算を行う。",
        ])}
      </Text>
      <Space />
      <img src={cross_wall_calc_img} style={{height: 100, paddingLeft: 20}} />
      <Space />

      <Text pl={2}>
        {ab([
          <><MI f="ac=3 の 3 を積に分解すると 1\cdot3" /></>,
          <><MI f="bd=8 の 8 を積に分解すると 1\cdot8,　2\cdot4,　(-1)\cdot(-8),　(-2)\cdot(-4)" /></>,
          <><MI f="a=1,　c=3　として　b,　d　の候補から　ad+bc=14　となるものを以下の図のような形式で計算してみる。" /></>,
        ])}
      </Text>

      <img src={ex_cross_wall_calc_1_img} style={{height: 100, paddingLeft: 20}} />
      <Text pl={2}>
        {ab([
          <><MI f="b=1,　d=8　で試した結果、 ad+bd=11　となり適さない。" /></>,
        ])}
      </Text>
      <Space />

      <img src={ex_cross_wall_calc_2_img} style={{height: 100, paddingLeft: 20}} />
      <Text pl={2}>
        {ab([
          <><MI f="b=4,　d=2　で試した結果、 ad+bd=14　となり適する。" /></>,
          <><MI f="なので　a=1,　b=4,　c=3,　d=2" /></>,
          <><MI f="よって　3x^2+14x+8 = (x+4)(3x+2)" /></>,
        ])}
      </Text>
    </Point>
    <Space />
    <Text>次の式を因数分解せよ。</Text>
    <div style={{ paddingLeft: 20 }}>
      {P4.ex20.map((s, i) => (
        <Practice evaluator={evaluationBySubs} {...s} key={i} />
      ))}
    </div>
    <Border />
    <Space />
  </>
)

const Level3 = () => (
  <>
    <Title>因数分解の工夫</Title>
    <Text>
      {ab([
        "複雑な式を因数分解するとき、式の一部を1つのまとまりとみなして因数分解の公式を利用できることがある。",
      ])}
    </Text>
    <Point>
      <Text>
        {ab([
          "次の式を因数分解せよ。",
          <><MI f="(1) (x+y)^2+2(x+y)-15" /></>,
          <><MI f="x+y=A　とおくと A^2+2A-15 に変形できる。" /></>,
          <><MI f="A^2+2A-15 = (A-3)(A+5),　Aを展開すると　(x+y-3)(x+y+5)" /></>,
          <><MI f="(2) x^4-3x^2-4" /></>,
          <><MI f="x^2=A　とおくと A^2-3A-4　= (A+1)(A-4)" /></>,
          <><MI f="=(x^2+1)(x^2-4)" /></>,
          <><MI f="=(x^2+1)(x+2)(x-2)" /></>,
        ])}
      </Text>
    </Point>
    <Space />

    <Text>次の式を因数分解せよ。</Text>
    <div style={{ paddingLeft: 20 }}>
      {P4.ex21.map((s, i) => (
        <Practice evaluator={evaluationBySubs} {...s} key={i} />
      ))}
    </div>

    <Space />
  </>
)

export const About4Description = () => {
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
      <Title>因数分解の公式</Title>
      <Text pl={2}>
        {ab([
          <>
            ① <MI f="a^2+2ab+b^2=(a+b)^2" /> ,　<MI f="a^2-2ab+b^2=(a-b)^2" />
          </>,
          <>
            ② <MI f="a^2-b^2=(a+b)(a-b)" />
          </>,
          <>
            ③ <MI f="x^2+(a+b)x+ab=(x+a)(x+b)" />
          </>,
          <>
            ④ <MI f="acx^2+(ad+bc)x+bd=(ax+b)(cx+d)" />
          </>,
        ])}
      </Text>

      {seeDetailButton()}
    </>
  );
};

const levelMatcher = (currentConceptLevel: [number, number] | undefined) => {
  if (!currentConceptLevel || currentConceptLevel[0] !== 4)
    return (
      <>
        <Level1 />
        <Level2 />
        <Level3 />
      </>
    );

  const [id, level] = currentConceptLevel;
  switch (level) {
    case P4.levels.共通因数による因数分解:
      return <Level1 />;
    case P4.levels.因数分解の公式1:
      return <Level2 />;
    case P4.levels.因数分解の公式2:
      return <Level2 />;
    case P4.levels.応用:
      return <Level3 />;
    default:
      return (
        <>
          <Level1 />
          <Level2 />
          <Level3 />
        </>
      );
  }
};
