import { Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Title, Text } from "../../AboutConcept/utils";
import { TestResultInfoType } from "../../firebase/database/user_score";
import { Space } from "../ContinuousTest/utils";

type Props = {
  testResultInfo: TestResultInfoType | undefined;
};

export const ScoreInfo: React.FC<Props> = ({ testResultInfo }) => {
  if (testResultInfo == null) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <Title>テストの成績</Title>
      <Text pl={1}>
        <Typography variant="caption">※ 1問10点で計算</Typography>
      </Text>
      <Space />

      <Text pl={2}>
        {`テストの平均点: ${testResultInfo.allTestAvarage * 10}`}
      </Text>

      <Text pl={2}>
        {`あなたの最高得点: ${testResultInfo.ownBestScore.molecule * 10}`}
      </Text>
      <Text pl={2}>
        {`あなたの偏差値 ${testResultInfo.userDeviation}`}
      </Text>
      <Space />
      <Text pl={2}>
        {makeGoodWord(testResultInfo.ownBestScore.molecule)}
      </Text>

    </>
  );
};

const makeGoodWord = (score: number) => {
  if (score >= 8) {
    return "たいへん素晴らしいです"
  } else if (score > 5) {
    return "すばらしいです"
  } else if (score > 2) {
    return "よくできました"
  } else {
    return "がんばりましょう"
  }
}