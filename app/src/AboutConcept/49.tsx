import React from "react";
import { Typography, Button } from "@mui/material";
import { Base } from "./Base";
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";

export const About49: React.FC = () => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);

  const forBack = () => {
    const conceptIds = modalRoute.conceptIds.slice(0, -1);
    setModalRoute({conceptIds})
  }

  const goToNext = () => {
    const conceptIds = [...modalRoute.conceptIds, 49]
    setModalRoute({conceptIds})
  }

  return (
    <Base>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        This component is `${modalRoute.conceptIds.length}`.
      </Typography>
      <Button variant="outlined" onClick={goToNext}>Go To Next</Button>
      <Button variant="outlined" onClick={forBack}>Go Back</Button>
    </Base>
  );
};
