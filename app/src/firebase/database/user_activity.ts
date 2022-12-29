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

type PracticeLog = {
  conceptId: string;
  level: string;
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
  const dbRef = ref(getDatabase(), `${path}/${uid}`);

  runTransaction(dbRef, (userActivity: UserActivityType) => {
    if (userActivity !== null) {
      // 2回目以降の更新処理
      const newValue = {
        ...userActivity,
        sceneLog: [...userActivity.sceneLog, sceneLog],
      };

      return newValue;
    } else {
      // 初回の更新処理
      const newValue = {
        ...initValue,
        sceneLog: [sceneLog],
      };

      return newValue;
    }
  });
};

const updatePractice = async (
  uid: string,
  practiceLog: PracticeLog
): Promise<void> => {
  const dbRef = ref(getDatabase(), `${path}/${uid}`);

  runTransaction(dbRef, (userActivity: UserActivityType) => {
    if (userActivity !== null) {
      // 2回目以降の更新処理
      const newValue = {
        ...userActivity,
        practiceLog: [...userActivity.practiceLog, practiceLog],
      };

      return newValue;
    } else {
      // 初回の更新処理
      const newValue = {
        ...initValue,
        practiceLog: [practiceLog],
      };

      return newValue;
    }
  });
};

export const UserActivity = {
  addScene: (
    uid: string,
    sceneName: SceneName,
    start: string
  ) => async (end: string) => {
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

  addPractice: async (
    uid: string,
    conceptId: string,
    level: string,
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
};
