import { ComputeEngine } from "@cortex-js/compute-engine";

export const Demo = () => {
  const ce = new ComputeEngine();

  console.log(ce.parse("e^{i\\pi}").N().latex);
};
