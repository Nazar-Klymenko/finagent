import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { myAppsAPI } from "@api/mainAPI";
import { FullPage } from "@components/content";
import Pagination from "@components/Pagination";

import Table from "@components/Table";
import Subheader from "@components/Subheader";

const MyApplications = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    myAppsAPI().then((response) => {
      setApplications(response.data.ApplicationList);
    });
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
        subheader={t("MyApplications.title")}
        description={t("MyApplications.subtitle")}
      />
      <Table>
        <thead>
          <tr>
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
                    history.push(`${path}/${app._id}`);
                  }}
                >
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
    </FullPage>
  );
};
export default MyApplications;
