import React, { useEffect } from "react";
import { GuideStorage } from "./database/concepts/LocalStorage";
import { presets } from "./database/questions";
import { Check } from "./Scenario/Check";
import { Guide } from "./Scenario/Guide";
import { atom, useRecoilState } from "recoil";

type RouteState = "init" | "check";

export const routeState = atom<RouteState>({
  key: "RouteState", // unique ID (with respect to other atoms/selectors)
  default: "init", // default value (aka initial value)
});

export const Routing = () => {
  const [route, setRoute] = useRecoilState(routeState);
  useEffect(() => {
    const hasGuide = GuideStorage.get();
    if (hasGuide) {
      setRoute("check");
    }
  }, []);

  const router = (route: RouteState) => {
    switch (route) {
      case "init":
        return <Guide />;
      case "check":
        return <Check questions={presets} />;
    }
  };

  return router(route);
};
