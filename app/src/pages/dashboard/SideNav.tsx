import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { getApplicationsQuantityAPI } from "@api/applicationAPI";

import { useQuery } from "react-query";

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
        <span>{t("Dashboard.SideMenu.insurances")}</span>
        <Quantity>
          {data?.quantityInsurances > 0 && data?.quantityInsurances}
        </Quantity>
      </NavLink>
      <NavLink activeClassName="link--selected" strict to={`/dashboard/loans/`}>
        <span>{t("Dashboard.SideMenu.loans")}</span>
        <Quantity> {data?.quantityLoans > 0 && data?.quantityLoans}</Quantity>
      </NavLink>
      <NavLink activeClassName="link--selected" to={`/dashboard/archived/`}>
        <span>{t("Dashboard.SideMenu.history")}</span>
        <Quantity>
          {data?.quantityArchived > 0 && data?.quantityArchived}
        </Quantity>
      </NavLink>
    </Nav>
  );
};

const Nav = styled.div`
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: max-content;
  z-index: 15;
  height: max-content;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);

  a {
    cursor: pointer;
    text-transform: capitalize;
    text-decoration: none;
    font-weight: 500;
    color: ${({ theme }) => theme.gray};
    display: flex;
    justify-content: flex-start;
    padding: 8px 40px;
    border-radius: 4px;
    transition: color 0.2s ease-in-out;
  }
  .link--selected {
    color: ${({ theme }) => theme.blue} !important;
    background: ${({ theme }) => theme.lightBlue};
    box-shadow: 0px 1px 5px 0px rgba(124, 183, 255, 0.251);
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    position: sticky;
    top: 50px;
    left: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 0;
    border-radius: 0;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
    box-shadow: none;
    width: auto;
    a {
      flex: 1;
      border-radius: 0;
      border-bottom: 2px solid transparent;
      font-size: 0.9rem;
      padding: 8px 26px;
      margin-bottom: -1px;
      justify-content: center;
    }

    .link--selected {
      background: transparent;
      border-bottom: 2px solid ${({ theme }) => theme.blue} !important;
      box-shadow: none;
    }
  }
`;

const Quantity = styled.span`
  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SideNav;
