import { getDatabase, ref, child, get, set } from "firebase/database";

const path = "UserInfo";

export type UserInfoType = {
  gender: string
  age: string
}

export const UserInfo = {
  get: async (uid: string): Promise<UserInfoType | null> => {
    const dbRef = ref(getDatabase());

    try {
      const snapshot = await get(child(dbRef, `${path}/${uid}`));

      if (snapshot.exists()) {
        const value = snapshot.val() as UserInfoType;
        console.log("info: UserInfo.get, snapshot: ", value);

        return value;
      } else {
        return null;
      }  
    } catch (error) {
      console.error("fail: UserInfo.get, ", error);
      return null;
    }
  },
  set: (uid: string, userInfo: UserInfoType) => {
    const db = getDatabase();

    return set(ref(db, `${path}/${uid}`), userInfo);
  }
}