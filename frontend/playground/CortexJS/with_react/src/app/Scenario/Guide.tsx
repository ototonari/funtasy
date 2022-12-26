import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { GuideStorage } from "../database/concepts/LocalStorage";
import { routeState } from "../Routing";
import { BaseContainer } from "./utils";

type Props = {};

export const Guide: React.FC<Props> = () => {
  const [_, setRoute] = useRecoilState(routeState);
  const setGuideStatus = () => {
    GuideStorage.set(true);
    setRoute("test");
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
          <p>ブラウザのリロードは行わないで下さい(初めにもどってしまうよ)</p>
          <p>
            最後にGoogleFormアンケートがあります。答えていただいた方から抽選でアマギフをプレゼントいたします。
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <Button variant="contained" onClick={setGuideStatus}>
            はじめる
          </Button>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};
