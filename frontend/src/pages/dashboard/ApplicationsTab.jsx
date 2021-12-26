import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { getApplicationsAPI } from "@api/userAPI";

import Card from "@components/Card";
import ErrorRefetch from "@components/ErrorRefetch";
import Loader from "@components/Loader";
import MuiPagination from "@components/MuiPagination";

import PageToggle from "./PageToggle";

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
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
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

const EmptyMessage = styled("span")`
  margin: 0 auto;
  color: ${({ theme }) => theme.typography.gray};
  padding: 1rem;
`;
