import React from "react";
import { Debug } from "./database/concepts/LocalStorage";
import { TestPracticeLog, TestPracticeLogProgress } from "./firebase/database/user_activity_test";
import { UserScore } from "./firebase/database/user_score";
import { TestUserScore } from "./firebase/database/user_score_test";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { ModalRouting } from "./ModalRouting";
import { Routing } from "./Routing";

// TODO: デバッグが終了したら削除すること
// Debug.resetICM();
// Debug.resetGuide();
// TestUserScore().then(async () => {
//   const info = await UserScore.getStandardDeviationWithUserDeviation("test-1");
//   console.log(info);
// })

TestPracticeLogProgress();

export const App = () => {

  return (
    <div>
      <Routing />
      <ModalRouting />
      {/* <MathWithLatex /> */}
    </div>
  );
};
