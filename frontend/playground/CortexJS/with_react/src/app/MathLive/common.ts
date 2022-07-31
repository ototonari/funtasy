import { MathfieldElement } from "mathlive";

export const createMfeElement = (formula: string): MathfieldElement => {
  const mfe = new MathfieldElement();
  mfe.setAttribute("virtual-keyboard-mode", "manual");
  mfe.setAttribute("style", innerStyle);
  mfe.innerText = formula;
  return mfe;
};

const innerStyle = `
style="
vertical-align: middle;
border-radius: 4px;
border: 1px solid rgba(0, 0, 0, .3);
padding-left: 10px; padding-top: 10px;
max-width: 300px;
height: 50px;

"`;

export const createReadonlyMfeElement = (formula: string): MathfieldElement => {
  const mfe = new MathfieldElement();
  // mfe.setAttribute("read-only", "");
  mfe.setAttribute("style", readOnlyStyle);
  mfe.innerText = formula;
  return mfe;
};

const readOnlyStyle = `
display:inline-block;
`