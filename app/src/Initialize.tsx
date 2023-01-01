import { Grid, Typography, Skeleton, IconButton } from "@mui/material";
import { Warning } from '@mui/icons-material';
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Space, Text } from "./AboutConcept/utils";
import { authState } from "./firebase/auth";
import { SetAuthStateListener } from "./firebase/auth/auth_state_listener";
import { icmState } from "./PersonalLearningStatus";
import { ICMRepository } from "./PersonalLearningStatus/InstructionalCurriculumMap";
import { routeState } from "./Routing";
import { BaseContainer } from "./Scenario/utils";
import { isChrome } from "./utils/browserDetect";

export const Initialize: React.FC<{}> = () => {
  const [{icm}, setIcmState] = useRecoilState(icmState);
  const [{state}, setAuthState] = useRecoilState(authState);
  const [, setRoute] = useRecoilState(routeState);
  const setGuideStatus = () => {
    setRoute("guide");
  };

  const isChromeBrowser = isChrome();

  useEffect(() => {
      // ICMの初期化. localStorageから状態の復元.
      console.log("start: icm initialize");

      const icm = ICMRepository.load();
      setIcmState({ icm });  

      console.log("end: icm initialize");
  }, []);

  useEffect(() => {
    if (!isChromeBrowser) return;

    console.log("start: auth initialize");

    const authUnsubscribe = SetAuthStateListener((uid) => {
      setAuthState({
        state: 'updated',
        uid: uid,
      })
      console.log("end: auth initialize");
    });

    return () => {
      authUnsubscribe();
      console.log("done: auth initialize");
    }
  }, [])

  useEffect(() => {
    if (!isChromeBrowser) return;

    if (icm !== null && state === "updated") {
      console.log("done: all initialize");
      setGuideStatus();
    }

  }, [icm, state])

  if (!isChromeBrowser) {
    return <WarningComponent />
  }
  
  return (
    <SkeletonCompoent />
  );
};

const WarningComponent = () => (
  <BaseContainer>
      <Grid container>
        <Grid item xs style={{display: "flex", alignItems: "center" }}>
        <Warning color="warning" />
        <Typography variant="body2" paddingLeft={1} >お使いのブラウザではご利用いただけません。</Typography>
        </Grid>
      </Grid>
      <Grid container marginTop={1}>
        <Grid item xs style={{display: "flex", alignItems: "center" }}>
        <Typography variant="body2" style={{ padding: 10, backgroundColor: "rgb(235 235 235)", borderRadius: 5 }} >お手数ですが Google Chrome ブラウザでアクセスしてください。</Typography>
        </Grid>
      </Grid>
  </BaseContainer>
)

const SkeletonCompoent = () => (
  <BaseContainer>
      <Grid container>
        <Grid item xs>
          <Skeleton variant="rounded" width={80} height={30} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Space />

          <Text pl={2}>
            <Skeleton variant="rounded" width={370} height={23} />
          </Text>

          <Space />

          <Skeleton variant="rounded" width={200} height={25} />
          <Space />
          <Text pl={2}>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
          </Text>
          <Space />

          <Skeleton variant="rounded" width={200} height={25} />
          <Space />
          <Text pl={2}>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
          </Text>

          <Space />

          <Skeleton variant="rounded" width={200} height={25} />
          <Space />
          <Text pl={2}>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
            <Typography variant={"body1"}>
              <Skeleton />
            </Typography>
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
          <Skeleton variant="circular" width={30} height={30} />
        </Grid>
      </Grid>
    </BaseContainer>
)