import React from "react";
import { MathReadonly } from "./MathLive/MathReadonly";
import { StepByStep } from "./MathLive/StepByStep";

export type TeachProps = {
  concept: string; // 数と式
  articles: {
    title: string; // 指数の計算
    description: string; // テキストによる説明
    example: {
      // 参考問題
      formula: string; // 問題
      steps: string[]; // 途中経過
    };
  }[];
};

export const Teach: React.FC<TeachProps> = (props: TeachProps) => {
  const { concept, articles } = props;
  return (
    <div>
      <h3>{concept}</h3>
      {articles.map((article, index) => (
        <div key={index}>
          <h4 style={{ marginLeft: 20 }}>{article.title}</h4>
          <div>
            <p>{article.description}</p>
          </div>
          <div style={{ marginLeft: 40 }}>
            <label>問題</label>
            <div style={{ marginLeft: 20 }}>
              <MathReadonly formula={article.example.formula} />
            </div>
          </div>

          <div style={{ marginTop: 20 }}></div>

          <div style={{ marginLeft: 40 }}>
            <label>解答</label>

            <div style={{ marginLeft: 20 }}>
              <StepByStep steps={article.example.steps} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
