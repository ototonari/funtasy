import React from "react";
import { authAnonymously } from "./firebase/auth/auth_anon_sign_in";
import { TestUserScore } from "./firebase/database/user_score_test";
import { useInitialize } from "./hooks/useInitialize";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { ModalRouting } from "./ModalRouting";
import { Routing } from "./Routing";

authAnonymously();
TestUserScore();

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
