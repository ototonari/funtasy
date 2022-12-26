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
        console.log("info: UserScore.get, snapshot: ", value);

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
  
  }
}