import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useAuth } from "@context/authContext";

import { setSnackbar } from "@redux/alert/actions";

import Form from "@components/Form";
import Loader from "@components/Loader";
import MuiDialog from "@components/MuiDialog";
import { CTA } from "@components/buttons";
import { MuiPasswordInput } from "@components/input";
import { Header } from "@components/typography";

import DeletionDialog from "../DeletionDialog";
import { ButtonPosition, ChangingPage, StatusError } from "../LocalStyles";
import { dangerZoneSchema } from "../settingsSchema";

const DangerZonePage = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const { currentUser, deleteAccount, deleteAccountFacebook } = useAuth();
  const { provider } = currentUser;
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
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
