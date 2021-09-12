import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageToggle from "./PageToggle";
import Card from "../../components/Card";
import Loader from "@components/Loader";

import { getApplicationsAPI } from "@api/userAPI";
import MuiPagination from "@components/MuiPagination";
import { useQuery } from "react-query";
import ErrorRefetch from "@components/ErrorRefetch";

const ApplicationsTab = () => {
  const { t } = useTranslation();
  const [maximumPages, setMaximumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [recount, setRecount] = useState(null);

  let { page, statusParam, cat } = useParams();

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    if (recount !== null) {
      setRecount(false);
    } else {
      setRecount(true);
    }
  }, [recount]);

  const fetchApplications = async (page = 0, statusParam) => {
    const { data } = await getApplicationsAPI(page, cat, statusParam, recount);
    setMaximumPages(data.maximumPages);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`applications${cat}${statusParam}`, currentPage],
    () => fetchApplications(currentPage, statusParam),
    { keepPreviousData: true, staleTime: 5000 }
  );

  useEffect(() => {
    setRecount(true);
    refetch();
  }, [statusParam, refetch]);

  return (
    <>
      <PageToggle
        category={cat}
        status={statusParam}
        myServiceType={t(`Dashboard.PageToggle.${cat}`)}
      />
      {isFetching && <Loader />}

      {!isFetching && error && (
        <ErrorRefetch text="Error fetching applications" callback={refetch} />
      )}

      {!isFetching &&
        !error &&
        data?.ApplicationList?.map((app) => (
          <Card key={app._id} appDataForUser={app} />
        ))}
      {!isFetching && data?.ApplicationList?.length === 0 && !error && (
        <EmptyMessage>{t("Dashboard.PageToggle.noApps")}</EmptyMessage>
      )}

      <MuiPagination
        category={cat}
        currentPage={currentPage}
        maximumPages={maximumPages}
        status={statusParam}
      />
    </>
  );
};

export default ApplicationsTab;

const EmptyMessage = styled.span`
  margin: 0 auto;
  color: ${({ theme }) => theme.typography.gray};
  padding: 1rem;
`;
