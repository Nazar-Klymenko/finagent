import React from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import {
  Alert,
  Snackbar as MuiSnackbar,
  Slide,
  SlideProps,
} from "@mui/material/";
import i18next from "i18next";

import { useSnackbar } from "@context/snackbarContext";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const Snackbar = (): JSX.Element => {
  const { t } = i18next;

  const { snackbar, setSnackbar } = useSnackbar(),
    { message, severity, open } = snackbar;

  const handleClose = (
    event?: Event | React.SyntheticEvent<any, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      setSnackbar({ severity, message, open: false });
      return;
    }
    setSnackbar({ severity, message, open: false });
  };
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={3500}
      onClose={handleClose}
      TransitionComponent={TransitionUp}
    >
      <Alert
        style={{ minWidth: "200px" }}
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {t(message)}
      </Alert>
    </MuiSnackbar>
  );
};

export { Snackbar };
