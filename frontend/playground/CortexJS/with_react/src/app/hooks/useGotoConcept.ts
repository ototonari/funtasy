import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";

export const useGotoConcept = (): [
  number,
  (conceptId: number) => () => void,
  (conceptId: number) => boolean
] => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);
  const goToNext = (conceptId: number) => () => {
    const conceptIds = [...modalRoute.conceptIds, conceptId];
    setModalRoute({ conceptIds });
  };

  const thisConceptId = modalRoute.conceptIds[modalRoute.conceptIds.length - 1];
  const isSameConcept: (conceptId: number) => boolean = (conceptId: number) =>
    thisConceptId === conceptId;

  return [thisConceptId, goToNext, isSameConcept];
};
