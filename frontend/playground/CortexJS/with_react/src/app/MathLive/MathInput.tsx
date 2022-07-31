import React from 'react';
import { Base } from './Base';
import { createMfeElement } from './common';

export const MathInput: React.FC<{formula?: string}> = ({formula = ""}) => {
  const elm = createMfeElement(formula)

  return <Base htmlElement={elm} />
}
