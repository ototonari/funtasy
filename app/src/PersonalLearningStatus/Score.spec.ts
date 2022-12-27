import { Score } from "./Score";

describe("Scoreの保存", () => {
  test("1-1を正解した", () => {
    const score = Score.FirstUse();
    score.addScore("1-1", true);

    const actual = score.getScore("1-1");

    expect(actual).toStrictEqual([true])
  });

  test("1-2を1回目不正解で2回目正解した", () => {
    const score = Score.FirstUse();
    score.addScore("1-2", false);
    score.addScore("1-2", true);

    const actual = score.getScore("1-2");

    expect(actual).toStrictEqual([false, true])
  });

});

describe("Factory", () => {
  test("前回の状態を引き継ぐ", () => {
    const score = Score.FirstUse();

    score.addScore("1-1", true);

    const json = score.toJson();

    const score2 = Score.FromJson(json);

    const actual = score2.getScore("1-1");

    expect(actual).toStrictEqual([true])
  });
});
