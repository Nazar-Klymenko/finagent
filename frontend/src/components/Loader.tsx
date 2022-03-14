import React from "react";

import { Box, CircularProgress } from "@mui/material";

const Loader = (): JSX.Element => {
  return (
    <Box
      sx={{
        flex: "1",
        m: "auto auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress></CircularProgress>
    </Box>
  );
};

export { Loader };
