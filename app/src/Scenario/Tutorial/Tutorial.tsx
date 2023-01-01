import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { ab, Text, Title } from "../../AboutConcept/utils";
import { isEqual } from "../../ComputeEngine";
import { TutorialQuestions } from "../../database/questions/tutorial";
import { MI } from "../../MathLive/MathInline";
import { TutorialPractice } from "../../Question/TutorialPractice";
import { routeState } from "../../Routing";
import { BorderLine, Space } from "../ContinuousTest/utils";
import { BaseContainer } from "../utils";

type Props = {};

export const Tutorial: React.FC<Props> = () => {
  const [, setRoute] = useRecoilState(routeState);
  const onClickHandler = () => {
    setRoute("test");
  };

  return (
    <BaseContainer>
      <Grid container>
        <Grid item xs>
          <Title>チュートリアル</Title>
        </Grid>
        <Grid item xs={2} style={{display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" sx={{ width: 120 }} onClick={onClickHandler}>
          次に進む
        </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Text pl={2}>
            {ab([
              "当アプリでは入力フォームに数式を入力します。",
              "ここではキーボード又は仮想キーボードを用いた入力の練習を行うことができます。",
            ])}
          </Text>
          <Space />
          <BorderLine />
          <Space />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Title>数字の入力</Title>
          <Typography variant="subtitle1" paddingLeft={2} >左に表示された数字と同じになるようにフォームに入力してみましょう。</Typography>
          <Typography variant="subtitle1" paddingLeft={2} >フォームをクリックすると仮想キーボードが表示されます。</Typography>
          <Typography variant="subtitle1" paddingLeft={2} >仮想キーボードから入力するか、キーボードから直接入力も可能です。</Typography>
          <Space />

          <div style={{ paddingLeft: 20 }}>
            {TutorialQuestions.level1.slice(0, 1).map((s, i) => (
              <TutorialPractice evaluator={isEqual} {...s} key={i} />
            ))}
          </div>
          <Space />

          <div style={{ paddingLeft: 20 }}>
            {TutorialQuestions.level1.slice(1, 2).map((s, i) => (
              <TutorialPractice evaluator={isEqual} {...s} key={i} />
            ))}
          </div>
          <Text pl={2} >
              <MI f="a * b　と入力すると　a \cdot b　と表示されます。" />
            </Text>

          <Space />

          <div style={{ paddingLeft: 20 }}>
            {TutorialQuestions.level1.slice(2, 3).map((s, i) => (
              <TutorialPractice evaluator={isEqual} {...s} key={i} />
            ))}
          </div>
          <Text pl={2}>
              <MI f="a / b　と入力すると　\frac{a}{b}　と表示されます。" />
            </Text>

          <Space />

          <div style={{ paddingLeft: 20 }}>
            {TutorialQuestions.level1.slice(3, 4).map((s, i) => (
              <TutorialPractice evaluator={isEqual} {...s} key={i} />
            ))}
          </div>
          <Text pl={2}>
              <><MI f="x^2　" /> は x ^ 2 と入力することでも表示できます。</>
            </Text>
          <Space />

          <div style={{ paddingLeft: 20 }}>
            {TutorialQuestions.level1.slice(4, 6).map((s, i) => (
              <TutorialPractice evaluator={isEqual} {...s} key={i} />
            ))}
          </div>
          <Text pl={2}>
            {ab([
              <>不等記号 <MI f="　<　" />{" は < と入力し、"} <MI f="　\ge　" />{" は >= と入力します。"}</>,
            ])}
          </Text>
          <Space />

          <div style={{ paddingLeft: 20 }}>
            {TutorialQuestions.level1.slice(6, 7).map((s, i) => (
              <TutorialPractice evaluator={isEqual} {...s} key={i} />
            ))}
          </div>
          <Text pl={2}>
            {ab([
              <><Typography variant="caption" >※ 仮想キーボードでの入力をお勧めします</Typography></>,
              <>ルート記号<MI f="　\sqrt{5}　" />{" は \\ sqrt {5} と入力することでも表示できます。( \\ はバックスラッシュ)"}</>,
            ])}
          </Text>
          <Space />


        </Grid>
      </Grid>
    </BaseContainer>
  );
};
