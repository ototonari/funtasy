import { MathfieldElement } from "mathlive";

export const createMfeElement = (formula: string): MathfieldElement => {
  const mfe = new MathfieldElement();
  mfe.keypressSound = null;
  mfe.plonkSound = null;
  mfe.setOptions({
    virtualKeyboardMode: 'onfocus',
    virtualKeyboards: "numeric functions"
  });
  mfe.setAttribute("style", innerStyle);
  mfe.innerText = formula;
  document.body.style.setProperty("--keyboard-zindex", "3000");
  return mfe;
};

export const createMfeWithoutKeyboardElement = (formula: string): MathfieldElement => {
  const mfe = new MathfieldElement();
  mfe.keypressSound = null;
  mfe.plonkSound = null;
  mfe.setAttribute("style", innerStyle);
  mfe.innerText = formula;
  return mfe;
};

const innerStyle = `
vertical-align: middle;
border-radius: 4px;
border: 1px solid rgba(0, 0, 0, .3);
padding-left: 10px;
max-width: 300px;
`;

export const createReadonlyMfeElement = (formula: string): MathfieldElement => {
  const mfe = new MathfieldElement();
  mfe.keypressSound = null;
  mfe.plonkSound = null;
  mfe.setAttribute("read-only", "");
  mfe.setAttribute("style", readOnlyStyle);
  mfe.innerText = formula;
  return mfe;
};

const readOnlyStyle = `
display:inline-block;
`

/**
 * 主に文字情報に数式を用いる場合に利用する
 * @param formula 
 * @returns 
 */
export const createReadonlyInlineMfeElement = (formula: string): MathfieldElement => {
  const mfe = new MathfieldElement();
  mfe.keypressSound = null;
  mfe.plonkSound = null;
  mfe.setAttribute("read-only", "");
  mfe.setAttribute("style", inlineStyle);
  mfe.innerText = formula;
  return mfe;
};

const inlineStyle = `
display:inline;
`
