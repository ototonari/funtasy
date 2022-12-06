import { atom } from "recoil";
import { InstructionalCurriculumMap } from "./InstructionalCurriculumMap";

// モーダルの遷移を考慮し、スタック型とする
type Props = {
  icm: InstructionalCurriculumMap
};

export const instructionalCurriculumMapState = atom<Props>({
  key: "InstructionalCurriculumMap",
  default: {
    icm: null
  },
});

/**
 * ICMを更新するヘルパー関数
 * Viewで用いる
 */
export const updateICM = () => {
  
}