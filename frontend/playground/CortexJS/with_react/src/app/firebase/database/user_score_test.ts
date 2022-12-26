import { UserScore, UserScoreType } from "./user_score"

const uid = "test_user_id";

const score: UserScoreType = {
  score: {
    denominator: 1,
    molecule: 1,
  },
  answers: [
    {
      conceptId: 1,
      level: 1,
      result: true
    }
  ]
}

export const TestUserScore = async () => {
  await UserScore.init(uid);
  await UserScore.appendScore(uid, score);
  await UserScore.appendScore(uid, score);
  await UserScore.appendScore(uid, score);

  const fetchedScore = await UserScore.get(uid);
  console.log(fetchedScore);
}