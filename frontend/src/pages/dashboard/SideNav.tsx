import React from "react";

import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";

import { getApplicationsQuantityAPI } from "@api/applications";

const SideNav: React.FC = () => {
  const { t } = useTranslation();

  const fetchApplicationsQuantity = async () => {
    const { data } = await getApplicationsQuantityAPI("all");
    return data;
  };

  let { data } = useQuery(
    [`applicationsQuantity`],
    () => fetchApplicationsQuantity(),
    { keepPreviousData: true, staleTime: 15000 }
  );

  return (
    <Nav>
      <NavLink
        activeClassName="link--selected"
        strict
        to={`/dashboard/insurances/`}
      >
        <Typography variant="body1">
          {t("Dashboard.SideMenu.insurances")}
        </Typography>
        {data?.quantityInsurances > 0 && (
          <Quantity>{data?.quantityInsurances}</Quantity>
        )}
      </NavLink>
      <NavLink activeClassName="link--selected" strict to={`/dashboard/loans/`}>
        <Typography variant="body1">{t("Dashboard.SideMenu.loans")}</Typography>
        {data?.quantityLoans > 0 && <Quantity>{data?.quantityLoans}</Quantity>}
      </NavLink>
      <NavLink activeClassName="link--selected" to={`/dashboard/archived/`}>
        <Typography variant="body1">
          {t("Dashboard.SideMenu.history")}
        </Typography>

        {data?.quantityArchived > 0 && (
          <Quantity>{data?.quantityArchived}</Quantity>
        )}
      </NavLink>
    </Nav>
  );
};

const Nav = styled(Paper)`
  padding: 8px;
  border-radius: 4px;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: max-content;
  z-index: 15;
  height: max-content;

  min-width: 14rem;

  a {
    cursor: pointer;
    text-transform: capitalize;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    padding: 8px 20px;
    border-radius: 4px;
    transition: color 0.2s ease-in-out;
  }
  .link--selected {
    color: ${({ theme }) => theme.palette.primary.main} !important;
    background: ${({ theme }) => theme.palette.secondary.main};
    &:hover {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
    padding: 2px 8px 0px;
    position: sticky;
    top: 50px;
    left: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 0;
    border-radius: 0;
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    box-shadow: none;
    width: auto;
    a {
      flex: 1;
      border-radius: 0;
      border-bottom: 2px solid transparent;
      font-size: 0.9rem;
      padding: 4px 16px 8px;
      margin-bottom: -1px;
      justify-content: center;
    }

    .link--selected {
      background: transparent;
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main} !important;
      box-shadow: none;
    }
  }
`;

const Quantity = styled("span")`
  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background: ${({ theme }) => theme.palette.secondary.main};
  margin: 0 0 0 1.5rem;
  font-size: 0.9rem;
`;

export default SideNav;
