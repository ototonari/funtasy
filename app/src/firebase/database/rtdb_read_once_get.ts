import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());

const getData = (userId: string) => {
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
