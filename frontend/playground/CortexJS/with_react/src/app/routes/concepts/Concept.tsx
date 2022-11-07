import React from "react";
import { Link } from "react-router-dom";
import { useTracking } from "../../hooks/useTracking";
import { Practice } from "../../MathLive/Practice";
import { Teach as TeachComponent, TeachProps } from "../../Teach";

export const Concept: React.FC = (props) => {

  const teachProps: TeachProps = {
    concept: "数と式",
    articles: [
      {
        title: "指数の計算",
        description: "",
        example: {
          formula: "a^2b * ab^3",
          steps: ["= a^{2+1}b^{1+3}", "= a^3b^4"],
        },
      },
    ],
  };
  return (
    <div>
      <TeachComponent {...teachProps} />

      <Practice question="a^2b * ab^3" />
    </div>
  );
};
