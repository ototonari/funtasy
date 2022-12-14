import { Grid, Typography, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Space, Text } from "./AboutConcept/utils";
import { authState } from "./firebase/auth";
import { authAnonymously } from "./firebase/auth/auth_anon_sign_in";
import { SetAuthStateListener } from "./firebase/auth/auth_state_listener";
import { icmState } from "./PersonalLearningStatus";
import { ICMRepository } from "./PersonalLearningStatus/InstructionalCurriculumMap";
import { routeState } from "./Routing";
import { BaseContainer } from "./Scenario/utils";

export const Initialize: React.FC<{}> = () => {
  const [{icm}, setIcmState] = useRecoilState(icmState);
  const [{state}, setAuthState] = useRecoilState(authState);
  const [, setRoute] = useRecoilState(routeState);
  const setGuideStatus = () => {
    setRoute("guide");
  };

  useEffect(() => {
      // ICMの初期化. localStorageから状態の復元.
      console.log("start: icm initialize");

      const icm = ICMRepository.load();
      setIcmState({ icm });  

      console.log("end: icm initialize");
  }, []);

  // ユーザーの匿名サインアップ処理
  useEffect(() => {
    // ログインリスナーの作成
    const authUnsubscribe = SetAuthStateListener((uid) => {
      setAuthState({
        state: 'updated',
        uid: uid,
      })
      console.log("update: auth initialize");
    });

    // ログイン状態が初期値ならログイン処理を発火
    if (state === "init") {
      console.log("first: auth initialize");
      authAnonymously()
    }

    return () => {
      authUnsubscribe();
      console.log("done: auth initialize");
    }
  }, [state])

  useEffect(() => {
    if (icm !== null && state === "updated") {
      console.log("done: all initialize");
      setGuideStatus();
    }

  }, [icm, state])

  
  return (
    <SkeletonCompoent />
  );
};

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