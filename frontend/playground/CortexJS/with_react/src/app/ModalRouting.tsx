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
import { conceptMatcher } from "./ConceptMatcher/conceptMatcher";
import { Concept } from "./PersonalLearningStatus/InstructionalCurriculumMap";

// モーダルの遷移を考慮し、スタック型とする
type ModalRouteState = {
  conceptIds: number[];
  currentConceptLevel?: [number, number];
};

export const modalState = atom<ModalRouteState>({
  key: "ModalRouteState",
  default: {
    conceptIds: [Concept["因数分解"]],
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
        <div>
          {router(modalRoute)}
        </div>
      </Modal>
  );
};
