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
import { Text, ab, Space } from "../AboutConcept/utils" 
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
              "TODO: アンケートへの説明など",
          ])}
        </Text>
        <Space />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
      >
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
          <Button variant="contained" onClick={setGuideStatus} disabled={!ready}>
            はじめる
          </Button>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

const QuestionnaireForm: React.FC<{ handleReady: (v: boolean) => void }> = ({handleReady}) => {
  const { uid, state: authnState } = useRecoilValue(authState);

  const handleChange = (setter: (v: any) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter((event.target as HTMLInputElement).value);
  };

  const [genderValue, setGenderValue] = useState<null | string>(null);
  const [ageValue, setAgeValue] = useState<null | string>(null);

  useEffect(() => {
    const user = new User(genderValue, ageValue);
    if (authnState === "updated" && user.isValid()) {
      console.log("QuestionnaireForm: valid user.");
      UserInfo.set(uid, user.toUserInfoParam());

      handleReady(true);
    } else {
      console.log("QuestionnaireForm: invalid user.");
    }
  }, [genderValue, ageValue])

  return (
    <FormControl>
      <FormLabel id="gender-group-id">性別</FormLabel>
      <RadioGroup
        row
        aria-labelledby="gender-group-id"
        onChange={handleChange(setGenderValue)}
      >
        <FormControlLabel value="female" control={<Radio />} label="女性" />
        <FormControlLabel value="male" control={<Radio />} label="男性" />
        <FormControlLabel value="other" control={<Radio />} label="その他" />
      </RadioGroup>
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
  );
};

class User {
  gender: string | null;
  age: string | null;

  constructor(gender: string = null, age: string = null) {
    this.gender = gender;
    this.age = age;
  }

  isValid = (): boolean => {
    return [
      this.gender,
      this.age,
    ].every((value) => value !== null)
  }

  toUserInfoParam = (): UserInfoType => {
    return {
      gender: this.gender,
      age: this.age,
    }
  }
}