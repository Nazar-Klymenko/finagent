import React from "react";

import Slide, { SlideProps } from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";

import { closeSnackbar } from "@redux/alert/actions";

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

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
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
