import {
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Text, Title, ab, Space } from "../AboutConcept/utils" 
import React from "react";
import { useRecoilState } from "recoil";
import { GuideStorage } from "../database/concepts/LocalStorage";
import { routeState } from "../Routing";
import { BaseContainer } from "./utils";
import { useHelperActiveScene } from "../hooks/useHelperActivityLog";

type Props = {};

export const Guide: React.FC<Props> = () => {
  // 利用ログ
  useHelperActiveScene("guide");
  
  const [, setRoute] = useRecoilState(routeState);
  const setGuideStatus = () => {
    GuideStorage.set(true);
    setRoute("questionnaire");
  };

  return (
    <BaseContainer>
      <Grid container>
        <Grid item xs>
          <Typography variant={"h5"}>ご案内</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Space />

          <Text pl={2}>当アプリをご利用いただきありがとうございます。</Text>
          <Space />

          <Title>制作した目的</Title>
          <Text pl={2}>
          {ab([
              "eラーニングを用いた学習において、分からない問題に対して何を学ぶべきかを学習者に提示することで、",
              "学習効率が向上するという仮説を検証する目的で制作しました。"
            ])}
          </Text>
          <Space />

          <Title>想定する利用場面</Title>
          <Text pl={2}>
          {ab([
              "・大学初年度の数学学習において、高校数学を振り返りたい時に、分からない箇所のみ効率的に学習したい",
              "・高校で数学を学んでいる時に、学習支援のアプリとして提供され利用している",
            ])}
          </Text>
          <Space />

          <Title>当アプリについて</Title>
          <Text pl={2}>
          {ab([
              "当アプリで扱う内容は、高校数学1 の2次方程式が中心です。",
              "初めに理解度を測るテストを行います。",
              "採点後、解けなかった問題に振り返りボタンが表示されるので、そこから振り返りを行なってください。",
              "振り返った後は再度テストを行い、高得点を目指して繰り返し学習してみましょう。",
              "",
              "テストの問題数は10問、制限時間は10分です。テストは最低2回行なってください。",
              "2回以上テストを受けると、学習結果を見ることができます。採点後に表示される終了ボタンを押してください。",
            ])}
          </Text>
          <Space />

          <Title>アンケート調査のお礼</Title>
          <Text pl={2}>
          {ab([
              // TODO: 本利用で公開する場合はコメントアウトを外すこと
              "当アプリを最後まで利用いただき、最後のアンケートを1月19日までに回答していただいた方を対象に、",
              "抽選で10名様にAmazonギフト券1000円をお渡しさせていただきます。",
              "当選時期は2月中を予定し、アンケートに記入いただいたメールアドレスにギフトコードを送付いたします。",
            ])}
          </Text>
          <Space />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <IconButton onClick={setGuideStatus}>
            <CheckCircle color="primary" fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};
