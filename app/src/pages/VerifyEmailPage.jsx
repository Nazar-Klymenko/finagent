import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { useDispatch } from "react-redux";

import { resendVerificationEmail } from "@redux/auth/actions";

import { ContentWrap } from "@components/content";

const VerifyEmailPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const resendEmail = () => {
    dispatch(resendVerificationEmail());
  };

  return (
    <ContentWrap>
      <div>
        <h1>{t("ActivateEmail.content")}</h1>
        <ResendEmail onClick={resendEmail}>
          {t("ActivateEmail.resend")}
        </ResendEmail>
      </div>
    </ContentWrap>
  );
};

export default VerifyEmailPage;

const ResendEmail = styled.div`
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
`;
