import { ICMStorage } from "../database/concepts/LocalStorage";
import { MapConverter } from "../utils/MapConverter";
import { SetConverter } from "../utils/SetConverter";

type Level = number;

type LevelLabel = string;

type ConceptId = number;

type ConceptLevels = [LevelLabel, Level][];

type ConceptLevel = [ConceptId, Level];

type Prerequisites = [ConceptId, Level];

// あくまでフロントの解釈用
enum FactorizationLevels {
  "共通因数による因数分解" = 1,
  "公式1",
  "公式2",
  "公式3",
  "公式4",
  "応用",
}

export enum Concept {
  "数と式" = 1,
  "整式の加減" = 2,
  "式の展開"　= 3,
  "因数分解" = 4,
  "2次方程式の解とその判別"　= 39,
  "2次不等式" = 43,
  "解の公式" = 101
}

const data: InstructionalCurriculumMapData[] = [
  [Concept.数と式, 0, []],
  [Concept.整式の加減, 0, []],
  [Concept.式の展開, 0, [[1, 0], [2, 0]]],
  [Concept.因数分解, 0, [[3, 0]]],
  [Concept["2次方程式の解とその判別"], 1, [[4, 0]]],
  [Concept["2次方程式の解とその判別"], 2, [[4, 0], [101, 0]]],
  [Concept["2次方程式の解とその判別"], 3, [[4, 0], [101, 0]]],
  [Concept.解の公式, 0, []],
]

export const ICMRepository = {
  save: (icm: InstructionalCurriculumMap) => {
    const rawStatus = icm.toJson();

    if (rawStatus !== "") {
      ICMStorage.set(rawStatus);
    }
  },
  load: () => {
    const rawStatus = ICMStorage.get();
    const tmpStatus = JSON.parse(rawStatus);

    let icm: InstructionalCurriculumMap;
    if (tmpStatus !== null) {
      icm = InstructionalCurriculumMap.FromJson(rawStatus);
    } else {
      icm = InstructionalCurriculumMap.FirstUse();
    }

    return icm;
  }
}

type InstructionalCurriculumMapData = [ConceptId, Level, Prerequisites[]];
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
    tmpMap.forEach((strSet, conceptId) => status.set(Number(conceptId), SetConverter.parse(strSet)));

    return new InstructionalCurriculumMap(status);
  }

  toJson = () => {
    // Map -> Set の構造体なので先に Map -> String に変換してから String に置き換える
    const tmpMap = new Map<string, string>();

    // Map -> String
    this.status.forEach((innerSet, conceptId) => tmpMap.set(`${conceptId}`, SetConverter.stringify(innerSet)));

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
      const [id, level] = conceptLevel;
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
  getPrerequisitesById = (id: ConceptId): Prerequisites[] => {
    if (!this.hasPrerequisiteConcepts(id)) return [];

    const [, , prerequisiteConcept] = this.getConcept(id);
    return prerequisiteConcept;
  }

  // コンセプトとレベルから全ての前提条件を取得する
  getAllPrerequisiteConceptsByIdLevel = (id: ConceptId, level: Level) => {
    const prerequisites: Prerequisites[] = [];

    const getPrerequisiteConceptsByIdRecv = (id: ConceptId, level: Level, prerequisites: Prerequisites[]) => {
      if (!this.hasPrerequisiteConcepts(id)) return;

      const conceptLevels = this.getPrerequisitesByIdLevel(id, level);
      // 取得した前提条件を付与しつつ再帰処理を行う
      conceptLevels.forEach((conceptLevel) => {
        prerequisites.push(conceptLevel);
        const [id, level] = conceptLevel;
        getPrerequisiteConceptsByIdRecv(id, Number(level), prerequisites);
      })
    }

    getPrerequisiteConceptsByIdRecv(id, level, prerequisites);

    return prerequisites;
  }

  // コンセプトとレベルから必要な前提条件を取得する
  getPrerequisiteConceptByIdLevelAndStatus = (id: ConceptId, level: Level): Prerequisites[] => {
    const conceptLevels = this.getPrerequisitesByIdLevel(id, level);
    console.log("conceptLevels", conceptLevels)
    return this.filterConceptByStatus(conceptLevels);
  }

  // コンセプトとレベルから必要な前提条件を取得する
  getPrerequisitesByIdLevel = (id: ConceptId, level: Level): Prerequisites[] => {
    if (!this.hasConcept(id)) {

    }
    const concepts = this.data.filter(([conceptId,]) => conceptId === id)
    
    const prerequisiteConcept = new Set<Prerequisites>()
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
  private filterConceptByStatus = (conceptLevels: Prerequisites[]): Prerequisites[] => {
    return conceptLevels.filter((conceptLevel) => {
      const [id, level] = conceptLevel;
      // そのコンセプトで登録がない場合はスルー
      if (!this.status.has(id)) {
        return true;
      }

      // 登録があり、コンセプトの前提条件が0を示している場合はOK
      if (level === 0) {
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
