import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Grid, Typography } from "@mui/material";
import { BaseContainer } from "../utils";
import { ab, Text, Title } from "../../AboutConcept/utils";
import { BorderLine, Space } from "../ContinuousTest/utils";
import { TestResultInfoType, UserScore } from "../../firebase/database/user_score";
import { authState } from "../../firebase/auth";
import { UnderstandingGraph } from "./UnderstandingGraph";
import { routeState } from "../../Routing";
import { useHelperActiveScene } from "../../hooks/useHelperActivityLog";

type Props = {};

export const Finish: React.FC<Props> = () => {
  const [{uid},] = useRecoilState(authState);
  const [, setRoute] = useRecoilState(routeState);

  const [testResultInfo, setTestResultInfo] = useState<TestResultInfoType | null | undefined>(undefined);

  const backHandler = () => {
    setRoute("test");
  };

  // 利用ログ
  useHelperActiveScene("result");

  useEffect(() => {
    if (testResultInfo === undefined) {
      UserScore.getStandardDeviationWithUserDeviation(uid).then(setTestResultInfo);
    }
  }, [testResultInfo])

  return (
    <BaseContainer>
      <Grid container>
        <Grid item xs>
          <Typography variant={"h5"}>今回の学習結果</Typography>
        </Grid>
        <Grid item xs={2} style={{display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" sx={{ width: 120 }} onClick={backHandler} >
            再テストする
          </Button>
        </Grid>
        {/* <Grid item xs={2} style={{display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" sx={{ width: 120 }} >
            さいごに
          </Button>
        </Grid> */}
      </Grid>

      <Grid container>
        <Grid item xs>
          <Space />
          <BorderLine />
          <Space />

          <Text pl={2}>
          {ab([
              "お疲れ様でした。",
              "今回の学習結果を振り返ってみましょう。"
            ])}
          </Text>
          <Space />

          <Title>理解度テスト (1問を10点とする)</Title>
          <Space />
          <Text pl={2}>
            {testResultInfo !== undefined ? `最高得点: ${testResultInfo.ownBestScore.molecule * 10}` : ""}
          </Text>
          <Text pl={2}>
            {testResultInfo !== undefined ? `平均点: ${testResultInfo.allTestAvarage * 10}` : ""}
          </Text>
          <Text pl={2}>
            {testResultInfo !== undefined ? `偏差値 ${testResultInfo.userDeviation}` : ""}
          </Text>
          <Space />

          <Title>理解度の推移</Title>
            <UnderstandingGraph testResultInfo={testResultInfo} />
          <Space />

          {/* <Title>練習問題のやりこみ度</Title>
          <Space />
          <Text pl={2}>
          </Text> */}
          <Space />
        </Grid>
      </Grid>

    </BaseContainer>
  );
};
