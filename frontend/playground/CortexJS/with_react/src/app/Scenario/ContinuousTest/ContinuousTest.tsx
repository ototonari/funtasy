/**
 * 仕様
 * - 始めるボタンで開始する
 * - カウントダウン付きのテストを行う
 * - 終わるボタンかカウントダウンが終了するとテストを終了する
 * - 終了すると、採点と振り返りが行える状態となる。学習者は再度挑戦するか、終了するかを選べる
 * - 終了した場合は、最後の画面に遷移する。
 */
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { TriggerButton } from "./TriggerButton";
import { TestStateType } from ".";
import { CountDownTimer } from "./CountDownTimer";
import { TestContainer } from "./TestContainer";
import { BorderLine, Space } from "./utils";

type Props = {};

export const ContinuousTest: React.FC<Props> = () => {
  const [testState, setTestState] = useState<TestStateType>('init');
  const onInitHandler = () => {
    setTestState('started');
  }
  const onStartedHandler = () => {
    setTestState('done');
  }
  const onDoneHandler = () => {
    setTestState('init');
  }

  return (
    <div
      style={{
        width: 800,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, .3)",
        padding: 20,
      }}
    >
      <Grid container >
        <Grid item xs={7}>
          <Typography variant={"h5"} >理解度テスト</Typography>
        </Grid>
        <Grid item xs={2} style={{display: "flex", alignItems: "center" }} >
          <CountDownTimer state={testState} onStopHandler={onStartedHandler} />
        </Grid>
        <Grid item xs={3} style={{display: "flex", justifyContent: "center" }}>
          <TriggerButton state={testState} onInitHandler={onInitHandler} onStartedHandler={onStartedHandler} onDoneHandler={onDoneHandler} />
        </Grid>
        <Grid item xs={12}>
          <Space />
          <BorderLine />
          <Space />
          <TestContainer state={testState} />
        </Grid>
      </Grid>
    </div>
  );
};
