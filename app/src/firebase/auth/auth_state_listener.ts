import { onAuthStateChanged } from "firebase/auth";
import { FirebaseApps } from "..";

export const SetAuthStateListener = (callback?: (uid: string) => any) => {
  const {auth} = FirebaseApps;
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("anonymous user id: ", uid);

      if (!!callback) callback(uid);
  
      // ...
    } else {
      // User is signed out
      console.log("sign out.")
    }
  });
}