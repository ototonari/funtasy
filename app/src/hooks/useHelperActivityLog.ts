import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../firebase/auth";
import { PracticeLog, SceneName, UserActivity } from "../firebase/database/user_activity";
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

export const useHelperActivePractice = (conceptId: number, level: number, formula: string, result: boolean) => {
  const { uid, state } = useRecoilValue(authState);

  useEffect(() => {
    if (state === "init") {
      throw new Error("useHelperActiveScene: invalid call.");
    }
    UserActivity.upsertPractice(uid, conceptId, level, result, formula)
  });
}