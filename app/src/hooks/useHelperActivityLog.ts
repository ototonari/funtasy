import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../firebase/auth";
import { SceneName, UserActivity } from "../firebase/database/user_activity";
import { getTimeStr } from "../utils/datetimeHelper";

export const useHelperActiveScene = (sceneName: SceneName) => {
  const { uid, state } = useRecoilValue(authState);

  useEffect(() => {
    if (state === "init") {
      throw new Error("useHelperActiveScene: invalid call.");
    }
    const presetLog = UserActivity.addScene(uid, sceneName, getTimeStr());
    // console.log("start",  getTimeStr());

    return () => {
      presetLog( getTimeStr());
      // console.log("end",  getTimeStr());
    };
  });
};
