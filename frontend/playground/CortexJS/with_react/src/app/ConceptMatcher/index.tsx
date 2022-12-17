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

export const prerequisiteConcepts = (icm: InstructionalCurriculumMap, {conceptId, level}: Props) => {
  const allPrerequisiteConcepts = icm.getAllPrerequisiteConceptsByIdLevel(conceptId, level);
  const allPrerequisiteConceptIds = new Set<number>();
  allPrerequisiteConceptIds.add(conceptId);

  allPrerequisiteConcepts.forEach((conceptLevel) => {
    const [id, level] = conceptLevel;
    allPrerequisiteConceptIds.add(id);
  })

  const conceptComponents = Array.from(allPrerequisiteConceptIds.values()).sort().map((conceptId, i) => {
    const elm = descriptionMatcher(conceptId);
    if (elm === null) return null;
    else return (
      <CardBox key={i}>
        {descriptionMatcher(conceptId)}
      </CardBox>
    )
  });

  return conceptComponents;
}

export const unresolveConcepts = (icm: InstructionalCurriculumMap, {conceptId, level}: Props) => {
  // 全ての前提条件を取得する
  const allPrerequisiteConcepts = icm.getAllPrerequisiteConceptsByIdLevel(conceptId, level);
  console.log("allPrerequisiteConcepts", allPrerequisiteConcepts);
  const allPrerequisiteConceptIds = new Set<number>();
  allPrerequisiteConcepts.forEach((conceptLevel) => {
    const [id, level] = conceptLevel;
    allPrerequisiteConceptIds.add(id);
  })

  // 学習者が不足している前提条件を取得する
  const unresolvedConceptLevels = icm.getPrerequisiteConceptByIdLevelAndStatus(conceptId, level);
  console.log("unresolvedConceptLevels", unresolvedConceptLevels)
  const conceptIds = new Set<number>();
  unresolvedConceptLevels.forEach((conceptLevel) => {
    const [id, level] = conceptLevel;
    conceptIds.add(id);
  })

  const conceptComponents = Array.from(allPrerequisiteConceptIds.values()).sort().map((conceptId, i) => {
    const elm = descriptionMatcher(conceptId);
    const hasAlreadyResolved = !conceptIds.has(conceptId);
    if (elm === null) return null;
    else return (
      <CardBox key={i} isHide={hasAlreadyResolved}>
        {descriptionMatcher(conceptId)}
      </CardBox>
    )
  });

  return conceptComponents
}

