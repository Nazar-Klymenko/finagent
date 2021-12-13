import React, { useEffect, useState } from "react";

import moment from "moment";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

import { getApplications } from "@api/mainAPI";

import MuiPagination from "@components/MuiPagination";
import Subheader from "@components/Subheader";
import { FullPage } from "@components/content";
import { MuiTable, TableCell, TableRow } from "@components/table";

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

      <MuiTable
        headers={[
          "Applications.admin",
          "Applications.name",
          "Applications.surname",
          "Applications.email",
          "Applications.phone",
          "Applications.service",
          "Applications.type",
          "Applications.createdAt",
          "Applications.lastUpdate",
        ]}
      >
        {data?.applications?.length > 0 &&
          data.applications.map((app) => {
            const createdAt = new Date(app.createdAt).toLocaleDateString("pl");
            const updatedAt = moment(app.updatedAt).fromNow();

            return (
              <TableRow
                key={app._id}
                onClick={() => {
                  history.push(`/applications/${app._id}`);
                }}
                hover
              >
                <TableCell>{app.employee?.name}</TableCell>
                <TableCell>{app.user?.name}</TableCell>
                <TableCell>{app.user?.surname}</TableCell>
                <TableCell>{app.user?.email}</TableCell>
                <TableCell>{app.user?.phone}</TableCell>
                <TableCell>{app.category}</TableCell>
                <TableCell>{app.type}</TableCell>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{updatedAt}</TableCell>
              </TableRow>
            );
          })}
      </MuiTable>
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
