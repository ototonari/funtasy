import React from "react";
import { Typography, Card, CardContent, Paper, Box, Divider } from "@mui/material";

export const ab = (texts: string[] | React.ReactNode[]) =>
  texts.map((t, i) => (
    <div key={i} style={{display: 'inline'}} >
      {t}
      <br />
    </div>
  ));

type Props = {
  children?: React.ReactNode;
  pl?: number;
  mt?: number;
};

// modal内で利用するとスクロール不可となるため非推奨
export const TextBr: React.FC<Props> = ({ children, pl: paddingLeft }) => (
  <Typography variant="subtitle1" paddingLeft={paddingLeft}>
    {children}
    <br />
  </Typography>
);

export const Title: React.FC<Props> = ({ children, pl: paddingLeft, mt }) => (
  <Typography variant="h6" paddingLeft={paddingLeft} marginTop={mt}>
    {children}
  </Typography>
);

export const Text: React.FC<Props> = ({ children, pl: paddingLeft }) => (
  <Typography variant="subtitle1" paddingLeft={paddingLeft}>
    {children}
  </Typography>
);

export const CardBox: React.FC<Props & { isHide?: boolean } > = ({ children, isHide }) => (
  <Card sx={{ minWidth: 275, marginBottom: 2 }}>
    <CardContent sx={ isHide ? {backgroundColor: '#EAEAEA'} : {}} >{children}</CardContent>
  </Card>
);

export const Point: React.FC<Props> = ({ children }) => (
  <Paper variant={"outlined"} sx={{ padding: 1, margin: 1 }}>
    {children}
  </Paper>
)

export const ScrollBoxOnModal: React.FC<Props & { isNoOutline?: boolean }> = ({
  children,
  isNoOutline,
}) => (
  <div
    style={{
      overflow: "scroll",
      height: "77vh",
    }}
  >
    <Paper
      variant={isNoOutline ? "elevation" : "outlined"}
      elevation={isNoOutline ? 0 : undefined}
    >
      <Box padding={2}>{children}</Box>
    </Paper>
  </div>
);

export const Border: React.FC<Props> = () => {
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      <Divider />
    </div>
  );
};

export const Space = () => (
  <div style={{marginTop: 20}} />
)