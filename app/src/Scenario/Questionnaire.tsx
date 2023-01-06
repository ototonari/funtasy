import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Text, ab, Space } from "../AboutConcept/utils";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserInfoStorage } from "../database/concepts/LocalStorage";
import { authState } from "../firebase/auth";
import { UserInfo, UserInfoType } from "../firebase/database/user_info";
import { routeState } from "../Routing";
import { BaseContainer } from "./utils";
import { useHelperActiveScene } from "../hooks/useHelperActivityLog";

type Props = {};

export const Questionnaire: React.FC<Props> = () => {
  // 利用ログ
  useHelperActiveScene("questionnaire");

  const [ready, setReady] = useState(false);

  const [, setRoute] = useRecoilState(routeState);
  const setGuideStatus = () => {
    UserInfoStorage.set(true);
    setRoute("tutorial");
  };

  return (
    <BaseContainer>
      <Grid container>
        <Grid item xs>
          <Typography variant={"h5"}>アンケート</Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs>
          <Text pl={2}>
            {ab([
              "初めにあなたのことを教えてください。",
              "アンケートの回答は効果検証の分析のみ利用します。",
            ])}
          </Text>
          <Space />
        </Grid>
      </Grid>

      <Grid container direction="row" alignItems="center">
        <Grid>
          <QuestionnaireForm handleReady={setReady} />
          <Space />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <Button
            variant="contained"
            onClick={setGuideStatus}
            disabled={!ready}
          >
            はじめる
          </Button>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

const QuestionnaireForm: React.FC<{ handleReady: (v: boolean) => void }> = ({
  handleReady,
}) => {
  const { uid } = useRecoilValue(authState);

  const handleChange =
    (setter: (v: any) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter((event.target as HTMLInputElement).value);
    };

  const [genderValue, setGenderValue] = useState<null | string>(null);
  const [ageValue, setAgeValue] = useState<null | string>(null);
  const [haveTakenClassesValue, setHaveTakenClassesValue] = useState<
    null | boolean
  >(null);
  const [confidenceValue, setConfidenceValue] = useState<null | number>(null);

  useEffect(() => {
    const user = new User(
      genderValue,
      ageValue,
      haveTakenClassesValue,
      confidenceValue
    );
    if (user.isValid()) {
      console.log("QuestionnaireForm: valid user.");
      UserInfo.set(uid, user.toUserInfoParam());

      handleReady(true);
    } else {
      console.log("QuestionnaireForm: invalid user.");
    }
  }, [genderValue, ageValue, haveTakenClassesValue, confidenceValue]);

  return (
    <div>
      <FormControl>
        <FormLabel component="legend" id="gender-group-id">
          性別
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender-group-id"
          onChange={handleChange(setGenderValue)}
        >
          <FormControlLabel value="female" control={<Radio />} label="女性" />
          <FormControlLabel value="male" control={<Radio />} label="男性" />
          <FormControlLabel value="other" control={<Radio />} label="その他" />
        </RadioGroup>
      </FormControl>
      <Space />

      <FormControl>
        <FormLabel id="age-group-id">年齢</FormLabel>
        <RadioGroup
          row
          aria-labelledby="age-group-id"
          onChange={handleChange(setAgeValue)}
        >
          <FormControlLabel value="10~19" control={<Radio />} label="10代" />
          <FormControlLabel value="20~29" control={<Radio />} label="20代" />
          <FormControlLabel value="30~39" control={<Radio />} label="30代" />
          <FormControlLabel value="40~49" control={<Radio />} label="40代" />
          <FormControlLabel value="50~59" control={<Radio />} label="50代" />
          <FormControlLabel value="60~" control={<Radio />} label="60歳以上" />
        </RadioGroup>
      </FormControl>
      <Space />

      <FormControl>
        <FormLabel id="have-taken-classes-group-id">
          高校数学の数１の授業を受けたことがあるか
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="have-taken-classes-group-id"
          onChange={handleChange(setHaveTakenClassesValue)}
        >
          <FormControlLabel
            value={true}
            control={<Radio />}
            label="受けたことがある"
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="受けたことがない"
          />
        </RadioGroup>
      </FormControl>
      <Space />
      
      {/* TODO: 授業を受けたことがある人を対象に、得意・不得意の章を選択できる項目の追加 */}

      <FormControl>
        <FormLabel id="confidence-group-id">
          今回のテーマである2次方程式の解き方についての自信を5段階で表すならば（1: 自信がない, 5:
          自信がある）
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="confidence-group-id"
          onChange={handleChange(setConfidenceValue)}
        >
          <FormControlLabel value={1} control={<Radio />} label="1" />
          <FormControlLabel value={2} control={<Radio />} label="2" />
          <FormControlLabel value={3} control={<Radio />} label="3" />
          <FormControlLabel value={4} control={<Radio />} label="4" />
          <FormControlLabel value={5} control={<Radio />} label="5" />
        </RadioGroup>
        <Space />
      </FormControl>
    </div>
  );
};

class User {
  gender: string | null;
  age: string | null;
  haveTakenClasses: boolean | null;
  confidence: number | null;

  constructor(
    gender: string = null,
    age: string = null,
    haveTakenClasses: boolean = null,
    confidence: number = null
  ) {
    this.gender = gender;
    this.age = age;
    this.haveTakenClasses = haveTakenClasses;
    this.confidence = confidence;
  }

  isValid = (): boolean => {
    return [
      this.gender,
      this.age,
      this.haveTakenClasses,
      this.confidence,
    ].every((value) => value !== null);
  };

  toUserInfoParam = (): UserInfoType => {
    return {
      gender: this.gender,
      age: this.age,
      haveTakenClasses: this.haveTakenClasses,
      confidence: this.confidence,
    };
  };
}
