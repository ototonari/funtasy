import React from "react";
import { Debug } from "./database/concepts/LocalStorage";
import { MathWithLatex } from "./MathLive/MathWithLatex";
import { ModalRouting } from "./ModalRouting";
import { Routing } from "./Routing";

// TODO: デバッグが終了したら削除すること
Debug.resetICM();
Debug.resetGuide();

export const App = () => {

  return (
    <div>
      <Routing />
      <ModalRouting />
      {/* <MathWithLatex /> */}
    </div>
  );
};
