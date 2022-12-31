import { calculateStandardDeviationWithUserDeviation, measuringConceptComprehension, TestResultInfoType, UserScoresType, UserScoreType } from "./user_score";

const makeScore = (point: number): UserScoreType => {
  const score: UserScoreType = {
    answers: [],
    score: {
      denominator: 100,
      molecule: point
    }
  }
  
  return score;
}

const makeAnswer = (answers: UserScoreType["answers"]) => {
  const userScore: UserScoreType = {
    score: {
      denominator: 0,
      molecule: 0,
    },
    answers: [

    ]
  }
}

describe("calculateStandardDeviationWithUserDeviation", () => {
  type TestData = {
    description: string,
    input: UserScoresType,
    param: string,
    expect: TestResultInfoType,
  }
  
  describe("標準偏差を求める", () => {
    const testData: TestData[] = [
      {
        description: "標準偏差と偏差値を求める(最大100点)",
        input: {
          test1: [makeScore(55)],
          test2: [makeScore(60)],
          test3: [makeScore(70)],
          test4: [makeScore(60)],
          test5: [makeScore(65)],
        },
        param: "test2",
        expect: {
          allTestAvarage: 62,
          standardDeviation: 5.1,
          userDeviation: 46.08,
          ownBestScore: {
            denominator: 100,
            molecule: 60
          },
          ownScores: [],
        }
      },
      {
        description: "標準偏差と偏差値を求める(最大10点)",
        input: {
          test1: [makeScore(5)],
          test2: [makeScore(8)],
          test3: [makeScore(1)],
          test4: [makeScore(5)],
          test5: [makeScore(7)],
          test6: [makeScore(3)],
          test7: [makeScore(5)],
          test8: [makeScore(2)],
          test9: [makeScore(5)],
          test10: [makeScore(7)],
          test11: [makeScore(5)],
          test12: [makeScore(7)],
          test13: [makeScore(10)],
          test14: [makeScore(1)],
          test15: [makeScore(2)],
          test16: [makeScore(5)],
          test17: [makeScore(6)],
        },
        param: "test13",
        expect: {
          allTestAvarage: 4.95,
          standardDeviation: 2.44,
          userDeviation: 70.7,
          ownBestScore: {
            denominator: 10,
            molecule: 10,
          },
          ownScores: [],
        }
      },
    ];

    testData.forEach((data) => {
      test(`${data.description}`, () => {
        const actual = calculateStandardDeviationWithUserDeviation(data.input, data.param);

        expect(actual.standardDeviation).toBe(data.expect.standardDeviation);
        expect(actual.userDeviation).toBe(data.expect.userDeviation);
        expect(actual.allTestAvarage).toBe(data.expect.allTestAvarage);
      })
    })
  })
})

describe("理解度の推移", () => {
  type TestData = {
    description: string,
    input:  UserScoreType["answers"],
    expect: Map<number, number>,
  }

  const testData: TestData[] = [
    {
      description: "ID: 1, Level: 1, Result: 100% => Map([[1, 100]])",
      input: [{
        conceptId: 1,
        level: 1,
        result: true,
      }],
      expect: new Map([[1, 100]]),
    },
    {
      description: "ID: 1, Level: 2, Result: 100% => Map([[1, 100]])",
      input: [
        {
        conceptId: 1,
        level: 1,
        result: true,
        },
        {
        conceptId: 1,
        level: 2,
        result: true,
        },
      ],
      expect: new Map([[1, 100]]),
    },
    {
      description: "ID: 1, Level: 2, Result: 50% => Map([[1, 50]])",
      input: [
        {
        conceptId: 1,
        level: 1,
        result: true,
        },
        {
        conceptId: 1,
        level: 2,
        result: false,
        },
      ],
      expect: new Map([[1, 50]]),
    },
    {
      description: "ID: 1, Level: 2,  Result: 50%, ID: 2, Level: 2, Result: 100% => Map([[1, 50], [2, 100]])",
      input: [
        {
        conceptId: 1,
        level: 1,
        result: true,
        },
        {
        conceptId: 1,
        level: 2,
        result: false,
        },
        {
        conceptId: 2,
        level: 1,
        result: true,
        },
        {
        conceptId: 2,
        level: 2,
        result: true,
        },
      ],
      expect: new Map([[1, 50], [2, 100]]),
    },
  ]

  testData.forEach((data) => {
    test(`${data.description}`, () => {
      const actual = measuringConceptComprehension(data.input);

      expect(actual).toEqual(data.expect);
    })
  })
})