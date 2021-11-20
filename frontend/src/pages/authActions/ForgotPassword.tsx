import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "./passwordSchema";

import { useTranslation } from "react-i18next";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { MuiInput } from "@components/input";
import { CTA } from "@components/buttons";

import { Subheader } from "@components/typography";
import { useDispatch } from "react-redux";
import { setSnackbar } from "@redux/alert/actions";
import { useAuth } from "@context/authContext";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { resetPassword } = useAuth();
  const { handleSubmit, errors, control } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(forgotPasswordSchema()),
  });

  const formSubmit = async (data: any) => {
    try {
      resetPassword(data.email);
      dispatch(setSnackbar("success", "RestorePassword.confirm"));
    } catch (error: any) {
      dispatch(setSnackbar("success", "Snackbar.error"));
    }
  };

  return (
    <ContentWrap authForm direction="column">
      <Subheader
        subheader={t("RestorePassword.title")}
        description={t("RestorePassword.Form.explain")}
      />
      <Form id="form" onSubmit={handleSubmit(formSubmit)}>
        <MuiInput
          control={control}
          name="email"
          labelName={t("RestorePassword.Form.email")}
          type="email"
          autoFocus={true}
          error={!!errors.email}
          helperText={errors?.email?.message}
          placeholder=""
        />
      </Form>
      <ButtonsWrap>
        <CTA
          form="form"
          text={t("RestorePassword.Form.button")}
          color="primary"
        />
      </ButtonsWrap>
      <LogInOption>
        <span>
          {t("RestorePassword.noNeedRestore")}
          <NavLink className="login-link" to="/auth/login">
            {t("RestorePassword.logIn")}
          </NavLink>
        </span>
      </LogInOption>
    </ContentWrap>
  );
};

export default ForgotPassword;

const ButtonsWrap = styled.div<{ multiple?: boolean }>`
  padding: 0px 0px 16px;
  display: flex;
  justify-content: ${({ multiple }) =>
    multiple ? "space-between" : "flex-end"};
`;
const LogInOption = styled.div`
  font-size: 0.8rem;
  margin: 0 auto;
  .login-link {
    color: ${({ theme }) => theme.typography.blue};
    padding: 0.5rem;
    &:visited {
      color: ${({ theme }) => theme.typography.blue};
    }
  }
`;
