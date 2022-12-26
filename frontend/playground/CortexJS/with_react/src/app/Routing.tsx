import React, { useEffect } from "react";
import { GuideStorage, UserInfoStorage } from "./database/concepts/LocalStorage";
import { presets } from "./database/questions";
import { Check } from "./Scenario/Check";
import { Guide } from "./Scenario/Guide";
import { atom, useRecoilState } from "recoil";
import { TestContainer } from "./Scenario/Test";
import { ContinuousTest } from "./Scenario/ContinuousTest/ContinuousTest";
import { Questionnaire } from "./Scenario/Questionnaire";

type RouteState = "guide" | "questionnaire" | "test";

export const routeState = atom<RouteState>({
  key: "RouteState", // unique ID (with respect to other atoms/selectors)
  default: "guide", // default value (aka initial value)
});

export const Routing = () => {
  const [route, setRoute] = useRecoilState(routeState);
  useEffect(() => {
    const hasGuide = GuideStorage.get();
    const hasInfo = UserInfoStorage.get();
    if (hasGuide && hasInfo) {
      setRoute("test");
    } else if (hasGuide) {
      setRoute("questionnaire");
    }
  }, []);

  const router = (route: RouteState) => {
    switch (route) {
      case "guide":
        return <Guide />;
      case "questionnaire":
        return <Questionnaire />;
      // case "check":
      //   return <Check questions={presets} />;
      // case "test":
      //   return <TestContainer />;
      case "test":
        return <ContinuousTest />;
    }
  };

  return router(route);
};
