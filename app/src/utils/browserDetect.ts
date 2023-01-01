export const isChrome = () => {
  const _isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  console.log(_isChrome);
  return true;
};
