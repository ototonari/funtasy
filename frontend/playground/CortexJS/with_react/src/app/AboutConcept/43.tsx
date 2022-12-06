import React from "react";
import { Typography, Button, Box, Grid } from "@mui/material";
import { Base } from "./Base";
import { useRecoilState } from "recoil";
import { modalState } from "../ModalRouting";

export const About43: React.FC = () => {
  const [modalRoute, setModalRoute] = useRecoilState(modalState);

  const goToNext = () => {
    const conceptIds = [...modalRoute.conceptIds, "49"];
    setModalRoute({ conceptIds });
  };

  return (
    <Base>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography id="modal-modal-title" variant="h4" p={3}>
              2次不等式
            </Typography>
            <Typography id="modal-modal-title" variant="h6">
              解き方まとめ
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              2次不等式を解くときは、不等号を等号におきかえてできる2次方程式の解を利用しますが、それは解の個数と関係があります。
            </Typography>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs></Grid>
        </Grid>
      </Box>
      {/* <Button variant="outlined" onClick={goToNext}>Go To Next</Button> */}
    </Base>
  );
};
