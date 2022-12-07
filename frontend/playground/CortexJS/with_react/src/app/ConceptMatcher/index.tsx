/**
 * ICMやScoreの情報を用いて、コンセプト表示に重みづけを行いたい。
 * 例
 * - 学ぶべきコンセプト = 通常のカラー
 * - もう学習したと思われるコンセプト = グレーアウト的なニュアンス
 * 
 * また、学ぶべきコンセプトと、その優先度を表現する。
 * 具体例としては、コンセプトViewの配列が考えられる。
 * 配列の上位は優先度が高く、後ろは優先度が低い。
 * またそもそも関係のないコンセプトは返却しないようにする。
 * 
 */

import React from "react";
import { About101 } from "../AboutConcept/101";
import { About39 } from "../AboutConcept/39";
import { About4 } from "../AboutConcept/4";
import { About43 } from "../AboutConcept/43";
import { Concept, InstructionalCurriculumMap } from "../PersonalLearningStatus/InstructionalCurriculumMap";

// 溶けなかった問題のプロパティ
type Props = {
  conceptId: string,
  level: number,
}

const unresolveConcepts = (icm: InstructionalCurriculumMap, {conceptId, level}: Props) => {
  const unresolvedConceptLevels = icm.getPrerequisiteConceptByIdLevelAndStatus(conceptId, level);
  const conceptIds = new Set<string>();
  unresolvedConceptLevels.forEach((conceptLevel) => {
    const [id, level] = conceptLevel.split("-");
    conceptIds.add(id);
  })
  const concepts = Array.from(conceptIds.values()).map(conceptMatcher);

}

export const conceptMatcher = (conceptId: string) => {
  switch (conceptId) {
    case Concept.因数分解:
      return <About4 />
    case Concept["2次方程式の解とその判別"]:
      return <About39 />
    case Concept["2次不等式"]:
      return <About43 />
    case Concept.解の公式:
      return <About101 />  
  default:
      return null;
  }
}
