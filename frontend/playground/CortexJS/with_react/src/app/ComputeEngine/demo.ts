import { ComputeEngine } from "@cortex-js/compute-engine";

export const Demo = () => {
  const ce = new ComputeEngine();

  console.log(ce.parse("e^{i\\pi}").N().latex);
  console.log(ce.parse("x=5+6").evaluate().latex);
  console.log(ce.box(['Add', 3, 'x']).evaluate().latex)
};
