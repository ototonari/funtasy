import React from 'react';
import { Base } from './Base';
import { createReadonlyMfeElement } from './common';

export const MathReadonly: React.FC<{formula?: string}> = ({formula = ""}) => {
  const elm = createReadonlyMfeElement(formula)

  return <Base htmlElement={elm} />
}
