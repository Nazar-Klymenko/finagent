import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { takenAppsAPI } from "@api/mainAPI";

import { FullPage } from "@components/content";

import Table from "@components/Table";
import AssignCell from "@components/AssignCell";
import Pagination from "@components/Pagination";
import ApplicationsToggle from "./ApplicationsToggle";
import Subheader from "@components/Subheader";

const TakenApplications = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const [applications, setApplications] = useState([]);

  const fetchData = async () => {
    try {
      const response = await takenAppsAPI();
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

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 25;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const maximumPages = applications.length / cardsPerPage;

  const applicationsShown = applications.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("Applications.title")}
        description={t("Applications.subtitle")}
      />
      <ApplicationsToggle />
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
              {applicationsShown &&
                applicationsShown.map((app) => {
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
                      <AssignCell id={app._id} employee={app.employee} />
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
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maximumPages={maximumPages}
          />
        </>
      )}
    </FullPage>
  );
};
export default TakenApplications;
