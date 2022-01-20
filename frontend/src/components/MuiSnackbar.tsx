import React from "react";

import { useTranslation } from "next-i18next";

import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const MuiSnackbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const severity = useSelector(
    (state: any) => state.alerts.alertInfo?.severity
  );
  const message = useSelector((state: any) => state.alerts.alertInfo?.message);
  const alertOpen = useSelector((state: any) => state.alerts.alertInfo?.isOpen);

  const handleClose = (
    event?: Event | React.SyntheticEvent<any, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={alertOpen}
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
    </Snackbar>
  );
};

export default MuiSnackbar;
