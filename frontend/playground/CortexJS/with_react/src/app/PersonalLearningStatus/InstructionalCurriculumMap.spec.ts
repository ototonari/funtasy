import { InstructionalCurriculumMap } from "./InstructionalCurriculumMap";

describe("個人の学習状況の把握", () => {
  test("4-0 の全ての前提条件は 3-0, 2-0, 1-0 である", () => {
    const icm = InstructionalCurriculumMap.FirstUse();
    const conceptLevels = icm.getAllPrerequisiteConceptsByIdLevel("4", 0);

    expect(conceptLevels.includes("3-0")).toBeTruthy();
    expect(conceptLevels.includes("2-0")).toBeTruthy();
    expect(conceptLevels.includes("1-0")).toBeTruthy();
  });

  test("39-2 の全ての前提条件は 101-0, 4-0, 3-0, 2-0, 1-0 である", () => {
    const icm = InstructionalCurriculumMap.FirstUse();
    const conceptLevels = icm.getAllPrerequisiteConceptsByIdLevel("39", 2);

    expect(conceptLevels.includes("101-0")).toBeTruthy();
    expect(conceptLevels.includes("4-0")).toBeTruthy();
    expect(conceptLevels.includes("3-0")).toBeTruthy();
    expect(conceptLevels.includes("2-0")).toBeTruthy();
    expect(conceptLevels.includes("1-0")).toBeTruthy();
  });

  test("共通因数による因数分解を解けなかった時、必要な前提条件は 3(式の展開) である", () => {
    const icm = InstructionalCurriculumMap.FirstUse();
    const [conceptLevel] = icm.getPrerequisiteConceptByIdLevel("4", 1);

    expect(conceptLevel).toBe("3-0");
  });

  test("因数分解の公式1が解けていて、因数分解を利用した2次方程式の問題を解けなかった時、必要な前提条件は存在しない", () => {
    const icm = InstructionalCurriculumMap.FirstUse();

    // 因数分解の公式1 が解けている
    const conceptId = "4";
    const level = 2;
    icm.registerStatus(conceptId, level);
    // かつ 因数分解を利用した2次方程式の問題を解けなかった
    const prerequisites = icm.getPrerequisiteConceptByIdLevelAndStatus("39", 1);

    // 前提条件はない
    expect(prerequisites.length).toBe(0);
  });

  test("因数分解を利用した2次方程式の問題が解けていて、解の公式を利用した2次方程式の問題を解けなかった時、必要な前提条件は 101-0(解の公式) である", () => {
    const icm = InstructionalCurriculumMap.FirstUse();

    // 因数分解を利用した2次方程式の問題 が解けている
    const conceptId = "39";
    const level = 1;
    icm.registerStatus(conceptId, level);

    // かつ 因数分解を利用した2次方程式の問題を解けなかった
    const [conceptLevel] = icm.getPrerequisiteConceptByIdLevelAndStatus(
      "39",
      2
    );

    // 前提条件は 101-0(解の公式) である
    expect(conceptLevel).toBe("101-0");
  });
});

describe("Factory", () => {
  test("前回の状態を引き継ぐ", () => {
    const icm = InstructionalCurriculumMap.FirstUse();

    // 因数分解を利用した2次方程式の問題 が解けている
    const conceptId = "39";
    const level = 1;
    icm.registerStatus(conceptId, level);

    // 状態を持ったICMをJson化する
    const json = icm.toJson();

    // 状態を引き継ぐ新たなICMを作成する
    const icm2 = InstructionalCurriculumMap.FromJson(json);
    
    const [conceptLevel] = icm2.getPrerequisiteConceptByIdLevelAndStatus(
      "39",
      2
    );

    // 状態を引き継いでいるので判定が行える
    expect(conceptLevel).toBe("101-0");
  });
});
