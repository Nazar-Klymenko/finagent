import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import { getApplicationsQuantityAPI } from "@api/applications";

interface Props {
  category: string;
  myServiceType: string;
  blocked?: boolean;
  status: string;
}
interface Styled {
  selected?: boolean;
  blocked?: boolean;
}

const PageToggle: React.FC<Props> = ({
  status,
  category,
  myServiceType,
  blocked,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [togglePage, setTogglePage] = useState(1);

  function setStatus(tab: number, status: string) {
    setTogglePage(tab);
    history.push(`/dashboard/${category}/${status}/1`);
  }

  const fetchApplicationsQuantity = async () => {
    const { data } = await getApplicationsQuantityAPI(category);
    return data;
  };

  let { data } = useQuery(
    [`applications${category}Quantity`],
    () => fetchApplicationsQuantity(),
    { keepPreviousData: true, staleTime: 15000 }
  );

  useEffect(() => {
    if (status === "ready") {
      setTogglePage(1);
    } else if (status === "pending") {
      setTogglePage(2);
    }
  }, [status]);

  if (category !== "archived") {
    return (
      <PageToggleStyled>
        <Tab
          onClick={() => {
            setStatus(1, "ready");
          }}
          selected={togglePage === 1}
          blocked={blocked}
        >
          <span>{myServiceType}</span>
          <span>{data?.quantityReady > 0 && data?.quantityReady} </span>
        </Tab>
        <Tab
          onClick={() => {
            setStatus(2, "pending");
          }}
          selected={togglePage === 2}
          blocked={blocked}
        >
          <span>{t("Dashboard.PageToggle.pending")}</span>
          <span>{data?.quantityPending > 0 && data?.quantityPending}</span>
        </Tab>
      </PageToggleStyled>
    );
  } else {
    return null;
  }
};

const Tab = styled("div")<Styled>`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.grey[300]};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  span {
    padding: 12px;
    color: ${({ theme }) => theme.palette.grey[500]};
  }
  &:first-of-type {
    border-right: 1px solid ${({ theme }) => theme.palette.divider};
  }
  ${({ selected }) =>
    selected &&
    `
      background: white;
      border-bottom: 1px solid transparent;
      span {
        color: ${({ theme }: any) => theme.palette.common.black};
      }
    `}

  ${({ blocked }) =>
    blocked &&
    `
      background: ${({ theme }: any) => theme.lightestGray};
      border-bottom: 1px solid ${({ theme }: any) => theme.palette.divider};
    `}


    @media screen and (max-width: ${({ theme }) =>
    theme.breakpoints.values.md}) {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    background: white;
    border-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    span {
      padding: 8px;
      color: ${({ theme }) => theme.palette.primary.main};
    }

    ${({ selected }) =>
      selected &&
      `
        background: ${({ theme }: any) => theme.palette.primary.main};
        span {
          color: white;
        }
      `}

    &:first-of-type {
      border-right: 1px solid ${({ theme }) => theme.palette.primary.main};
      border-radius: 4px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    ${({ blocked }) =>
      blocked &&
      `
        pointer-events: none;
        opacity: 0.7;
      `}
  }
`;

const PageToggleStyled = styled("div")`
  display: flex;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
    padding: 20px;
  }
`;

export default PageToggle;
