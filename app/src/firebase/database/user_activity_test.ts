import { UserActivity } from "./user_activity"

const uid = "test-practice-log"

export const TestPracticeLog = async () => {
  await UserActivity.upsertPractice(uid, 1, 1, false, "1+1");
  await UserActivity.upsertPractice(uid, 2, 1, false, "1*1");
  await UserActivity.upsertPractice(uid, 1, 1, true, "1*1");
  await UserActivity.upsertPractice(uid, 1, 1, false, "1*1");
  await UserActivity.upsertPractice(uid, 3, 1, false, "1/1");
}

export const TestPracticeLogProgress =async () => {
  await UserActivity.upsertPractice(uid, 4, 1, true, "1+1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "a1+1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "1s+1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "1+df1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "1+s1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "1+d1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "1asd+1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "1fd+1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "1+as1");
  await UserActivity.upsertPractice(uid, 4, 1, true, "1fda+1");

  await UserActivity.upsertPractice(uid, 39, 1, true, "1asdf+1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "asdfasd1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "fsd1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1+vxc1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1vwe+1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1+rg1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1e+1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1+gvve1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1+wesz1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1+cve1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1+reerw1");
  await UserActivity.upsertPractice(uid, 39, 1, true, "1+fwe1");

}