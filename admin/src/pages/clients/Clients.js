import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

import { getClients } from "@api/mainAPI";

import MuiPagination from "@components/MuiPagination";
import Subheader from "@components/Subheader";
import { FullPage } from "@components/content";
import { MuiTable, TableCell, TableRow } from "@components/table";

const Clients = () => {
  const { t } = useTranslation();
  const history = useHistory();
  let { page } = useParams();

  const [maximumPages, setMaximumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(25);

  const fetchClients = async (page = 0, size) => {
    const { data } = await getClients(page, size);
    setMaximumPages(data.maximumPages);
    return data;
  };

  let { data, error, isFetching, refetch } = useQuery(
    [`clients`, currentPage],
    () => fetchClients(currentPage, size),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <FullPage>
      <Subheader
        compact
        subheader={t("Clients.title")}
        description={t("Clients.subtitle")}
      />

      <MuiTable
        headers={[
          "Clients.name",
          "Clients.email",
          "Clients.phone",
          "Clients.language",
          "Clients.provider",
        ]}
      >
        {data?.users?.length > 0 &&
          data.users.map((user) => (
            <TableRow
              onClick={() => {
                history.push(`/clients/${user._id}`);
              }}
              key={user._id}
              hover
            >
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.language || "pl"}</TableCell>
              <TableCell>{user.provider}</TableCell>
            </TableRow>
          ))}
      </MuiTable>

      <MuiPagination
        currentPage={currentPage}
        maximumPages={maximumPages}
        category="clients"
        status="all"
      />
    </FullPage>
  );
};
export default Clients;
