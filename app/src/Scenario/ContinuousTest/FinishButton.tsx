import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { TestStateType } from ".";
import { routeState } from "../../Routing";

type FinishButtonProps = {
  state: TestStateType;
};

export const FinishButton: React.FC<FinishButtonProps> = ({ state }) => {
  const [, setRoute] = useRecoilState(routeState);

  const finishHandler = () => {
    setRoute("finish");
  };

  return (
    <>
      {state === "done" ? (
        <Grid
          item
          xs={2}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <FinishButtonWithDialog onClick={finishHandler} />
        </Grid>
      ) : null}
    </>
  );
};

type FinishButtonWithDialogProps = {
  onClick: () => void;
};

const FinishButtonWithDialog: React.FC<FinishButtonWithDialogProps> = ({
  onClick,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        sx={{ width: 100 }}
        onClick={handleClickOpen}
      >
        終了する
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">テストを終了します</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            テストを終了して最後のページに進みますか？
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            最後のページではあなたの学習成果を見ることができます。
          </DialogContentText>
          {/* <DialogContentText id="alert-dialog-description">
            ※ テストは何度も受け直すことが可能です。
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>テストを続ける</Button>
          <Button
            color="error"
            onClick={() => {
              handleClose();
              onClick();
            }}
            autoFocus
          >
            終了する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
