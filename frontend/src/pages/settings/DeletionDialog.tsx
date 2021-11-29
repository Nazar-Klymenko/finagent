import { FC } from "react";
import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import { CTA } from "@components/buttons";

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
          <CTA text={t("Basic.buttonConfirm")} form={formId} color="primary" />
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
