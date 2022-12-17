import React from "react";
import { Paper, IconButton } from "@mui/material";
import {ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";

type Props = {
  children?: React.ReactNode;
}

export const Base: React.FC<Props> = ({ children }) => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);

  const forBack = () => {
    const conceptIds = modalRoute.conceptIds.slice(0, -1);
    setModalRoute({ ...modalRoute, conceptIds })
  }

  return (
    <Paper sx={style} elevation={3}>
      <div style={{display: "flex", flexDirection: "column"}}>
        <div>
        <IconButton color="primary" onClick={forBack} >
          <ArrowBackIos />
        </IconButton>
        </div>
        <div>
          { children }
        </div>
      </div>
    </Paper>
  );
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  // bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 5,
  p: 4,
};
