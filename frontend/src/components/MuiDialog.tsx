import React from "react";

import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

import { Button } from "@components/buttons";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  formId: string;
  children: any;
}

const MuiDialog = ({
  isOpen,
  handleClose,
  title,
  description,
  formId,
  children,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <Backdrop open={isOpen} onClick={handleClose} />
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t(title)}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t(description)}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("Basic.buttonBack")}
          </Button>
          <Button form={formId} color="primary">
            {t("Basic.buttonConfirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     backdrop: {
//       zIndex: theme.zIndex.drawer + 1,
//       color: "#fff",
//     },
//   })
// );

export { MuiDialog };
