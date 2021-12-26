import React, { FC } from "react";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { ContentWrap } from "@components/content";

const Error404: FC = () => {
  const { t } = useTranslation();
  return (
    <ContentWrap direction="column">
      <Container>
        <Number>404</Number>
        <h1>{t("404.title")}</h1>
        <NavLink to="/dashboard">{t("404.link")}</NavLink>
      </Container>
    </ContentWrap>
  );
};
export default Error404;

const Number = styled("span")`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 5rem;
`;
const Container = styled("div")`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 20vh auto;
  a {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
