import { Grid, Skeleton, Typography } from "@mui/material";
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
        <Skeleton variant="rounded" width={150} height={25} />
        <Text pl={1}>
          <Skeleton width={100} height={25} />
        </Text>
        <Space />

        <Text pl={2}>
          <Skeleton variant="rounded" width={300} height={20} />
        </Text>
        <Space />

        <Text pl={2}>
          <Skeleton variant="rounded" width={300} height={20} />
        </Text>
        <Space />

        <Text pl={2}>
          <Skeleton variant="rounded" width={300} height={20} />
        </Text>
        <Space />
        <Text pl={2}>
          <Skeleton variant="rounded" width={300} height={20} />
        </Text>
      </>
    );
  }

  const avarage = Math.ceil(testResultInfo.allTestAvarage * 10 * 10) / 10;
  const ownBestScore = Math.ceil(testResultInfo.ownBestScore.molecule * 10 * 10) / 10;

  return (
    <>
      <Title>テストの成績</Title>
      <Space />

      <Text pl={2}>
        {`あなたの最高得点: ${ownBestScore}`}
        <Typography variant="caption" paddingLeft={1}>
          ※ 1問10点で計算
        </Typography>
      </Text>

      <Text pl={2}>{`あなたの偏差値 ${testResultInfo.userDeviation}`}</Text>

      <Text pl={2}>
        {`テストの平均点: ${avarage}`}
        <Typography variant="caption" paddingLeft={1}>
          ※ テストを受けた全員の最高得点の平均
        </Typography>
      </Text>
      <Space />

      <Typography
          variant="body2"
          style={{
            padding: 10,
            borderColor: "rgb(17	101	199)",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 5,
          }}
        >
          {makeGoodWord(testResultInfo.ownBestScore.molecule)}
        </Typography>

      <Space />
    </>
  );
};

const makeGoodWord = (score: number) => {
  if (score >= 8) {
    return "たいへん素晴らしいです";
  } else if (score > 5) {
    return "すばらしいです";
  } else if (score > 2) {
    return "よくできました";
  } else {
    return "がんばりましょう";
  }
};
