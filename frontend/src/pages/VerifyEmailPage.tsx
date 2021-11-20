import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { ContentWrap } from "@components/content";
import { useAuth } from "@context/authContext";

const VerifyEmailPage = () => {
  const { t } = useTranslation();

  const { resendVerificationEmail } = useAuth();

  const resendEmail = () => {
    resendVerificationEmail();
  };

  return (
    <ContentWrap direction="column" fullWidth>
      <Container>
        <h1>{t("ActivateEmail.content")}</h1>
        <ResendEmail onClick={resendEmail}>
          {t("ActivateEmail.resend")}
        </ResendEmail>
      </Container>
    </ContentWrap>
  );
};

export default VerifyEmailPage;

const ResendEmail = styled.div`
  color: ${({ theme }) => theme.blue};
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 20vh auto;
  a {
    color: ${({ theme }) => theme.blue};
  }
`;
