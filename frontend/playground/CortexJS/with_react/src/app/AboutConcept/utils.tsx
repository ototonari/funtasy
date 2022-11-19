import React from "react";
import { Typography, Card, CardContent, Paper, Box } from "@mui/material";

export const ab = (texts: string[] | React.ReactNode[]) =>
  texts.map((t) => (
    <>
      {t}
      <br />
    </>
  ));

type Props = {
  children?: React.ReactNode;
  pl?: number;
};

export const TextBr: React.FC<Props> = ({ children, pl: paddingLeft }) => (
  <Typography variant="subtitle1" paddingLeft={paddingLeft}>
    {children}
    <br />
  </Typography>
);

export const Title: React.FC<Props> = ({ children, pl: paddingLeft }) => (
  <Typography variant="h6" paddingLeft={paddingLeft}>
    {children}
  </Typography>
);

export const Text: React.FC<Props> = ({ children, pl: paddingLeft }) => (
  <Typography variant="subtitle1" paddingLeft={paddingLeft}>
    {children}
  </Typography>
);

export const CardBox: React.FC<Props> = ({ children }) => (
  <Card sx={{ minWidth: 275 }}>
    <CardContent>{children}</CardContent>
  </Card>
);

export const ScrollBoxOnModal: React.FC<Props> = ({ children }) => (
  <div style={{ overflow: "scroll", height: "85%" }}>
    <Paper variant="outlined">
      <Box padding={2}>{children}</Box>
    </Paper>
  </div>
);
