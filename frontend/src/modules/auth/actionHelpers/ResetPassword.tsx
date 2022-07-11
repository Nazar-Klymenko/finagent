import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "@context/authContext";

import { Form } from "@components/Form";
import { Loader } from "@components/Loader";
import { Button } from "@components/buttons";
import { PasswordInput } from "@components/input";
import { AuthContainer } from "@components/layout";

interface Props {
  mode: "resetPassword" | "verifyEmail";
  oobCode: string | undefined;
}
type FormTypes = {
  password: string;
};

const ResetPassword = ({ mode, oobCode }: Props): JSX.Element => {
  const { t } = i18next;
  const router = useRouter();

  const { currentUser, emailActionHandler } = useAuth();
  const { isLoggedIn, isActive } = currentUser;
  const [isFinished, setIsFinished] = useState(false);

  const methods = useForm<FormTypes>({
    defaultValues: {
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(resetPasswordSchema),
  });
  const { handleSubmit } = methods;

  const formSubmit = handleSubmit((data) => {
    emailActionHandler(mode, oobCode!, data.password);
    setIsFinished(true);
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/insurance");
    }
  }, [isLoggedIn, isActive, router]);

  return (
    <AuthContainer isLoading={false} title={t("Pages.actions.resetPassword")}>
      <Typography variant="h4" gutterBottom>
        {t("RestorePassword.title")}
      </Typography>
      <Form methods={methods} id="resetPasswordForm" onSubmit={formSubmit}>
        <PasswordInput
          name="password"
          labelName={t("SignUp.Individual.password")}
          autoComplete="new-password"
        />
      </Form>
      <Button fullWidth form="resetPasswordForm" disabled={isFinished}>
        {t("Basic.buttonConfirm")}
      </Button>
    </AuthContainer>
  );
};

export { ResetPassword };

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Form.Error.blank")
    .min(8, "The password has to be at lest 8 symbols"),
});
