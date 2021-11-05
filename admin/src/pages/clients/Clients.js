import React, { useEffect, useState } from "react";
import { getClients } from "@api/mainAPI";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FullPage } from "@components/content";

import Table from "@components/Table";
import MuiPagination from "@components/MuiPagination";
import Subheader from "@components/Subheader";
import { useQuery } from "react-query";

const Clients = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [maximumPages, setMaximumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(25);

  const fetchApplications = async (page = 0, size) => {
    const { data } = await getClients(page, size);
    setMaximumPages(data.maximumPages);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`clients`, currentPage],
    () => fetchApplications(currentPage, size),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );

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
            <th>{t("Clients.provider")}</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.length > 0 &&
            data.users.map((user) => (
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
                <td>{user.provider}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <MuiPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maximumPages={maximumPages}
        category="clients"
      />
    </FullPage>
  );
};
export default Clients;
