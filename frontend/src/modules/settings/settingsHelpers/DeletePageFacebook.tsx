import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuth } from "@context/authContext";

import { Form } from "@components/Form";
import { Loader } from "@components/Loader";
import { MuiDialog } from "@components/MuiDialog";
import { Button } from "@components/buttons";

type FormTypes = {};

const DeletePageFacebook = () => {
  const { t } = useTranslation();

  const [openDialog, setOpenDialog] = useState(false);

  const { currentUser, deleteAccountFacebook } = useAuth();
  const { provider } = currentUser;
  const methods = useForm<FormTypes>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const formSubmit = handleSubmit(async (data) => {
    if (provider === "facebook.com") {
      await deleteAccountFacebook();
      setOpenDialog(false);
    }
  });

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t("Settings.Disposal.title")}
      </Typography>
      <Button onClick={handleClickOpen} size="medium" color="error">
        {t("Settings.Disposal.deleteAction")}
      </Button>
      <Form
        methods={methods}
        id="settings-form-delete-facebook-account"
        onSubmit={formSubmit}
        autoComplete="off"
      >
        <MuiDialog
          handleClose={handleClose}
          isOpen={openDialog}
          formId="settings-form-delete-facebook-account"
          title="Delete your account?"
          description="You are about to delete your account. You will be asked to authenticate with your facebook account again to confirm the deletion"
        >
          <></>
        </MuiDialog>
      </Form>
    </>
  );
};
export { DeletePageFacebook };
