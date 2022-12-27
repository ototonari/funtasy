import { atom } from "recoil";
import { InstructionalCurriculumMap } from "./InstructionalCurriculumMap";

// モーダルの遷移を考慮し、スタック型とする
type Props = {
  icm: InstructionalCurriculumMap,
};

export const icmState = atom<Props>({
  key: "InstructionalCurriculumMap",
  default: {
    icm: null
  },
});
