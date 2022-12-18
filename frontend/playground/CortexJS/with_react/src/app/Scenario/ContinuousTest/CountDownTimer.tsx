import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Timer } from "@mui/icons-material";
import { TestStateType } from ".";

type CountDownTimerProps = {
  state: TestStateType,
  onStopHandler: () => void;
}

const countParser = (padCount: number): string => {
  const count = Math.floor(padCount / 10);
  const h = Math.floor(count / 3600);
  const m = Math.floor(count / 60);
  const s = count % 60;
  
  const hh = `${h}`.padStart(2, '0');
  const mm = `${m}`.padStart(2, '0');
  const ss = `${s}`.padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}

export const CountDownTimer: React.FC<CountDownTimerProps> = ({state, onStopHandler}) => {
  // タイマーの初期値は 10分
  const initCount = 600 * 10;
  const [count, setCount] = useState(initCount);

  useEffect(() => {
    // テスト中
    if (state === 'started') {
      // カウントが1秒以上ならダウンする
      if (count > 0) {
        setTimeout(() => setCount(count -1), 100);
      } else {
        // 終了したらコールバックする
        onStopHandler();
      }
    } else if (state === 'init') {
      // 初めに戻る場合は初期化
      setCount(initCount);
    }
  }, [count, state]);

  const timeString = countParser(count);

  return (
    <>
      <Timer color="action" />
      <Typography variant="h6" style={{marginTop: 2}} >
        {timeString}
      </Typography>
    </>
  )
}
