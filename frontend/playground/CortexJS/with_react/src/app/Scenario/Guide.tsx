import { Box, Button, Paper } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { GuideStorage } from "../database/concepts/LocalStorage";
import { routeState } from "../Routing";

type Props = {};

export const Guide: React.FC<Props> = () => {
  const [_, setRoute] = useRecoilState(routeState);
  const setGuideStatus = () => {
    // GuideStatus.set(true);
    setRoute("check");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 500,
          height: 500,
        },
      }}
    >
      <Paper elevation={3}>
        <p>案内</p>
        <p>ブラウザのリロードは行わないで下さい(初めにもどってしまうよ)</p>
        <p>
          最後にGoogleFormアンケートがあります。答えていただいた方から抽選でアマギフをプレゼントいたします。
        </p>
        <Button variant="contained" onClick={setGuideStatus}>
          はじめる
        </Button>
      </Paper>
    </Box>
  );
};
