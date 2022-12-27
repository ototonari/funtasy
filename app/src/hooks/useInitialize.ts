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
  const [, setIcmState] = useRecoilState(icmState);
  const [, setAuthState] = useRecoilState(authState);

  useEffect(() => {
    // Debug.resetICM();
    // Debug.resetGuide();

    // ICMを利用するための初期化
    // localStorageから状態の復元
    const icm = ICMRepository.load();
    setIcmState({ icm });

    Debug.showStatus();

    const authUnsubscribe = SetAuthStateListener((uid) => {
      setAuthState({
        state: 'updated',
        uid: uid,
      })
    });

    return () => {
      authUnsubscribe();
    }
  }, []);
};
