import React, { useEffect } from "react";
import { Alert, Box, Button, Paper, Modal } from "@mui/material";

import { GuideStatus } from "./database/concepts/LocalStorage";
import { presets } from "./database/questions";
import { Check } from "./Scenario/Check";
import { Guide } from "./Scenario/Guide";
import {
  atom,
  selector,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import Typography from "@mui/material/Typography";
import { ComingSoon } from "./AboutConcept/ComingSoon";
import { About49 } from "./AboutConcept/49";
import { About43 } from "./AboutConcept/43";
import { About39 } from "./AboutConcept/39";
import { About39a } from "./AboutConcept/39a";

// モーダルの遷移を考慮し、スタック型とする
type ModalRouteState = {
  conceptIds: string[];
};

export const modalState = atom<ModalRouteState>({
  key: "ModalRouteState",
  default: {
    conceptIds: ["39"],
  },
});

export const ModalRouting = () => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);
  const { conceptIds } = modalRoute;
  const isOpenModal = conceptIds.length > 0;
  const handleClose = () => setModalRoute({ conceptIds: [] });

  const router = (route: ModalRouteState) => {
    const conceptId = route.conceptIds[route.conceptIds.length - 1];
    switch (conceptId) {
      case "39":
        return <About39 />
      case "39a":
        return <About39a />
      case "43":
        return <About43 />
      case "49":
        return <About49 />
      default:
        return <ComingSoon />
    }
  };

  return (
    <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {router(modalRoute)}
      </Modal>
  );
};
