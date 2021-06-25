import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FullPage } from "@components/content";
import Table from "@components/Table";

import moment from "moment";

import { allAppsAPI } from "@api/mainAPI";

import Pagination from "@components/Pagination";
// import ApplicationsToggle from "./ApplicationsToggle";
import Subheader from "@components/Subheader";

const Archive = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  const history = useHistory();
  let { path } = useRouteMatch();

  const fetchData = async () => {
    try {
      const response = await allAppsAPI();
      setApplications(response.data.ApplicationList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("Archive.title")}
        description={t("Archive.subtitle")}
      />
      {/* <ApplicationsToggle /> */}
      {!isLoading && (
        <>
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
              {applications &&
                applications.map((app) => {
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
                      <td>{app.assignedEmployee?.name}</td>
                      <td>{app.user_id?.name}</td>
                      <td>{app.user_id?.surname}</td>
                      <td>{app.user_id?.email}</td>
                      <td>{app.user_id?.phone}</td>
                      <td>{app.category}</td>
                      <td>{app.type}</td>
                      <td>{createdAt}</td>
                      <td>{updatedAt}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {/* <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maximumPages={maximumPages}
          /> */}
        </>
      )}
    </FullPage>
  );
};
export default Archive;
