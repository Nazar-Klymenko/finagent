import React from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import styled from "styled-components/macro";
import useTitle from "@hooks/useTitle";
import { useTranslation } from "react-i18next";
import { ContentWrap } from "@components/content";

import CardOpen from "@pages/applicationOpen";

import SideNav from "./SideNav";
import ApplicationsTab from "./ApplicationsTab";

const Dashboard = () => {
  const { t } = useTranslation();
  let { path } = useRouteMatch();
  useTitle(t("Dashboard.title"));
  return (
    <ContentWrap fullWidth flipDirection P0>
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

const DashboardMain = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  border: 1px solid $BorderGray;
  overflow: hidden;
  margin-left: 20px;
  flex: 1;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.border};

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
