import React from "react";

import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import styled from "styled-components/macro";

import useTitle from "@hooks/useTitle";

import { ContentWrap } from "@components/content";

import ApplicationsTab from "./ApplicationsTab";
import SideNav from "./SideNav";

import CardOpen from "@pages/applicationOpen";

const Dashboard = () => {
  const { t } = useTranslation();
  let { path } = useRouteMatch();
  useTitle(t("Dashboard.title"));
  return (
    <ContentWrap flipDirection>
      <SideNav />

      <DashboardMain>
        <Route path={`${path}/application/:id`} render={() => <CardOpen />} />

        <Route
          path={`${path}/insurances/`}
          exact
          render={() => <Redirect to={`${path}/insurances/ready/1`} />}
        />

        <Route
          path={`${path}/loans/`}
          exact
          render={() => <Redirect to={`${path}/loans/ready/1`} />}
        />
        <Route
          path={`${path}/archived/`}
          exact
          render={() => <Redirect to={`${path}/archived/all/1`} />}
        />

        <Route
          path={`${path}/`}
          exact
          render={() => <Redirect to={`${path}/insurances/ready/1`} />}
        />

        <Route
          exact
          path={`${path}/:cat/:statusParam/:page`}
          render={() => <ApplicationsTab />}
        />
      </DashboardMain>
    </ContentWrap>
  );
};

const DashboardMain = styled(Paper)`
  display: flex;
  width: auto;
  flex-direction: column;
  overflow: hidden;
  margin-left: 20px;
  flex: 1;
  background: white;
  border-radius: 4px;
  position: relative;
  .empty {
    text-align: center;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.gray};
  }

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    margin-left: 0;
    border-radius: 0;
  }
`;

export default Dashboard;
