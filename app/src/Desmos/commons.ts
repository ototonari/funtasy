const desmosApiHost = "https://www.desmos.com/api/v1.7/calculator.js"
const desmosApiKey = "dcb31709b452b1cf9dc26972add0fda6"
export const desmosApiUrl = `${desmosApiHost}?apiKey=${desmosApiKey}`

export const setScriptTagByDesmos = () => {
  const head = document.getElementsByTagName('head')[0] as HTMLElement;
    const scriptUrl = document.createElement('script');
    scriptUrl.src = desmosApiUrl
    head.appendChild(scriptUrl);
}
