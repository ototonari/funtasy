import React from "react";
import { Debug } from "./database/concepts/LocalStorage";
// import { authAnonymously } from "./firebase/auth/auth_anon_sign_in";
import { TestUserScore } from "./firebase/database/user_score_test";
import { useInitialize } from "./hooks/useInitialize";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { ModalRouting } from "./ModalRouting";
import { Routing } from "./Routing";

// TODO: デバッグが終了したら削除すること
Debug.resetICM();
Debug.resetGuide();

// authAnonymously();
// TestUserScore();

console.log("REACT_APP_FIREBASE_PROJECT_ID", process.env.REACT_APP_FIREBASE_PROJECT_ID)

export const App = () => {
  useInitialize();

  return (
    <div>
      <Routing />
      <ModalRouting />
      {/* <MathWithLatex /> */}
    </div>
  );
};
