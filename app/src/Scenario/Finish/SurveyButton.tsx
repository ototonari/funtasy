import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const SurveyButton: React.FC<{}> = ({}) => {
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
        variant="contained"
        color="success"
        sx={{ width: 120 }}
        // onClick={handleClickOpen}
        href="https://forms.gle/K7UbQxAMur7gsyTy9"
        target="_blank"
      >
        アンケート
      </Button>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          アンケートフォームに移動します
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
          <Button
            onClick={() => {
              handleClose();
            }}
            autoFocus
          >
            採点する
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};
