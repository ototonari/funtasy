import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TestStateType } from ".";

type TriggerButtonProps = {
  state: TestStateType;
  onInitHandler: () => void;
  onStartedHandler: () => void;
  onDoneHandler: () => void;
};

export const TriggerButton: React.FC<TriggerButtonProps> = ({
  state,
  onInitHandler,
  onStartedHandler,
  onDoneHandler,
}) => {
  switch (state) {
    case "init":
      return (
        <Button variant="contained" sx={{ width: 120 }} onClick={onInitHandler}>
          はじめる
        </Button>
      );
    case "started":
      return (
        <DoneButtonWithDialog onStartedHandler={onStartedHandler} />
      );
    case "done":
      return (
        <Button variant="contained" sx={{ width: 120 }} onClick={onDoneHandler}>
          もういちど
        </Button>
      );
  }
};

type DoneButtonWithDialogProps = {
  onStartedHandler: () => void;
};

const DoneButtonWithDialog: React.FC<DoneButtonWithDialogProps> = ({
  onStartedHandler,
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
      <Button variant="outlined" sx={{ width: 120 }} onClick={handleClickOpen}>
        採点する
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          テストを採点します
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            まだ解答を続けたい場合は「解答を続ける」ボタンを押してください。
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            ※ テストは何度も行うことができます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>解答を続ける</Button>
          <Button onClick={() => {
            handleClose();
            onStartedHandler();
          }} autoFocus>
            採点する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
