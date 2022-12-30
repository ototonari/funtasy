import { UserScore, UserScoreType } from "./user_score"

const uid = "test_user_id";

const score: UserScoreType = {
  score: {
    denominator: 10,
    molecule: 1,
  },
  answers: [
    {
      conceptId: 4,
      level: 1,
      result: false
    },
    {
      conceptId: 4,
      level: 1,
      result: false
    },
    {
      conceptId: 4,
      level: 2,
      result: false
    },
    {
      conceptId: 4,
      level: 3,
      result: false
    },
    {
      conceptId: 4,
      level: 4,
      result: false
    },
    {
      conceptId: 39,
      level: 1,
      result: false
    },
    {
      conceptId: 39,
      level: 1,
      result: false
    },
    {
      conceptId: 39,
      level: 2,
      result: false
    },
    {
      conceptId: 39,
      level: 2,
      result: false
    },
    {
      conceptId: 39,
      level: 3,
      result: false
    },
  ]
}

const makeScore = (point: number) => {
  const _score: UserScoreType = {
    ...score,
    score: {
      denominator: 10,
      molecule: point,
    }
  }
  return _score;
}

const makeAnswer = (keys: number[]) => {
  const _score: UserScoreType = {
    ...score,
    answers: [
      {
        conceptId: 4,
        level: 1,
        result: false
      },
      {
        conceptId: 4,
        level: 1,
        result: false
      },
      {
        conceptId: 4,
        level: 2,
        result: false
      },
      {
        conceptId: 4,
        level: 3,
        result: false
      },
      {
        conceptId: 4,
        level: 4,
        result: false
      },
      {
        conceptId: 39,
        level: 1,
        result: false
      },
      {
        conceptId: 39,
        level: 1,
        result: false
      },
      {
        conceptId: 39,
        level: 2,
        result: false
      },
      {
        conceptId: 39,
        level: 2,
        result: false
      },
      {
        conceptId: 39,
        level: 3,
        result: false
      },
    ]
  }

  keys.forEach((key) => {
    _score.answers[key].result = true;
  })
  return _score;
}

export const TestUserScore = async () => {
  await UserScore.init("test-1");
  await UserScore.init("test-2");
  await UserScore.init("test-3");
  // await UserScore.appendScore("test-1", makeScore(5));
  // await UserScore.appendScore("test-2", makeScore(6));
  // await UserScore.appendScore("test-3", makeScore(4));

  await UserScore.appendScore("test-1", makeAnswer([0]));
  await UserScore.appendScore("test-1", makeAnswer([0, 1, 2]));
  await UserScore.appendScore("test-1", makeAnswer([0, 1, 2, 5, 6]));
  await UserScore.appendScore("test-1", makeAnswer([0, 1, 2, 3, 5, 6, 7]));
  // await UserScore.appendScore("test-1", d);
  // await UserScore.appendScore("test-1", f);
  // await UserScore.appendScore("test-1", h);
  
  // const fetchedScore = await UserScore.get(uid);
  // console.log(fetchedScore);
}