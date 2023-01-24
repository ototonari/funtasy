import { getDatabase, ref, child, get, set } from "firebase/database";

const path = "UserInfo";

export type UserInfoType = {
  gender: string
  age: string
  haveTakenClasses: boolean,
  confidence: number,
  goodSubjects: string[],
  notGoodSubjects: string[],
}

type UserInfosType = {
  [key: string]: UserInfoType;
}

const surveyInfos = async () => {
  try {
    const dbRef = ref(getDatabase());

    const snapshot = await get(child(dbRef, `${path}`));

    if (!snapshot.exists()) {
      return
    }

    const value = snapshot.val() as UserInfosType;

    // ユーザーID毎にログを格納する Map
    const userInfoMap = new Map<string, UserInfoType>();
    Object.entries(value).map(([key, value]) => userInfoMap.set(key, value));
    
    const ageMap = new Map<string, number>();
    const genderMap = new Map<string, number>();
    const goodMap = new Map<string, number>();
    const notGoodMap = new Map<string, number>();
    let haveTakenClassesCount = 0;
    let haveNotTakenClassesCount = 0;

    userInfoMap.forEach((info) => {
      if (!ageMap.has(info.age)) {
        ageMap.set(info.age, 1);
      } else {
        ageMap.set(info.age, ageMap.get(info.age) + 1);
      }
      if (!genderMap.has(info.gender)) {
        genderMap.set(info.gender, 1);
      } else {
        genderMap.set(info.gender, genderMap.get(info.gender) + 1);
      }

      if (!!info.goodSubjects) {
        info.goodSubjects.forEach((v) => {
          if (!goodMap.has(v)) {
            goodMap.set(v, 1);
          } else {
            goodMap.set(v, goodMap.get(v) + 1);
          }
        })
      }

      if (!!info.notGoodSubjects) {
        info.notGoodSubjects.forEach((v) => {
          if (!notGoodMap.has(v)) {
            notGoodMap.set(v, 1);
          } else {
            notGoodMap.set(v, notGoodMap.get(v) + 1);
          }
        })
      }

      if (info.haveTakenClasses) {
        haveTakenClassesCount += 1;
      } else {
        haveNotTakenClassesCount += 1;
      }
    })

    // ageMap.forEach((v, k) => console.log(k, v));
    // genderMap.forEach((v, k) => console.log(k, v));
    // goodMap.forEach((v, k) => console.log(k, v));
    notGoodMap.forEach((v, k) => console.log(k, v));

    console.log("haveTakenClassesCount: ", haveTakenClassesCount);
    console.log("haveNotTakenClassesCount: ", haveNotTakenClassesCount);

  } catch (error) {
    console.error("fail: UserInfo.get, ", error);
    return;
  }
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
  },
  surveyInfos,

}