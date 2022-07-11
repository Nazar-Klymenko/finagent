import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import i18next from "i18next";
import { useForm } from "react-hook-form";

import { useAuth } from "@context/authContext";

import { Form } from "@components/Form";
import { Loader } from "@components/Loader";
import { MuiDialog } from "@components/MuiDialog";
import { Button } from "@components/buttons";
import { PasswordInput } from "@components/input";

import { dangerZoneSchema } from "./settings.schema";

type FormTypes = {
  password: string;
};

const DeletePage = () => {
  const { t } = i18next;

  const [openDialog, setOpenDialog] = useState(false);

  const { currentUser, deleteAccount, deleteAccountFacebook } = useAuth();
  const { provider } = currentUser;
  const methods = useForm<FormTypes>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(dangerZoneSchema()),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const formSubmit = handleSubmit(async (data) => {
    await deleteAccount(data.password);
    setOpenDialog(false);
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
        id="settings-form-delete-account"
        onSubmit={formSubmit}
        autoComplete="off"
      >
        <MuiDialog
          handleClose={handleClose}
          isOpen={openDialog}
          formId="settings-form-delete-account"
          title="Delete your account?"
          description="You are about to delete your account. Please provide your password below to confirm the deletion"
        >
          <PasswordInput
            name="password"
            defaultValue=""
            labelName={t("Settings.Disposal.password")}
          />
        </MuiDialog>
      </Form>
    </>
  );
};
export { DeletePage };
