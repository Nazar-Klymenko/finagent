import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ContentWrap } from "@components/content";

import { NavLink } from "react-router-dom";

const Error404 = () => {
  const { t } = useTranslation();
  return (
    <ContentWrap direction="column" fullWidth>
      <Container>
        <Number>404</Number>
        <h1>{t("404.title")}</h1>
        <NavLink to="/dashboard">{t("404.link")}</NavLink>
      </Container>
    </ContentWrap>
  );
};
export default Error404;

const Number = styled.span`
  color: ${({ theme }) => theme.blue};
  font-size: 5rem;
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
