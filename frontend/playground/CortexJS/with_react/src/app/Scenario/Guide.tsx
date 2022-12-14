import {
  Box,
  Button,
  IconButton,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Text, Title, ab, Space } from "../AboutConcept/utils" 
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { GuideStorage } from "../database/concepts/LocalStorage";
import { routeState } from "../Routing";
import { BaseContainer } from "./utils";

type Props = {};

export const Guide: React.FC<Props> = () => {
  const [_, setRoute] = useRecoilState(routeState);
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
              "あなたが高校で数学を学んでいる時に、学習支援のアプリとして提供され、利用している想定になります。",
            ])}
          </Text>
          <Space />

          <Title>当アプリについて</Title>
          <Text pl={2}>
          {ab([
              "理解度を測るテストを行います。テストが終わりましたら、解けなかった問題について振り返ることができますので、再度テストを行い高得点を目指してください。",
              "問題数は10問、制限時間は10分です。テストは何度でも行うことができます。",
              "テストを終えたい場合は、採点後に表示される終了ボタンを押してください。",
              "最後まで利用していただいた方から抽選で10名様にAmazonギフト券をお渡しさせていただきます。",
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
