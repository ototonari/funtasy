import React from "react";
import { Typography } from "@mui/material";
import { Base } from "./Base";

export const ComingSoon: React.FC = () => {
  return (
    <Base>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Sorry
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        coming soon...
      </Typography>
    </Base>
  );
};
