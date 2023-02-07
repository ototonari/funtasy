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

type UserActivitiesType = {
  [key: string]: UserActivityType;
}

const surveyInfos = async () => {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(
      child(dbRef, `${path}`)
    );

    if (!snapshot.exists()) {
      return
    }

    const userActivities = snapshot.val() as UserActivitiesType;

    // ユーザーID毎にログを格納する Map
    const userActiveMap = new Map<string, UserActivityType>();
    Object.entries(userActivities).map(([key, value]) => userActiveMap.set(key, value));

    let totalUserCount = 0;
    let serveyCount = 0;
    let testFirst = 0;
    let testDoing = 0;
    let testFinal = 0;
    let seeStudyContents = 0;
    let usePractice = 0;
    let useResult = 0;

    userActiveMap.forEach(({sceneLog, practiceLog}, uid) => {

      totalUserCount += 1;
      if (practiceLog !== null) {
        usePractice += 1;
      }
      if (sceneLog !== null) {
        if (sceneLog.some((v) => v.name.includes("concept"))) {
          seeStudyContents += 1;
        }
        if (sceneLog.some((v) => v.name === "questionnaire")) {
          serveyCount += 1;
        }
        if (sceneLog.some((v) => v.name === "test:init")) {
          testFirst += 1;
        }
        if (sceneLog.some((v) => v.name === "test:started")) {
          testDoing += 1;
        }
        if (sceneLog.some((v) => v.name === "test:done")) {
          testFinal += 1;
        }
        if (sceneLog.some((v) => v.name === "result")) {
          useResult += 1;
        }  
      }
    })

    console.log("totalUserCount: ", totalUserCount);
    console.log("serveyCount: ", serveyCount);
    console.log("testFirst: ", testFirst);
    console.log("testDoing: ", testDoing);
    console.log("testFinal: ", testFinal);
    console.log("seeStudyContents: ", seeStudyContents);
    // console.log("usePractice: ", usePractice);
    console.log("useResult: ", useResult);
    
  } catch (error) {
    console.error(error);
  }
}

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
  surveyInfos,
};
