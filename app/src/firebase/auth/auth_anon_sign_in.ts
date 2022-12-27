import { getAuth, signInAnonymously } from "firebase/auth";
import { FirebaseApps } from "..";

export const authAnonymously = () => {
  const {auth} = FirebaseApps;

  signInAnonymously(auth)
    .then(() => {
      console.log("sign in anonymously.")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("error code: ", errorCode, " error message: ", errorMessage);
    });
}