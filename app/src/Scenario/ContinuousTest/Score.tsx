import React from "react";
import { useRecoilValue } from "recoil";
import { Timer, MenuBook, FactCheck, Check } from "@mui/icons-material";
import { ContinuousTestState, countResults, TestStateType } from ".";
import { Typography } from "@mui/material";

type Props = {
  state: TestStateType,
}

export const Score: React.FC<Props> = ({state}) => {
  const continuousTestState = useRecoilValue(ContinuousTestState);

  if (state !== 'done') {
    return null
  } else {
    const [son, mother] = countResults(continuousTestState);
    return (
      <>
        <Check color="success" />
        <Typography variant="h6" style={{marginTop: 2, marginLeft: 4}} >
          {`${son} / ${mother}`}
        </Typography>
        
      </>
    )
  }
}