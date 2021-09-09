import React, { useEffect, useState } from "react";
import { allClientsAPI } from "@api/mainAPI";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FullPage } from "@components/content";

import Table from "@components/Table";
import Pagination from "@components/Pagination";
import Subheader from "@components/Subheader";

const Clients = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    allClientsAPI().then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 25;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const maximumPages = users.length / cardsPerPage;

  const usersShown = users.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("Clients.title")}
        description={t("Clients.subtitle")}
      />
      <Table>
        <thead>
          <tr>
            <th>{t("Clients.name")}</th>
            <th>{t("Clients.surname")}</th>
            <th>{t("Clients.email")}</th>
            <th>{t("Clients.phone")}</th>
            <th>{t("Clients.language")}</th>
          </tr>
        </thead>
        <tbody>
          {usersShown &&
            usersShown.map((user) => (
              <tr
                onClick={() => {
                  history.push(`/clients/${user._id}`);
                }}
                key={user._id}
              >
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.language}</td>
              </tr>
            ))}
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
export default Clients;
