import { FC } from "react";
import React from "react";

import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from "react-i18next";

import { MuiButton } from "@components/buttons";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  formId: string;
}

const DeletionDialog: FC<Props> = ({
  isOpen,
  handleClose,
  title,
  description,
  formId,
  children,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={isOpen}
        onClick={handleClose}
      />
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
          <Button onClick={handleClose} color="primary" autoFocus>
            {t("Basic.buttonBack")}
          </Button>
          <MuiButton
            text={t("Basic.buttonConfirm")}
            form={formId}
            color="primary"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default DeletionDialog;
