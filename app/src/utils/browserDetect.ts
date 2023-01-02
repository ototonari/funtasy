import {isChrome, isChromium} from 'react-device-detect'

// 正常に動作するブラウザかどうかを判別する
export const validBrowser = () => {
  const isValid = isChrome || isChromium;
  console.log("validBrowser: ", isValid);
  return isValid;
};
