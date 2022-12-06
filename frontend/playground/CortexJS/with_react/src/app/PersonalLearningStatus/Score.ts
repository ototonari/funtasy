import { MapConverter } from "../utils/MapConverter";

type ConceptLevel = string;

type ScoreType = Map<ConceptLevel, boolean[]>;

export class Score {
  private score: ScoreType;

  private constructor(score: ScoreType) {
    this.score = score;
  }

  static FirstUse = () => {
    return new Score(new Map());
  };

  static FromJson = (rawScore: string) => {
    const score = MapConverter.parse<boolean[]>(rawScore);
    return new Score(score);
  };

  addScore = (conceptLevel: ConceptLevel, result: boolean) => {
    if (this.score.has(conceptLevel)) {
      const prev = this.score.get(conceptLevel);
      this.score.set(conceptLevel, [...prev, result]);
    } else {
      this.score.set(conceptLevel, [result]);
    }
  };

  getScore = (conceptLevel: ConceptLevel): boolean[] | null => {
    if (this.score.has(conceptLevel)) {
      return this.score.get(conceptLevel);
    } else {
      return null
    }
  }

  toJson = () => {
    return MapConverter.stringify(this.score);
  };
}
