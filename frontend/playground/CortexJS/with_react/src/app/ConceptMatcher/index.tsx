import React from "react";
import { CardBox } from "../AboutConcept/utils";
import { InstructionalCurriculumMap } from "../PersonalLearningStatus/InstructionalCurriculumMap";
import { descriptionMatcher } from "./conceptMatcher";

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

// 溶けなかった問題のプロパティ
type Props = {
  conceptId: number,
  level: number,
}

export const unresolveConcepts = (icm: InstructionalCurriculumMap, {conceptId, level}: Props) => {
  const unresolvedConceptLevels = icm.getPrerequisiteConceptByIdLevelAndStatus(conceptId, level);

  if (unresolvedConceptLevels.length === 0) return null;
  
  const conceptIds = new Set<number>();
  unresolvedConceptLevels.forEach((conceptLevel) => {
    const [id, level] = conceptLevel;
    conceptIds.add(id);
  })

  console.log("unresolvedConceptLevels", unresolvedConceptLevels)
  const conceptComponents = Array.from(conceptIds.values()).sort().map((conceptId, i) => (
    <CardBox key={i} >
      {descriptionMatcher(conceptId)}
    </CardBox>
  ));

  return conceptComponents
}

