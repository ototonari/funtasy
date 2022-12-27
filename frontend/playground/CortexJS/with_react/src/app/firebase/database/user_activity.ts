import { getDatabase, ref, child, get, set } from "firebase/database";

const path = "UserActivity";

export type UserActivityType = {
  sceneLog: SceneLog[];
  practiceLog: PracticeLog[];
}

type SceneLog = {
  name: string;
  start: Date;
  end: Date;
}

type PracticeLog = {
  conceptId: string;
  level: string;
  result: boolean;
  formula: string;
  modifiedAt: Date;
}

export const UserActivity = {
  get: async (uid: string): Promise<UserActivityType | null> => {
    const dbRef = ref(getDatabase());

    try {
      const snapshot = await get(child(dbRef, `${path}/${uid}`));

      if (snapshot.exists()) {
        const value = snapshot.val() as UserActivityType;
        console.log("info: UserActivity.get, snapshot: ", value);

        return value;
      } else {
        return null;
      }  
    } catch (error) {
      console.error("fail: UserActivity.get, ", error);
      return null;
    }
  },
  set: (uid: string, userActivity: UserActivityType) => {
    const db = getDatabase();

    return set(ref(db, `${path}/${uid}`), userActivity);
  }
}