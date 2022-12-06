import { ICMStorage } from "../database/concepts/LocalStorage";
import { MapConverter } from "../utils/MapConverter";
import { SetConverter } from "../utils/SetConverter";

type Level = number;

type LevelLabel = string;

type ConceptId = string;

type ConceptLevels = [LevelLabel, Level][];

// あくまでフロントの解釈用
enum FactorizationLevels {
  "共通因数による因数分解" = 1,
  "公式1",
  "公式2",
  "公式3",
  "公式4",
  "応用",
}

export const ICMRepository = {
  save: (icm: InstructionalCurriculumMap) => {
    const rawStatus = icm.toJson();
    
    if (rawStatus !== "") {
      ICMStorage.set(rawStatus);
    }
  },
  load: () => {
    const rawStatus = ICMStorage.get();

    let icm: InstructionalCurriculumMap;
    if (rawStatus !== null) {
      icm = InstructionalCurriculumMap.FromJson(rawStatus);
    } else {
      icm = InstructionalCurriculumMap.FirstUse();
    }

    return icm;
  }
}

type InstructionalCurriculumMapData = [string, Level, string[]];
type Status = Map<ConceptId, Set<Level>>;
export class InstructionalCurriculumMap {
  status: Status;
  data: InstructionalCurriculumMapData[]

  private constructor(status: Status) {
    this.data = data;
    this.status = status;
  }

  /**
   * 初回利用時のファクトリーメソッド
   * @returns InstructionalCurriculumMap
   */
  static FirstUse = () => {
    return new InstructionalCurriculumMap(new Map());
  }

  /**
   * 前回の状態を引き継ぐファクトリーメソッド
   * @param status 
   * @returns InstructionalCurriculumMap
   */
  static FromJson = (rawStatus: string) => {
    // String を Map -> String に変換してから Map -> Set に変換する
    const status = new Map<ConceptId, Set<Level>>();

    // Map -> String
    const tmpMap = MapConverter.parse(rawStatus);

    // Map -> Set
    tmpMap.forEach((strSet, conceptId) => status.set(conceptId, SetConverter.parse(strSet)));

    return new InstructionalCurriculumMap(status);
  }

  toJson = () => {
    // Map -> Set の構造体なので先に Map -> String に変換してから String に置き換える
    const tmpMap = new Map<ConceptId, String>();

    // Map -> String
    this.status.forEach((innerSet, conceptId) => tmpMap.set(conceptId, SetConverter.stringify(innerSet)));

    // String
    const str = MapConverter.stringify(tmpMap);
    return str;
  }

  hasConcept = (id: ConceptId): boolean => this.data.filter(([conceptId,]) => conceptId === id).length > 0;

  getConcept = (id: ConceptId): InstructionalCurriculumMapData => {
    if (!this.hasConcept(id)) {
      throw new Error("has no content!");
    }
    return this.data.filter(([conceptId]) => conceptId === id)[0];
  }

  // コンセプトに特定のレベル別の情報があるか
  private hasSpecificConceptLevel = (id: ConceptId, level: Level): boolean => {
    const concepts = this.data.filter(([conceptId,]) => conceptId === id);

    return concepts.some(([_, lv]) => lv === level)
  }

  private setStatus = (id: ConceptId, level: Level): void => {
    if (this.status.has(id)) {
      const s = this.status.get(id);
      this.status.set(id, s.add(level));
    } else {
      this.status.set(id, new Set<Level>().add(level));
    }
  }

  // 正解した問題を記憶する
  registerStatus = (id: ConceptId, level: Level): InstructionalCurriculumMap => {
    this.setStatus(id, level);

    const conceptLevels = this.getAllPrerequisiteConceptsByIdLevel(id, level);
    conceptLevels.forEach((conceptLevel) => {
      const [id, level] = conceptLevel.split("-");
      this.setStatus(id, Number(level));
    })

    return new InstructionalCurriculumMap(this.status);
  }

  // コンセプトの前提条件が存在するか
  hasPrerequisiteConcepts = (id: ConceptId): boolean => {
    if (!this.hasConcept(id)) return false;

    const [, , prerequisiteConcept] = this.getConcept(id)
    return prerequisiteConcept.length > 0;
  }

  // コンセプトの前提条件を取得する
  getPrerequisiteConceptsById = (id: ConceptId): string[] => {
    if (!this.hasPrerequisiteConcepts(id)) return [];

    const [, , prerequisiteConcept] = this.getConcept(id);
    return prerequisiteConcept;
  }

  // コンセプトとレベルから全ての前提条件を取得する
  getAllPrerequisiteConceptsByIdLevel = (id: ConceptId, level: Level) => {
    const prerequisites: string[] = [];

    const getPrerequisiteConceptsByIdRecv = (id: ConceptId, level: Level, prerequisites: string[]) => {
      if (!this.hasPrerequisiteConcepts(id)) return;

      const conceptLevels = this.getPrerequisiteConceptByIdLevel(id, level);
      // 取得した前提条件を付与しつつ再帰処理を行う
      conceptLevels.forEach((conceptLevel) => {
        prerequisites.push(conceptLevel);
        const [id, level] = conceptLevel.split("-");
        getPrerequisiteConceptsByIdRecv(id, Number(level), prerequisites);
      })
    }

    getPrerequisiteConceptsByIdRecv(id, level, prerequisites);

    return prerequisites;
  }

  // コンセプトとレベルから必要な前提条件を取得する
  getPrerequisiteConceptByIdLevelAndStatus = (id: string, level: number): string[] => {
    const conceptLevels = this.getPrerequisiteConceptByIdLevel(id, level);
    
    return this.filterConceptByStatus(conceptLevels);
  }

  // コンセプトとレベルから必要な前提条件を取得する
  getPrerequisiteConceptByIdLevel = (id: string, level: number): string[] => {
    if (!this.hasConcept(id)) {

    }
    const concepts = this.data.filter(([conceptId,]) => conceptId === id)
    
    const prerequisiteConcept = new Set<string>()
    if (this.hasSpecificConceptLevel(id, level)) {
      
      concepts
        .filter(([_, lv]) => lv === level)
        .flatMap(([, , cond]) => cond)
        .forEach((conceptLevel) => prerequisiteConcept.add(conceptLevel))
    } else {
      concepts
        .filter(([_, lv]) => lv === 0)
        .flatMap(([, , cond]) => cond)
        .forEach((conceptLevel) => prerequisiteConcept.add(conceptLevel))
    }

    const conceptLevels = Array.from(prerequisiteConcept.values());
    
    return conceptLevels;
  }

  // コンセプトとレベルのうち、既に解凍済みのものを除いたものを返す
  private filterConceptByStatus = (conceptLevels: string[]): string[] => {
    return conceptLevels.filter((conceptLevel) => {
      const [id, level] = conceptLevel.split("-");
      // そのコンセプトで登録がない場合はスルー
      if (!this.status.has(id)) {
        return true;
      }

      // 登録があり、コンセプトの前提条件が0を示している場合はOK
      if (level === "0") {
        return false;
      } else {
        let lv: number
        try {
          lv = Number(level);
        } catch (error) {
          console.warn("skip: cast error. \n", error);
          return true;
        }
        const doneLevels = this.status.get(id);
        return !doneLevels.has(lv);
      }
    })
  }
}

const data: InstructionalCurriculumMapData[] = [
  ["1", 0, []],
  ["2", 0, []],
  ["3", 0, ["1-0", "2-0"]],
  ["4", 0, ["3-0"]],
  ["39", 1, ["4-0"]],
  ["39", 2, ["4-0", "101-0"]],
  ["101", 0, []],
]
