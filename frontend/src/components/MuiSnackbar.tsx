import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import Slide, { SlideProps } from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "@redux/alert/actions";
import { useTranslation } from "react-i18next";

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
