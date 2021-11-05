import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FullPage } from "@components/content";
import Table from "@components/Table";

import moment from "moment";

import { getApplications } from "@api/mainAPI";

import MuiPagination from "@components/MuiPagination";
import Subheader from "@components/Subheader";
import { useQuery } from "react-query";

const Archive = () => {
  const { t } = useTranslation();
  const status = "archived";

  const history = useHistory();
  const [maximumPages, setMaximumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(25);

  const fetchApplications = async (page = 0, status, size) => {
    const { data } = await getApplications(status, page, size);
    setMaximumPages(data.maximumPages);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`applications-${status}`, currentPage],
    () => fetchApplications(currentPage, status, size),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );

  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("Archive.title")}
        description={t("Archive.subtitle")}
      />

      <Table>
        <thead>
          <tr>
            <th>{t("Applications.admin")}</th>
            <th>{t("Applications.name")}</th>
            <th>{t("Applications.surname")}</th>
            <th>{t("Applications.email")}</th>
            <th>{t("Applications.phone")}</th>
            <th>{t("Applications.service")}</th>
            <th>{t("Applications.type")}</th>
            <th>{t("Applications.createdAt")}</th>
            <th>{t("Applications.lastUpdate")}</th>
          </tr>
        </thead>
        {!isFetching && (
          <tbody>
            {data?.applications?.length > 0 &&
              data.applications.map((app) => {
                const createdAt = new Date(app.createdAt).toLocaleDateString(
                  "pl"
                );
                const updatedAt = moment(app.updatedAt).fromNow();

                return (
                  <tr
                    key={app._id}
                    onClick={() => {
                      history.push(`/applications/${app._id}`);
                    }}
                  >
                    <td>{app.employee?.name}</td>
                    <td>{app.user?.name}</td>
                    <td>{app.user?.surname}</td>
                    <td>{app.user?.email}</td>
                    <td>{app.user?.phone}</td>
                    <td>{app.category}</td>
                    <td>{app.type}</td>
                    <td>{createdAt}</td>
                    <td>{updatedAt}</td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </Table>
      <MuiPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maximumPages={maximumPages}
        category="applications"
        status="archived"
      />
    </FullPage>
  );
};
export default Archive;
