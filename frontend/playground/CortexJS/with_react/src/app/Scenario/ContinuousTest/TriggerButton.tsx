import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { TestStateType } from ".";

type TriggerButtonProps = {
  state: TestStateType,
  onInitHandler: () => void,
  onStartedHandler: () => void,
  onDoneHandler: () => void,
}

export const TriggerButton: React.FC<TriggerButtonProps> = ({state, onInitHandler, onStartedHandler, onDoneHandler}) => {
  switch (state) {
    case 'init':
      return (
        <Button variant="contained" onClick={onInitHandler}>はじめる</Button>
      )
    case 'started':
      return (
        <Button variant="outlined" onClick={onStartedHandler}>おわる</Button>
      )
    case 'done':
      return (
        <Button variant="contained" onClick={onDoneHandler}>もういちど</Button>
      )
  }
}
