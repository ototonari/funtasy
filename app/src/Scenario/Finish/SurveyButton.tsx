import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// TODO: 本利用で公開する場合はリンクを差し替えること
const getSurveyUrlForPresentation = (uid: string) => `https://docs.google.com/forms/d/e/1FAIpQLSfes2FIRwuSrpTsR0vOPmDGKB016wXaSLKqCbfi1xzZqGRBpg/viewform?usp=pp_url&entry.900723457=${uid}`
const getSurveyUrl = (uid: string) => `https://docs.google.com/forms/d/e/1FAIpQLSdgdBQlKkgFC3hHEp3qsYiJTfWu1hISUmaD6Sv6-QUZHnFFWA/viewform?usp=pp_url&entry.900723457=${uid}`

type Props = {
  uid: string
}

export const SurveyButton: React.FC<Props> = ({uid}) => {
  const surveyUrl = getSurveyUrlForPresentation(uid);

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
        href={surveyUrl}
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
