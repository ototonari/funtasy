import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Debug, ICMStorage } from "../database/concepts/LocalStorage";
import { authState } from "../firebase/auth";
import { SetAuthStateListener } from "../firebase/auth/auth_state_listener";
import { icmState } from "../PersonalLearningStatus";
import { ICMRepository } from "../PersonalLearningStatus/InstructionalCurriculumMap";

/**
 * アプリ初期化時に呼ばれる
 */
export const useInitialize = () => {
  const [{icm}, setIcmState] = useRecoilState(icmState);
  const [{uid, state}, setAuthState] = useRecoilState(authState);

  useEffect(() => {
    // Debug.showStatus();

    if (icm === null) {
      // ICMの初期化. localStorageから状態の復元.
      console.log("start: icm initialize");
      const icm = ICMRepository.load();
      setIcmState({ icm });  
      console.log("end: icm initialize");
    }
  });

  useEffect(() => {
    console.log("start: auth initialize");
    const authUnsubscribe = SetAuthStateListener((uid) => {
      setAuthState({
        state: 'updated',
        uid: uid,
      })
      console.log("end: auth initialize");
    });

    return () => {
      authUnsubscribe();
    }
  })
};
