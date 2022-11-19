import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";

export const useGotoConcept = (): [
  string,
  (conceptId: string) => () => void,
  (conceptId: string) => boolean
] => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);
  const goToNext = (conceptId: string) => () => {
    const conceptIds = [...modalRoute.conceptIds, conceptId];
    setModalRoute({ conceptIds });
  };

  const thisConceptId = modalRoute.conceptIds[modalRoute.conceptIds.length - 1];
  const isSameConcept: (conceptId: string) => boolean = (conceptId: string) =>
    thisConceptId === conceptId;

  return [thisConceptId, goToNext, isSameConcept];
};
