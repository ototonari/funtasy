import React from "react";
import { Warning } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { TestPracticeLog, TestPracticeLogProgress } from "./firebase/database/user_activity_test";
import { UserScore } from "./firebase/database/user_score";
import { TestUserScore } from "./firebase/database/user_score_test";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { ModalRouting } from "./ModalRouting";
import { Routing } from "./Routing";
import { BaseContainer } from "./Scenario/utils";
import { validBrowser } from "./utils/browserDetect";
import { VirtualKeyboardSpace } from "./MathLive/utils";

// TODO: デバッグが終了したら削除すること
// Debug.resetICM();
// Debug.resetGuide();
// TestUserScore().then(async () => {
//   const info = await UserScore.getStandardDeviationWithUserDeviation("test-1");
//   console.log(info);
// })

// TestPracticeLogProgress();

export const App = () => {
  // もし想定外のブラウザなら早期リターンで案内画面に遷移させる
  const isChromeBrowser = validBrowser();
  if (!isChromeBrowser) {
    return <WarningComponent />
  }

  return (
    <div>
      <Routing />
      <ModalRouting />
      {/* <MathWithLatex /> */}
      <VirtualKeyboardSpace />
    </div>
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
        <Typography variant="body2" style={{ padding: 10, backgroundColor: "rgb(235 235 235)", borderRadius: 5 }} >お手数ですが Windows 又は Mac の Google Chrome ブラウザでアクセスしてください。</Typography>
        </Grid>
      </Grid>
  </BaseContainer>
)
