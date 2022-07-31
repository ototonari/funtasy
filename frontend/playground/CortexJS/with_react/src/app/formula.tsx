import React, { useEffect, useRef } from 'react';
import { MathfieldElement} from 'mathlive';

export const Formula = () => {
  const ref = useRef(null);

  useEffect(() => {
    const mfe = createMFE("x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}")

    ref.current.appendChild(mfe);
  }, []);

  return <div ref={ref} />
}

function createHtml() {
  return {
    __html: "<p>hogehoge</p>"
  }
}

function Hoge() {
  return <div dangerouslySetInnerHTML={createHtml()}/>
}

function createMFEComponent() {
  return {
    __html: `
<math-field>
  x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}
</math-field>
    `
  }
}

function DirectHtmlFormula() {
  return <div dangerouslySetInnerHTML={createMFEComponent()} />
}

const createMFE = (formula: string) => {
  const mfe = new MathfieldElement();
  mfe.setAttribute("virtual-keyboard-mode", "manual")
  mfe.setAttribute("style", innerStyle)
  mfe.innerText= formula
  return mfe
}

const innerStyle = `
style="
vertical-align: middle;
border-radius: 4px;
border: 1px solid rgba(0, 0, 0, .3);
padding-left: 10px; padding-top: 10px;
max-width: 300px;
height: 50px;
margin-left: 250px;

"
`
