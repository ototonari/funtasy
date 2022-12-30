import { getDatabase, ref, child, get, set, runTransaction } from "firebase/database";

const path = "UserScore";

export type UserScoreType = {
  score: {
    denominator: number, // 分母
    molecule: number // 分子
  },
  answers: {
    conceptId: number,
    level: number,
    result: boolean,
  }[]
}

export type UserScoresType = {
  [key: string]: UserScoreType[]
}

export type TestResultInfoType = {
  userDeviation: number
  standardDeviation: number
  allTestAvarage: number
  ownBestScore: UserScoreType["score"],
  ownScores: UserScoreType[],
}

const emptyScore: UserScoreType = {
  score: {
    denominator: 0,
    molecule: 0,
  },
  answers: [],
}

// スコアの最大値を抽出する
export const extractHighestScore = (scores: UserScoreType["score"][]): UserScoreType["score"] => {
  return scores.sort((a, b) => a.molecule > b.molecule ? -1 : 1 )[0]
}

const getHighestScore = async (uid: string): Promise<UserScoreType["score"] | null> => {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `${path}/${uid}`));

    if (!snapshot.exists()) {
      return null;
    }

    const userScores = snapshot.val() as UserScoreType[];
    if (userScores.length === 0) {
      return null;
    }

    const scores = userScores.map((userScore) => userScore.score);

    const highestScore = extractHighestScore(scores);

    return highestScore;
  } catch (error) {
    console.error("fail: getHighestScore, ", error);
    return null;
  }
}

export const calculateStandardDeviationWithUserDeviation = (usersScore: UserScoresType, uid: string): TestResultInfoType => {
      // ユーザーID毎にスコアを格納する Map
      const userScoreMap = new Map<string, UserScoreType[]>();
      Object.entries(usersScore).map(([key, value]) => userScoreMap.set(key, value));
  
      // 自分のスコア
      const ownScores = userScoreMap.has(uid) ? userScoreMap.get(uid) : [emptyScore];
      // 自分の最高スコア
      const ownBestScore = extractHighestScore(ownScores.map((v) => v.score));
  
      // テスト全体の平均点
      let testCount = 0;
      let testSumScore = 0;
      userScoreMap.forEach((value) => {
        testCount += 1;
        // ユーザー毎に最高得点のスコアを取得する。
        testSumScore += extractHighestScore(value.map((v) => v.score)).molecule;
      });
      const allTestAvarage = Math.ceil((testSumScore / testCount) * 100) / 100;
      // console.log("testCount: ", testCount);
      // console.log("testSumScore: ", testSumScore);
      // console.log("allTestAvarage: ", allTestAvarage);
  
      // 平均点との差
      const diffAvgScore = ownBestScore.molecule - allTestAvarage;
      // console.log("diffAvgScore: ", diffAvgScore);
  
      // 分散を求める
      let AllUserDiffAvgScoreToSquared = 0;
      userScoreMap.forEach((userScores) => {
        const userBestScore = extractHighestScore(userScores.map((v) => v.score));
        const diffAvgScoreToSquared = (userBestScore.molecule - allTestAvarage)**2;
        // console.log("diffAvgScoreToSquared: ", diffAvgScoreToSquared);

        AllUserDiffAvgScoreToSquared += diffAvgScoreToSquared;
      });
      const decentralization = AllUserDiffAvgScoreToSquared / testCount;
      // console.log("AllUserDiffAvgScoreToSquared: ", AllUserDiffAvgScoreToSquared);
      // console.log("decentralization: ", decentralization);
  
      // 標準偏差
      const standardDeviation = Math.ceil(Math.sqrt(decentralization) * 100) / 100;
      // console.log("standardDeviation: ", standardDeviation);
  
      // 偏差値を求める
      //  平均との差に10をかけて標準偏差で割る
      const dividedStandardDeviation = diffAvgScore * 10 / standardDeviation;
      //  偏差値
      const userDeviation = Math.ceil((dividedStandardDeviation + 50) * 100) / 100;
      // console.log("userDeviation: ", userDeviation);
  
      return {
        userDeviation,
        standardDeviation,
        allTestAvarage,
        ownBestScore,
        ownScores,
      }  
}

const getStandardDeviationWithUserDeviation = async (uid: string): Promise<TestResultInfoType> => {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `${path}`));

    if (!snapshot.exists()) {
      return null;
    }

    const userScores = snapshot.val() as UserScoresType;
    if (Object.keys(userScores).length === 0) {
      return null;
    }

    const info = calculateStandardDeviationWithUserDeviation(userScores, uid);

    return info;
  } catch (error) {
    console.error("fail: getHighestScore, ", error);
    return null;
  }
}

export const measuringConceptComprehension = (answers: UserScoreType["answers"]): Map<number, number> => {
  // IDごとに正解の配列を作成する
  const conceptResultsMap = new Map<number, boolean[]>();
  answers.forEach(({conceptId, result}) => {
    if (conceptResultsMap.has(conceptId)) {
      const newValue = [
        ...conceptResultsMap.get(conceptId),
        result,
      ];

      conceptResultsMap.set(conceptId, newValue);
    } else {
      conceptResultsMap.set(conceptId, [result]);
    }
  })

  // IDごとに正解率を算出する
  const comprehensionMap = new Map<number, number>();
  conceptResultsMap.forEach((results, id) => {
    const count = results.length;
    const trueCount = results.filter((r) => r).length;
    const truePercent = Math.floor((trueCount / count) * 100);
    comprehensionMap.set(id, truePercent);
  })

  return comprehensionMap;
}

export const UserScore = {
  init: async (uid: string) => {
    const db = getDatabase();
    await set(ref(db, `${path}/${uid}`), []);
  },

  get: async (uid: string): Promise<UserScoreType[]> => {
    const dbRef = ref(getDatabase());

    try {
      const snapshot = await get(child(dbRef, `${path}/${uid}`));

      if (snapshot.exists()) {
        const value = snapshot.val() as UserScoreType[];
        // console.log("info: UserScore.get, snapshot: ", value);

        return value;
      } else {
        return [];
      }  
    } catch (error) {
      console.error("fail: UserScore.get, ", error);
      return [];
    }
  },

  appendScore: async (uid: string, userScore: UserScoreType) => {
    const dbRef = ref(getDatabase(), `${path}/${uid}`);

    return runTransaction(dbRef, (userScores: UserScoreType[]) => {
      if (userScores !== null && userScores.length > 0) {
        // 2回目以降の更新処理
        const newScores = [...userScores, userScore]; // 末端に追加する
        return newScores;
      } else {
        // 初回の更新処理
        const newScores = [userScore];
        return newScores
      }
    });
  },

  getHighestScore: getHighestScore,
  getStandardDeviationWithUserDeviation,
}