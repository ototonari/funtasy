import React, { useEffect } from "react";
import { Modal } from "@mui/material";

import {
  atom,
  selector,
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { ComingSoon } from "./AboutConcept/ComingSoon";
import { About49 } from "./AboutConcept/49";
import { About43 } from "./AboutConcept/43";
import { About39 } from "./AboutConcept/39";
import { About101 } from "./AboutConcept/101";
import { About4 } from "./AboutConcept/4";
import { Concept } from "./PersonalLearningStatus/InstructionalCurriculumMap";
import { conceptMatcher } from "./ConceptMatcher";

// モーダルの遷移を考慮し、スタック型とする
type ModalRouteState = {
  conceptIds: number[];
};

export const modalState = atom<ModalRouteState>({
  key: "ModalRouteState",
  default: {
    conceptIds: [],
  },
});

export const ModalRouting = () => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);
  const { conceptIds } = modalRoute;
  const isOpenModal = conceptIds.length > 0;
  const handleClose = () => setModalRoute({ conceptIds: [] });

  const router = (route: ModalRouteState) => {
    const conceptId = route.conceptIds[route.conceptIds.length - 1];
    const Component = conceptMatcher(conceptId);
    if (Component === null) {
      return <ComingSoon />
    } else {
      return Component;
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
