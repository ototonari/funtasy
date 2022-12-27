import { getDatabase, ref, set } from "firebase/database";

export const writeUserData = (userId: string) => {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    hello: "world",
  });
};
