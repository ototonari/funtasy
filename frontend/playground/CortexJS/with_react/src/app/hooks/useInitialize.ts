import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Debug, ICMStorage } from "../database/concepts/LocalStorage";
import { icmState } from "../PersonalLearningStatus";
import { ICMRepository, InstructionalCurriculumMap } from "../PersonalLearningStatus/InstructionalCurriculumMap";

/**
 * アプリ初期化時に呼ばれる
 */
export const useInitialize = () => {
  const [, setIcmState] = useRecoilState(icmState);

  useEffect(() => {
    Debug.resetICM();
    // ICMを利用するための初期化
    // localStorageから状態の復元
    const icm = ICMRepository.load();
    setIcmState({ icm });

    Debug.showStatus();
  }, []);
};
