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
import Table from "@components/Table";
import { FullPage } from "@components/content";

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
                    history.push(`/applications/open/${app._id}`);
                  }}
                >
                  <AssignCell
                    id={app._id}
                    employee={app.employee}
                    assignApplication={assignApplication}
                  />
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
      </Table>
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
