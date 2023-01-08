import React, { useEffect, useState } from "react";
import { Space } from "../ContinuousTest/utils";
import { Title, Text, ab } from "../../AboutConcept/utils";
import { Skeleton, Typography } from "@mui/material";
import {
  UserActivity,
  UserActivityType,
} from "../../firebase/database/user_activity";
import { useRecoilValue } from "recoil";
import { authState } from "../../firebase/auth";
import { P4 } from "../../database/questions/4";
import { P39 } from "../../database/questions/39";

type Props = {};

export const PracticeProgress: React.FC<Props> = () => {
  const { uid } = useRecoilValue(authState);

  const [practiceLog, setLog] =
    useState<UserActivityType["practiceLog"]>(undefined);

  useEffect(() => {
    if (practiceLog === undefined) {
      UserActivity.getPracticeLog(uid).then(setLog);
    }
  }, [practiceLog]);

  if (practiceLog === undefined) {
    return (
      <>
        <Skeleton variant="rounded" width={200} height={25} />
        <Space />
        <Text pl={2}>
          <Skeleton width={130} height={20} />
          <Skeleton width={130} height={20} />
        </Text>
      </>
    );
  }

  return (
    <>
      <Title>
        練習問題のやりこみ度
        <Typography variant="caption" paddingLeft={1}>
          ※ 練習問題をどのくらい試したかの割合
        </Typography>
      </Title>
      <ResultView data={practiceLog} />
    </>
  );
};

const ResultView: React.FC<{ data: UserActivityType["practiceLog"] }> = ({
  data,
}) => {
  const log = data !== null ? data : [];

  const totalP4practiceCount = P4.all.length;
  const totalP39PracticeCount = P39.all.length;
  // console.log("total: ", totalP4practiceCount, totalP39PracticeCount);
  let p4OkCount = 0;
  let p39OkCount = 0;

  log.forEach((l) => {
    if (l.conceptId === 4 && l.result) {
      p4OkCount += 1;
    } else if (l.conceptId === 39 && l.result) {
      p39OkCount += 1;
    }
  });

  // console.log("ok: ", p4OkCount, p39OkCount);

  return (
    <Text pl={2}>
      <Typography variant="subtitle1">{`因数分解: ${Math.ceil(
        (p4OkCount / totalP4practiceCount) * 100
      )}%`}</Typography>
      <Typography variant="subtitle1">{`2次方程式: ${Math.ceil(
        (p39OkCount / totalP39PracticeCount) * 100
      )}%`}</Typography>
    </Text>
  );
};
