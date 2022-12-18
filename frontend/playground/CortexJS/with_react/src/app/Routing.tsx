import React, { useEffect } from "react";
import { GuideStorage } from "./database/concepts/LocalStorage";
import { presets } from "./database/questions";
import { Check } from "./Scenario/Check";
import { Guide } from "./Scenario/Guide";
import { atom, useRecoilState } from "recoil";
import { TestContainer } from "./Scenario/Test";
import { ContinuousTest } from "./Scenario/ContinuousTest/ContinuousTest";

type RouteState = "init" | "check" | "test";

export const routeState = atom<RouteState>({
  key: "RouteState", // unique ID (with respect to other atoms/selectors)
  default: "init", // default value (aka initial value)
});

export const Routing = () => {
  const [route, setRoute] = useRecoilState(routeState);
  useEffect(() => {
    const hasGuide = GuideStorage.get();
    if (hasGuide) {
      setRoute("test");
    }
  }, []);

  const router = (route: RouteState) => {
    switch (route) {
      case "init":
        return <Guide />;
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
