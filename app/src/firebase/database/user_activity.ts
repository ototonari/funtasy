import {
  getDatabase,
  ref,
  child,
  get,
  DatabaseReference,
  runTransaction,
} from "firebase/database";
import { getTimeStr } from "../../utils/datetimeHelper";

const path = "UserActivity";
const sceneLogKey = "sceneLog";
const practiceLogKey = "practiceLog";

export type UserActivityType = {
  sceneLog: SceneLog[];
  practiceLog: PracticeLog[];
};

export type SceneName = string;

type SceneLog = {
  name: SceneName;
  start: string;
  end: string;
};

export type PracticeLog = {
  conceptId: number;
  level: number;
  result: boolean;
  formula: string;
  modifiedAt: string;
};

const initValue: UserActivityType = {
  sceneLog: [],
  practiceLog: [],
};

const getActiveLog = async (
  uid: string,
  ref: DatabaseReference
): Promise<UserActivityType> => {
  try {
    const snapshot = await get(child(ref, `${path}/${uid}`));
    if (snapshot.exists()) {
      const value = snapshot.val() as UserActivityType;

      return value;
    } else {
      return initValue;
    }
  } catch (error) {
    return initValue;
  }
};

const updateScene = async (uid: string, sceneLog: SceneLog): Promise<void> => {
  const dbRef = ref(getDatabase(), `${path}/${uid}/${sceneLogKey}`);

  runTransaction(dbRef, (prevScene: UserActivityType["sceneLog"]) => {
    if (prevScene !== null) {
      // 2回目以降の更新処理
      const newScene = [...prevScene, sceneLog];
      return newScene;
    } else {
      // 初回の更新処理
      return [sceneLog];
    }
  });
};

const getPracticeLog = async (uid: string) => {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(
      child(dbRef, `${path}/${uid}/${practiceLogKey}`)
    );

    if (!snapshot.exists()) {
      return null;
    }

    const practiceLog = snapshot.val() as UserActivityType["practiceLog"];
    return practiceLog;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const updatePractice = async (
  uid: string,
  practiceLog: PracticeLog
): Promise<void> => {
  const dbRef = ref(getDatabase(), `${path}/${uid}/${practiceLogKey}`);

  runTransaction(dbRef, (prevLog: UserActivityType["practiceLog"]) => {
    // 初回の更新処理
    if (prevLog == null) {
      return [practiceLog];
    }

    // 今までに同じ問題に対して回答していた場合
    if (prevLog.some((l) => l.formula === practiceLog.formula)) {
      const newLog = prevLog.map((l) => {
        // 同じ問題のみ、新しい情報に更新する
        if (l.formula === practiceLog.formula && l.result !== true) {
          return practiceLog;
        } else {
          return l;
        }
      });

      return newLog;
    } else {
      // 新しい問題を回答していた場合
      const newLog = [...prevLog, practiceLog];
      return newLog;
    }
  });
};

export const UserActivity = {
  addScene:
    (uid: string, sceneName: SceneName, start: string) =>
    async (end: string) => {
      try {
        const sceneLog: SceneLog = {
          name: sceneName,
          start,
          end,
        };

        await updateScene(uid, sceneLog);
      } catch (error) {
        console.error("fail: UserActivity.addScene, ", error);
      }
    },

  upsertPractice: async (
    uid: string,
    conceptId: number,
    level: number,
    result: boolean,
    formula: string
  ) => {
    try {
      const practiceLog: PracticeLog = {
        conceptId,
        level,
        result,
        formula,
        modifiedAt: getTimeStr(),
      };

      await updatePractice(uid, practiceLog);
    } catch (error) {
      console.error("fail: UserActivity.addPractice, ", error);
    }
  },

  getPracticeLog,
};
