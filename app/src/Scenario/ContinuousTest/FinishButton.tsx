import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Popover,
  Typography
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { TestStateType } from ".";
import { authState } from "../../firebase/auth";
import { TestResultInfoType, UserScore } from "../../firebase/database/user_score";
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
  const { uid } = useRecoilValue(authState);
  const [testResultInfo, setTestResultInfo] = useState<TestResultInfoType | null | undefined>(undefined);
  const isLoading = testResultInfo == null ? true : false;
  const isTestMoreThanTwice = !isLoading && testResultInfo.ownScores.length >= 2 ? true : false

  console.log("isLoading: ", isLoading)
  console.log("isTestMoreThanTwice: ", isTestMoreThanTwice, !isLoading ? testResultInfo.ownScores.length : null);

  useEffect(() => {
    if (isLoading) {
      // テスト結果を保存する処理が直前に行われるため、反映を待機してから取得する
      setTimeout(() => {
        UserScore.getStandardDeviationWithUserDeviation(uid).then(setTestResultInfo);
      }, 4000);
    }
  }, [testResultInfo])

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const popoverHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const popoverHandleClose = () => {
    setAnchorEl(null);
  };
  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? 'simple-popover' : undefined;

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isTestMoreThanTwice) {
      handleClickOpen();
    } else {
      popoverHandleClick(event);
    }
  }

  return (
    <>
      <LoadingButton
        variant="outlined"
        color={isTestMoreThanTwice ? "info" : "warning"}
        sx={{ width: 100 }}
        onClick={onClickHandler}
        loading={isLoading}
      >
        学習結果
      </LoadingButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">テストを終了します</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            テストを終了して学習結果画面に進みますか？
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            あなたの学習成果を見ることができます。
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
      <Popover
        id={popoverId}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={popoverHandleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>テストは2回以上行ってください。</Typography>
      </Popover>
    </>
  );
};
