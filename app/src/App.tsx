import React from "react";
import { Debug } from "./database/concepts/LocalStorage";
import { TestPracticeLog, TestPracticeLogProgress } from "./firebase/database/user_activity_test";
import { UserScore } from "./firebase/database/user_score";
import { TestUserScore } from "./firebase/database/user_score_test";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { ModalRouting } from "./ModalRouting";
import { Routing } from "./Routing";
import { validBrowser } from "./utils/browserDetect";

// TODO: デバッグが終了したら削除すること
// Debug.resetICM();
// Debug.resetGuide();
// TestUserScore().then(async () => {
//   const info = await UserScore.getStandardDeviationWithUserDeviation("test-1");
//   console.log(info);
// })

// TestPracticeLogProgress();

validBrowser();

export const App = () => {

  return (
    <div>
      <Routing />
      <ModalRouting />
      {/* <MathWithLatex /> */}
      <VirtualKeyboardSpace />
    </div>
  );
};

// 仮想キーボードにより画面の縦方向に強制的にスペースが増され、消える時にスクロールダウンするのを防ぐためのスペーサー
const VirtualKeyboardSpace = () => (
  <div style={{ height: 300}} />
)