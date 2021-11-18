import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { dangerZoneSchema } from "../settingsSchema";

import { useTranslation } from "react-i18next";
import { ChangingPage, StatusError, ButtonPosition } from "../LocalStyles";
import { MuiPasswordInput } from "@components/input";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import Loader from "@components/Loader";
import { Header } from "@components/typography";
import { useDispatch } from "react-redux";
import { setSnackbar } from "@redux/alert/actions";

import { useAuth } from "@context/authContext";
import MuiDialog from "@components/MuiDialog";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import DeletionDialog from "../DeletionDialog";

const DangerZonePage = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const { currentUser, deleteAccount, deleteAccountFacebook } = useAuth();
  const { provider } = currentUser;
  const { control, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(dangerZoneSchema()),
  });

  const formSubmit = async (data) => {
    if (provider === "facebook.com") {
      await deleteAccountFacebook();

      setOpenDialog(false);
    } else {
      await deleteAccount(data.password);
      setOpenDialog(false);
    }
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <ChangingPage>
      <Header variant="h3">{t("Settings.Disposal.title")}</Header>
      <Button
        onClick={handleClickOpen}
        className={classes.dangerButton}
        size="medium"
      >
        {t("Settings.Disposal.deleteAction")}
      </Button>
      <Form
        id="settings-form-delete-account"
        onSubmit={handleSubmit(formSubmit)}
      >
        {provider === "facebook.com" ? (
          <DeletionDialog
            handleClose={handleClose}
            isOpen={openDialog}
            formId="settings-form-delete-account"
            title="Delete your account?"
            description="You are about to delete your account. You will be asked to authenticate with your facebook account again to confirm the deletion"
          />
        ) : (
          <DeletionDialog
            handleClose={handleClose}
            isOpen={openDialog}
            formId="settings-form-delete-account"
            title="Delete your account?"
            description="You are about to delete your account. Please provide your password below to confirm the deletion"
          >
            <MuiPasswordInput
              control={control}
              name="password"
              labelName={t("Settings.Disposal.password")}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </DeletionDialog>
        )}
      </Form>
    </ChangingPage>
  );
};
export default DangerZonePage;

const useStyles = makeStyles((theme) =>
  createStyles({
    dangerButton: {
      maxWidth: "max-content",
      background: "pink",
      opacity: 0.85,
    },
  })
);
