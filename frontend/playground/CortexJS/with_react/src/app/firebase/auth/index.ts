import { atom } from "recoil";

// モーダルの遷移を考慮し、スタック型とする
type Props = {
  state: 'init' | 'updated';
  uid: string,
};

export const authState = atom<Props>({
  key: "auth",
  default: {
    state: 'init',
    uid: "",
  },
});
