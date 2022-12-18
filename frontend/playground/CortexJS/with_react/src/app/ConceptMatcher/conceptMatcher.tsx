import React from "react";
import { About1Description } from "../AboutConcept/1";
import { About101, About101Description } from "../AboutConcept/101";
import { About3Description } from "../AboutConcept/3";
import { About39 } from "../AboutConcept/39";
import { About4, About4Description } from "../AboutConcept/4";
import { About43 } from "../AboutConcept/43";
import { Concept } from "../PersonalLearningStatus/InstructionalCurriculumMap";

export const conceptMatcher = (conceptId: number) => {
  switch (conceptId) {
    case Concept.因数分解:
      return <About4 />;
    case Concept["2次方程式の解とその判別"]:
      return <About39 />;
    case Concept["2次不等式"]:
      return <About43 />;
    case Concept.解の公式:
      return <About101 />;
    default:
      return null;
  }
};

export const descriptionMatcher = (conceptId: number): React.ReactNode | null => {
  switch (conceptId) {
    case Concept.数と式:
      return <About1Description />;
    case Concept.式の展開:
      return <About3Description />;
    case Concept.因数分解:
      return <About4Description />;
    case Concept["2次方程式の解とその判別"]:
      return null;
    case Concept.解の公式:
      return <About101Description />;
    default:
      return null;
  }
};
