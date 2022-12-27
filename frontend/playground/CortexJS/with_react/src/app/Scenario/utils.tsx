import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const BaseContainer: React.FC<Props> = ({ children }) => (
  <div
    style={{
      width: 800,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgba(0, 0, 0, .3)",
      padding: 20,
    }}
  >
    {children}
  </div>
);
