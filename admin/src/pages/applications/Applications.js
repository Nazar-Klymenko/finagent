import React, { useEffect, useState } from "react";

import moment from "moment";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { assignAppAPI, getApplications } from "@api/mainAPI";

import { setSnackbar } from "@redux/alert/actions";

import AssignCell from "@components/AssignCell";
import MuiPagination from "@components/MuiPagination";
import Subheader from "@components/Subheader";
import { FullPage } from "@components/content";
import { MuiTable, TableCell, TableRow } from "@components/table";

import ApplicationsToggle from "./ApplicationsToggle";

const Applications = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { page, status } = useParams();
  const dispatch = useDispatch();

  const [maximumPages, setMaximumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(25);

  const fetchApplications = async (page = 0, status, size) => {
    const { data } = await getApplications(status, page, size);
    setMaximumPages(data.maximumPages);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`applications-${status}`, currentPage, size],
    () => fetchApplications(currentPage, status, size),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    refetch();
    return refetch();
  }, [status, refetch]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const assignApplication = async (id) => {
    try {
      await assignAppAPI(id);
      refetch();
    } catch (error) {
      dispatch(setSnackbar("error", "Couldn't assign application"));
    }
  };

  return (
    <FullPage>
      {status === "all" ? (
        <Subheader
          compact
          subheader={t("Applications.title")}
          description={t("Applications.subtitle")}
        />
      ) : (
        <Subheader
          compact
          subheader={t("Applications.takenTitle")}
          description={t("Applications.takenSubtitle")}
        />
      )}

      <ApplicationsToggle />

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
                  history.push(`/applications/open/${app._id}`);
                }}
                hover
              >
                <AssignCell
                  id={app._id}
                  employee={app.employee}
                  assignApplication={assignApplication}
                />
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
        status={status}
      />
    </FullPage>
  );
};
export default Applications;
